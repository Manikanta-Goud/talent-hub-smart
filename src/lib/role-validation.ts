// =============================================================================
// ROLE VALIDATION UTILITIES
// =============================================================================
// Helper functions for role-based authentication and validation

export interface RoleInfo {
  name: string
  description: string
  color: string
  badge: string
  features: string[]
}

export const roleDefinitions: Record<string, RoleInfo> = {
  student: {
    name: 'Student',
    description: 'Discover hackathons, internships, and connect with mentors',
    color: 'blue',
    badge: 'Opportunity Seeker',
    features: ['Hackathons', 'Internships', 'Mentorship']
  },
  employee: {
    name: 'Employee',
    description: 'Mentor students and explore new job opportunities',
    color: 'green',
    badge: 'Career Growth & Mentoring',
    features: ['Job Search', 'Student Mentoring', 'Networking']
  },
  tpo: {
    name: 'TPO Portal',
    description: 'For companies and institutions to post opportunities',
    color: 'purple',
    badge: 'Companies & Institutions',
    features: ['Post Opportunities', 'Talent Access', 'Event Management']
  }
}

export function getRoleDisplayName(role: string): string {
  return roleDefinitions[role]?.name || role
}

export function getRoleDescription(role: string): string {
  return roleDefinitions[role]?.description || ''
}

export function formatEmailExistsError(existingRole: string, attemptedRole: string): string {
  const existingRoleName = getRoleDisplayName(existingRole)
  const attemptedRoleName = getRoleDisplayName(attemptedRole)
  
  return `This email is already registered as ${existingRoleName}. You cannot register the same email for ${attemptedRoleName}. Please use a different email or login with your existing ${existingRoleName} account.`
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateRegistrationData(
  email: string, 
  password: string, 
  fullName: string,
  role: string
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!email || !isValidEmail(email)) {
    errors.push('Please enter a valid email address')
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (!fullName || fullName.trim().length < 2) {
    errors.push('Please enter your full name')
  }

  if (!role || !['student', 'employee', 'tpo'].includes(role)) {
    errors.push('Please select a valid role')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}