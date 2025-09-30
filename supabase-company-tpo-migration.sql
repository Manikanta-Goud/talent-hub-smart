-- =============================================================================
-- UPDATED SCHEMA FOR COMPANY-FOCUSED TPO OFFICERS
-- =============================================================================
-- This migration updates the TPO officers table to focus on companies
-- instead of universities, as TPO officers represent companies/institutions

-- First, let's update the existing tpo_officers table structure
ALTER TABLE tpo_officers 
DROP COLUMN IF EXISTS university,
DROP COLUMN IF EXISTS department,
ADD COLUMN IF NOT EXISTS company_name TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS global_ranking TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS company_type TEXT CHECK (company_type IN ('startup', 'mnc', 'public', 'private', 'nonprofit', 'educational', 'government')) DEFAULT 'private',
ADD COLUMN IF NOT EXISTS industry_type TEXT CHECK (industry_type IN ('technology', 'finance', 'healthcare', 'education', 'manufacturing', 'consulting', 'retail', 'automotive', 'telecommunications', 'other')) DEFAULT 'technology',
ADD COLUMN IF NOT EXISTS company_website TEXT,
DROP COLUMN IF EXISTS students_managed_count,
DROP COLUMN IF EXISTS companies_coordinated,
ADD COLUMN IF NOT EXISTS employees_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS opportunities_posted INTEGER DEFAULT 0;

-- Update the RLS policies to reflect the new structure
DROP POLICY IF EXISTS "TPO officers can view their own profile" ON tpo_officers;
DROP POLICY IF EXISTS "TPO officers can update their own profile" ON tpo_officers;

-- Create updated RLS policies
CREATE POLICY "TPO officers can view their own profile"
ON tpo_officers FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "TPO officers can update their own profile"
ON tpo_officers FOR UPDATE
USING (auth.uid() = id);

-- Create policy for inserting TPO officer profiles
CREATE POLICY "Users can insert their own TPO officer profile"
ON tpo_officers FOR INSERT
WITH CHECK (auth.uid() = id);

-- Update the tpo_profiles view to reflect new columns
DROP VIEW IF EXISTS tpo_profiles;

CREATE VIEW tpo_profiles AS
SELECT 
  bu.id,
  bu.email,
  bu.full_name,
  bu.role,
  bu.phone_number,
  bu.created_at,
  bu.updated_at,
  tpo.officer_id,
  tpo.company_name,
  tpo.global_ranking,
  tpo.company_type,
  tpo.industry_type,
  tpo.company_website,
  tpo.position,
  tpo.access_level,
  tpo.managed_departments,
  tpo.years_in_position,
  tpo.office_location,
  tpo.responsibilities,
  tpo.achievements,
  tpo.employees_count,
  tpo.opportunities_posted,
  tpo.hiring_statistics,
  tpo.specializations,
  tpo.emergency_contact,
  tpo.backup_officer_id,
  tpo.is_active
FROM base_users bu
JOIN tpo_officers tpo ON bu.id = tpo.id
WHERE bu.role = 'tpo';

-- Grant permissions on the updated view
GRANT SELECT ON tpo_profiles TO authenticated;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tpo_officers_company_name ON tpo_officers(company_name);
CREATE INDEX IF NOT EXISTS idx_tpo_officers_industry_type ON tpo_officers(industry_type);
CREATE INDEX IF NOT EXISTS idx_tpo_officers_company_type ON tpo_officers(company_type);
CREATE INDEX IF NOT EXISTS idx_tpo_officers_is_active ON tpo_officers(is_active);

-- Add comments for documentation
COMMENT ON COLUMN tpo_officers.company_name IS 'Name of the company or institution';
COMMENT ON COLUMN tpo_officers.global_ranking IS 'Global ranking or position of the company';
COMMENT ON COLUMN tpo_officers.company_type IS 'Type of organization (startup, MNC, public, private, etc.)';
COMMENT ON COLUMN tpo_officers.industry_type IS 'Industry sector the company operates in';
COMMENT ON COLUMN tpo_officers.company_website IS 'Official website of the company';
COMMENT ON COLUMN tpo_officers.employees_count IS 'Number of employees in the company';
COMMENT ON COLUMN tpo_officers.opportunities_posted IS 'Number of job/internship opportunities posted';