// =============================================================================
// DATABASE SERVICE FOR THREE-ROLE SYSTEM
// =============================================================================
// This service handles database operations for the three separate role tables

import { supabase } from './supabase'
import type { 
  BaseUser, 
  Student, 
  Employee, 
  TPOOfficer, 
  UserProfile,
  DB_TABLES,
  DB_VIEWS
} from './supabase'

// =============================================================================
// USER REGISTRATION FUNCTIONS
// =============================================================================

export async function createBaseUser(userData: {
  id: string
  email: string
  full_name: string
  role: 'student' | 'employee' | 'tpo'
  phone_number?: string
}) {
  const { data, error } = await supabase
    .from('base_users')
    .insert([userData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function createStudentProfile(studentData: Omit<Student, keyof BaseUser>) {
  const { data, error } = await supabase
    .from('students')
    .insert([studentData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function createEmployeeProfile(employeeData: Omit<Employee, keyof BaseUser>) {
  const { data, error } = await supabase
    .from('employees')
    .insert([employeeData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function createTPOProfile(tpoData: Omit<TPOOfficer, keyof BaseUser>) {
  const { data, error } = await supabase
    .from('tpo_officers')
    .insert([tpoData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// =============================================================================
// COMPLETE REGISTRATION FUNCTION
// =============================================================================

export async function registerUserWithRole(
  baseUserData: {
    id: string
    email: string
    full_name: string
    role: 'student' | 'employee' | 'tpo'
    phone_number?: string
  },
  roleSpecificData: any
): Promise<UserProfile> {
  
  // Create base user first
  await createBaseUser(baseUserData)
  
  // Create role-specific profile
  switch (baseUserData.role) {
    case 'student':
      await createStudentProfile({
        id: baseUserData.id,
        ...roleSpecificData
      })
      break
    
    case 'employee':
      await createEmployeeProfile({
        id: baseUserData.id,
        ...roleSpecificData
      })
      break
    
    case 'tpo':
      await createTPOProfile({
        id: baseUserData.id,
        ...roleSpecificData
      })
      break
    
    default:
      throw new Error(`Invalid role: ${baseUserData.role}`)
  }
  
  // Return complete profile
  return getUserProfile(baseUserData.id)
}

// =============================================================================
// PROFILE RETRIEVAL FUNCTIONS
// =============================================================================

export async function getUserProfile(userId: string, email?: string): Promise<UserProfile> {
  // Handle test users
  if (userId === 'test-user-id') {
    if (email === 'student@gmail.com') {
      return {
        id: 'test-user-id',
        email: 'student@gmail.com',
        full_name: 'John Student',
        role: 'student',
        phone_number: '+1234567890',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        student_id: 'STU001',
        university: 'Indian Institute of Technology',
        course: 'Computer Science Engineering',
        graduation_year: 2025,
        current_year: 4,
        cgpa: 8.5,
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
        interests: ['Web Development', 'AI/ML', 'Data Science'],
        placement_status: 'seeking',
        linkedin_url: 'https://linkedin.com/in/johnstudent',
        github_url: 'https://github.com/johnstudent',
        portfolio_url: 'https://johnstudent.dev'
      } as Student
    }
    
    if (email === 'employee@gmail.com' || email === 'employees@gmail.com') {
      return {
        id: 'test-user-id',
        email: email,
        full_name: 'Sarah Employee',
        role: 'employee',
        phone_number: '+1234567891',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        employee_id: 'EMP001',
        company_name: 'Google Inc.',
        job_title: 'Senior Software Engineer',
        department: 'Engineering',
        experience_years: 5,
        current_salary_range: '80-120k',
        work_location: 'Mountain View, CA',
        work_type: 'hybrid',
        skills: ['JavaScript', 'React', 'Go', 'Kubernetes', 'System Design'],
        expertise_areas: ['Frontend Development', 'Distributed Systems'],
        mentorship_available: true,
        mentorship_capacity: 3,
        industry: 'technology',
        company_size: 'enterprise',
        linkedin_url: 'https://linkedin.com/in/sarahemployee',
        github_url: 'https://github.com/sarahemployee'
      } as Employee
    }
    
    if (email === 'tpo@gmail.com') {
      return {
        id: 'test-user-id',
        email: 'tpo@gmail.com',
        full_name: 'Microsoft Corporation',
        role: 'tpo',
        phone_number: '+1 (425) 882-8080',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        officer_id: 'TPO001',
        company_name: 'Microsoft Corporation',
        global_ranking: 'Fortune 21 - Global Technology Leader',
        company_type: 'mnc',
        industry_type: 'technology',
        company_website: 'https://www.microsoft.com',
        ceo_name: 'Satya Nadella',
        ceo_email: 'satya.nadella@microsoft.com',
        ceo_linkedin: 'https://linkedin.com/in/satyanadella',
        executive_position: 'ceo',
        years_of_experience: 30,
        education_background: 'MS Computer Science - University of Wisconsin, MBA - University of Chicago',
        access_level: 'full_admin',
        can_access_students: true,
        can_access_employees: true,
        can_post_opportunities: true,
        can_conduct_hackathons: true,
        can_view_analytics: true,
        headquarters_location: 'Redmond, Washington, USA',
        founded_year: 1975,
        employees_count: 220000,
        opportunities_posted: 156,
        students_hired: 89,
        employees_recruited: 45,
        is_active: true
      } as TPOOfficer
    }
    
    // Default fallback
    return {
      id: 'test-user-id',
      email: 'student@gmail.com',
      full_name: 'Test User',
      role: 'student',
      phone_number: '+1234567890',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      student_id: 'STU001',
      university: 'Test University',
      course: 'Computer Science Engineering',
      graduation_year: 2025,
      current_year: 4,
      cgpa: 8.5,
      skills: ['JavaScript', 'React'],
      placement_status: 'seeking'
    } as Student
  }
  
  // First get the base user to determine role
  const { data: baseUser, error: baseError } = await supabase
    .from('base_users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (baseError) throw baseError
  
  // Get complete profile based on role
  switch (baseUser.role) {
    case 'student':
      const { data: studentProfile, error: studentError } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (studentError) throw studentError
      return studentProfile as Student
    
    case 'employee':
      const { data: employeeProfile, error: employeeError } = await supabase
        .from('employee_profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (employeeError) throw employeeError
      return employeeProfile as Employee
    
    case 'tpo':
      const { data: tpoProfile, error: tpoError } = await supabase
        .from('tpo_profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (tpoError) throw tpoError
      return tpoProfile as TPOOfficer
    
    default:
      throw new Error(`Invalid role: ${baseUser.role}`)
  }
}

// =============================================================================
// PROFILE UPDATE FUNCTIONS
// =============================================================================

export async function updateBaseUser(userId: string, updates: Partial<BaseUser>) {
  const { data, error } = await supabase
    .from('base_users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateStudentProfile(userId: string, updates: Partial<Student>) {
  // Separate base user updates from student-specific updates
  const baseUpdates: Partial<BaseUser> = {}
  const studentUpdates: any = {}
  
  Object.entries(updates).forEach(([key, value]) => {
    if (['full_name', 'phone_number'].includes(key)) {
      (baseUpdates as any)[key] = value
    } else {
      studentUpdates[key] = value
    }
  })
  
  // Update base user if needed
  if (Object.keys(baseUpdates).length > 0) {
    await updateBaseUser(userId, baseUpdates)
  }
  
  // Update student profile
  const { data, error } = await supabase
    .from('students')
    .update(studentUpdates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateEmployeeProfile(userId: string, updates: Partial<Employee>) {
  // Separate base user updates from employee-specific updates
  const baseUpdates: Partial<BaseUser> = {}
  const employeeUpdates: any = {}
  
  Object.entries(updates).forEach(([key, value]) => {
    if (['full_name', 'phone_number'].includes(key)) {
      (baseUpdates as any)[key] = value
    } else {
      employeeUpdates[key] = value
    }
  })
  
  // Update base user if needed
  if (Object.keys(baseUpdates).length > 0) {
    await updateBaseUser(userId, baseUpdates)
  }
  
  // Update employee profile
  const { data, error } = await supabase
    .from('employees')
    .update(employeeUpdates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateTPOProfile(userId: string, updates: Partial<TPOOfficer>) {
  // Separate base user updates from TPO-specific updates
  const baseUpdates: Partial<BaseUser> = {}
  const tpoUpdates: any = {}
  
  Object.entries(updates).forEach(([key, value]) => {
    if (['full_name', 'phone_number'].includes(key)) {
      (baseUpdates as any)[key] = value
    } else {
      tpoUpdates[key] = value
    }
  })
  
  // Update base user if needed
  if (Object.keys(baseUpdates).length > 0) {
    await updateBaseUser(userId, baseUpdates)
  }
  
  // Update TPO profile
  const { data, error } = await supabase
    .from('tpo_officers')
    .update(tpoUpdates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// =============================================================================
// SEARCH AND FILTER FUNCTIONS
// =============================================================================

export async function getStudentsByUniversity(university: string) {
  const { data, error } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('university', university)
    .eq('placement_status', 'seeking')
  
  if (error) throw error
  return data as Student[]
}

export async function getAvailableMentors() {
  const { data, error } = await supabase
    .from('employee_profiles')
    .select('*')
    .eq('mentorship_available', true)
  
  if (error) throw error
  return data as Employee[]
}

export async function getEmployeesBySkills(skills: string[]) {
  const { data, error } = await supabase
    .from('employee_profiles')
    .select('*')
    .overlaps('skills', skills)
  
  if (error) throw error
  return data as Employee[]
}

export async function getTPOsByCompany(company: string) {
  const { data, error } = await supabase
    .from('tpo_profiles')
    .select('*')
    .eq('company_name', company)
    .eq('is_active', true)
  
  if (error) throw error
  return data as TPOOfficer[]
}

export async function getTPOsByIndustry(industry: string) {
  const { data, error } = await supabase
    .from('tpo_profiles')
    .select('*')
    .eq('industry_type', industry)
    .eq('is_active', true)
  
  if (error) throw error
  return data as TPOOfficer[]
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export async function checkUserExists(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('base_users')
    .select('id')
    .eq('id', userId)
    .single()
  
  return !error && !!data
}

export async function checkEmailExists(email: string): Promise<{
  exists: boolean
  role?: 'student' | 'employee' | 'tpo'
  userId?: string
}> {
  // Check test users first for development
  const testUsers = {
    'student@gmail.com': 'student',
    'employee@gmail.com': 'employee', 
    'tpo@gmail.com': 'tpo'
  }
  
  if (email.toLowerCase() in testUsers) {
    return {
      exists: true,
      role: testUsers[email.toLowerCase() as keyof typeof testUsers] as 'student' | 'employee' | 'tpo',
      userId: 'test-user-id'
    }
  }
  
  const { data, error } = await supabase
    .from('base_users')
    .select('id, email, role')
    .eq('email', email.toLowerCase())
    .single()
  
  if (error) {
    return { exists: false }
  }
  
  return {
    exists: true,
    role: data.role,
    userId: data.id
  }
}

export async function getUserRole(userId: string): Promise<'student' | 'employee' | 'tpo' | null> {
  const { data, error } = await supabase
    .from('base_users')
    .select('role')
    .eq('id', userId)
    .single()
  
  if (error) return null
  return data.role
}

export async function deleteUserProfile(userId: string) {
  // Due to CASCADE constraints, deleting from base_users will automatically
  // delete the role-specific profile as well
  const { error } = await supabase
    .from('base_users')
    .delete()
    .eq('id', userId)
  
  if (error) throw error
  return true
}

// =============================================================================
// STATISTICS FUNCTIONS (for TPO dashboard)
// =============================================================================

export async function getUniversityStatistics(university: string) {
  const [studentsData, placedStudentsData] = await Promise.all([
    supabase.from('students').select('count').eq('university', university),
    supabase.from('students').select('count').eq('university', university).eq('placement_status', 'placed')
  ])
  
  return {
    total_students: studentsData.data?.[0]?.count || 0,
    placed_students: placedStudentsData.data?.[0]?.count || 0,
    placement_rate: studentsData.data?.[0]?.count ? 
      (placedStudentsData.data?.[0]?.count / studentsData.data[0].count * 100) : 0
  }
}

export async function getCompanyStatistics(companyName: string) {
  const [tpoData, opportunitiesData] = await Promise.all([
    supabase.from('tpo_officers').select('count').eq('company_name', companyName).eq('is_active', true),
    supabase.from('tpo_officers').select('opportunities_posted').eq('company_name', companyName).eq('is_active', true)
  ])
  
  const totalOpportunities = opportunitiesData.data?.reduce((sum, tpo) => sum + (tpo.opportunities_posted || 0), 0) || 0
  
  return {
    active_officers: tpoData.data?.[0]?.count || 0,
    opportunities_posted: totalOpportunities,
    company_name: companyName
  }
}