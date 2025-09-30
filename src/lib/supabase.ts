import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// =============================================================================
// DATABASE TYPES FOR THREE-ROLE SCHEMA
// =============================================================================

// Base user interface (common fields)
export interface BaseUser {
  id: string
  email: string
  full_name: string
  role: 'student' | 'employee' | 'tpo'
  phone_number?: string
  created_at: string
  updated_at: string
}

// Student-specific interface
export interface Student extends BaseUser {
  role: 'student'
  student_id: string
  university: string
  course: string
  graduation_year: number
  current_year?: number
  cgpa?: number
  skills: string[]
  interests?: string[]
  resume_url?: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  placement_status?: 'seeking' | 'placed' | 'not_interested'
  preferred_companies?: string[]
  expected_salary_min?: number
  expected_salary_max?: number
  location_preferences?: string[]
  internship_experience?: string
  projects_count?: number
  certifications?: string[]
}

// Employee-specific interface
export interface Employee extends BaseUser {
  role: 'employee'
  employee_id: string
  company_name: string
  job_title: string
  department?: string
  experience_years: number
  current_salary_range?: string
  work_location?: string
  work_type?: 'office' | 'remote' | 'hybrid'
  skills: string[]
  expertise_areas?: string[]
  mentorship_available?: boolean
  mentorship_capacity?: number
  industry?: string
  company_size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  bio?: string
  achievements?: string[]
  education_background?: string
  previous_companies?: string[]
  willing_to_hire?: boolean
  preferred_student_skills?: string[]
  available_time_slots?: string[]
}

// TPO Officer-specific interface (Company/Institution CEO Profile)
export interface TPOOfficer extends BaseUser {
  role: 'tpo'
  officer_id: string
  company_name: string
  global_ranking: string
  company_type: 'startup' | 'mnc' | 'public' | 'private' | 'nonprofit' | 'educational' | 'government'
  industry_type: 'technology' | 'finance' | 'healthcare' | 'education' | 'manufacturing' | 'consulting' | 'retail' | 'automotive' | 'telecommunications' | 'other'
  company_website?: string
  
  // CEO/Executive Details
  ceo_name: string
  ceo_email: string
  ceo_linkedin?: string
  executive_position: string
  years_of_experience: number
  education_background?: string
  previous_companies?: string[]
  
  // Company Authority & Permissions
  access_level: 'full_admin' // Always full admin for companies
  can_access_students: boolean // Full access to student database
  can_access_employees: boolean // Full access to employee database
  can_post_opportunities: boolean // Can post jobs/internships
  can_conduct_hackathons: boolean // Can organize hackathons
  can_view_analytics: boolean // Access to platform analytics
  
  // Company Details
  headquarters_location?: string
  founded_year?: number
  employees_count?: number
  annual_revenue?: string
  opportunities_posted?: number
  students_hired?: number
  employees_recruited?: number
  hiring_statistics?: any
  company_achievements?: string[]
  certifications?: string[]
  is_active?: boolean
}

// Union type for all user profiles
export type UserProfile = Student | Employee | TPOOfficer

// Auth user interface
export interface AuthUser {
  id: string
  email: string
  user_metadata: any
  role: 'student' | 'employee' | 'tpo'
}

// Database table names
export const DB_TABLES = {
  BASE_USERS: 'base_users',
  STUDENTS: 'students', 
  EMPLOYEES: 'employees',
  TPO_OFFICERS: 'tpo_officers'
} as const

// View names for complete profiles
export const DB_VIEWS = {
  STUDENT_PROFILES: 'student_profiles',
  EMPLOYEE_PROFILES: 'employee_profiles', 
  TPO_PROFILES: 'tpo_profiles'
} as const