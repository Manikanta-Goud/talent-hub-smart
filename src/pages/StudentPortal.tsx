import { useState } from "react";
import AIAssistant from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Search, 
  Brain, 
  Briefcase, 
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
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const StudentPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample user name for header - this could come from auth context
  const userName = "Alex Johnson";

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
            <Badge className="bg-campus-primary text-white">
              <Star className="w-4 h-4 mr-1" />
              Premium Student
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Opportunities
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              My Applications
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <div className="space-y-6">
              <Card className="border-0 bg-gradient-primary text-white">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5" />
                    <CardTitle>AI-Powered Recommendations</CardTitle>
                  </div>
                  <CardDescription className="text-white/80">
                    Your personalized opportunity feed based on skills, interests, and career goals
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Opportunities</Label>
                  <Input
                    id="search"
                    placeholder="Search by company, role, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button variant="student" className="self-end">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="grid gap-4">
                {filteredOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="group hover:shadow-medium transition-spring">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                            <Badge className="bg-gradient-secondary text-white">
                              <Target className="w-3 h-3 mr-1" />
                              {opportunity.matchScore}% Match
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-muted-foreground mb-3">
                            <span className="font-semibold text-foreground">{opportunity.company}</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {opportunity.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {opportunity.duration}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-3">{opportunity.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
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
                        <Button 
                          variant="student" 
                          onClick={() => handleApply(opportunity.id)}
                          className="flex-1"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Quick Apply
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
    </div>
  );
};

export default StudentPortal;