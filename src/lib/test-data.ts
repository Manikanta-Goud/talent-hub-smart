// Test data for development
export const TEST_USERS = {
  'student@gmail.com': {
    role: 'student',
    exists: true
  },
  'employee@gmail.com': {
    role: 'employee', 
    exists: true
  },
  'tpo@gmail.com': {
    role: 'tpo',
    exists: true
  }
}

export const isTestUser = (email: string): boolean => {
  return email in TEST_USERS
}

export const getTestUserRole = (email: string): string | undefined => {
  return TEST_USERS[email as keyof typeof TEST_USERS]?.role
}