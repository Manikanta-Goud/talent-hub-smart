# Database Setup Guide for Real User Profiles

## Overview
This guide explains how to set up the Supabase database to store and retrieve real user profile data.

## The Problem
- Test users (student@gmail.com, employee@gmail.com, tpo@gmail.com) work with mock data
- Real users who register new accounts can't create or view profiles
- Database table `profiles` might not exist or have proper permissions

## Solution Steps

### Step 1: Manual Database Setup (Recommended)

1. **Open Supabase Dashboard**
   - Go to [https://app.supabase.com](https://app.supabase.com)
   - Sign in and select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Setup SQL**
   - Copy the entire content from `setup-database.sql` file
   - Paste it into the SQL Editor
   - Click "Run" to execute

4. **Verify Setup**
   - The script will create the `profiles` table
   - Set up Row Level Security (RLS) policies
   - Create necessary indexes and triggers
   - Insert a test record

### Step 2: Automatic Setup (Alternative)

If manual setup doesn't work, the app includes an automatic setup feature:

1. **Login with any test account** (student@gmail.com / 12345678)
2. **Go to Profile page** - You'll see a debug screen
3. **Click "Setup Database"** button if it appears
4. **Wait for confirmation** message

### Step 3: Test Real User Registration

1. **Register a new account** with a real email
2. **Check your email** for Supabase confirmation (if email confirmation is enabled)
3. **Login with new account**
4. **Go to Profile page** - You should now see your profile data

## Database Schema

The `profiles` table includes:

```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to auth.users)
- email (TEXT, Unique)
- full_name (TEXT)
- role (TEXT: 'student', 'employee', 'tpo')
- phone_number (TEXT, Optional)

-- Student fields
- student_id, university, course, graduation_year

-- Employee fields  
- employee_id, company_name, job_title, experience_years

-- TPO fields
- officer_id

-- Common fields
- skills (TEXT[]), linkedin_url, github_url, portfolio_url
- created_at, updated_at (Timestamps)
```

## Row Level Security (RLS)

The table has these security policies:
- Users can only view their own profile
- Users can only insert their own profile  
- Users can only update their own profile

## Troubleshooting

### Issue: "Profile Not Found" for real users
**Solution**: Run the database setup SQL script

### Issue: Permission denied errors
**Solution**: Check RLS policies are set correctly

### Issue: Can't insert profiles
**Solution**: Verify user authentication and user_id matching

### Issue: Database connection fails
**Solution**: Check environment variables in `.env` file

## Environment Variables

Make sure these are set in your `.env` file:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Debug Information

The Profile page now shows detailed debug information:
- User authentication status
- User ID and email
- Profile loading status  
- Database health check
- Automatic setup options

## Testing

After setup, test these scenarios:

1. **Test Users (Mock Data)**
   - student@gmail.com / 12345678 ✅ Should work
   - employee@gmail.com / 12345678 ✅ Should work  
   - tpo@gmail.com / 12345678 ✅ Should work

2. **Real Users (Database)**
   - Register new account ✅ Should create profile automatically
   - Login and view profile ✅ Should show real data from database
   - Edit and save profile ✅ Should persist changes

## Files Modified

- `src/lib/simple-profile-service.ts` - Enhanced with logging and better error handling
- `src/contexts/AuthContext.tsx` - Added comprehensive logging for profile operations
- `src/pages/Profile.tsx` - Added debug information and database health checks
- `src/lib/database-setup.ts` - New utility for database setup and health checks
- `setup-database.sql` - Complete SQL script for manual database setup

## Support

If you continue having issues:
1. Check browser console for detailed logs (all operations are now logged)
2. Verify Supabase project is active and accessible
3. Check authentication works (can login/logout)
4. Run the manual SQL setup script
5. Contact support with specific error messages from console logs