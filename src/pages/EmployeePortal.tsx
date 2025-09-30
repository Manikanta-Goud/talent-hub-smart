import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Star, 
  Calendar,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Award,
  Clock,
  User,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeePortal = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock data for students seeking mentorship
  const studentsNeedingMentorship = [
    {
      id: 1,
      name: "Alex Johnson",
      course: "Computer Science Engineering",
      year: "3rd Year",
      university: "Indian Institute of Technology",
      skills: ["React", "Node.js", "Python"],
      interests: ["Full Stack Development", "Machine Learning"],
      query: "Looking for guidance on transitioning from academic projects to industry-level development",
      avatar: "AJ"
    },
    {
      id: 2,
      name: "Priya Sharma",
      course: "Information Technology",
      year: "4th Year", 
      university: "Indian Institute of Technology",
      skills: ["Java", "Spring Boot", "AWS"],
      interests: ["Cloud Computing", "DevOps"],
      query: "Need advice on cloud certifications and career path in DevOps",
      avatar: "PS"
    },
    {
      id: 3,
      name: "Rahul Verma",
      course: "Electronics and Communication",
      year: "2nd Year",
      university: "Indian Institute of Technology", 
      skills: ["Python", "Arduino", "IoT"],
      interests: ["Embedded Systems", "IoT Development"],
      query: "Want to learn about real-world IoT applications and industry trends",
      avatar: "RV"
    }
  ];

  // Mock mentorship analytics
  const mentorshipStats = {
    studentsHelped: 24,
    sessionsCompleted: 18,
    avgRating: 4.8,
    knowledgeShared: 156,
    impactScore: 92
  };

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      student: "Ananya Patel",
      topic: "React Best Practices",
      time: "Today, 3:00 PM",
      duration: "1 hour"
    },
    {
      id: 2,
      student: "Karthik Nair",
      topic: "System Design Interview Prep",
      time: "Tomorrow, 10:00 AM", 
      duration: "45 minutes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Employee Portal</h1>
                  <p className="text-sm text-muted-foreground">Knowledge Sharing Hub</p>
                </div>
              </div>
            </div>
            <Badge className="bg-campus-secondary text-white">
              <Briefcase className="w-4 h-4 mr-1" />
              Mentor
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Sessions
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <Card className="border-0 bg-gradient-secondary text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Mentorship Impact
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Your contribution to bridging the industry-academia gap
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Students Helped</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mentorshipStats.studentsHelped}</div>
                    <p className="text-xs text-success">+5 this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mentorshipStats.sessionsCompleted}</div>
                    <p className="text-xs text-success">+3 this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex items-center gap-1">
                      {mentorshipStats.avgRating}
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-xs text-success">Excellent</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Knowledge Shared</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mentorshipStats.knowledgeShared}</div>
                    <p className="text-xs text-success">Articles & Tips</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Impact Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mentorshipStats.impactScore}%</div>
                    <p className="text-xs text-success">Outstanding</p>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Mentorship Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-campus-surface rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{session.student}</p>
                          <p className="text-sm text-muted-foreground">{session.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{session.time}</p>
                        <p className="text-xs text-muted-foreground">{session.duration}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Students Seeking Mentorship
                  </CardTitle>
                  <CardDescription>
                    Students looking for guidance and real-world industry insights
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid gap-4">
                {studentsNeedingMentorship.map((student) => (
                  <Card key={student.id} className="hover:shadow-soft transition-smooth">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-campus-primary text-white">
                              {student.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-lg">{student.name}</CardTitle>
                              <Badge variant="outline">{student.year}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                              <span>🎓 {student.course}</span>
                              <span>🏫 {student.university}</span>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm font-medium mb-2">Query:</p>
                              <p className="text-sm text-muted-foreground italic">"{student.query}"</p>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium">Skills: </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {student.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Interests: </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {student.interests.map((interest, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {interest}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="employee" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Session
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Knowledge Base Tab */}
          <TabsContent value="knowledge">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Share Your Knowledge
                  </CardTitle>
                  <CardDescription>
                    Help students by sharing your industry experience and insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Article Title</Label>
                    <Input id="title" placeholder="e.g., Best Practices for Code Reviews in Agile Teams" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="e.g., Software Development, Career Advice, Industry Trends" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Share your insights, experiences, tips, and advice that could help students..."
                      rows={8}
                    />
                  </div>
                  <Button className="w-full" variant="employee">
                    <Send className="w-4 h-4 mr-2" />
                    Publish Article
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recently Shared Knowledge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-campus-surface rounded-lg">
                      <h4 className="font-medium">How to Ace Technical Interviews</h4>
                      <p className="text-sm text-muted-foreground">Published 2 days ago • 45 views • 8 likes</p>
                    </div>
                    <div className="p-4 bg-campus-surface rounded-lg">
                      <h4 className="font-medium">Transitioning from College to Corporate Culture</h4>
                      <p className="text-sm text-muted-foreground">Published 1 week ago • 123 views • 19 likes</p>
                    </div>
                    <div className="p-4 bg-campus-surface rounded-lg">
                      <h4 className="font-medium">Building a Strong Professional Network</h4>
                      <p className="text-sm text-muted-foreground">Published 2 weeks ago • 89 views • 15 likes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Mentorship Sessions
                  </CardTitle>
                  <CardDescription>
                    Manage your mentoring sessions and availability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Session Management</h3>
                    <p className="text-muted-foreground mb-4">
                      Set your availability and manage mentorship sessions
                    </p>
                    <Button variant="employee">
                      Set Availability
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeePortal;