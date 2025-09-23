import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface UserProfile {
  id: string
  email: string
  full_name: string
  student_id?: string
  university: string
  course: string
  graduation_year: number
  skills: string[]
  resume_url?: string
  phone_number?: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  created_at: string
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string
  user_metadata: any
  role: 'student' | 'tpo' | 'admin'
}