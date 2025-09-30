import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Users, Zap, ArrowLeft, Edit, Mail, Phone, Calendar, GraduationCap, User, Save, X, Loader2, LogOut, Building, Award, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { checkDatabaseHealth, setupDatabase } from "@/lib/database-setup";

const Profile = () => {
  const navigate = useNavigate();
  const { user, userProfile, updateProfile, signOut, loading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dbHealth, setDbHealth] = useState<any>(null);
  const [showDbSetup, setShowDbSetup] = useState(false);

  // Check database health on component mount
  useEffect(() => {
    const checkDb = async () => {
      const health = await checkDatabaseHealth();
      setDbHealth(health);
      console.log('🏥 Database health:', health);
    };
    checkDb();
  }, []);

  const handleSetupDatabase = async () => {
    setShowDbSetup(true);
    const result = await setupDatabase();
    console.log('🔧 Database setup result:', result);
    
    if (result.success) {
      toast({
        title: "Database Setup",
        description: result.message,
      });
      // Re-check database health
      const health = await checkDatabaseHealth();
      setDbHealth(health);
    } else {
      toast({
        title: "Database Setup Failed",
        description: result.error,
        variant: "destructive",
      });
    }
    setShowDbSetup(false);
  };

  // Always use latest userProfile except for TPO test account
  const displayProfile = (user?.email === 'tpo@gmail.com') ? {
    full_name: 'Microsoft Corporation',
    email: 'tpo@gmail.com',
    role: 'tpo',
    phone_number: '+1 (425) 882-8080',
    company_name: 'Microsoft Corporation',
    global_ranking: 'Fortune 21 - Global Technology Leader',
    company_type: 'mnc',
    industry_type: 'technology',
    company_website: 'https://www.microsoft.com',
    ceo_name: 'Satya Nadella',
    ceo_email: 'satya.nadella@microsoft.com',
    ceo_linkedin: 'https://linkedin.com/in/satyanadella',
    executive_position: 'ceo',
    years_of_experience: 30,
    education_background: 'MS Computer Science - University of Wisconsin, MBA - University of Chicago',
    founded_year: 1975,
    headquarters_location: 'Redmond, Washington, USA',
    employees_count: 220000,
    opportunities_posted: 156,
    students_hired: 89,
    employees_recruited: 45,
    can_access_students: true,
    can_access_employees: true,
    can_post_opportunities: true,
    can_conduct_hackathons: true,
    can_view_analytics: true,
    access_level: 'full_admin',
    is_active: true
  } : userProfile;

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };
  type EditDataType = {
    full_name: string;
    email: string;
    phone_number: string;
    student_id: string;
    university: string;
    course: string;
    graduation_year: string;
    skills: string;
    linkedin_url: string;
    github_url: string;
    portfolio_url: string;
    // Employee extra fields
    workplace: string;
    age: string;
    university_graduated: string;
    work_experience: string;
    // TPO fields
    company_name: string;
    global_ranking: string;
    ceo_name: string;
    ceo_email: string;
    ceo_linkedin: string;
    executive_position: string;
    years_of_experience: string;
    education_background: string;
    company_website: string;
    headquarters_location: string;
  };

  const [editData, setEditData] = useState<EditDataType>({
    full_name: userProfile?.full_name || '',
    email: userProfile?.email || '',
    phone_number: userProfile?.phone_number || '',
    student_id: (userProfile as any)?.student_id || '',
    university: (userProfile as any)?.university || '',
    course: (userProfile as any)?.course || '',
    graduation_year: (userProfile as any)?.graduation_year?.toString() || '',
    skills: (userProfile as any)?.skills ? (userProfile as any).skills.join(', ') : '',
    linkedin_url: (userProfile as any)?.linkedin_url || '',
    github_url: (userProfile as any)?.github_url || '',
    portfolio_url: (userProfile as any)?.portfolio_url || '',
    // Employee extra fields
    workplace: (userProfile as any)?.workplace || '',
    age: (userProfile as any)?.age || '',
    university_graduated: (userProfile as any)?.university_graduated || '',
    work_experience: (userProfile as any)?.work_experience || '',
    // TPO fields
    company_name: (userProfile as any)?.company_name || '',
    global_ranking: (userProfile as any)?.global_ranking || '',
    ceo_name: (userProfile as any)?.ceo_name || '',
    ceo_email: (userProfile as any)?.ceo_email || '',
    ceo_linkedin: (userProfile as any)?.ceo_linkedin || '',
    executive_position: (userProfile as any)?.executive_position || '',
    years_of_experience: (userProfile as any)?.years_of_experience?.toString() || '',
    education_background: (userProfile as any)?.education_background || '',
    company_website: (userProfile as any)?.company_website || '',
    headquarters_location: (userProfile as any)?.headquarters_location || ''
  });

  // Course options (same as registration)
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
  ];

  // Graduation years
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 10 }, (_, i) => currentYear + i - 5);

  // Sync editData with userProfile when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setEditData({
        full_name: userProfile.full_name || '',
        email: userProfile.email || '',
        phone_number: userProfile.phone_number || '',
        student_id: (userProfile as any)?.student_id || '',
        university: (userProfile as any)?.university || '',
        course: (userProfile as any)?.course || '',
        graduation_year: (userProfile as any)?.graduation_year?.toString() || '',
        skills: (userProfile as any)?.skills ? (userProfile as any).skills.join(', ') : '',
        linkedin_url: (userProfile as any)?.linkedin_url || '',
        github_url: (userProfile as any)?.github_url || '',
        portfolio_url: (userProfile as any)?.portfolio_url || '',
        // Employee extra fields
        workplace: (userProfile as any)?.workplace || '',
        age: (userProfile as any)?.age || '',
        university_graduated: (userProfile as any)?.university_graduated || '',
        work_experience: (userProfile as any)?.work_experience || '',
        // TPO fields
        company_name: (userProfile as any)?.company_name || '',
        global_ranking: (userProfile as any)?.global_ranking || '',
        ceo_name: (userProfile as any)?.ceo_name || '',
        ceo_email: (userProfile as any)?.ceo_email || '',
        ceo_linkedin: (userProfile as any)?.ceo_linkedin || '',
        executive_position: (userProfile as any)?.executive_position || '',
        years_of_experience: (userProfile as any)?.years_of_experience?.toString() || '',
        education_background: (userProfile as any)?.education_background || '',
        company_website: (userProfile as any)?.company_website || '',
        headquarters_location: (userProfile as any)?.headquarters_location || ''
      });
    }
  }, [userProfile]);

  const handleEditChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Prepare the data for saving
      const updatedProfile = {
        full_name: editData.full_name,
        email: editData.email,
        phone_number: editData.phone_number || null,
        student_id: editData.student_id || null,
        university: editData.university,
        course: editData.course,
        graduation_year: editData.graduation_year ? parseInt(editData.graduation_year) : null,
        skills: editData.skills ? editData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0) : [],
        linkedin_url: editData.linkedin_url || null,
        github_url: editData.github_url || null,
        portfolio_url: editData.portfolio_url || null
      };

      // Update the profile using the auth context
      const { error } = await updateProfile(updatedProfile);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive"
        });
        return;
      }

      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated and saved.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to current userProfile values
    if (userProfile) {
      setEditData({
        full_name: userProfile?.full_name || '',
        email: userProfile?.email || '',
        phone_number: userProfile?.phone_number || '',
        student_id: (userProfile as any)?.student_id || '',
        university: (userProfile as any)?.university || '',
        course: (userProfile as any)?.course || '',
        graduation_year: (userProfile as any)?.graduation_year?.toString() || '',
        skills: (userProfile as any)?.skills ? (userProfile as any).skills.join(', ') : '',
        linkedin_url: (userProfile as any)?.linkedin_url || '',
        github_url: (userProfile as any)?.github_url || '',
        portfolio_url: (userProfile as any)?.portfolio_url || '',
        // Employee extra fields
        workplace: (userProfile as any)?.workplace || '',
        age: (userProfile as any)?.age || '',
        university_graduated: (userProfile as any)?.university_graduated || '',
        work_experience: (userProfile as any)?.work_experience || '',
        // TPO fields
        company_name: (userProfile as any)?.company_name || '',
        global_ranking: (userProfile as any)?.global_ranking || '',
        ceo_name: (userProfile as any)?.ceo_name || '',
        ceo_email: (userProfile as any)?.ceo_email || '',
        ceo_linkedin: (userProfile as any)?.ceo_linkedin || '',
        executive_position: (userProfile as any)?.executive_position || '',
        years_of_experience: (userProfile as any)?.years_of_experience?.toString() || '',
        education_background: (userProfile as any)?.education_background || '',
        company_website: (userProfile as any)?.company_website || '',
        headquarters_location: (userProfile as any)?.headquarters_location || ''
      });
    }
    setIsEditing(false);
    
    toast({
      title: "Changes Cancelled",
      description: "Your changes have been discarded.",
      variant: "destructive"
    });
  };

  const getUserInitials = () => {
    if (userProfile?.full_name) {
      return userProfile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <Loader2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold mb-2">Loading Profile...</h2>
            <p className="text-muted-foreground">
              Please wait while we load your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
              <p className="text-muted-foreground mb-4">
                Let's diagnose and fix the issue with your profile.
              </p>
            </div>
            
            {/* Debug Information */}
            <div className="text-left bg-gray-100 p-4 rounded mb-4 text-sm space-y-2">
              <p><strong>🔍 Debug Information:</strong></p>
              <p>• User Status: {user ? '✅ Logged in' : '❌ Not logged in'}</p>
              <p>• Email: {user?.email || '❌ No email'}</p>
              <p>• User ID: {user?.id || '❌ No ID'}</p>
              <p>• Profile Status: {userProfile ? '✅ Found' : '❌ Not found'}</p>
              <p>• Loading: {loading ? '🔄 Yes' : '✅ No'}</p>
              <p>• Database Health: {dbHealth ? 
                (dbHealth.healthy ? '✅ Healthy' : `❌ ${dbHealth.error}`) : 
                '🔄 Checking...'
              }</p>
            </div>

            {/* Database Setup Section */}
            {dbHealth && !dbHealth.healthy && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
                <h3 className="font-semibold text-yellow-800 mb-2">🔧 Database Setup Required</h3>
                <p className="text-yellow-700 text-sm mb-3">
                  The profiles table needs to be set up in your Supabase database.
                </p>
                <Button 
                  onClick={handleSetupDatabase} 
                  disabled={showDbSetup}
                  variant="outline"
                  size="sm"
                >
                  {showDbSetup ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    'Setup Database'
                  )}
                </Button>
              </div>
            )}

            {/* Manual Database Setup Instructions */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">📝 Manual Setup Instructions</h3>
              <p className="text-blue-700 text-sm mb-2">
                If automatic setup fails, run this SQL in your Supabase SQL Editor:
              </p>
              <div className="bg-white p-2 rounded border text-xs font-mono overflow-x-auto">
                <code>
                  {`-- Copy and run setup-database.sql file in Supabase SQL Editor
-- File location: setup-database.sql in your project root`}
                </code>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => navigate('/')} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                variant="default"
              >
                🔄 Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <Card className="mb-8 overflow-hidden shadow-medium">
            <CardHeader className="bg-gradient-primary text-white relative">
              <div className="absolute top-4 right-4 flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="secondary" size="sm" onClick={handleSave} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCancel} disabled={isLoading}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    {displayProfile?.role !== 'tpo' && (
                      <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                    <Button variant="destructive" size="sm" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                )}
              </div>  
              <div className="flex items-center gap-6 mt-16">
                <Avatar className="h-24 w-24 border-4 border-white/20">
                  <AvatarFallback className="text-2xl bg-white/20 text-white">
                    {displayProfile?.role === 'tpo' ? 
                      <Building className="w-12 h-12" /> : 
                      getUserInitials()
                    }
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{displayProfile?.full_name}</h2>
                  {displayProfile?.role === 'tpo' ? (
                    <>
                      <p className="text-white/90 text-lg mb-1">
                        {displayProfile?.industry_type?.charAt(0).toUpperCase() + displayProfile?.industry_type?.slice(1)} Company
                      </p>
                      <p className="text-white/80">{displayProfile?.global_ranking}</p>
                    </>
                  ) : displayProfile?.role === 'employee' ? (
                    <>
                      <div className="text-white/90 text-lg mb-1">Workplace: {(displayProfile as any)?.workplace}</div>
                      <div className="text-white/90 text-lg mb-1">Age: {(displayProfile as any)?.age}</div>
                      <div className="text-white/90 text-lg mb-1">University Graduated: {(displayProfile as any)?.university_graduated}</div>
                      <div className="text-white/90 text-lg mb-1">Work Experience: {(displayProfile as any)?.work_experience} years</div>
                      {/* Achievements */}
                      {(displayProfile as any)?.achievements && Array.isArray((displayProfile as any).achievements) && (displayProfile as any).achievements.length > 0 && (
                        <div className="mt-2">
                          <div className="font-semibold text-white">Achievements:</div>
                          <ul className="list-disc ml-6 text-white/90">
                            {(displayProfile as any).achievements.map((ach: string, idx: number) => (
                              <li key={idx}>{ach}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Skills */}
                      <div className="mt-2">
                        <div className="font-semibold text-white">Skills:</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {typeof (displayProfile as any)?.skills === 'string'
                            ? (displayProfile as any).skills.split(',').map((skill: string, idx: number) => (
                                <span key={idx} className="bg-purple-700 text-white px-2 py-1 rounded text-xs">{skill.trim()}</span>
                              ))
                            : Array.isArray((displayProfile as any)?.skills)
                              ? (displayProfile as any).skills.map((skill: string, idx: number) => (
                                  <span key={idx} className="bg-purple-700 text-white px-2 py-1 rounded text-xs">{skill.trim()}</span>
                                ))
                              : null}
                        </div>
                      </div>
                      {/* Professional Links */}
                      <div className="mt-2 flex gap-2">
                        {(displayProfile as any)?.github_url && (
                          <a href={(displayProfile as any).github_url} target="_blank" rel="noopener noreferrer">
                            <button className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900">GitHub</button>
                          </a>
                        )}
                        {(displayProfile as any)?.linkedin_url && (
                          <a href={(displayProfile as any).linkedin_url} target="_blank" rel="noopener noreferrer">
                            <button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800">LinkedIn</button>
                          </a>
                        )}
                        {(displayProfile as any)?.portfolio_url && (
                          <a href={(displayProfile as any).portfolio_url} target="_blank" rel="noopener noreferrer">
                            <button className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-800">Portfolio</button>
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-white/90 text-lg mb-1">{(displayProfile as any)?.course}</p>
                      <p className="text-white/80">{(displayProfile as any)?.university}</p>
                      {/* Achievements */}
                      {(displayProfile as any)?.achievements && Array.isArray((displayProfile as any).achievements) && (displayProfile as any).achievements.length > 0 && (
                        <div className="mt-2">
                          <div className="font-semibold text-white">Achievements:</div>
                          <ul className="list-disc ml-6 text-white/90">
                            {(displayProfile as any).achievements.map((ach: string, idx: number) => (
                              <li key={idx}>{ach}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Skills */}
                      <div className="mt-2">
                        <div className="font-semibold text-white">Skills:</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {typeof (displayProfile as any)?.skills === 'string'
                            ? (displayProfile as any).skills.split(',').map((skill: string, idx: number) => (
                                <span key={idx} className="bg-purple-700 text-white px-2 py-1 rounded text-xs">{skill.trim()}</span>
                              ))
                            : Array.isArray((displayProfile as any)?.skills)
                              ? (displayProfile as any).skills.map((skill: string, idx: number) => (
                                  <span key={idx} className="bg-purple-700 text-white px-2 py-1 rounded text-xs">{skill.trim()}</span>
                                ))
                              : null}
                        </div>
                      </div>
                      {/* Professional Links */}
                      <div className="mt-2 flex gap-2">
                        {(displayProfile as any)?.github_url && (
                          <a href={(displayProfile as any).github_url} target="_blank" rel="noopener noreferrer">
                            <button className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900">GitHub</button>
                          </a>
                        )}
                        {(displayProfile as any)?.linkedin_url && (
                          <a href={(displayProfile as any).linkedin_url} target="_blank" rel="noopener noreferrer">
                            <button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800">LinkedIn</button>
                          </a>
                        )}
                        {(displayProfile as any)?.portfolio_url && (
                          <a href={(displayProfile as any).portfolio_url} target="_blank" rel="noopener noreferrer">
                            <button className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-800">Portfolio</button>
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {isEditing ? (
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name *</Label>
                      <Input
                        id="full_name"
                        value={editData.full_name}
                        onChange={(e) => handleEditChange('full_name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleEditChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Phone Number</Label>
                      <Input
                        id="phone_number"
                        type="tel"
                        value={editData.phone_number}
                        onChange={(e) => handleEditChange('phone_number', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {displayProfile?.role === 'employee' ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="workplace">Workplace</Label>
                          <Input
                            id="workplace"
                            value={editData.workplace || ''}
                            onChange={(e) => handleEditChange('workplace', e.target.value)}
                            placeholder="Enter your workplace/company"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={editData.age || ''}
                            onChange={(e) => handleEditChange('age', e.target.value)}
                            placeholder="Enter your age"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="university_graduated">Which university did you graduate from?</Label>
                          <Input
                            id="university_graduated"
                            value={editData.university_graduated || ''}
                            onChange={(e) => handleEditChange('university_graduated', e.target.value)}
                            placeholder="Enter your university name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="work_experience">Work Experience (years)</Label>
                          <Input
                            id="work_experience"
                            type="number"
                            value={editData.work_experience || ''}
                            onChange={(e) => handleEditChange('work_experience', e.target.value)}
                            placeholder="Enter your work experience in years"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="student_id">Student ID</Label>
                        <Input
                          id="student_id"
                          value={editData.student_id}
                          onChange={(e) => handleEditChange('student_id', e.target.value)}
                          placeholder="Enter your student ID"
                        />
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Textarea
                      id="skills"
                      value={editData.skills}
                      onChange={(e) => handleEditChange('skills', e.target.value)}
                      placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Python)"
                      rows={3}
                    />
                  </div>

                  {/* Professional Links */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                      <Input
                        id="linkedin_url"
                        type="url"
                        value={editData.linkedin_url}
                        onChange={(e) => handleEditChange('linkedin_url', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github_url">GitHub URL</Label>
                      <Input
                        id="github_url"
                        type="url"
                        value={editData.github_url}
                        onChange={(e) => handleEditChange('github_url', e.target.value)}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio_url">Portfolio URL</Label>
                      <Input
                        id="portfolio_url"
                        type="url"
                        value={editData.portfolio_url}
                        onChange={(e) => handleEditChange('portfolio_url', e.target.value)}
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {displayProfile?.role === 'tpo' ? (
                    /* TPO Profile Display */
                    <div className="space-y-8">
                      {/* Company Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Building className="w-5 h-5 text-blue-600" />
                          Company Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <Mail className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Company Email</p>
                              <p className="font-semibold">{displayProfile?.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <Phone className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                              <p className="font-semibold">{displayProfile?.phone_number || 'Not provided'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <Award className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Global Ranking</p>
                              <p className="font-semibold">{displayProfile?.global_ranking}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Headquarters</p>
                              <p className="font-semibold">{displayProfile?.headquarters_location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Employees</p>
                              <p className="font-semibold">{displayProfile?.employees_count?.toLocaleString()} employees</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Founded</p>
                              <p className="font-semibold">{displayProfile?.founded_year}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CEO Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <User className="w-5 h-5 text-purple-600" />
                          CEO Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">CEO Name</p>
                              <p className="font-semibold">{displayProfile?.ceo_name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <Mail className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">CEO Email</p>
                              <p className="font-semibold">{displayProfile?.ceo_email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <Award className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Position</p>
                              <p className="font-semibold capitalize">{displayProfile?.executive_position?.replace('_', ' ')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Experience</p>
                              <p className="font-semibold">{displayProfile?.years_of_experience} years</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 md:col-span-2">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <GraduationCap className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Education</p>
                              <p className="font-semibold">{displayProfile?.education_background}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Platform Statistics */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-green-600" />
                          Platform Statistics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{displayProfile?.opportunities_posted}</div>
                            <div className="text-sm text-muted-foreground">Opportunities Posted</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{displayProfile?.students_hired}</div>
                            <div className="text-sm text-muted-foreground">Students Hired</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{displayProfile?.employees_recruited}</div>
                            <div className="text-sm text-muted-foreground">Employees Recruited</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Student/Employee Profile Display */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                          <p className="font-semibold">{displayProfile?.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                          <p className="font-semibold">{displayProfile?.phone_number || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      {(displayProfile as any)?.student_id && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                            <p className="font-semibold">{(displayProfile as any)?.student_id}</p>
                          </div>
                        </div>
                      )}
                      
                      {(displayProfile as any)?.graduation_year && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Graduation Year</p>
                            <p className="font-semibold">{(displayProfile as any)?.graduation_year}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Additional Sections - Only for Students and Employees */}
          {!isEditing && displayProfile?.role !== 'tpo' && (
            <>
              {/* Company Website Link for TPO */}
              {displayProfile?.role === 'tpo' && displayProfile?.company_website && (
                <Card className="shadow-medium">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Company Links</h3>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="h-12 justify-start" asChild>
                      <a href={displayProfile.company_website} target="_blank" rel="noopener noreferrer">
                        <Building className="mr-3 h-5 w-5 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">Company Website</div>
                          <div className="text-xs text-muted-foreground">Official Website</div>
                        </div>
                      </a>
                    </Button>
                    {displayProfile?.ceo_linkedin && (
                      <Button variant="outline" className="h-12 justify-start mt-2" asChild>
                        <a href={displayProfile.ceo_linkedin} target="_blank" rel="noopener noreferrer">
                          <Users className="mr-3 h-5 w-5 text-blue-600" />
                          <div className="text-left">
                            <div className="font-medium">CEO LinkedIn</div>
                            <div className="text-xs text-muted-foreground">{displayProfile.ceo_name}</div>
                          </div>
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;