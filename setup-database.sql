-- =============================================================================
-- PROFILES TABLE SETUP FOR REAL USER DATA STORAGE
-- =============================================================================
-- This script creates the profiles table that will store all user profile data
-- Run this script in your Supabase SQL Editor

-- Drop existing table if you want to recreate it (CAUTION: This will delete all data!)
-- DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create the profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'employee', 'tpo')),
    phone_number TEXT,
    
    -- Student fields
    student_id TEXT,
    university TEXT,
    course TEXT,
    graduation_year INTEGER,
    
    -- Employee fields
    employee_id TEXT,
    company_name TEXT,
    job_title TEXT,
    experience_years INTEGER,
    
    -- TPO fields
    officer_id TEXT,
    
    -- Common fields
    skills TEXT[] DEFAULT '{}', -- Array of skill strings
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create RLS policies
-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Insert some test data (optional)
INSERT INTO public.profiles (
    user_id, 
    email, 
    full_name, 
    role, 
    phone_number, 
    student_id, 
    university, 
    course, 
    graduation_year, 
    skills
) VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'test.student@example.com',
    'Test Student',
    'student',
    '+1234567890',
    'STU001',
    'Test University',
    'Computer Science',
    2025,
    ARRAY['JavaScript', 'React', 'Python']
) ON CONFLICT (user_id) DO NOTHING;

-- Verify the table was created successfully
SELECT 'Profiles table setup completed successfully!' as status;
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;