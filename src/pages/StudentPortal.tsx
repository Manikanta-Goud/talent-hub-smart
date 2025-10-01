import { useState } from "react";
import AIAssistant from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Communication from "@/components/Communication";
import { 
  User, 
  Search, 
  Brain, 
  Clock, 
  MapPin, 
  Star, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
  ArrowLeft,
  Sparkles,
  Target,
  FileText,
  Calendar,
  LogOut,
  Users,
  BarChart3,
  MessageSquare,
  Send,
  Phone,
  Mail,
  Filter,
  Briefcase,
  DollarSign,
  Heart,
  Share2,
  Zap,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const StudentPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, userProfile, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommunication, setShowCommunication] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Student opportunities data
  const studentOpportunities = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹25,000/month",
      description: "Join our dynamic team to build cutting-edge web applications.",
      skills: ["React", "Node.js", "JavaScript"],
      type: "internship",
      deadline: "2024-02-15",
      applicants: 45,
      featured: true
    },
    {
      id: 2,
      title: "ML Research Intern",
      company: "DataSense Labs",
      location: "Hyderabad",
      duration: "4 months", 
      stipend: "₹30,000/month",
      description: "Research and develop innovative ML algorithms.",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      type: "internship",
      deadline: "2024-02-20",
      applicants: 32,
      featured: false
    },
    {
      id: 3,
      title: "Data Science Internship",
      company: "Analytics Pro",
      location: "Chennai",
      duration: "5 months",
      stipend: "₹28,000/month", 
      description: "Work on real-world data science projects with experienced mentors.",
      skills: ["Python", "R", "SQL", "Tableau"],
      type: "internship",
      deadline: "2024-02-25",
      applicants: 28,
      featured: false
    },
    {
      id: 4,
      title: "Smart India Hackathon 2024",
      company: "Government of India",
      location: "Multiple Cities",
      duration: "48 hours",
      stipend: "₹1,00,000 prize",
      description: "Nation's biggest hackathon for innovative solutions.",
      skills: ["Innovation", "Problem Solving", "Technology"],
      type: "hackathon",
      deadline: "2024-03-01",
      applicants: 150,
      featured: true
    },
    {
      id: 5,
      title: "Google Summer of Code",
      company: "Google",
      location: "Remote",
      duration: "3 months",
      stipend: "$6,000",
      description: "Contribute to open source projects mentored by Google.",
      skills: ["Open Source", "Programming", "Git"],
      type: "competition",
      deadline: "2024-04-02",
      applicants: 89,
      featured: true
    }
  ];

  const [filteredStudentOpportunities, setFilteredStudentOpportunities] = useState(studentOpportunities);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOpportunities = (type: string) => {
    setSelectedFilter(type);
    if (type === 'all') {
      setFilteredStudentOpportunities(studentOpportunities);
    } else {
      setFilteredStudentOpportunities(studentOpportunities.filter(opp => opp.type === type));
    }
  };

  // Sample user name for header - this could come from auth context
  const userName = "Alex Johnson";

  // Check user role for privacy controls
  const isTPOUser = userProfile?.role === 'tpo';
  const isStudentUser = userProfile?.role === 'student' || user?.email === 'student@gmail.com';
  const isEmployeeUser = userProfile?.role === 'employee' || user?.email === 'employee@gmail.com';

  // Privacy-controlled student data based on user role
  const getStudentData = () => {
    const baseStudentData = [
      { name: "Arjun Mehta", course: "Computer Science", year: "3rd Year", status: "online", avatar: "AM" },
      { name: "Priya Patel", course: "Data Science", year: "2nd Year", status: "online", avatar: "PP" },
      { name: "Rohit Sharma", course: "Software Engineering", year: "4th Year", status: "offline", avatar: "RS" },
      { name: "Sneha Reddy", course: "AI & ML", year: "3rd Year", status: "online", avatar: "SR" },
      { name: "Karan Singh", course: "Computer Science", year: "2nd Year", status: "offline", avatar: "KS" },
      { name: "Ananya Das", course: "Data Science", year: "4th Year", status: "online", avatar: "AD" }
    ];

    if (isTPOUser) {
      // TPO can see basic information only (name, course, year) - no personal details
      return baseStudentData.map(student => ({
        name: student.name,
        course: student.course,
        year: student.year,
        avatar: student.avatar,
        status: "Privacy Protected", // Hide online status
        mutual: "Information Protected", // Hide mutual friends
        hideActions: true // Hide contact actions
      }));
    } else if (isStudentUser) {
      // Students can see other students' info with mutual connections
      return baseStudentData.map(student => ({
        ...student,
        mutual: Math.floor(Math.random() * 8) + 1 + " mutual friends",
        hideActions: false
      }));
    } else {
      // Employees get very limited access - only names and general info
      return baseStudentData.map(student => ({
        name: student.name,
        course: "Information Protected",
        year: "Protected",
        avatar: student.avatar,
        status: "Privacy Protected",
        mutual: "Information Protected",
        hideActions: true
      }));
    }
  };

  const handleRequestMentorship = (mentor) => {
    toast({
      title: "Mentorship Request Sent!",
      description: `Your request has been sent to ${mentor.name}. They will respond within ${mentor.responseTime}.`,
      variant: "default",
    });
  };

  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
    setShowProfileModal(true);
  };

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

  const opportunities = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      location: "Bangalore",
      type: "Internship",
      duration: "6 months",
      stipend: "₹25,000/month",
      matchScore: 95,
      skills: ["React", "Node.js", "JavaScript"],
      deadline: "2024-01-15",
      status: "new",
      description: "Join our dynamic team to build cutting-edge web applications."
    },
    {
      id: 2,
      title: "ML Research Intern",
      company: "DataSense Labs",
      location: "Hyderabad", 
      type: "Internship",
      duration: "4 months",
      stipend: "₹30,000/month",
      matchScore: 92,
      skills: ["Python", "Machine Learning", "TensorFlow"],
      deadline: "2024-01-20",
      status: "new",
      description: "Research and develop innovative ML algorithms for real-world applications."
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "StartupHub",
      location: "Mumbai",
      type: "Full-time",
      duration: "Permanent",
      stipend: "₹8,00,000/year",
      matchScore: 88,
      skills: ["React", "Node.js", "MongoDB"],
      deadline: "2024-01-25",
      status: "new",
      description: "Build scalable applications in a fast-paced startup environment."
    }
  ];

  const applications = [
    {
      id: 1,
      company: "TechStart Inc.",
      position: "Frontend Developer Intern",
      appliedDate: "2024-01-10",
      status: "Under Review",
      stage: "Technical Round",
      progress: 60
    },
    {
      id: 2,
      company: "InnovateLabs",
      position: "Data Science Intern",
      appliedDate: "2024-01-08",
      status: "Interview Scheduled",
      stage: "HR Round",
      progress: 80
    },
    {
      id: 3,
      company: "CodeCraft",
      position: "Backend Developer",
      appliedDate: "2024-01-05",
      status: "Offer Received",
      stage: "Final Decision",
      progress: 100
    }
  ];

  // Available employees/mentors for student view (limited info for privacy)
  const availableEmployees = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      avatar: "SC",
      rating: 4.9,
      totalMentees: 45,
      expertise: ["React", "Node.js", "System Design", "Career Guidance"],
      experience: "5+ years",
      bio: "Passionate about helping students transition from academia to industry. Specialized in full-stack development and system architecture.",
      availability: "Available",
      responseTime: "Usually responds within 2 hours",
      languages: ["English", "Mandarin"],
      location: "Bangalore"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      title: "Machine Learning Engineer",
      company: "Microsoft",
      avatar: "RK",
      rating: 4.8,
      totalMentees: 38,
      expertise: ["Python", "Machine Learning", "Data Science", "AI"],
      experience: "6+ years",
      bio: "ML enthusiast with expertise in deep learning and computer vision. Love guiding students in their AI journey.",
      availability: "Available",
      responseTime: "Usually responds within 1 hour",
      languages: ["English", "Hindi"],
      location: "Hyderabad"
    },
    {
      id: 3,
      name: "Priya Sharma",
      title: "DevOps Engineer",
      company: "Amazon",
      avatar: "PS",
      rating: 4.7,
      totalMentees: 32,
      expertise: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      experience: "4+ years",
      bio: "Cloud infrastructure expert helping students understand modern DevOps practices and cloud technologies.",
      availability: "Busy - Limited slots",
      responseTime: "Usually responds within 4 hours",
      languages: ["English"],
      location: "Mumbai"
    },
    {
      id: 4,
      name: "David Wilson",
      title: "Product Manager",
      company: "Meta",
      avatar: "DW",
      rating: 4.9,
      totalMentees: 28,
      expertise: ["Product Strategy", "User Research", "Analytics", "Leadership"],
      experience: "7+ years",
      bio: "Product management veteran helping students understand the business side of technology and product development.",
      availability: "Available",
      responseTime: "Usually responds within 3 hours",
      languages: ["English"],
      location: "Bangalore"
    },
    {
      id: 5,
      name: "Anita Desai",
      title: "Cybersecurity Specialist",
      company: "IBM",
      avatar: "AD",
      rating: 4.8,
      totalMentees: 25,
      expertise: ["Cybersecurity", "Ethical Hacking", "Network Security", "Compliance"],
      experience: "8+ years",
      bio: "Cybersecurity expert passionate about making the digital world safer. Guiding next-gen security professionals.",
      availability: "Available",
      responseTime: "Usually responds within 2 hours",
      languages: ["English", "Hindi"],
      location: "Delhi"
    },
    {
      id: 6,
      name: "Michael Zhang",
      title: "Frontend Architect",
      company: "Netflix",
      avatar: "MZ",
      rating: 4.9,
      totalMentees: 52,
      expertise: ["React", "TypeScript", "UI/UX", "Performance Optimization"],
      experience: "6+ years",
      bio: "Frontend specialist with a passion for creating amazing user experiences. Helping students master modern web development.",
      availability: "Available",
      responseTime: "Usually responds within 1 hour",
      languages: ["English", "Mandarin"],
      location: "Bangalore"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'offer received': return 'bg-success text-success-foreground';
      case 'interview scheduled': return 'bg-info text-info-foreground';
      case 'under review': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-info';
    if (score >= 70) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleApply = (opportunityId: number) => {
    toast({
      title: "Application Submitted!",
      description: "Your application has been successfully submitted. You'll receive updates on your dashboard.",
    });
  };

  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Student Portal</h1>
                  <p className="text-sm text-muted-foreground">Welcome back, {userName}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-campus-primary text-white">
                <Star className="w-4 h-4 mr-1" />
                Premium Student
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCommunication(true)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Communicate
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Opportunities
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="employee-portal" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Find Mentors
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              My Applications
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <Card className="border-0 bg-gradient-primary text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Student Dashboard
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Your academic and career progress overview
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <p className="text-sm text-muted-foreground">Applications Sent</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">8</div>
                    <p className="text-sm text-muted-foreground">Mentors Connected</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                    <p className="text-sm text-muted-foreground">Profile Completion</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">Application submitted to TechCorp</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium">Received mentorship request approval</p>
                      <p className="text-sm text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">Interview scheduled with DataSense Labs</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goals Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Goals Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Internship Applications</span>
                      <span className="text-sm text-muted-foreground">12/15</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Skill Development</span>
                      <span className="text-sm text-muted-foreground">6/10</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Network Building</span>
                      <span className="text-sm text-muted-foreground">8/12</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Career Opportunities</h2>
                <p className="text-muted-foreground">
                  Discover internships, hackathons, and competitions to boost your career
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter Opportunities
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => filterOpportunities('all')}
                className="rounded-full"
              >
                All Opportunities
              </Button>
              <Button
                variant={selectedFilter === 'internship' ? 'default' : 'outline'}
                size="sm"
                onClick={() => filterOpportunities('internship')}
                className="rounded-full"
              >
                <Briefcase className="w-4 h-4 mr-1" />
                Internships
              </Button>
              <Button
                variant={selectedFilter === 'hackathon' ? 'default' : 'outline'}
                size="sm"
                onClick={() => filterOpportunities('hackathon')}
                className="rounded-full"
              >
                <Zap className="w-4 h-4 mr-1" />
                Hackathons
              </Button>
              <Button
                variant={selectedFilter === 'competition' ? 'default' : 'outline'}
                size="sm"
                onClick={() => filterOpportunities('competition')}
                className="rounded-full"
              >
                <Award className="w-4 h-4 mr-1" />
                Competitions
              </Button>
            </div>

            {/* Featured Opportunities */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">🌟 Featured Opportunities</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {filteredStudentOpportunities.filter(opp => opp.featured).map((opportunity) => (
                  <Card key={opportunity.id} className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{opportunity.title}</h4>
                            <p className="text-blue-600 font-medium">{opportunity.company}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Featured
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{opportunity.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{opportunity.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{opportunity.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">{opportunity.stipend}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{opportunity.applicants} applicants</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {opportunity.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {opportunity.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{opportunity.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Apply Now
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Opportunities */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">All Opportunities</h3>
              <div className="grid gap-4">
                {filteredStudentOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            opportunity.type === 'internship' ? 'bg-blue-100' :
                            opportunity.type === 'hackathon' ? 'bg-purple-100' : 'bg-yellow-100'
                          }`}>
                            <Briefcase className={`w-5 h-5 ${
                              opportunity.type === 'internship' ? 'text-blue-600' :
                              opportunity.type === 'hackathon' ? 'text-purple-600' : 'text-yellow-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{opportunity.title}</h4>
                            <p className="text-gray-600">{opportunity.company}</p>
                          </div>
                        </div>
                        <Badge variant={
                          opportunity.type === 'internship' ? 'default' :
                          opportunity.type === 'hackathon' ? 'secondary' : 'outline'
                        }>
                          {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{opportunity.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{opportunity.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{opportunity.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">{opportunity.stipend}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{opportunity.applicants} applicants</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {opportunity.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Apply Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                  <Users className="w-8 h-8 text-blue-600" />
                  Your Study Circle
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
                  Connect with fellow students, share knowledge, and build lasting friendships that support your academic journey.
                </p>
                
                {/* Privacy Notice */}
                <div className="max-w-3xl mx-auto mb-6">
                  <Card className={`border-2 ${
                    isTPOUser ? 'border-orange-200 bg-orange-50' : 
                    isEmployeeUser ? 'border-blue-200 bg-blue-50' : 
                    'border-green-200 bg-green-50'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className={`w-5 h-5 mt-0.5 ${
                          isTPOUser ? 'text-orange-600' : 
                          isEmployeeUser ? 'text-blue-600' : 
                          'text-green-600'
                        }`} />
                        <div className="text-left">
                          <h4 className={`font-semibold mb-2 ${
                            isTPOUser ? 'text-orange-800' : 
                            isEmployeeUser ? 'text-blue-800' : 
                            'text-green-800'
                          }`}>
                            Privacy Notice - {
                              isTPOUser ? 'TPO View' : 
                              isEmployeeUser ? 'Employee View' : 
                              'Student View'
                            }
                          </h4>
                          <p className={`text-sm ${
                            isTPOUser ? 'text-orange-700' : 
                            isEmployeeUser ? 'text-blue-700' : 
                            'text-green-700'
                          }`}>
                            {isTPOUser 
                              ? "As a TPO, you can see basic student information (names, courses, academic year) for administrative purposes. Personal details, contact information, and online status are protected for student privacy."
                              : isEmployeeUser 
                              ? "As an employee, you have limited access to student information to respect their privacy. Only basic academic information is visible to facilitate appropriate mentorship connections."
                              : "You can see other students' profiles and connect with them. Your privacy is protected - only basic academic and interest information is shared with other users."
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Friend Search */}
              <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search friends by name, course, or interests..." 
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Find Friends
                  </Button>
                </div>
              </Card>

              {/* Friends Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getStudentData().map((friend, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="h-16 w-16 border-2 border-green-200">
                            <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
                              {friend.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {!friend.hideActions && (
                            <div className={`absolute bottom-0 right-0 h-4 w-4 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white rounded-full`}></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{friend.name}</h3>
                            <Badge variant={friend.status === 'online' ? 'default' : friend.status.includes('Privacy') ? 'outline' : 'secondary'} className="text-xs">
                              {friend.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{friend.course}</p>
                          <p className="text-sm font-medium text-blue-600">{friend.year}</p>
                          <p className="text-xs text-muted-foreground mt-2">{friend.mutual}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {!friend.hideActions ? (
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" className="flex-1">
                            <User className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-xs text-muted-foreground">
                            {isTPOUser ? "TPO View - Basic Information Only" : "Access Restricted"}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Study Groups Section */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Users className="w-5 h-5" />
                    Study Groups
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">JavaScript Study Group</CardTitle>
                      <p className="text-sm text-muted-foreground">12 members • Active</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">Weekly coding sessions and project discussions</p>
                      <Button size="sm" variant="outline">Join Group</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Data Structures & Algorithms</CardTitle>
                      <p className="text-sm text-muted-foreground">8 members • Active</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">Daily problem solving and peer learning</p>
                      <Button size="sm" variant="outline">Join Group</Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          {/* Employee Portal Tab - For Students to view employees */}
          <TabsContent value="employee-portal">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                  <Users className="w-8 h-8 text-blue-600" />
                  Find Your Mentor
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Connect with industry professionals who are ready to guide you in your career journey. 
                  Get personalized mentorship from experienced employees across various fields.
                </p>
              </div>

              {/* Search Bar */}
              <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search mentors by expertise, company, or skills..." 
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter by Skills
                  </Button>
                </div>
              </Card>

              {/* Available Mentors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableEmployees.map((mentor) => (
                  <Card key={mentor.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border-2 border-blue-200">
                          <AvatarFallback className="bg-gradient-secondary text-white text-lg font-semibold">
                            {mentor.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{mentor.name}</h3>
                            <Badge variant={mentor.availability === 'Available' ? 'default' : 'secondary'} className="text-xs">
                              {mentor.availability}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{mentor.title}</p>
                          <p className="text-sm font-medium text-blue-600">{mentor.company}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{mentor.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{mentor.totalMentees} mentees</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{mentor.experience}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                      
                      {/* Expertise Tags */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Expertise:</p>
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertise.slice(0, 3).map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {mentor.expertise.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{mentor.expertise.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{mentor.responseTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>Languages: {mentor.languages.join(', ')}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex-1"
                          disabled={mentor.availability !== 'Available'}
                          onClick={() => handleRequestMentorship(mentor)}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Request Mentorship
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewProfile(mentor)}
                        >
                          <User className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Help Section */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Users className="w-5 h-5" />
                    How Mentorship Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h4 className="font-medium mb-2">Choose a Mentor</h4>
                    <p className="text-sm text-muted-foreground">Browse available mentors and find someone who matches your interests and goals.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <h4 className="font-medium mb-2">Send Request</h4>
                    <p className="text-sm text-muted-foreground">Send a mentorship request and wait for the mentor to accept your request.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <h4 className="font-medium mb-2">Learn & Grow</h4>
                    <p className="text-sm text-muted-foreground">Get personalized guidance and accelerate your career development.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Application Tracker
                  </CardTitle>
                  <CardDescription>
                    Monitor your application progress and upcoming interviews
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid gap-4">
                {applications.map((application) => (
                  <Card key={application.id} className="hover:shadow-soft transition-smooth">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{application.position}</CardTitle>
                          <p className="text-muted-foreground">{application.company}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Applied on {application.appliedDate}
                          </p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Current Stage: {application.stage}</span>
                            <span>{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} className="h-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            View Application
                          </Button>
                          {application.status === "Interview Scheduled" && (
                            <Button variant="student" size="sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              View Interview Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Applications Sent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-success">+3 this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Interview Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">67%</div>
                    <p className="text-xs text-info">Above average</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Avg Match Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-success">Excellent fit</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Application Performance</CardTitle>
                  <CardDescription>Your application success rate over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <TrendingUp className="w-8 h-8 mr-2" />
                    Analytics dashboard coming soon...
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant */}
      <AIAssistant />

      {/* Profile Modal */}
      {showProfileModal && selectedMentor && (
        <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-blue-200">
                  <AvatarFallback className="bg-gradient-secondary text-white text-lg font-semibold">
                    {selectedMentor.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedMentor.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMentor.title}</p>
                </div>
              </DialogTitle>
              <DialogDescription>
                Detailed profile and mentorship information for {selectedMentor.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Professional Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Company</Label>
                      <p className="font-medium text-blue-600">{selectedMentor.company}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Experience</Label>
                      <p className="font-medium">{selectedMentor.experience}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedMentor.location}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Availability</Label>
                      <Badge variant={selectedMentor.availability === 'Available' ? 'default' : 'secondary'}>
                        {selectedMentor.availability}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
                    <p className="text-sm mt-1">{selectedMentor.bio}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Expertise */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.expertise.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mentorship Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mentorship Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{selectedMentor.totalMentees}</div>
                      <p className="text-sm text-muted-foreground">Mentees</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                        <Star className="w-5 h-5 fill-current" />
                        {selectedMentor.rating}
                      </div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{selectedMentor.responseTime}</div>
                      <p className="text-sm text-muted-foreground">Response Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.languages.map((language, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1"
                  disabled={selectedMentor.availability !== 'Available'}
                  onClick={() => {
                    handleRequestMentorship(selectedMentor);
                    setShowProfileModal(false);
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Request Mentorship
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Communication Modal */}
      {showCommunication && (
        <Communication 
          onClose={() => setShowCommunication(false)}
          userRole="student"
        />
      )}
    </div>
  );
};

export default StudentPortal;