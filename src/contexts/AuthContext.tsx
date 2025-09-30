import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase, UserProfile, Student, Employee, TPOOfficer } from '../lib/supabase'
import { 
  registerUserWithRole, 
  getUserProfile, 
  updateStudentProfile,
  updateEmployeeProfile,
  updateTPOProfile,
  checkEmailExists 
} from '../lib/database-service'

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (
    email: string, 
    password: string, 
    baseUserData: {
      full_name: string
      role: 'student' | 'employee' | 'tpo'
      phone_number?: string
    },
    roleSpecificData: any
  ) => Promise<{ error: AuthError | Error | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>
  checkEmailRole: (email: string) => Promise<{ exists: boolean; role?: string; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserProfile(session.user.id, session.user.email).finally(() => setLoading(false));
        } else {
          setUserProfile(null);
          setLoading(false);
        }
      }
    );

    // Handle initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string, userEmail?: string) => {
    try {
      const profile = await getUserProfile(userId, userEmail)
      setUserProfile(profile)
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setUserProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    // Handle test users for development
    const testUsers = {
      'student@gmail.com': 'student',
      'employee@gmail.com': 'employee',
      'employees@gmail.com': 'employee',
      'tpo@gmail.com': 'tpo'
    }
    const normalizedEmail = email.toLowerCase();
    if (normalizedEmail in testUsers && password === '12345678') {
      // Create a mock user session for test users
      const mockUser = {
        id: 'test-user-id',
        email: normalizedEmail,
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        user_metadata: {
          full_name: normalizedEmail === 'tpo@gmail.com' ? 'Microsoft Corporation' : 
                    (normalizedEmail === 'employee@gmail.com' || normalizedEmail === 'employees@gmail.com') ? 'Test Employee' : 'Test Student',
          role: testUsers[normalizedEmail as keyof typeof testUsers]
        }
      } as User
      setUser(mockUser)
      setSession({
        user: mockUser,
        access_token: 'mock-token',
        refresh_token: 'mock-refresh',
        expires_in: 3600,
        token_type: 'bearer'
      } as Session)
      // Fetch test profile
      try {
        const profile = await getUserProfile('test-user-id', normalizedEmail)
        setUserProfile(profile)
      } catch (error) {
        console.error('Error fetching test profile:', error)
      }
      return { error: null }
    }
    
    // Check if email exists in our system first
    try {
      const emailCheck = await checkEmailExists(email)
      if (!emailCheck.exists) {
        return { 
          error: new Error('Email not registered. Please sign up first or check your email address.') as AuthError
        }
      }
    } catch (checkError) {
      console.error('Error checking email during login:', checkError)
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (
    email: string, 
    password: string, 
    baseUserData: {
      full_name: string
      role: 'student' | 'employee' | 'tpo'
      phone_number?: string
    },
    roleSpecificData: any
  ) => {
    // First check if email already exists in any role
    try {
      const emailCheck = await checkEmailExists(email)
      if (emailCheck.exists) {
        const roleNames = {
          student: 'Student',
          employee: 'Employee',
          tpo: 'Admin/TPO'
        }
        const roleName = roleNames[emailCheck.role as keyof typeof roleNames] || emailCheck.role
        return { 
          error: new Error(`This email is already registered as ${roleName}. Please use a different email or login with your existing account.`) 
        }
      }
    } catch (checkError) {
      console.error('Error checking email:', checkError)
      return { error: new Error('Unable to verify email availability. Please try again.') }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: baseUserData.full_name,
          role: baseUserData.role
        }
      }
    })

    if (error) return { error }

    // If user is created, create the complete profile
    if (data.user) {
      try {
        await registerUserWithRole(
          {
            id: data.user.id,
            email,
            ...baseUserData
          },
          roleSpecificData
        )
      } catch (profileError) {
        console.error('Error creating user profile:', profileError)
        return { error: profileError as Error }
      }
    }

    return { error: null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return { error: new Error('No user logged in') }

    // Handle test users: just update local state and return success
    const testEmails = ['student@gmail.com', 'employee@gmail.com', 'employees@gmail.com', 'tpo@gmail.com'];
    if (testEmails.includes(user.email)) {
      setUserProfile({ ...userProfile, ...updates } as UserProfile);
      return { error: null };
    }

    try {
      // Update profile based on role
      const role = userProfile.role
      switch (role) {
        case 'student':
          await updateStudentProfile(user.id, updates as Partial<Student>)
          break
        case 'employee':
          await updateEmployeeProfile(user.id, updates as Partial<Employee>)
          break
        case 'tpo':
          await updateTPOProfile(user.id, updates as Partial<TPOOfficer>)
          break
        default:
          throw new Error(`Invalid role: ${role}`)
      }

      // Refresh user profile
      await fetchUserProfile(user.id, user.email)
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const checkEmailRole = async (email: string) => {
    try {
      const emailCheck = await checkEmailExists(email)
      if (emailCheck.exists) {
        const roleNames = {
          student: 'Student',
          employee: 'Employee',
          tpo: 'TPO Portal (Companies & Institutions)'
        }
        return {
          exists: true,
          role: roleNames[emailCheck.role as keyof typeof roleNames] || emailCheck.role
        }
      }
      return { exists: false }
    } catch (error) {
      return { 
        exists: false, 
        error: 'Unable to check email status. Please try again.' 
      }
    }
  }

  const value = {
    user,
    userProfile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    checkEmailRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}