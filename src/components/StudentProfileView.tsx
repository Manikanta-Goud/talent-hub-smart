import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, Zap, ArrowLeft, Mail, Phone, Calendar, GraduationCap, User, X, FileText, Star, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentData {
  id: number;
  name: string;
  email: string;
  year: string;
  branch: string;
  cgpa: string;
  applications: number;
  interviews: number;
  offers: number;
  skills: string[];
  phone_number?: string;
  student_id?: string;
  university?: string;
  graduation_year?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
}

interface StudentProfileViewProps {
  student: StudentData;
  onClose: () => void;
}

const StudentProfileView = ({ student, onClose }: StudentProfileViewProps) => {
  const getUserInitials = () => {
    return student.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-primary text-white p-6 rounded-t-lg relative">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white/20">
              <AvatarFallback className="text-2xl bg-white/20 text-white">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold mb-2">{student.name}</h2>
              <p className="text-white/90 text-lg mb-1">{student.branch}</p>
              <p className="text-white/80">{student.university || "University Name"}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <Card className="shadow-medium">
            <CardHeader>
              <h3 className="text-xl font-semibold">Basic Information</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                    <p className="font-semibold">{student.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                    <p className="font-semibold">{student.phone_number || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                    <p className="font-semibold">{student.student_id || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Academic Year</p>
                    <p className="font-semibold">{student.year}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Performance */}
          <Card className="shadow-medium">
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Academic Performance
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{student.cgpa}</div>
                  <p className="text-sm text-muted-foreground">CGPA</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-info">{student.applications}</div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">{student.interviews}</div>
                  <p className="text-sm text-muted-foreground">Interviews</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{student.offers}</div>
                  <p className="text-sm text-muted-foreground">Offers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Section */}
          {student.skills && student.skills.length > 0 && (
            <Card className="shadow-medium">
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Skills & Technologies
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Professional Links */}
          <Card className="shadow-medium">
            <CardHeader>
              <h3 className="text-xl font-semibold">Professional Links</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {student.linkedin_url ? (
                  <Button variant="outline" className="h-12 justify-start" asChild>
                    <a href={student.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Users className="mr-3 h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-xs text-muted-foreground">Professional Profile</div>
                      </div>
                    </a>
                  </Button>
                ) : (
                  <div className="h-12 border border-dashed border-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    <span className="text-sm">No LinkedIn profile</span>
                  </div>
                )}
                
                {student.github_url ? (
                  <Button variant="outline" className="h-12 justify-start" asChild>
                    <a href={student.github_url} target="_blank" rel="noopener noreferrer">
                      <Brain className="mr-3 h-5 w-5 text-gray-800" />
                      <div className="text-left">
                        <div className="font-medium">GitHub</div>
                        <div className="text-xs text-muted-foreground">Code Repository</div>
                      </div>
                    </a>
                  </Button>
                ) : (
                  <div className="h-12 border border-dashed border-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    <span className="text-sm">No GitHub profile</span>
                  </div>
                )}
                
                {student.portfolio_url ? (
                  <Button variant="outline" className="h-12 justify-start" asChild>
                    <a href={student.portfolio_url} target="_blank" rel="noopener noreferrer">
                      <Zap className="mr-3 h-5 w-5 text-purple-600" />
                      <div className="text-left">
                        <div className="font-medium">Portfolio</div>
                        <div className="text-xs text-muted-foreground">Personal Website</div>
                      </div>
                    </a>
                  </Button>
                ) : (
                  <div className="h-12 border border-dashed border-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    <span className="text-sm">No portfolio</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Button>
            <Button variant="default">
              <FileText className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
            <Button variant="default">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileView;