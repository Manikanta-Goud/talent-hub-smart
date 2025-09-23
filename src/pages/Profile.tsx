import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Users, Zap, ArrowLeft, Edit, Mail, Phone, Calendar, GraduationCap, User, Save, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, userProfile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState({
    full_name: userProfile?.full_name || '',
    email: userProfile?.email || '',
    phone_number: userProfile?.phone_number || '',
    student_id: userProfile?.student_id || '',
    university: userProfile?.university || '',
    course: userProfile?.course || '',
    graduation_year: userProfile?.graduation_year?.toString() || '',
    skills: userProfile?.skills ? userProfile.skills.join(', ') : '',
    linkedin_url: userProfile?.linkedin_url || '',
    github_url: userProfile?.github_url || '',
    portfolio_url: userProfile?.portfolio_url || ''
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
        student_id: userProfile.student_id || '',
        university: userProfile.university || '',
        course: userProfile.course || '',
        graduation_year: userProfile.graduation_year?.toString() || '',
        skills: userProfile.skills ? userProfile.skills.join(', ') : '',
        linkedin_url: userProfile.linkedin_url || '',
        github_url: userProfile.github_url || '',
        portfolio_url: userProfile.portfolio_url || ''
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
        full_name: userProfile.full_name || '',
        email: userProfile.email || '',
        phone_number: userProfile.phone_number || '',
        student_id: userProfile.student_id || '',
        university: userProfile.university || '',
        course: userProfile.course || '',
        graduation_year: userProfile.graduation_year?.toString() || '',
        skills: userProfile.skills ? userProfile.skills.join(', ') : '',
        linkedin_url: userProfile.linkedin_url || '',
        github_url: userProfile.github_url || '',
        portfolio_url: userProfile.portfolio_url || ''
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

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
            <p className="text-muted-foreground mb-4">
              It looks like your profile hasn't been set up yet.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
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
              <div className="absolute top-4 right-4">
                {isEditing ? (
                  <div className="flex gap-2">
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
                  </div>
                ) : (
                  <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-white/20">
                  <AvatarImage src={userProfile?.resume_url} alt={userProfile?.full_name} />
                  <AvatarFallback className="text-2xl bg-white/20 text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{userProfile?.full_name}</h2>
                  <p className="text-white/90 text-lg mb-1">{userProfile?.course}</p>
                  <p className="text-white/80">{userProfile?.university}</p>
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
                    <div className="space-y-2">
                      <Label htmlFor="student_id">Student ID</Label>
                      <Input
                        id="student_id"
                        value={editData.student_id}
                        onChange={(e) => handleEditChange('student_id', e.target.value)}
                        placeholder="Enter your student ID"
                      />
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-2">
                    <Label htmlFor="university">University *</Label>
                    <Input
                      id="university"
                      value={editData.university}
                      onChange={(e) => handleEditChange('university', e.target.value)}
                      placeholder="Enter your university name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">Course *</Label>
                      <Select value={editData.course} onValueChange={(value) => handleEditChange('course', value)}>
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
                      <Label htmlFor="graduation_year">Graduation Year</Label>
                      <Select value={editData.graduation_year} onValueChange={(value) => handleEditChange('graduation_year', value)}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                      <p className="font-semibold">{userProfile?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                      <p className="font-semibold">{userProfile?.phone_number || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                      <p className="font-semibold">{userProfile?.student_id || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Graduation Year</p>
                      <p className="font-semibold">{userProfile?.graduation_year || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills Section */}
          {!isEditing && userProfile?.skills && userProfile.skills.length > 0 && (
            <Card className="mb-8 shadow-medium">
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Skills & Technologies
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Links Section */}
          {!isEditing && (
            <Card className="shadow-medium">
              <CardHeader>
                <h3 className="text-xl font-semibold">Professional Links</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userProfile?.linkedin_url && (
                    <Button variant="outline" className="h-12 justify-start" asChild>
                      <a href={userProfile.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Users className="mr-3 h-5 w-5 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">LinkedIn</div>
                          <div className="text-xs text-muted-foreground">Professional Profile</div>
                        </div>
                      </a>
                    </Button>
                  )}
                  
                  {userProfile?.github_url && (
                    <Button variant="outline" className="h-12 justify-start" asChild>
                      <a href={userProfile.github_url} target="_blank" rel="noopener noreferrer">
                        <Brain className="mr-3 h-5 w-5 text-gray-800" />
                        <div className="text-left">
                          <div className="font-medium">GitHub</div>
                          <div className="text-xs text-muted-foreground">Code Repository</div>
                        </div>
                      </a>
                    </Button>
                  )}
                  
                  {userProfile?.portfolio_url && (
                    <Button variant="outline" className="h-12 justify-start" asChild>
                      <a href={userProfile.portfolio_url} target="_blank" rel="noopener noreferrer">
                        <Zap className="mr-3 h-5 w-5 text-purple-600" />
                        <div className="text-left">
                          <div className="font-medium">Portfolio</div>
                          <div className="text-xs text-muted-foreground">Personal Website</div>
                        </div>
                      </a>
                    </Button>
                  )}
                  
                  {(!userProfile?.linkedin_url && !userProfile?.github_url && !userProfile?.portfolio_url) && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No professional links added yet.</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Add Links
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;