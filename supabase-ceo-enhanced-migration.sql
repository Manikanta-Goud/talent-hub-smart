-- =============================================================================
-- ENHANCED TPO OFFICERS TABLE FOR COMPANY CEO PROFILES WITH FULL PERMISSIONS
-- =============================================================================
-- This migration enhances the TPO officers table to include CEO details
-- and full platform permissions for company representatives

-- Add CEO/Executive details columns
ALTER TABLE tpo_officers 
ADD COLUMN IF NOT EXISTS ceo_name TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS ceo_email TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS ceo_linkedin TEXT,
ADD COLUMN IF NOT EXISTS executive_position TEXT DEFAULT 'ceo',
ADD COLUMN IF NOT EXISTS years_of_experience INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS education_background TEXT,
ADD COLUMN IF NOT EXISTS founded_year INTEGER,
ADD COLUMN IF NOT EXISTS headquarters_location TEXT;

-- Add company permission columns
ALTER TABLE tpo_officers 
ADD COLUMN IF NOT EXISTS can_access_students BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS can_access_employees BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS can_post_opportunities BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS can_conduct_hackathons BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS can_view_analytics BOOLEAN DEFAULT true;

-- Add additional tracking columns
ALTER TABLE tpo_officers 
ADD COLUMN IF NOT EXISTS students_hired INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS employees_recruited INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS annual_revenue TEXT,
ADD COLUMN IF NOT EXISTS company_achievements TEXT[],
ADD COLUMN IF NOT EXISTS certifications TEXT[];

-- Update access_level enum to include full_admin
ALTER TYPE access_level_enum ADD VALUE IF NOT EXISTS 'full_admin';

-- Update existing TPO officers to have full admin access
UPDATE tpo_officers 
SET 
  access_level = 'full_admin',
  can_access_students = true,
  can_access_employees = true,
  can_post_opportunities = true,
  can_conduct_hackathons = true,
  can_view_analytics = true
WHERE access_level != 'full_admin';

-- Update the tpo_profiles view to include new columns
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
  
  -- CEO Details
  tpo.ceo_name,
  tpo.ceo_email,
  tpo.ceo_linkedin,
  tpo.executive_position,
  tpo.years_of_experience,
  tpo.education_background,
  tpo.founded_year,
  tpo.headquarters_location,
  
  -- Permissions
  tpo.access_level,
  tpo.can_access_students,
  tpo.can_access_employees,
  tpo.can_post_opportunities,
  tpo.can_conduct_hackathons,
  tpo.can_view_analytics,
  
  -- Company Stats
  tpo.employees_count,
  tpo.opportunities_posted,
  tpo.students_hired,
  tpo.employees_recruited,
  tpo.annual_revenue,
  tpo.hiring_statistics,
  tpo.company_achievements,
  tpo.certifications,
  
  -- Legacy fields
  tpo.position,
  tpo.managed_departments,
  tpo.years_in_position,
  tpo.office_location,
  tpo.responsibilities,
  tpo.achievements,
  tpo.specializations,
  tpo.emergency_contact,
  tpo.backup_officer_id,
  tpo.is_active
FROM base_users bu
JOIN tpo_officers tpo ON bu.id = tpo.id
WHERE bu.role = 'tpo';

-- Grant permissions on the updated view
GRANT SELECT ON tpo_profiles TO authenticated;

-- Add indexes for better query performance on new columns
CREATE INDEX IF NOT EXISTS idx_tpo_officers_ceo_email ON tpo_officers(ceo_email);
CREATE INDEX IF NOT EXISTS idx_tpo_officers_executive_position ON tpo_officers(executive_position);
CREATE INDEX IF NOT EXISTS idx_tpo_officers_can_access_students ON tpo_officers(can_access_students);
CREATE INDEX IF NOT EXISTS idx_tpo_officers_can_access_employees ON tpo_officers(can_access_employees);
CREATE INDEX IF NOT EXISTS idx_tpo_officers_can_post_opportunities ON tpo_officers(can_post_opportunities);

-- Add constraints for data integrity
ALTER TABLE tpo_officers 
ADD CONSTRAINT chk_ceo_email_format CHECK (ceo_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
ADD CONSTRAINT chk_years_experience_positive CHECK (years_of_experience >= 0 AND years_of_experience <= 60),
ADD CONSTRAINT chk_founded_year_reasonable CHECK (founded_year IS NULL OR (founded_year >= 1800 AND founded_year <= EXTRACT(YEAR FROM CURRENT_DATE)));

-- Add comments for documentation
COMMENT ON COLUMN tpo_officers.ceo_name IS 'Full name of the company CEO or executive';
COMMENT ON COLUMN tpo_officers.ceo_email IS 'Official email address of the CEO';
COMMENT ON COLUMN tpo_officers.ceo_linkedin IS 'LinkedIn profile URL of the CEO';
COMMENT ON COLUMN tpo_officers.executive_position IS 'Executive position (CEO, CTO, CFO, etc.)';
COMMENT ON COLUMN tpo_officers.years_of_experience IS 'Years of professional experience';
COMMENT ON COLUMN tpo_officers.education_background IS 'Educational qualifications and background';
COMMENT ON COLUMN tpo_officers.founded_year IS 'Year the company was founded';
COMMENT ON COLUMN tpo_officers.headquarters_location IS 'Primary headquarters location';
COMMENT ON COLUMN tpo_officers.can_access_students IS 'Permission to access student database';
COMMENT ON COLUMN tpo_officers.can_access_employees IS 'Permission to access employee database';
COMMENT ON COLUMN tpo_officers.can_post_opportunities IS 'Permission to post job/internship opportunities';
COMMENT ON COLUMN tpo_officers.can_conduct_hackathons IS 'Permission to organize and conduct hackathons';
COMMENT ON COLUMN tpo_officers.can_view_analytics IS 'Permission to access platform analytics and reports';
COMMENT ON COLUMN tpo_officers.students_hired IS 'Number of students successfully hired';
COMMENT ON COLUMN tpo_officers.employees_recruited IS 'Number of employees successfully recruited';

-- Create function to automatically set full permissions for new TPO officers
CREATE OR REPLACE FUNCTION set_tpo_full_permissions()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure all new TPO officers have full admin access and all permissions
  IF NEW.role = 'tpo' THEN
    NEW.access_level := 'full_admin';
    NEW.can_access_students := true;
    NEW.can_access_employees := true;
    NEW.can_post_opportunities := true;
    NEW.can_conduct_hackathons := true;
    NEW.can_view_analytics := true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically apply full permissions
DROP TRIGGER IF EXISTS tpo_full_permissions_trigger ON tpo_officers;
CREATE TRIGGER tpo_full_permissions_trigger
  BEFORE INSERT OR UPDATE ON tpo_officers
  FOR EACH ROW
  EXECUTE FUNCTION set_tpo_full_permissions();