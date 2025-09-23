# Campus-Connect - Talent Hub Smart

A comprehensive campus placement management system built for Smart India Hackathon 2024. This platform revolutionizes how technical colleges manage internships and placements with AI-powered matching and intelligent workflows.

## 🚀 Features

- **Authentication System**: Secure user registration and login with Supabase
- **Role-based Portals**: Dedicated interfaces for students and TPOs
- **User Profiles**: Comprehensive student profiles with skills, academic details, and portfolio links
- **Protected Routes**: Secure access to different sections based on authentication
- **Responsive Design**: Modern UI built with React, TypeScript, and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Authentication)
- **Routing**: React Router DOM
- **State Management**: React Context API

## 🏗️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd talent-hub-smart
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Supabase Setup

#### Create a Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Note down your project URL and anon key

#### Database Schema
Create the following table in your Supabase SQL editor. **Run each section separately:**

**Step 1: Create the user_profiles table**
```sql
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    student_id TEXT,
    university TEXT NOT NULL,
    course TEXT NOT NULL,
    graduation_year INTEGER NOT NULL,
    skills TEXT[] DEFAULT '{}',
    resume_url TEXT,
    phone_number TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Step 2: Enable Row Level Security**
```sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
```

**Step 3: Create security policies (run one at a time)**
```sql
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);
```

```sql
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);
```

```sql
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
```

**Step 4: Create function for automatic profile creation**
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', ''));
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Step 5: Create trigger for new user signup**
```sql
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 4. Environment Configuration
1. Copy `.env.example` to `.env`
2. Update the `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Usage

### For Students
1. **Register**: Create an account with academic details, skills, and contact information
2. **Login**: Access your personalized dashboard
3. **Profile**: View and manage your profile information
4. **Portals**: Access student-specific features and opportunities

### For TPOs (Training & Placement Officers)
1. **Login**: Access TPO-specific dashboard
2. **Manage**: Oversee student placements and opportunities

## 🔐 Authentication Flow

- **Landing Page**: Login page (unauthenticated users)
- **Protected Routes**: All main application routes require authentication
- **Auto-redirect**: Authenticated users are redirected from login/register pages
- **Logout**: Secure logout functionality with redirect to login

## 🗃️ Database Schema

### user_profiles table
- `id`: UUID (Primary Key, references auth.users)
- `email`: User's email address
- `full_name`: Student's full name
- `student_id`: Student ID (optional)
- `university`: University name
- `course`: Course/degree program
- `graduation_year`: Expected graduation year
- `skills`: Array of skills
- `resume_url`: Resume/profile picture URL (optional)
- `phone_number`: Contact number (optional)
- `linkedin_url`: LinkedIn profile (optional)
- `github_url`: GitHub profile (optional)
- `portfolio_url`: Portfolio website (optional)
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

## 🔄 Development Workflow

1. **Authentication Context**: Manages user state and authentication methods
2. **Protected Routes**: Wraps components that require authentication
3. **Public Routes**: Redirects authenticated users away from login/register
4. **Auto-sync**: User profiles automatically sync with authentication state

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)
3. Ensure environment variables are configured in your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of Smart India Hackathon 2024.

---

**Smart India Hackathon 2024** • Revolutionizing Campus Placements with AI