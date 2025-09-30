import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase, UserProfile, Student, Employee, TPOOfficer } from '../lib/supabase'
import { getSimpleProfile, createOrUpdateProfile, SimpleProfile } from '../lib/simple-profile-service'
import { 
  registerUserWithRole, 
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
  signIn: (email: string, password: string, role?: 'student' | 'employee' | 'tpo') => Promise<{ error: AuthError | null }>
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

// Test users for development
const testUsers = {
  'student@gmail.com': 'student',
  'employee@gmail.com': 'employee',
  'employees@gmail.com': 'employee',
  'tpo@gmail.com': 'tpo'
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    console.log('👤 Fetching user profile:', { userId, userEmail })
    
    try {
      // Handle test users - don't fetch from database
      if (userId === 'test-user-id' && userEmail) {
        const normalizedEmail = userEmail.toLowerCase();
        if (normalizedEmail in testUsers) {
          // Test user profile is already set during login, don't override it
          console.log('🧪 Test user detected, skipping database fetch')
          setLoading(false); // Make sure to set loading to false for test users
          return;
        }
      }
      
      console.log('🔍 Attempting to get profile from database...')
      const profile = await getSimpleProfile(userId, userEmail)
      
      if (profile) {
        console.log('✅ Profile found, converting to UserProfile format')
        // Convert SimpleProfile to UserProfile format
        let userProfile: UserProfile
        
        if (profile.role === 'student') {
          userProfile = {
            ...profile,
            student_id: profile.student_id || 'STU001',
            university: profile.university || 'University',
            course: profile.course || 'Computer Science',
            graduation_year: profile.graduation_year || 2025,
            skills: profile.skills || []
          } as Student
        } else if (profile.role === 'employee') {
          userProfile = {
            ...profile,
            employee_id: profile.employee_id || 'EMP001',
            company_name: profile.company_name || 'Company',
            job_title: profile.job_title || 'Software Developer',
            experience_years: profile.experience_years || 1,
            skills: profile.skills || []
          } as Employee
        } else {
          userProfile = {
            ...profile,
            officer_id: profile.officer_id || 'TPO001',
            company_name: profile.company_name || 'Company',
            global_ranking: 'Top Company',
            company_type: 'mnc',
            industry_type: 'technology',
            ceo_name: 'CEO Name',
            ceo_email: 'ceo@company.com',
            executive_position: 'CEO',
            years_of_experience: 10,
            access_level: 'full_admin',
            can_access_students: true,
            can_access_employees: true,
            can_post_opportunities: true,
            can_conduct_hackathons: true,
            can_view_analytics: true
          } as TPOOfficer
        }
        
        console.log('📋 Setting user profile:', userProfile)
        setUserProfile(userProfile)
      } else {
        console.log('🆕 No profile found, creating basic profile for new user')
        // Create a basic profile for new users
        if (userEmail) {
          console.log('💾 Creating new profile in database...')
          const basicProfile = await createOrUpdateProfile({
            user_id: userId,
            email: userEmail,
            full_name: userEmail.split('@')[0],
            role: 'student' // Default role
          })
          
          console.log('✅ Basic profile created:', basicProfile)
          
          const userProfile: Student = {
            ...basicProfile,
            student_id: basicProfile.student_id || 'STU001',
            university: basicProfile.university || 'University',
            course: basicProfile.course || 'Computer Science',
            graduation_year: basicProfile.graduation_year || 2025,
            skills: basicProfile.skills || []
          } as Student
          
          console.log('📋 Setting new user profile:', userProfile)
          setUserProfile(userProfile)
        }
      }
    } catch (error) {
      console.error('💥 Error fetching user profile:', error)
      setUserProfile(null)
    } finally {
      console.log('⏰ Setting loading to false')
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string, selectedRole?: 'student' | 'employee' | 'tpo') => {
    const normalizedEmail = email.toLowerCase();
    if (normalizedEmail in testUsers && password === '12345678') {
      // Use selected role for test users instead of hardcoded role
      const userRole = selectedRole || testUsers[normalizedEmail as keyof typeof testUsers];
      
      // Create a mock user session for test users
      const mockUser = {
        id: 'test-user-id',
        email: normalizedEmail,
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        user_metadata: {
          full_name: userRole === 'tpo' ? 'Microsoft Corporation' : 
                    userRole === 'employee' ? 'Test Employee' : 'Test Student',
          role: userRole
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
      
      // Create/update test profile with selected role
      let mockProfile: UserProfile
      
      if (userRole === 'student') {
        mockProfile = {
          id: 'test-user-id',
          user_id: 'test-user-id',
          email: normalizedEmail,
          full_name: 'Test Student',
          role: 'student',
          student_id: 'STU001',
          university: 'Test University',
          course: 'Computer Science',
          graduation_year: 2025,
          skills: ['JavaScript', 'React'],
          phone_number: '1234567890',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Student
      } else if (userRole === 'employee') {
        mockProfile = {
          id: 'test-user-id',
          user_id: 'test-user-id',
          email: normalizedEmail,
          full_name: 'Test Employee',
          role: 'employee',
          employee_id: 'EMP001',
          company_name: 'Test Company',
          job_title: 'Software Developer',
          experience_years: 3,
          skills: ['React', 'Node.js'],
          phone_number: '1234567890',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Employee
      } else {
        mockProfile = {
          id: 'test-user-id',
          user_id: 'test-user-id',
          email: normalizedEmail,
          full_name: 'Microsoft Corporation',
          role: 'tpo',
          officer_id: 'TPO001',
          company_name: 'Microsoft Corporation',
          global_ranking: 'Top 10',
          company_type: 'mnc',
          industry_type: 'technology',
          ceo_name: 'Satya Nadella',
          ceo_email: 'ceo@microsoft.com',
          executive_position: 'CEO',
          years_of_experience: 30,
          access_level: 'full_admin',
          can_access_students: true,
          can_access_employees: true,
          can_post_opportunities: true,
          can_conduct_hackathons: true,
          can_view_analytics: true,
          phone_number: '1234567890',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as TPOOfficer
      }
      
      setUserProfile(mockProfile)
      setLoading(false) // Set loading to false immediately for test users
      
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

    // Sign in with Supabase
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    // If login successful and role is selected, update the user's role
    if (!error && authData.user && selectedRole) {
      try {
        // Update user profile with selected role
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: selectedRole, updated_at: new Date().toISOString() })
          .eq('user_id', authData.user.id)

        if (!updateError) {
          // Refresh user profile to get updated role
          await fetchUserProfile(authData.user.id, authData.user.email)
        }
      } catch (updateError) {
        console.error('Error updating user role:', updateError)
      }
    }

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
      // Update profile using simple profile service
      await createOrUpdateProfile({
        user_id: user.id,
        email: user.email,
        ...updates
      })

      // Refresh user profile
      await fetchUserProfile(user.id, user.email)
      return { error: null }
    } catch (error) {
      console.error('Error updating profile:', error)
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

export { AuthProvider }