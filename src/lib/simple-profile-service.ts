// Simple profile service for storing user information
import { supabase } from './supabase'

export interface SimpleProfile {
  id: string
  user_id: string
  email: string
  full_name: string
  role: 'student' | 'employee' | 'tpo'
  phone_number?: string
  
  // Student fields
  student_id?: string
  university?: string
  course?: string
  graduation_year?: number
  
  // Employee fields
  employee_id?: string
  company_name?: string
  job_title?: string
  experience_years?: number
  
  // TPO fields
  officer_id?: string
  
  // Common fields
  skills?: string[]
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  
  created_at: string
  updated_at: string
}

export async function createOrUpdateProfile(profileData: Partial<SimpleProfile> & { 
  user_id: string, 
  email: string 
}): Promise<SimpleProfile> {
  const now = new Date().toISOString()
  
  console.log('🔄 Creating/updating profile for:', profileData.email)
  
  try {
    // First try to get existing profile
    const { data: existing, error: selectError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', profileData.user_id)
      .maybeSingle() // Use maybeSingle to avoid error when no rows found
    
    console.log('📋 Existing profile check:', { existing, selectError })
    
    if (existing) {
      console.log('📝 Updating existing profile')
      // Update existing profile
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: now
        })
        .eq('user_id', profileData.user_id)
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error updating profile:', error)
        throw error
      }
      console.log('✅ Profile updated successfully:', data)
      return data
    } else {
      console.log('🆕 Creating new profile')
      // Create new profile with all required fields
      const newProfile = {
        user_id: profileData.user_id,
        email: profileData.email,
        full_name: profileData.full_name || profileData.email.split('@')[0],
        role: profileData.role || 'student',
        phone_number: profileData.phone_number || null,
        // Student defaults
        student_id: profileData.student_id || null,
        university: profileData.university || null,
        course: profileData.course || null,
        graduation_year: profileData.graduation_year || null,
        // Employee defaults
        employee_id: profileData.employee_id || null,
        company_name: profileData.company_name || null,
        job_title: profileData.job_title || null,
        experience_years: profileData.experience_years || null,
        // TPO defaults
        officer_id: profileData.officer_id || null,
        // Common fields
        skills: profileData.skills || [],
        linkedin_url: profileData.linkedin_url || null,
        github_url: profileData.github_url || null,
        portfolio_url: profileData.portfolio_url || null,
        created_at: now,
        updated_at: now
      }
      
      console.log('📦 Profile data to insert:', newProfile)
      
      const { data, error } = await supabase
        .from('profiles')
        .insert([newProfile])
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error creating profile:', error)
        throw error
      }
      console.log('✅ Profile created successfully:', data)
      return data
    }
  } catch (error) {
    console.error('💥 Fatal error in createOrUpdateProfile:', error)
    throw error
  }
}

export async function getSimpleProfile(userId: string, email?: string): Promise<SimpleProfile | null> {
  console.log('🔍 Getting profile for user:', { userId, email })
  
  // Handle test users
  if (userId === 'test-user-id' && email) {
    console.log('🧪 Using test user data')
    const testUsers = {
      'student@gmail.com': {
        id: 'test-profile-1',
        user_id: 'test-user-id',
        email: 'student@gmail.com',
        full_name: 'John Student',
        role: 'student' as const,
        phone_number: '+1234567890',
        student_id: 'STU001',
        university: 'Indian Institute of Technology Delhi',
        course: 'Computer Science Engineering',
        graduation_year: 2025,
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        linkedin_url: 'https://linkedin.com/in/johnstudent',
        github_url: 'https://github.com/johnstudent',
        portfolio_url: 'https://johnstudent.dev',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      'employee@gmail.com': {
        id: 'test-profile-2',
        user_id: 'test-user-id',
        email: 'employee@gmail.com',
        full_name: 'Sarah Employee',
        role: 'employee' as const,
        phone_number: '+1234567891',
        employee_id: 'EMP001',
        company_name: 'Google Inc.',
        job_title: 'Senior Software Engineer',
        experience_years: 5,
        skills: ['JavaScript', 'React', 'Go', 'Kubernetes'],
        linkedin_url: 'https://linkedin.com/in/sarahemployee',
        github_url: 'https://github.com/sarahemployee',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      'tpo@gmail.com': {
        id: 'test-profile-3',
        user_id: 'test-user-id',
        email: 'tpo@gmail.com',
        full_name: 'Microsoft Corporation',
        role: 'tpo' as const,
        phone_number: '+1-425-882-8080',
        officer_id: 'TPO001',
        company_name: 'Microsoft Corporation',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
    
    const testProfile = testUsers[email.toLowerCase() as keyof typeof testUsers] || null
    console.log('✅ Test user profile:', testProfile)
    return testProfile
  }
  
  // Get profile from database
  try {
    console.log('🗄️ Fetching from database...')
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle() // Use maybeSingle to avoid error when no rows found
    
    console.log('📊 Database query result:', { data, error })
    
    if (error) {
      console.error('❌ Error fetching profile:', error)
      return null
    }
    
    console.log('✅ Profile fetched successfully:', data)
    return data
  } catch (error) {
    console.error('💥 Fatal error in getSimpleProfile:', error)
    return null
  }
}