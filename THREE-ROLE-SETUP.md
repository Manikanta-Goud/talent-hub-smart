# 🚀 TALENT HUB SMART - THREE ROLE SYSTEM SETUP GUIDE

## 📋 Overview

This project now implements a **three-table database architecture** that properly separates data for:
- **Students** - Academic profiles with placement tracking
- **Employees** - Professional profiles with mentorship capabilities  
- **TPO Officers/Admins** - Administrative profiles with university management

## 🗄️ Database Architecture

### 📊 Table Structure

```
📦 Database Schema
├── 🏗️ base_users (Common fields for all roles)
│   ├── id, email, full_name, role, phone_number
│   └── created_at, updated_at
│
├── 🎓 students (Student-specific fields)
│   ├── student_id, university, course, graduation_year
│   ├── skills, projects, placement_status, resume_url
│   └── LinkedIn, GitHub, portfolio URLs
│
├── 💼 employees (Employee-specific fields)
│   ├── employee_id, company_name, job_title, experience_years
│   ├── mentorship_available, expertise_areas, salary_range
│   └── Professional background & availability
│
└── 👥 tpo_officers (Admin-specific fields)
    ├── officer_id, university, position, access_level
    ├── managed_departments, responsibilities
    └── Placement statistics & coordination data
```

### 🔗 Key Benefits

✅ **Proper Data Separation** - Each role has dedicated fields
✅ **Scalable Architecture** - Easy to add new role-specific features
✅ **Efficient Queries** - Role-based data retrieval
✅ **Security** - Row-level security policies per role
✅ **Future-Proof** - No schema conflicts when adding features

## 🛠️ Setup Instructions

### 1️⃣ Database Setup

**Run the SQL Schema:**
```bash
# Execute the three-role schema in your Supabase dashboard
./supabase-three-role-schema.sql
```

### 2️⃣ Environment Configuration

**Create .env file:**
```bash
# Copy example and add your credentials
cp .env.example .env

# Add your Supabase project details:
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3️⃣ Dependencies Installation

```bash
npm install
```

### 4️⃣ Development Server

```bash
npm run dev
```

## 📝 Role-Specific Registration Data

### 🎓 Student Registration
```javascript
{
  // Base Data
  full_name: "John Smith",
  email: "john@university.edu", 
  role: "student",
  phone_number: "+1234567890",
  
  // Student-Specific Data  
  student_id: "STU001", // Auto-generated if not provided
  university: "ABC University",
  course: "Computer Science Engineering",
  graduation_year: 2025,
  skills: ["JavaScript", "React", "Python"],
  placement_status: "seeking", // Default
  resume_url: "optional",
  linkedin_url: "optional",
  github_url: "optional"
}
```

### 💼 Employee Registration
```javascript
{
  // Base Data
  full_name: "Jane Doe",
  email: "jane@company.com",
  role: "employee", 
  phone_number: "+1234567891",
  
  // Employee-Specific Data
  employee_id: "EMP001", // Auto-generated if not provided
  company_name: "Tech Corp",
  job_title: "Senior Developer",
  experience_years: 5,
  skills: ["JavaScript", "Node.js", "AWS"],
  mentorship_available: true, // Default
  expertise_areas: ["Web Development", "Cloud Computing"],
  willing_to_hire: false, // Default
  current_salary_range: "10-15L",
  work_type: "hybrid"
}
```

### 👥 TPO/Admin Registration
```javascript
{
  // Base Data
  full_name: "Admin Officer",
  email: "admin@university.edu",
  role: "tpo",
  phone_number: "+1234567892",
  
  // TPO-Specific Data
  officer_id: "TPO001", // Auto-generated
  university: "ABC University",
  position: "tpo",
  access_level: "standard", // Default
  responsibilities: ["Student Placement", "Company Coordination"],
  is_active: true, // Default
  contact_hours: "9 AM - 5 PM",
  office_location: "Admin Block Room 101"
}
```

## 🔐 Security & Permissions

### Row Level Security (RLS) Policies

- **Students** can view/edit their own profiles
- **TPO Officers** can view students in their university
- **Employees** with mentorship enabled are visible to students
- **Super Admins** can view all TPO officers

## 📊 Database Views

Pre-built views for easy data access:
- `student_profiles` - Complete student data
- `employee_profiles` - Complete employee data  
- `tpo_profiles` - Complete TPO officer data

## 🔄 Data Migration

If you have existing data in a single user_profiles table:

```sql
-- Backup existing data first!
-- Run migration scripts to move data to new three-table structure
-- (Contact developer for migration assistance)
```

## 🎯 Usage Examples

### Frontend Registration Flow
```typescript
// The registration form automatically handles role-based data separation
await signUp(email, password, baseUserData, roleSpecificData)
```

### Profile Updates
```typescript
// Updates are role-aware and update the correct tables
await updateProfile(userId, updates)
```

### Role-Based Queries
```typescript
// Get all available mentors
const mentors = await getAvailableMentors()

// Get students by university (for TPO)
const students = await getStudentsByUniversity("ABC University")
```

## 🚀 Features Enabled by Three-Role System

### For Students
- ✅ Academic profile management
- ✅ Placement status tracking  
- ✅ Skill-based matching with employees
- ✅ Resume and portfolio management

### For Employees  
- ✅ Professional profile with experience tracking
- ✅ Mentorship availability and capacity management
- ✅ Student matching based on skills/interests
- ✅ Company hiring intent tracking

### For TPO Officers/Admins
- ✅ University-specific student management
- ✅ Role-based access control (standard/admin/super_admin)
- ✅ Placement statistics and reporting
- ✅ Multi-department coordination

## 🔧 Troubleshooting

### Common Issues

1. **"User profile not found"**
   - Check if the user was properly registered with role-specific data
   - Verify database permissions

2. **"Role-specific data missing"**
   - Ensure registration includes all required fields for the selected role
   - Check the validation functions

3. **"Permission denied"**  
   - Verify RLS policies are correctly applied
   - Check user authentication status

## 📞 Support

For issues with the three-role system:
1. Check the SQL schema is properly applied
2. Verify environment variables are set
3. Ensure proper role-specific data is provided during registration
4. Check browser console for detailed error messages

---

## 🎉 Success!

Your three-role authentication system is now properly configured with separate, scalable data storage for students, employees, and TPO officers. Each role maintains its specific credentials and capabilities without conflicts.

**No future problems** - The architecture is designed to be:
- ✅ Easily extensible
- ✅ Performance optimized  
- ✅ Security compliant
- ✅ Maintenance friendly

Time to submit with confidence! 🚀