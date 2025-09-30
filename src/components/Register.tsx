import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Loader2, Eye, EyeOff, GraduationCap, Briefcase, Target } from 'lucide-react'
import { formatEmailExistsError, getRoleDisplayName } from '../lib/role-validation'

const currentYear = new Date().getFullYear()
const graduationYears = Array.from({ length: 10 }, (_, i) => currentYear + i)

const courses = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics and Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Business Administration (MBA)',
  'Master of Computer Applications (MCA)',
  'Other'
]

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: '',
    studentId: '',
    employeeId: '',
    companyName: '',
    jobTitle: '',
    experienceYears: '',
    university: '',
    course: '',
    graduationYear: '',
    phoneNumber: '',
    skills: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    // TPO/Company specific fields
    globalRanking: '',
    companyType: '',
    industryType: '',
    companyWebsite: '',
    // CEO Details
    ceoName: '',
    ceoEmail: '',
    ceoLinkedin: '',
    executivePosition: '',
    yearsOfExperience: '',
    educationBackground: '',
    foundedYear: '',
    headquartersLocation: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.fullName || !formData.role) {
      return 'Please fill in all required fields including role selection'
    }
    
    // Role-specific validation
    if (formData.role === 'student') {
      if (!formData.university || !formData.course || !formData.graduationYear) {
        return 'Please fill in university, course, and graduation year for students'
      }
    } else if (formData.role === 'employee') {
      if (!formData.companyName || !formData.jobTitle || !formData.experienceYears) {
        return 'Please fill in company, job title, and experience years for employees'
      }
    } else if (formData.role === 'tpo') {
      if (!formData.companyName || !formData.globalRanking || !formData.ceoName || !formData.ceoEmail) {
        return 'Please fill in company name, global ranking, CEO name, and CEO email for companies/institutions'
      }
    }
    
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long'
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address'
    }
    
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    try {
      // Prepare base user data
      const baseUserData = {
        full_name: formData.fullName,
        role: formData.role as 'student' | 'employee' | 'tpo',
        phone_number: formData.phoneNumber || undefined
      }

      // Prepare role-specific data
      let roleSpecificData: any = {}

      if (formData.role === 'student') {
        roleSpecificData = {
          student_id: formData.studentId || `STU${Date.now()}`,
          university: formData.university,
          course: formData.course,
          graduation_year: parseInt(formData.graduationYear),
          skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
          linkedin_url: formData.linkedinUrl || undefined,
          github_url: formData.githubUrl || undefined,
          portfolio_url: formData.portfolioUrl || undefined,
          placement_status: 'seeking'
        }
      } else if (formData.role === 'employee') {
        roleSpecificData = {
          employee_id: formData.employeeId || `EMP${Date.now()}`,
          company_name: formData.companyName,
          job_title: formData.jobTitle,
          experience_years: parseInt(formData.experienceYears),
          skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
          linkedin_url: formData.linkedinUrl || undefined,
          github_url: formData.githubUrl || undefined,
          portfolio_url: formData.portfolioUrl || undefined,
          mentorship_available: true,
          willing_to_hire: false
        }
      } else if (formData.role === 'tpo') {
        roleSpecificData = {
          officer_id: `TPO${Date.now()}`,
          company_name: formData.companyName,
          global_ranking: formData.globalRanking,
          company_type: formData.companyType || 'private',
          industry_type: formData.industryType || 'technology',
          company_website: formData.companyWebsite || undefined,
          
          // CEO/Executive Details
          ceo_name: formData.ceoName,
          ceo_email: formData.ceoEmail,
          ceo_linkedin: formData.ceoLinkedin || undefined,
          executive_position: formData.executivePosition || 'ceo',
          years_of_experience: parseInt(formData.yearsOfExperience) || 0,
          education_background: formData.educationBackground || undefined,
          founded_year: parseInt(formData.foundedYear) || undefined,
          headquarters_location: formData.headquartersLocation || undefined,
          
          // Full Company Permissions
          access_level: 'full_admin',
          can_access_students: true,
          can_access_employees: true,
          can_post_opportunities: true,
          can_conduct_hackathons: true,
          can_view_analytics: true,
          
          // Initial counts
          opportunities_posted: 0,
          students_hired: 0,
          employees_recruited: 0,
          is_active: true
        }
      }

      const { error } = await signUp(
        formData.email, 
        formData.password, 
        baseUserData,
        roleSpecificData
      )
      
      if (error) {
        // Check if it's an email already exists error
        if (error.message.includes('already registered as')) {
          setError(error.message)
        } else {
          setError(error.message || 'Registration failed. Please try again.')
        }
      } else {
        navigate('/login', { 
          state: { 
            message: `Registration successful! You can now login as ${getRoleDisplayName(formData.role)}.`,
            email: formData.email 
          }
        })
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('An unexpected error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Join Talent Hub to connect with opportunities and share knowledge
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="role">Select Your Role *</Label>
              <Select onValueChange={(value) => handleChange('role', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>Student</span>
                      <Badge variant="outline" className="ml-2 text-xs">Learning & Growth</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="employee">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>Employee</span>
                      <Badge variant="outline" className="ml-2 text-xs">Mentoring & Sharing</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="tpo">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>TPO/Admin</span>
                      <Badge variant="outline" className="ml-2 text-xs">Managing Platform</Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground">
                {formData.role === 'student' && "Students can discover opportunities, learn from employees, and build their careers."}
                {formData.role === 'employee' && "Employees can share real-world experience, mentor students, and help bridge the industry-academia gap."}
                {formData.role === 'tpo' && "Companies and institutions can post internships, hackathons, job opportunities, and connect with talented students and professionals."}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Role-specific fields */}
            {formData.role === 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="Enter your student ID"
                    value={formData.studentId}
                    onChange={(e) => handleChange('studentId', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  />
                </div>
              </div>
            )}

            {formData.role === 'employee' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      type="text"
                      placeholder="Enter your employee ID"
                      value={formData.employeeId}
                      onChange={(e) => handleChange('employeeId', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      required={formData.role === 'employee'}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      type="text"
                      placeholder="e.g., Software Engineer"
                      value={formData.jobTitle}
                      onChange={(e) => handleChange('jobTitle', e.target.value)}
                      required={formData.role === 'employee'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceYears">Years of Experience *</Label>
                  <Select onValueChange={(value) => handleChange('experienceYears', value)} required={formData.role === 'employee'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year} {year === 1 ? 'year' : 'years'}
                        </SelectItem>
                      ))}
                      <SelectItem value="20+">20+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {formData.role === 'tpo' && (
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                />
              </div>
            )}
            
            {/* University field - only for students */}
            {formData.role === 'student' && (
              <div className="space-y-2">
                <Label htmlFor="university">University *</Label>
                <Input
                  id="university"
                  type="text"
                  placeholder="Enter your university name"
                  value={formData.university}
                  onChange={(e) => handleChange('university', e.target.value)}
                  required
                />
              </div>
            )}

            {/* Company fields - only for TPO officers */}
            {formData.role === 'tpo' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="globalRanking">Global Ranking *</Label>
                  <Input
                    id="globalRanking"
                    type="text"
                    placeholder="e.g., Top 500, Fortune 100, or specific ranking"
                    value={formData.globalRanking}
                    onChange={(e) => handleChange('globalRanking', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyType">Company Type</Label>
                    <Select onValueChange={(value) => handleChange('companyType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="mnc">Multinational Corporation</SelectItem>
                        <SelectItem value="public">Public Sector</SelectItem>
                        <SelectItem value="private">Private Company</SelectItem>
                        <SelectItem value="nonprofit">Non-Profit</SelectItem>
                        <SelectItem value="educational">Educational Institution</SelectItem>
                        <SelectItem value="government">Government Agency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industryType">Industry Type</Label>
                    <Select onValueChange={(value) => handleChange('industryType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance & Banking</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="retail">Retail & E-commerce</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="telecommunications">Telecommunications</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    id="companyWebsite"
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={formData.companyWebsite}
                    onChange={(e) => handleChange('companyWebsite', e.target.value)}
                  />
                </div>

                {/* CEO/Executive Details Section */}
                <div className="space-y-4 p-4 bg-muted/20 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">CEO/Executive Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ceoName">CEO Name *</Label>
                      <Input
                        id="ceoName"
                        type="text"
                        placeholder="Enter CEO full name"
                        value={formData.ceoName}
                        onChange={(e) => handleChange('ceoName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ceoEmail">CEO Email *</Label>
                      <Input
                        id="ceoEmail"
                        type="email"
                        placeholder="ceo@company.com"
                        value={formData.ceoEmail}
                        onChange={(e) => handleChange('ceoEmail', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="executivePosition">Executive Position</Label>
                      <Select onValueChange={(value) => handleChange('executivePosition', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ceo">CEO - Chief Executive Officer</SelectItem>
                          <SelectItem value="cto">CTO - Chief Technology Officer</SelectItem>
                          <SelectItem value="cfo">CFO - Chief Financial Officer</SelectItem>
                          <SelectItem value="coo">COO - Chief Operating Officer</SelectItem>
                          <SelectItem value="founder">Founder</SelectItem>
                          <SelectItem value="president">President</SelectItem>
                          <SelectItem value="vp">Vice President</SelectItem>
                          <SelectItem value="director">Director</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Input
                        id="yearsOfExperience"
                        type="number"
                        placeholder="e.g., 15"
                        min="0"
                        max="50"
                        value={formData.yearsOfExperience}
                        onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ceoLinkedin">CEO LinkedIn Profile</Label>
                    <Input
                      id="ceoLinkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/ceo-profile"
                      value={formData.ceoLinkedin}
                      onChange={(e) => handleChange('ceoLinkedin', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educationBackground">Education Background</Label>
                    <Input
                      id="educationBackground"
                      type="text"
                      placeholder="e.g., MBA from Harvard, B.Tech from IIT"
                      value={formData.educationBackground}
                      onChange={(e) => handleChange('educationBackground', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">Company Founded Year</Label>
                      <Input
                        id="foundedYear"
                        type="number"
                        placeholder="e.g., 2010"
                        min="1800"
                        max={new Date().getFullYear()}
                        value={formData.foundedYear}
                        onChange={(e) => handleChange('foundedYear', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="headquartersLocation">Headquarters Location</Label>
                      <Input
                        id="headquartersLocation"
                        type="text"
                        placeholder="e.g., San Francisco, CA, USA"
                        value={formData.headquartersLocation}
                        onChange={(e) => handleChange('headquartersLocation', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Full Platform Access:</strong> As a company representative, you'll have complete access to student and employee databases, can post opportunities, conduct hackathons, and access comprehensive analytics.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Course and graduation year - only for students */}
            {formData.role === 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course *</Label>
                  <Select onValueChange={(value) => handleChange('course', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year *</Label>
                  <Select onValueChange={(value) => handleChange('graduationYear', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select graduation year" />
                    </SelectTrigger>
                    <SelectContent>
                      {graduationYears.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {/* Skills and URLs - only for students and employees */}
            {formData.role !== 'tpo' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Textarea
                    id="skills"
                    placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Python)"
                    value={formData.skills}
                    onChange={(e) => handleChange('skills', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    placeholder="https://github.com/yourusername"
                    value={formData.githubUrl}
                    onChange={(e) => handleChange('githubUrl', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    type="url"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolioUrl}
                    onChange={(e) => handleChange('portfolioUrl', e.target.value)}
                  />
                </div>
              </div>
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}