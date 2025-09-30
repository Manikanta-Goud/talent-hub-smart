import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Loader2, Eye, EyeOff, GraduationCap, Briefcase, Target, Users, ChevronDown } from 'lucide-react'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'student' | 'employee' | 'tpo' | ''>('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check for success message from registration
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      if (location.state?.email) {
        setEmail(location.state.email)
      }
      // Clear the location state
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const clearMessages = () => {
    setError('')
    setSuccessMessage('')
  }

  const handleRoleSelect = (selectedRole: 'student' | 'employee' | 'tpo') => {
    setRole(selectedRole)
    setIsRoleDropdownOpen(false)
    clearMessages()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !role) {
      setError('Please fill in all fields including role selection')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message)
      } else {
        // Navigate based on role
        switch (role) {
          case 'student':
            navigate('/student')
            break
          case 'employee':
            navigate('/employee')
            break
          case 'tpo':
            navigate('/tpo')
            break
          default:
            navigate('/')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
        </div>
      </div>

      {/* Glassmorphism Card Container */}
      <div className="relative z-10 w-full max-w-2xl mx-4 animate-fade-in-scale">
        {/* Glow Effect Behind Card */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl rounded-2xl animate-glow-pulse"></div>
        
        <Card className="relative backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl rounded-2xl overflow-hidden glass animate-slide-in-up">
          {/* Header with Animated Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift"></div>
          
          <CardHeader className="space-y-3 pb-6 pt-8">
            {/* Logo/Icon Area */}
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 animate-float hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-white/70 text-base">
              Sign in to your Talent Hub account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 px-8">
              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 backdrop-blur-sm">
                  <AlertDescription className="text-red-100">{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="bg-green-500/10 border-green-500/20 backdrop-blur-sm">
                  <AlertDescription className="text-green-100">{successMessage}</AlertDescription>
                </Alert>
              )}

              {/* Enhanced Role Selection Dropdown */}
              <div className="space-y-3">
                <Label className="text-white/90 font-medium">Select Your Role</Label>
                
                {/* Role Selection Trigger */}
                <div 
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="relative cursor-pointer"
                >
                  <div className={`h-14 px-4 py-3 bg-white/5 border-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 ${
                    isRoleDropdownOpen ? 'border-blue-400/50 bg-white/10' : 'border-white/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {role ? (
                          <>
                            <div className={`p-2 rounded-lg ${
                              role === 'student' ? 'bg-blue-500/20' :
                              role === 'employee' ? 'bg-green-500/20' :
                              'bg-purple-500/20'
                            }`}>
                              {role === 'student' && <GraduationCap className="w-4 h-4 text-blue-300" />}
                              {role === 'employee' && <Briefcase className="w-4 h-4 text-green-300" />}
                              {role === 'tpo' && <Target className="w-4 h-4 text-purple-300" />}
                            </div>
                            <div>
                              <span className="text-white font-medium capitalize">
                                {role === 'tpo' ? 'TPO Portal' : role}
                              </span>
                              <div className="text-xs text-white/60">
                                {role === 'student' && 'Opportunity Seeker'}
                                {role === 'employee' && 'Career Growth & Mentoring'}
                                {role === 'tpo' && 'Companies & Institutions'}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-2 rounded-lg bg-white/10">
                              <Users className="w-4 h-4 text-white/50" />
                            </div>
                            <div>
                              <span className="text-white/70">Choose your role</span>
                              <div className="text-xs text-white/50">Select your identity to access personalized features</div>
                            </div>
                          </>
                        )}
                      </div>
                      <ChevronDown className={`w-5 h-5 text-white/70 transition-transform duration-300 ${
                        isRoleDropdownOpen ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Expandable Role Cards */}
                {isRoleDropdownOpen && (
                  <div className="space-y-3 animate-fade-in-scale bg-white/5 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
                    {/* Student Role Card */}
                    <div 
                      onClick={() => handleRoleSelect('student')}
                      className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                        role === 'student' 
                          ? 'border-blue-400/60 bg-blue-500/20 shadow-lg shadow-blue-500/25' 
                          : 'border-white/20 bg-white/5 hover:border-blue-400/40 hover:bg-blue-500/10'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg transition-all duration-300 ${
                          role === 'student' 
                            ? 'bg-blue-500/30 shadow-lg shadow-blue-500/30' 
                            : 'bg-blue-500/20 group-hover:bg-blue-500/25'
                        }`}>
                          <GraduationCap className="w-6 h-6 text-blue-300" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">Student</h3>
                            <Badge variant="outline" className="text-xs border-blue-300/40 text-blue-300 bg-blue-500/10">
                              Opportunity Seeker
                            </Badge>
                          </div>
                          <p className="text-white/70 text-sm mb-3">
                            Discover hackathons, internships, job opportunities, and connect with industry mentors. 
                            Track your progress and build your career path with guidance from experienced professionals.
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">Hackathons</span>
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">Internships</span>
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">Mentorship</span>
                          </div>
                        </div>
                        {role === 'student' && (
                          <div className="absolute top-2 right-2">
                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/60"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Employee Role Card */}
                    <div 
                      onClick={() => handleRoleSelect('employee')}
                      className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                        role === 'employee' 
                          ? 'border-green-400/60 bg-green-500/20 shadow-lg shadow-green-500/25' 
                          : 'border-white/20 bg-white/5 hover:border-green-400/40 hover:bg-green-500/10'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg transition-all duration-300 ${
                          role === 'employee' 
                            ? 'bg-green-500/30 shadow-lg shadow-green-500/30' 
                            : 'bg-green-500/20 group-hover:bg-green-500/25'
                        }`}>
                          <Briefcase className="w-6 h-6 text-green-300" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">Employee</h3>
                            <Badge variant="outline" className="text-xs border-green-300/40 text-green-300 bg-green-500/10">
                              Career Growth & Mentoring
                            </Badge>
                          </div>
                          <p className="text-white/70 text-sm mb-3">
                            Mentor students, explore new job opportunities, and expand your professional network. 
                            Share your expertise while discovering career advancement opportunities.
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">Job Search</span>
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">Student Mentoring</span>
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">Networking</span>
                          </div>
                        </div>
                        {role === 'employee' && (
                          <div className="absolute top-2 right-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/60"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* TPO/Admin Role Card */}
                    <div 
                      onClick={() => handleRoleSelect('tpo')}
                      className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                        role === 'tpo' 
                          ? 'border-purple-400/60 bg-purple-500/20 shadow-lg shadow-purple-500/25' 
                          : 'border-white/20 bg-white/5 hover:border-purple-400/40 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg transition-all duration-300 ${
                          role === 'tpo' 
                            ? 'bg-purple-500/30 shadow-lg shadow-purple-500/30' 
                            : 'bg-purple-500/20 group-hover:bg-purple-500/25'
                        }`}>
                          <Target className="w-6 h-6 text-purple-300" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">TPO Portal</h3>
                            <Badge variant="outline" className="text-xs border-purple-300/40 text-purple-300 bg-purple-500/10">
                              Companies & Institutions
                            </Badge>
                          </div>
                          <p className="text-white/70 text-sm mb-3">
                            For companies, institutions, and hackathon conductors. Post internships, job opportunities, 
                            hackathons, and connect with talented students and professionals.
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">Post Opportunities</span>
                            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">Talent Access</span>
                            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">Event Management</span>
                          </div>
                        </div>
                        {role === 'tpo' && (
                          <div className="absolute top-2 right-2">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/60"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* Selected Role Confirmation */}
                {role && (
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/20 backdrop-blur-sm">
                    <p className="text-white/80 text-sm">
                      ✨ Perfect! You've selected <span className="font-semibold text-white capitalize">{role}</span> role
                    </p>
                  </div>
                )}
              </div>
              
              {/* Email Field with Enhanced Styling */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white/90 font-medium">Email</Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      clearMessages()
                    }}
                    required
                    autoComplete="email"
                    className="h-12 bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 focus:bg-white/10 focus:border-blue-400/50 transition-all duration-300 text-white placeholder:text-white/50 pl-4"
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Password Field with Enhanced Styling */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-white/90 font-medium">Password</Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      clearMessages()
                    }}
                    required
                    autoComplete="current-password"
                    className="h-12 bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 focus:bg-white/10 focus:border-blue-400/50 transition-all duration-300 text-white placeholder:text-white/50 pl-4 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-6 px-8 pb-8">
              {/* Enhanced Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 border-0 text-white font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    <span className="animate-pulse">Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</div>
                  </>
                )}
              </Button>
              
              {/* Enhanced Sign Up Link */}
              <div className="text-center">
                <span className="text-white/70">Don't have an account? </span>
                <Link
                  to="/register"
                  className="text-white font-semibold hover:text-blue-300 transition-colors duration-200 relative group"
                >
                  Sign up
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
              
              {/* Additional Features */}
              <div className="text-center space-y-2 pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm">Secure login with role-based access</p>
                <div className="flex justify-center space-x-4 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Encrypted
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                    Fast Access
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                    Role-Based
                  </span>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}