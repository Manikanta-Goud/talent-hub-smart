import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentProfileView from "@/components/StudentProfileView";
import { 
  Settings, 
  Plus, 
  Users, 
  Building, 
  BarChart3, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Target,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Filter,
  Download,
  FileText,
  UserCheck,
  MapPin,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TPOPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddingOpportunity, setIsAddingOpportunity] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const opportunities = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      type: "Internship",
      location: "Bangalore",
      stipend: "₹25,000/month",
      deadline: "2024-01-15",
      applicants: 45,
      status: "Active",
      skills: ["React", "Node.js", "JavaScript"],
      posted: "2024-01-01",
      description: "Join our dynamic team to build cutting-edge web applications."
    },
    {
      id: 2,
      title: "ML Research Intern",
      company: "DataSense Labs",
      type: "Internship",
      location: "Hyderabad",
      stipend: "₹30,000/month",
      deadline: "2024-01-20",
      applicants: 32,
      status: "Active",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      posted: "2024-01-03",
      description: "Research and develop innovative ML algorithms."
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "StartupHub",
      type: "Full-time",
      location: "Mumbai",
      stipend: "₹8,00,000/year",
      deadline: "2024-01-25",
      applicants: 28,
      status: "Draft",
      skills: ["React", "Vue.js", "CSS"],
      posted: "2024-01-05",
      description: "Create amazing user experiences in a startup environment."
    }
  ];

  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@college.edu",
      year: "3rd Year",
      branch: "Computer Science Engineering",
      cgpa: "8.5",
      applications: 5,
      interviews: 3,
      offers: 1,
      skills: ["React", "Node.js", "Python", "Machine Learning", "JavaScript", "MongoDB"],
      phone_number: "+91 9876543210",
      student_id: "CS21B1001",
      university: "Indian Institute of Technology",
      graduation_year: "2025",
      linkedin_url: "https://linkedin.com/in/alexjohnson",
      github_url: "https://github.com/alexjohnson",
      portfolio_url: "https://alexjohnson.dev"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@college.edu",
      year: "4th Year",
      branch: "Information Technology",
      cgpa: "9.1",
      applications: 8,
      interviews: 6,
      offers: 2,
      skills: ["Java", "Spring Boot", "AWS", "Docker", "Kubernetes", "Microservices"],
      phone_number: "+91 9876543211",
      student_id: "IT20B1025",
      university: "Indian Institute of Technology",
      graduation_year: "2024",
      linkedin_url: "https://linkedin.com/in/priyasharma",
      github_url: "https://github.com/priyasharma",
      portfolio_url: null
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul.verma@college.edu",
      year: "3rd Year",
      branch: "Electronics and Communication Engineering",
      cgpa: "8.2",
      applications: 3,
      interviews: 1,
      offers: 0,
      skills: ["Python", "TensorFlow", "OpenCV", "Arduino", "MATLAB", "Embedded Systems"],
      phone_number: "+91 9876543212",
      student_id: "EC21B1055",
      university: "Indian Institute of Technology",
      graduation_year: "2025",
      linkedin_url: "https://linkedin.com/in/rahulverma",
      github_url: null,
      portfolio_url: null
    }
  ];

  const analyticsData = {
    totalApplications: 156,
    totalInterviews: 89,
    totalOffers: 34,
    placementRate: 78,
    avgSalary: "6.8 LPA",
    topSkills: ["React", "Python", "Java", "Machine Learning", "Node.js"]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-success text-success-foreground';
      case 'draft': return 'bg-warning text-warning-foreground';
      case 'closed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleAddOpportunity = () => {
    toast({
      title: "Opportunity Created!",
      description: "New opportunity has been successfully posted and is now live.",
    });
    setIsAddingOpportunity(false);
  };

  const handleDeleteOpportunity = (id: number) => {
    toast({
      title: "Opportunity Deleted",
      description: "The opportunity has been removed from the platform.",
      variant: "destructive"
    });
  };

  const handleViewStudentProfile = (student: any) => {
    setSelectedStudent(student);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-campus-surface-elevated/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">TPO Portal</h1>
                  <p className="text-sm text-muted-foreground">Placement Control Center</p>
                </div>
              </div>
            </div>
            <Badge className="bg-campus-secondary text-white">
              <Target className="w-4 h-4 mr-1" />
              Administrator
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Opportunities
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <Card className="border-0 bg-gradient-secondary text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Placement Overview
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Real-time insights into campus placement activities
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.totalApplications}</div>
                    <p className="text-xs text-success">+12 today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Interviews Scheduled</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.totalInterviews}</div>
                    <p className="text-xs text-info">+5 this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Offers Received</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.totalOffers}</div>
                    <p className="text-xs text-success">+3 today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Placement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.placementRate}%</div>
                    <p className="text-xs text-success">Above target</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New application received</p>
                        <p className="text-xs text-muted-foreground">Alex Johnson applied to TechCorp Solutions</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2m ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-info" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Interview scheduled</p>
                        <p className="text-xs text-muted-foreground">Priya Sharma - DataSense Labs</p>
                      </div>
                      <span className="text-xs text-muted-foreground">15m ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-warning" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Offer received</p>
                        <p className="text-xs text-muted-foreground">Rahul Verma got offer from StartupHub</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1h ago</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top In-Demand Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyticsData.topSkills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{skill}</span>
                          <Badge variant="secondary">{Math.floor(Math.random() * 50) + 20}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Manage Opportunities</h2>
                  <p className="text-muted-foreground">Post and manage internship and job opportunities</p>
                </div>
                <Button 
                  variant="tpo" 
                  onClick={() => setIsAddingOpportunity(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Opportunity
                </Button>
              </div>

              {isAddingOpportunity && (
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Opportunity</CardTitle>
                    <CardDescription>Fill in the details to post a new opportunity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" placeholder="e.g., Software Developer Intern" />
                      </div>
                      <div>
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" placeholder="e.g., TechCorp Solutions" />
                      </div>
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g., Bangalore" />
                      </div>
                      <div>
                        <Label htmlFor="stipend">Stipend/Salary</Label>
                        <Input id="stipend" placeholder="e.g., ₹25,000/month" />
                      </div>
                      <div>
                        <Label htmlFor="deadline">Application Deadline</Label>
                        <Input id="deadline" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                      <Input id="skills" placeholder="e.g., React, Node.js, JavaScript" />
                    </div>
                    <div>
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea id="description" placeholder="Describe the role and responsibilities..." rows={4} />
                    </div>
                    <div className="flex gap-3">
                      <Button variant="tpo" onClick={handleAddOpportunity}>
                        <Plus className="w-4 h-4 mr-2" />
                        Post Opportunity
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddingOpportunity(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {opportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-medium transition-spring">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                            <Badge className={getStatusColor(opportunity.status)}>
                              {opportunity.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-muted-foreground mb-3">
                            <span className="font-semibold text-foreground">{opportunity.company}</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {opportunity.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {opportunity.applicants} applicants
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-3">{opportunity.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-success">{opportunity.stipend}</div>
                          <div className="text-sm text-muted-foreground">Deadline: {opportunity.deadline}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Applications ({opportunity.applicants})
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteOpportunity(opportunity.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Student Management</h2>
                  <p className="text-muted-foreground">Monitor student profiles and placement progress</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {students.map((student) => (
                  <Card key={student.id} className="hover:shadow-soft transition-smooth">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">{student.name}</CardTitle>
                            <Badge variant="outline">{student.year}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                            <span>📧 {student.email}</span>
                            <span>🎓 {student.branch}</span>
                            <span>📊 CGPA: {student.cgpa}</span>
                            <span>📄 {student.applications} Applications</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {student.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {student.skills.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{student.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex gap-4 text-sm">
                            <span className="text-info">🎤 {student.interviews} Interviews</span>
                            <span className="text-success">✅ {student.offers} Offers</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewStudentProfile(student)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Application History
                        </Button>
                        <Button variant="tpo" size="sm">
                          <UserCheck className="w-4 h-4 mr-2" />
                          Send Opportunity
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Company Management
                  </CardTitle>
                  <CardDescription>
                    Manage company partnerships and recruitment drives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Building className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Company management features coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Advanced Analytics
                  </CardTitle>
                  <CardDescription>
                    Comprehensive insights and placement performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Advanced analytics dashboard coming in Phase 3...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentProfileView 
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default TPOPortal;