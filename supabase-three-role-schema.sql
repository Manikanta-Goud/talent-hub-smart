-- =============================================================================
-- TALENT HUB SMART - THREE ROLE DATABASE SCHEMA
-- =============================================================================
-- This schema creates separate tables for Students, Employees, and TPO Officers
-- Each role has specific fields and credentials for better organization
-- =============================================================================

-- Step 1: Drop existing tables if they exist (cleanup)
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.students CASCADE;
DROP TABLE IF EXISTS public.employees CASCADE;
DROP TABLE IF EXISTS public.tpo_officers CASCADE;
DROP TABLE IF EXISTS public.base_users CASCADE;

-- =============================================================================
-- BASE USERS TABLE - Common fields for all roles
-- =============================================================================
CREATE TABLE public.base_users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'employee', 'tpo')),
    phone_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- STUDENTS TABLE - Student-specific fields
-- =============================================================================
CREATE TABLE public.students (
    id UUID REFERENCES public.base_users(id) ON DELETE CASCADE PRIMARY KEY,
    student_id TEXT NOT NULL UNIQUE,
    university TEXT NOT NULL,
    course TEXT NOT NULL,
    graduation_year INTEGER NOT NULL,
    current_year INTEGER CHECK (current_year BETWEEN 1 AND 5),
    cgpa DECIMAL(3,2) CHECK (cgpa >= 0 AND cgpa <= 10),
    skills TEXT[] DEFAULT '{}',
    interests TEXT[] DEFAULT '{}',
    resume_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    placement_status TEXT DEFAULT 'seeking' CHECK (placement_status IN ('seeking', 'placed', 'not_interested')),
    preferred_companies TEXT[] DEFAULT '{}',
    expected_salary_min INTEGER,
    expected_salary_max INTEGER,
    location_preferences TEXT[] DEFAULT '{}',
    internship_experience TEXT,
    projects_count INTEGER DEFAULT 0,
    certifications TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- EMPLOYEES TABLE - Employee-specific fields
-- =============================================================================
CREATE TABLE public.employees (
    id UUID REFERENCES public.base_users(id) ON DELETE CASCADE PRIMARY KEY,
    employee_id TEXT NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    department TEXT,
    experience_years INTEGER NOT NULL CHECK (experience_years >= 0),
    current_salary_range TEXT CHECK (current_salary_range IN ('0-5L', '5-10L', '10-15L', '15-25L', '25L+')),
    work_location TEXT,
    work_type TEXT DEFAULT 'office' CHECK (work_type IN ('office', 'remote', 'hybrid')),
    skills TEXT[] DEFAULT '{}',
    expertise_areas TEXT[] DEFAULT '{}',
    mentorship_available BOOLEAN DEFAULT true,
    mentorship_capacity INTEGER DEFAULT 5,
    industry TEXT,
    company_size TEXT CHECK (company_size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    bio TEXT,
    achievements TEXT[] DEFAULT '{}',
    education_background TEXT,
    previous_companies TEXT[] DEFAULT '{}',
    willing_to_hire BOOLEAN DEFAULT false,
    preferred_student_skills TEXT[] DEFAULT '{}',
    available_time_slots TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TPO OFFICERS TABLE - TPO/Admin-specific fields
-- =============================================================================
CREATE TABLE public.tpo_officers (
    id UUID REFERENCES public.base_users(id) ON DELETE CASCADE PRIMARY KEY,
    officer_id TEXT NOT NULL UNIQUE,
    university TEXT NOT NULL,
    department TEXT,
    position TEXT NOT NULL, -- 'tpo', 'assistant_tpo', 'placement_coordinator', 'admin'
    access_level TEXT DEFAULT 'standard' CHECK (access_level IN ('standard', 'elevated', 'admin', 'super_admin')),
    managed_departments TEXT[] DEFAULT '{}',
    years_in_position INTEGER DEFAULT 0,
    contact_hours TEXT, -- e.g., "9 AM - 5 PM"
    office_location TEXT,
    responsibilities TEXT[] DEFAULT '{}',
    linkedin_url TEXT,
    achievements TEXT[] DEFAULT '{}',
    students_managed_count INTEGER DEFAULT 0,
    companies_coordinated TEXT[] DEFAULT '{}',
    placement_statistics JSONB, -- Store yearly placement stats
    specializations TEXT[] DEFAULT '{}', -- Areas of expertise in placement
    emergency_contact TEXT,
    backup_officer_id UUID REFERENCES public.tpo_officers(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES for better performance
-- =============================================================================
-- Base Users Indexes
CREATE INDEX idx_base_users_role ON public.base_users(role);
CREATE INDEX idx_base_users_email ON public.base_users(email);

-- Students Indexes
CREATE INDEX idx_students_university ON public.students(university);
CREATE INDEX idx_students_course ON public.students(course);
CREATE INDEX idx_students_graduation_year ON public.students(graduation_year);
CREATE INDEX idx_students_placement_status ON public.students(placement_status);
CREATE INDEX idx_students_skills ON public.students USING GIN(skills);

-- Employees Indexes
CREATE INDEX idx_employees_company ON public.employees(company_name);
CREATE INDEX idx_employees_job_title ON public.employees(job_title);
CREATE INDEX idx_employees_experience ON public.employees(experience_years);
CREATE INDEX idx_employees_mentorship ON public.employees(mentorship_available);
CREATE INDEX idx_employees_skills ON public.employees USING GIN(skills);
CREATE INDEX idx_employees_expertise ON public.employees USING GIN(expertise_areas);

-- TPO Officers Indexes
CREATE INDEX idx_tpo_university ON public.tpo_officers(university);
CREATE INDEX idx_tpo_position ON public.tpo_officers(position);
CREATE INDEX idx_tpo_access_level ON public.tpo_officers(access_level);
CREATE INDEX idx_tpo_active ON public.tpo_officers(is_active);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
-- Enable RLS on all tables
ALTER TABLE public.base_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tpo_officers ENABLE ROW LEVEL SECURITY;

-- Base Users Policies
CREATE POLICY "Users can view their own base profile" ON public.base_users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own base profile" ON public.base_users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own base profile" ON public.base_users
    FOR UPDATE USING (auth.uid() = id);

-- Students Policies
CREATE POLICY "Students can view their own profile" ON public.students
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Students can insert their own profile" ON public.students
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Students can update their own profile" ON public.students
    FOR UPDATE USING (auth.uid() = id);

-- Allow TPO officers to view students in their university
CREATE POLICY "TPO can view students in their university" ON public.students
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.tpo_officers tpo 
            JOIN public.base_users bu ON tpo.id = bu.id 
            WHERE bu.id = auth.uid() 
            AND tpo.university = students.university
            AND tpo.is_active = true
        )
    );

-- Employees Policies
CREATE POLICY "Employees can view their own profile" ON public.employees
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Employees can insert their own profile" ON public.employees
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Employees can update their own profile" ON public.employees
    FOR UPDATE USING (auth.uid() = id);

-- Allow students to view employees for mentorship
CREATE POLICY "Students can view employees for mentorship" ON public.employees
    FOR SELECT USING (employees.mentorship_available = true);

-- TPO Officers Policies
CREATE POLICY "TPO can view their own profile" ON public.tpo_officers
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "TPO can insert their own profile" ON public.tpo_officers
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "TPO can update their own profile" ON public.tpo_officers
    FOR UPDATE USING (auth.uid() = id);

-- Allow super admins to view all TPO officers
CREATE POLICY "Super admin can view all TPO officers" ON public.tpo_officers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.tpo_officers tpo 
            WHERE tpo.id = auth.uid() 
            AND tpo.access_level = 'super_admin'
            AND tpo.is_active = true
        )
    );

-- =============================================================================
-- FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    -- This will be called when a user registers
    -- The actual role-specific profile creation will be handled by the application
    RETURN new;
END;
$$;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Create update triggers for all tables
CREATE TRIGGER update_base_users_updated_at BEFORE UPDATE ON public.base_users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tpo_officers_updated_at BEFORE UPDATE ON public.tpo_officers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- VIEWS for easier data access
-- =============================================================================

-- View for complete student profiles
CREATE VIEW public.student_profiles AS
SELECT 
    bu.id,
    bu.email,
    bu.full_name,
    bu.phone_number,
    bu.role,
    s.student_id,
    s.university,
    s.course,
    s.graduation_year,
    s.current_year,
    s.cgpa,
    s.skills,
    s.interests,
    s.resume_url,
    s.linkedin_url,
    s.github_url,
    s.portfolio_url,
    s.placement_status,
    s.preferred_companies,
    s.expected_salary_min,
    s.expected_salary_max,
    s.location_preferences,
    bu.created_at,
    s.updated_at
FROM public.base_users bu
JOIN public.students s ON bu.id = s.id
WHERE bu.role = 'student';

-- View for complete employee profiles
CREATE VIEW public.employee_profiles AS
SELECT 
    bu.id,
    bu.email,
    bu.full_name,
    bu.phone_number,
    bu.role,
    e.employee_id,
    e.company_name,
    e.job_title,
    e.department,
    e.experience_years,
    e.current_salary_range,
    e.work_location,
    e.work_type,
    e.skills,
    e.expertise_areas,
    e.mentorship_available,
    e.mentorship_capacity,
    e.industry,
    e.company_size,
    e.linkedin_url,
    e.github_url,
    e.portfolio_url,
    e.bio,
    e.willing_to_hire,
    e.preferred_student_skills,
    bu.created_at,
    e.updated_at
FROM public.base_users bu
JOIN public.employees e ON bu.id = e.id
WHERE bu.role = 'employee';

-- View for complete TPO profiles
CREATE VIEW public.tpo_profiles AS
SELECT 
    bu.id,
    bu.email,
    bu.full_name,
    bu.phone_number,
    bu.role,
    t.officer_id,
    t.university,
    t.department,
    t.position,
    t.access_level,
    t.managed_departments,
    t.years_in_position,
    t.contact_hours,
    t.office_location,
    t.responsibilities,
    t.linkedin_url,
    t.students_managed_count,
    t.companies_coordinated,
    t.is_active,
    bu.created_at,
    t.updated_at
FROM public.base_users bu
JOIN public.tpo_officers t ON bu.id = t.id
WHERE bu.role = 'tpo';

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- =============================================================================
-- SAMPLE DATA INSERTION (Optional - for testing)
-- =============================================================================

-- Note: Uncomment below if you want to insert sample data for testing
/*
-- Sample Student
INSERT INTO public.base_users (id, email, full_name, role, phone_number) 
VALUES ('550e8400-e29b-41d4-a716-446655440001', 'student@example.com', 'John Student', 'student', '+1234567890');

INSERT INTO public.students (id, student_id, university, course, graduation_year, current_year, skills) 
VALUES ('550e8400-e29b-41d4-a716-446655440001', 'STU001', 'XYZ University', 'Computer Science', 2025, 4, ARRAY['JavaScript', 'React', 'Python']);

-- Sample Employee
INSERT INTO public.base_users (id, email, full_name, role, phone_number) 
VALUES ('550e8400-e29b-41d4-a716-446655440002', 'employee@example.com', 'Jane Employee', 'employee', '+1234567891');

INSERT INTO public.employees (id, employee_id, company_name, job_title, experience_years, skills, mentorship_available) 
VALUES ('550e8400-e29b-41d4-a716-446655440002', 'EMP001', 'Tech Corp', 'Senior Developer', 5, ARRAY['JavaScript', 'React', 'Node.js'], true);

-- Sample TPO Officer
INSERT INTO public.base_users (id, email, full_name, role, phone_number) 
VALUES ('550e8400-e29b-41d4-a716-446655440003', 'tpo@example.com', 'Admin Officer', 'tpo', '+1234567892');

INSERT INTO public.tpo_officers (id, officer_id, university, position, access_level, is_active) 
VALUES ('550e8400-e29b-41d4-a716-446655440003', 'TPO001', 'XYZ University', 'tpo', 'admin', true);
*/

-- =============================================================================
-- END OF SCHEMA
-- =============================================================================