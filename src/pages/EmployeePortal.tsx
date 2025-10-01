import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Communication from "@/components/Communication";
import { 
  ArrowLeft, 
  Briefcase, 
  LogOut, 
  Users, 
  MessageSquare, 
  Star, 
  Clock, 
  User,
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Activity,
  GraduationCap,
  Send,
  DollarSign,
  Heart,
  Share2,
  Zap,
  Plus,
  Edit,
  MessageCircle,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const EmployeePortal = () => {
  const navigate = useNavigate();
  const { signOut, userProfile, user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommunication, setShowCommunication] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessage, setChatMessage] = useState("");

  // Employee opportunities data - job listings, internships, hackathons for employees
  const employeeOpportunities = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Solutions",
      location: "Bangalore",
      type: "full-time",
      salary: "₹15-25 LPA",
      experience: "3-5 years",
      description: "Join our team to build scalable web applications using React and Node.js.",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      posted: "2024-01-15",
      applications: 24,
      featured: true,
      remote: true
    },
    {
      id: 2,
      title: "ML Engineer",
      company: "DataSense Labs",
      location: "Hyderabad",
      type: "full-time",
      salary: "₹20-30 LPA",
      experience: "4-6 years",
      description: "Develop and deploy machine learning models at scale.",
      skills: ["Python", "TensorFlow", "MLOps", "Docker"],
      posted: "2024-01-18",
      applications: 18,
      featured: true,
      remote: false
    },
    {
      id: 3,
      title: "DevOps Specialist",
      company: "CloudTech",
      location: "Chennai",
      type: "full-time",
      salary: "₹18-28 LPA",
      experience: "3-5 years",
      description: "Manage cloud infrastructure and CI/CD pipelines.",
      skills: ["AWS", "Kubernetes", "Docker", "Jenkins"],
      posted: "2024-01-20",
      applications: 15,
      featured: false,
      remote: true
    },
    {
      id: 4,
      title: "Freelance UI/UX Designer",
      company: "Multiple Clients",
      location: "Remote",
      type: "freelance",
      salary: "₹50,000-₹1,00,000/project",
      experience: "2-4 years",
      description: "Design beautiful and intuitive user interfaces for web and mobile.",
      skills: ["Figma", "Sketch", "User Research", "Prototyping"],
      posted: "2024-01-25",
      applications: 8,
      featured: false,
      remote: true
    },
    {
      id: 5,
      title: "Tech Hackathon 2024",
      company: "Innovation Hub",
      location: "Multiple Cities",
      type: "hackathon",
      salary: "₹2,00,000 prize pool",
      experience: "All levels",
      description: "48-hour hackathon to build innovative tech solutions.",
      skills: ["Innovation", "Programming", "Teamwork", "Problem Solving"],
      posted: "2024-01-28",
      applications: 45,
      featured: true,
      remote: false
    },
    {
      id: 6,
      title: "Mentorship Program Lead",
      company: "TechMentors Inc",
      location: "Pune",
      type: "internship",
      salary: "₹30,000/month",
      experience: "1-2 years",
      description: "Lead mentorship programs for junior developers.",
      skills: ["Leadership", "Mentoring", "Communication", "Technical Skills"],
      posted: "2024-01-30",
      applications: 12,
      featured: false,
      remote: true
    }
  ];

  const [filteredOpportunities, setFilteredOpportunities] = useState(employeeOpportunities);
  const [opportunityFilter, setOpportunityFilter] = useState('all');

  const filterOpportunities = (type: string) => {
    setOpportunityFilter(type);
    if (type === 'all') {
      setFilteredOpportunities(employeeOpportunities);
    } else {
      setFilteredOpportunities(employeeOpportunities.filter(opp => opp.type === type));
    }
  };

  // Check if the current user is a student
  const isStudentUser = userProfile?.role === 'student' || user?.email === 'student@gmail.com';
  const isTPOUser = userProfile?.role === 'tpo';
  const isEmployeeUser = userProfile?.role === 'employee' || user?.email === 'employee@gmail.com';

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Privacy-controlled employee data based on user role
  const getEmployeeData = () => {
    const baseEmployeeData = [
      {
        id: 1, name: "Sarah Chen", title: "Senior Software Engineer", company: "Google", 
        avatar: "SC", rating: 4.9, totalMentees: 45, 
        expertise: ["React", "Node.js", "System Design", "Career Guidance"],
        email: "sarah.chen@google.com", phone: "+91-9876543210", 
        experience: "5+ years", department: "Frontend Engineering",
        availability: "Available", responseTime: "Usually responds within 2 hours",
        languages: ["English", "Mandarin"], location: "Bangalore"
      },
      {
        id: 2, name: "Rajesh Kumar", title: "Machine Learning Engineer", company: "Microsoft", 
        avatar: "RK", rating: 4.8, totalMentees: 38,
        expertise: ["Python", "Machine Learning", "Data Science", "AI"],
        email: "rajesh.kumar@microsoft.com", phone: "+91-9876543211",
        experience: "6+ years", department: "AI Research",
        availability: "Available", responseTime: "Usually responds within 1 hour",
        languages: ["English", "Hindi"], location: "Hyderabad"
      },
      {
        id: 3, name: "Priya Sharma", title: "DevOps Engineer", company: "Amazon", 
        avatar: "PS", rating: 4.7, totalMentees: 32,
        expertise: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        email: "priya.sharma@amazon.com", phone: "+91-9876543212",
        experience: "4+ years", department: "Infrastructure",
        availability: "Busy - Limited slots", responseTime: "Usually responds within 4 hours",
        languages: ["English"], location: "Mumbai"
      }
    ];

    if (isTPOUser) {
      // TPO can see basic professional information only
      return baseEmployeeData.map(emp => ({
        id: emp.id,
        name: emp.name,
        title: emp.title,
        company: emp.company,
        avatar: emp.avatar,
        department: emp.department,
        location: emp.location,
        expertise: emp.expertise.slice(0, 2), // Limit expertise shown
        email: "Protected for Privacy",
        phone: "Protected for Privacy",
        rating: "Hidden",
        totalMentees: "Protected",
        availability: "Contact via Platform",
        responseTime: "Contact via Platform",
        languages: ["Information Protected"],
        hidePersonalDetails: true
      }));
    } else if (isStudentUser) {
      // Students can see mentor information but limited personal details
      return baseEmployeeData.map(emp => ({
        ...emp,
        email: "Contact via Platform",
        phone: "Contact via Platform",
        hidePersonalDetails: false
      }));
    } else {
      // Employees can see colleague information
      return baseEmployeeData;
    }
  };

  // Privacy-controlled student data for employees
  const getStudentDataForEmployees = () => {
    const baseStudentData = [
      {
        id: 1, name: "Alex Kumar", program: "Computer Science", year: "3rd Year",
        university: "Indian Institute of Technology", avatar: "AK",
        skills: ["Java", "Python", "React"], interests: ["Web Development", "Machine Learning"],
        gpa: "8.5/10", projects: 5, internships: 2,
        lookingFor: "Software Development Internship", availability: "Available for mentorship",
        location: "Bangalore"
      },
      {
        id: 2, name: "Priya Sharma", program: "Information Technology", year: "2nd Year", 
        university: "National Institute of Technology", avatar: "PS",
        skills: ["C++", "Data Structures", "MySQL"], interests: ["Backend Development", "Database Design"],
        gpa: "9.2/10", projects: 3, internships: 1,
        lookingFor: "Backend Development Role", availability: "Seeking mentorship",
        location: "Mumbai"
      },
      {
        id: 3, name: "Rahul Patel", program: "Software Engineering", year: "4th Year",
        university: "Indian Institute of Information Technology", avatar: "RP",
        skills: ["JavaScript", "Node.js", "MongoDB"], interests: ["Full Stack Development", "DevOps"],
        gpa: "8.8/10", projects: 8, internships: 3,
        lookingFor: "Full Stack Developer Position", availability: "Open to opportunities",
        location: "Pune"
      }
    ];

    if (isTPOUser) {
      // TPO can see basic student information only
      return baseStudentData.map(student => ({
        id: student.id,
        name: student.name,
        program: student.program,
        year: student.year,
        university: student.university,
        avatar: student.avatar,
        skills: ["Information Protected"],
        interests: ["Information Protected"],
        gpa: "Protected",
        projects: "Protected",
        internships: "Protected",
        lookingFor: "Information Protected",
        availability: "Contact via Platform",
        location: student.location,
        hidePersonalDetails: true
      }));
    } else if (isEmployeeUser) {
      // Employees can see relevant mentorship information
      return baseStudentData;
    } else {
      // Students get very limited access to other students' data
      return baseStudentData.map(student => ({
        id: student.id,
        name: student.name,
        program: "Information Protected",
        year: student.year,
        university: "Protected",
        avatar: student.avatar,
        skills: ["Protected"],
        interests: ["Protected"],
        gpa: "Protected",
        projects: "Protected",
        internships: "Protected",
        lookingFor: "Protected",
        availability: "Protected",
        location: "Protected",
        hidePersonalDetails: true
      }));
    }
  };

  // Mock employee data for demonstration
  const employeeData = {
    name: userProfile?.full_name || "John Doe",
    email: user?.email || "employee@company.com",
    department: "Software Engineering",
    position: "Senior Software Engineer",
    employeeId: "EMP001",
    joinDate: "2023-01-15",
    location: "Bangalore, India",
    skills: ["React", "Node.js", "Python", "AWS", "Docker"],
    certifications: ["AWS Certified", "Scrum Master", "React Expert"],
    projects: 12,
    completedProjects: 10,
    currentProjects: 2
  };

  // Employee analytics data
  const analyticsData = {
    totalStudentsMentored: 45,
    activeMentorships: 8,
    completedSessions: 127,
    averageRating: 4.8,
    feedbackReceived: 42,
    hoursContributed: 156,
    skillsShared: 15,
    certificationsEarned: 3
  };

  // Employee conversation data
  const employeeConversations = [
    {
      id: 1,
      type: 'tpo',
      name: "Dr. Smith (TPO)",
      avatar: "DS",
      lastMessage: "Thank you for mentoring our students this semester",
      lastMessageTime: "1 hour ago",
      unread: 0,
      isOnline: true,
      status: "Training & Placement Officer",
      messages: [
        { id: 1, sender: "Dr. Smith", message: "Hi! How are your current mentees performing?", timestamp: "10:00 AM", isMe: false },
        { id: 2, sender: "Me", message: "They're doing great! Alex is showing excellent progress in React", timestamp: "10:15 AM", isMe: true },
        { id: 3, sender: "Dr. Smith", message: "Thank you for mentoring our students this semester", timestamp: "10:30 AM", isMe: false }
      ]
    },
    {
      id: 2,
      type: 'student',
      name: "Alex Kumar",
      avatar: "AK",
      lastMessage: "Could you review my project code?",
      lastMessageTime: "30 min ago",
      unread: 1,
      isOnline: true,
      status: "3rd Year CS Student, mentee",
      messages: [
        { id: 1, sender: "Alex Kumar", message: "Hi! I've completed the React component we discussed", timestamp: "2:00 PM", isMe: false },
        { id: 2, sender: "Me", message: "Excellent! Please share the code and I'll review it", timestamp: "2:05 PM", isMe: true },
        { id: 3, sender: "Alex Kumar", message: "Could you review my project code?", timestamp: "2:30 PM", isMe: false }
      ]
    },
    {
      id: 3,
      type: 'colleague',
      name: "Sarah Chen",
      avatar: "SC",
      lastMessage: "Want to collaborate on the ML workshop?",
      lastMessageTime: "2 hours ago",
      unread: 0,
      isOnline: false,
      status: "Senior ML Engineer at Google",
      messages: [
        { id: 1, sender: "Sarah Chen", message: "Hi! I'm organizing an ML workshop for students", timestamp: "1:00 PM", isMe: false },
        { id: 2, sender: "Me", message: "That sounds great! I'd love to help", timestamp: "1:15 PM", isMe: true },
        { id: 3, sender: "Sarah Chen", message: "Want to collaborate on the ML workshop?", timestamp: "1:30 PM", isMe: false }
      ]
    }
  ];

  // Employee notifications data
  const employeeNotifications = [
    {
      id: 1,
      type: "mentorship",
      title: "New Mentorship Request",
      message: "Priya Sharma wants you as a mentor for full-stack development",
      timestamp: "1 hour ago",
      isRead: false,
      priority: "medium",
      actionRequired: true
    },
    {
      id: 2,
      type: "opportunity",
      title: "Job Opportunity Match",
      message: "Senior React Developer position at TechCorp matches your profile",
      timestamp: "3 hours ago",
      isRead: true,
      priority: "high",
      actionRequired: false
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedChat) return;
    
    setChatMessage("");
    // Add toast notification here if needed
  };

  // Career advancement opportunities for employees
  const careerOpportunities = [
    {
      id: 1,
      title: "Senior Tech Lead Position",
      company: "Internal Promotion",
      department: "Engineering",
      location: "Bangalore, India",
      experience: "5+ years",
      type: "Full-time",
      description: "Lead a team of 8 engineers in developing next-gen products. Focus on technical architecture and team mentoring.",
      requirements: ["Leadership experience", "System design", "Team management", "Technical expertise"],
      benefits: ["40% salary increase", "Stock options", "Flexible hours", "Team leadership"],
      urgency: "Medium",
      applicationDeadline: "2024-02-15",
      matchScore: 92
    },
    {
      id: 2,
      title: "Product Manager - AI/ML",
      company: "Cross-functional",
      department: "Product",
      location: "Remote/Hybrid",
      experience: "3+ years",
      type: "Full-time",
      description: "Drive AI/ML product strategy and roadmap. Work with engineering and design teams to build innovative solutions.",
      requirements: ["Product strategy", "AI/ML knowledge", "Stakeholder management", "Data-driven decisions"],
      benefits: ["Career transition", "Skills development", "Product ownership", "Strategy influence"],
      urgency: "High",
      applicationDeadline: "2024-01-30",
      matchScore: 78
    },
    {
      id: 3,
      title: "Technical Architect",
      company: "Architecture Team",
      department: "Engineering",
      location: "Bangalore, India",
      experience: "6+ years",
      type: "Full-time",
      description: "Design and implement scalable system architectures. Guide technical decisions across multiple teams.",
      requirements: ["System design", "Scalability", "Cloud technologies", "Technical leadership"],
      benefits: ["Technical growth", "Architecture ownership", "Cross-team impact", "Skill advancement"],
      urgency: "Low",
      applicationDeadline: "2024-03-01",
      matchScore: 85
    },
    {
      id: 4,
      title: "Engineering Manager",
      company: "Management Track",
      department: "Engineering",
      location: "Bangalore, India",
      experience: "4+ years",
      type: "Full-time",
      description: "Manage engineering team performance, career development, and project delivery. Balance technical and people management.",
      requirements: ["Team management", "Performance management", "Technical background", "Communication"],
      benefits: ["Leadership role", "People development", "Strategic planning", "Management experience"],
      urgency: "Medium",
      applicationDeadline: "2024-02-20",
      matchScore: 88
    }
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, type: "mentorship", description: "Completed mentoring session with Alex Kumar", time: "2 hours ago", status: "completed" },
    { id: 2, type: "project", description: "Updated project documentation for TalentHub", time: "5 hours ago", status: "active" },
    { id: 3, type: "skill", description: "Added new skill: Machine Learning", time: "1 day ago", status: "completed" },
    { id: 4, type: "feedback", description: "Received 5-star rating from Sarah Johnson", time: "2 days ago", status: "positive" },
    { id: 5, type: "certification", description: "Completed AWS Solutions Architect course", time: "1 week ago", status: "completed" }
  ];

  // Current mentees
  const currentMentees = [
    { id: 1, name: "Alex Kumar", program: "Computer Science", year: "3rd Year", sessions: 5, nextSession: "Tomorrow 2:00 PM", progress: 75 },
    { id: 2, name: "Priya Sharma", program: "Information Technology", year: "2nd Year", sessions: 3, nextSession: "Friday 10:00 AM", progress: 60 },
    { id: 3, name: "Rahul Patel", program: "Software Engineering", year: "4th Year", sessions: 8, nextSession: "Monday 3:00 PM", progress: 90 },
    { id: 4, name: "Sneha Reddy", program: "Data Science", year: "1st Year", sessions: 2, nextSession: "Wednesday 1:00 PM", progress: 40 }
  ];

  // Available mentors for employee view (colleagues)
  const availableMentors = [
    {
      id: 1, name: "Sarah Chen", title: "Senior Software Engineer", company: "Google", 
      avatar: "SC", rating: 4.9, totalMentees: 45, 
      expertise: ["React", "Node.js", "System Design", "Career Guidance"],
      email: "sarah.chen@google.com", phone: "+91-9876543210", 
      experience: "5+ years", department: "Frontend Engineering",
      availability: "Available", responseTime: "Usually responds within 2 hours",
      languages: ["English", "Mandarin"], location: "Bangalore"
    },
    {
      id: 2, name: "Rajesh Kumar", title: "Machine Learning Engineer", company: "Microsoft", 
      avatar: "RK", rating: 4.8, totalMentees: 38,
      expertise: ["Python", "Machine Learning", "Data Science", "AI"],
      email: "rajesh.kumar@microsoft.com", phone: "+91-9876543211",
      experience: "6+ years", department: "AI Research",
      availability: "Available", responseTime: "Usually responds within 1 hour",
      languages: ["English", "Hindi"], location: "Hyderabad"
    },
    {
      id: 3, name: "Priya Sharma", title: "DevOps Engineer", company: "Amazon", 
      avatar: "PS", rating: 4.7, totalMentees: 32,
      expertise: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      email: "priya.sharma@amazon.com", phone: "+91-9876543212",
      experience: "4+ years", department: "Infrastructure",
      availability: "Busy - Limited slots", responseTime: "Usually responds within 4 hours",
      languages: ["English"], location: "Mumbai"
    }
  ];

  // Students data for employee view (limited info for privacy)
  const availableStudents = [
    {
      id: 1,
      name: "Alex Kumar",
      program: "Computer Science",
      year: "3rd Year",
      university: "Indian Institute of Technology",
      avatar: "AK",
      skills: ["Java", "Python", "React"],
      interests: ["Web Development", "Machine Learning"],
      gpa: "8.5/10",
      projects: 5,
      internships: 2,
      lookingFor: "Software Development Internship",
      availability: "Available for mentorship",
      location: "Bangalore"
    },
    {
      id: 2,
      name: "Priya Sharma",
      program: "Information Technology",
      year: "2nd Year", 
      university: "National Institute of Technology",
      avatar: "PS",
      skills: ["C++", "Data Structures", "MySQL"],
      interests: ["Backend Development", "Database Design"],
      gpa: "9.2/10",
      projects: 3,
      internships: 1,
      lookingFor: "Backend Development Role",
      availability: "Seeking mentorship",
      location: "Mumbai"
    },
    {
      id: 3,
      name: "Rahul Patel",
      program: "Software Engineering",
      year: "4th Year",
      university: "Indian Institute of Information Technology",
      avatar: "RP",
      skills: ["JavaScript", "Node.js", "MongoDB"],
      interests: ["Full Stack Development", "DevOps"],
      gpa: "8.8/10",
      projects: 8,
      internships: 3,
      lookingFor: "Full Stack Developer Position",
      availability: "Open to opportunities",
      location: "Pune"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      program: "Data Science",
      year: "1st Year",
      university: "Indian Statistical Institute",
      avatar: "SR",
      skills: ["Python", "R", "Statistics"],
      interests: ["Data Analytics", "AI Research"],
      gpa: "9.5/10",
      projects: 2,
      internships: 0,
      lookingFor: "Data Science Internship",
      availability: "Available for guidance",
      location: "Hyderabad"
    },
    {
      id: 5,
      name: "Arjun Singh",
      program: "Cybersecurity",
      year: "3rd Year",
      university: "Indian Institute of Technology",
      avatar: "AS",
      skills: ["Network Security", "Ethical Hacking", "Linux"],
      interests: ["Cybersecurity", "Penetration Testing"],
      gpa: "8.7/10",
      projects: 4,
      internships: 1,
      lookingFor: "Cybersecurity Analyst Role",
      availability: "Seeking mentorship",
      location: "Delhi"
    },
    {
      id: 6,
      name: "Kavya Nair",
      program: "Mobile App Development",
      year: "2nd Year",
      university: "National Institute of Technology",
      avatar: "KN",
      skills: ["Flutter", "React Native", "Firebase"],
      interests: ["Mobile Development", "UI/UX Design"],
      gpa: "9.0/10",
      projects: 6,
      internships: 1,
      lookingFor: "Mobile App Developer Internship",
      availability: "Available for mentorship",
      location: "Chennai"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {isStudentUser ? 'Find Mentors' : 'Employee Portal'}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {isStudentUser ? 'Connect with Industry Professionals' : 'Professional Dashboard & Mentorship Hub'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-campus-secondary text-white">
                <Briefcase className="w-4 h-4 mr-1" />
                {isStudentUser ? 'Student' : 'Employee'}
              </Badge>
              
              {/* Communication Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCommunication(true)}
                className="relative"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Communication
              </Button>
              
              {/* Notifications Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="relative"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  2
                </Badge>
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
        {isStudentUser ? (
          // Student View - Find Mentors (Simplified)
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Find Your Perfect Mentor</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with industry professionals who are ready to guide you in your career journey.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getEmployeeData().map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>{mentor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{mentor.title} at {mentor.company}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">Specialized in {mentor.expertise.slice(0, 2).join(", ")}</p>
                    <Badge variant={mentor.availability === 'Available' ? 'outline' : 'secondary'}>
                      {mentor.availability}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Employee View - Full Dashboard
          <div className="space-y-6">
            {/* Welcome Section */}
            <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Welcome back, {employeeData.name}!</CardTitle>
                    <CardDescription className="text-white/80 text-lg">
                      {employeeData.position} • {employeeData.department}
                    </CardDescription>
                    <p className="text-white/70 mt-1">Employee ID: {employeeData.employeeId}</p>
                  </div>
                  <Avatar className="h-16 w-16 border-2 border-white/20">
                    <AvatarFallback className="bg-white/20 text-white text-lg font-semibold">
                      {employeeData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
            </Card>

            {/* Quick Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Students Mentored</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600">{analyticsData.totalStudentsMentored}</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Mentorships</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">{analyticsData.activeMentorships}</span>
                    <Users className="w-4 h-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Currently ongoing</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-yellow-600">{analyticsData.averageRating}</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Based on {analyticsData.feedbackReceived} reviews</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Hours Contributed</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-purple-600">{analyticsData.hoursContributed}</span>
                    <Clock className="w-4 h-4 text-purple-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">This academic year</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Different Sections */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="mentees">My Mentees</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="colleagues">Colleagues</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              activity.status === 'completed' ? 'bg-green-500' : 
                              activity.status === 'active' ? 'bg-blue-500' : 
                              activity.status === 'positive' ? 'bg-yellow-500' : 'bg-gray-500'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.description}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Sessions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Upcoming Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {currentMentees.slice(0, 3).map((mentee) => (
                          <div key={mentee.id} className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <h4 className="font-medium">{mentee.name}</h4>
                              <p className="text-sm text-muted-foreground">{mentee.program}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{mentee.nextSession}</p>
                              <Badge variant="outline" className="text-xs">Session {mentee.sessions + 1}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Career Advancement Opportunities */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Career Opportunities
                    </CardTitle>
                    <CardDescription>
                      Internal career advancement and growth opportunities tailored for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {careerOpportunities.slice(0, 4).map((opportunity) => (
                        <Card key={opportunity.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                                <CardDescription className="font-medium text-green-600">
                                  {opportunity.company}
                                </CardDescription>
                              </div>
                              <Badge variant={opportunity.urgency === 'High' ? 'destructive' : 
                                            opportunity.urgency === 'Medium' ? 'default' : 'secondary'}>
                                {opportunity.urgency}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {opportunity.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Award className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-blue-600">{opportunity.matchScore}% Match</span>
                            </div>
                            
                            <p className="text-sm">{opportunity.description}</p>
                            
                            <div className="flex flex-wrap gap-1">
                              {opportunity.benefits.slice(0, 2).map((benefit, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                              {opportunity.benefits.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{opportunity.benefits.length - 2} more
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex gap-2 pt-2">
                              <Button className="flex-1" size="sm">
                                <Send className="w-4 h-4 mr-2" />
                                Apply
                              </Button>
                              <Button variant="outline" size="sm">
                                <BookOpen className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Opportunities Tab - Job opportunities for employees */}
              <TabsContent value="opportunities" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Career Opportunities</h2>
                    <p className="text-muted-foreground">
                      Discover new job opportunities, internships, hackathons, and career advancement options
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Post Job
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter Jobs
                    </Button>
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={opportunityFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => filterOpportunities('all')}
                    className="rounded-full"
                  >
                    All Opportunities
                  </Button>
                  <Button
                    variant={opportunityFilter === 'full-time' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => filterOpportunities('full-time')}
                    className="rounded-full"
                  >
                    <Briefcase className="w-4 h-4 mr-1" />
                    Full-time Jobs
                  </Button>
                  <Button
                    variant={opportunityFilter === 'freelance' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => filterOpportunities('freelance')}
                    className="rounded-full"
                  >
                    <Target className="w-4 h-4 mr-1" />
                    Freelance
                  </Button>
                  <Button
                    variant={opportunityFilter === 'internship' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => filterOpportunities('internship')}
                    className="rounded-full"
                  >
                    <GraduationCap className="w-4 h-4 mr-1" />
                    Internships
                  </Button>
                  <Button
                    variant={opportunityFilter === 'hackathon' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => filterOpportunities('hackathon')}
                    className="rounded-full"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Hackathons
                  </Button>
                </div>

                {/* Featured Opportunities */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">🌟 Featured Opportunities</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredOpportunities.filter(opp => opp.featured).map((opportunity) => (
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
                            <div className="flex flex-col gap-1">
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                Featured
                              </Badge>
                              {opportunity.remote && (
                                <Badge variant="outline" className="text-xs">
                                  Remote
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{opportunity.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{opportunity.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{opportunity.experience}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">{opportunity.salary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{opportunity.applications} applications</span>
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
                    {filteredOpportunities.map((opportunity) => (
                      <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                opportunity.type === 'full-time' ? 'bg-blue-100' :
                                opportunity.type === 'freelance' ? 'bg-purple-100' : 
                                opportunity.type === 'hackathon' ? 'bg-yellow-100' : 'bg-green-100'
                              }`}>
                                <Briefcase className={`w-5 h-5 ${
                                  opportunity.type === 'full-time' ? 'text-blue-600' :
                                  opportunity.type === 'freelance' ? 'text-purple-600' : 
                                  opportunity.type === 'hackathon' ? 'text-yellow-600' : 'text-green-600'
                                }`} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg">{opportunity.title}</h4>
                                <p className="text-gray-600">{opportunity.company}</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <Badge variant={
                                opportunity.type === 'full-time' ? 'default' :
                                opportunity.type === 'freelance' ? 'secondary' : 
                                opportunity.type === 'hackathon' ? 'outline' : 'outline'
                              }>
                                {opportunity.type === 'full-time' ? 'Full-time' :
                                 opportunity.type === 'freelance' ? 'Freelance' :
                                 opportunity.type === 'hackathon' ? 'Hackathon' : 'Internship'}
                              </Badge>
                              {opportunity.remote && (
                                <Badge variant="outline" className="text-xs">
                                  Remote
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{opportunity.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{opportunity.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{opportunity.experience}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">{opportunity.salary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{opportunity.applications} applications</span>
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
                              Posted: {new Date(opportunity.posted).toLocaleDateString()}
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

                {/* Quick Actions for Employees */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Professional Development</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Edit className="w-6 h-6 text-blue-600" />
                        <span>Update Resume</span>
                        <p className="text-xs text-gray-500">Keep your profile updated</p>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        <span>Skill Assessment</span>
                        <p className="text-xs text-gray-500">Test your abilities</p>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Users className="w-6 h-6 text-purple-600" />
                        <span>Network</span>
                        <p className="text-xs text-gray-500">Connect with professionals</p>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Mentees Tab */}
              <TabsContent value="mentees" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Mentees</CardTitle>
                    <CardDescription>Students you are currently mentoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentMentees.map((mentee) => (
                        <Card key={mentee.id} className="border-l-4 border-l-blue-500">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg">{mentee.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{mentee.program} - {mentee.year}</p>
                              </div>
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {mentee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progress</span>
                                <span>{mentee.progress}%</span>
                              </div>
                              <Progress value={mentee.progress} className="h-2" />
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium">Next Session</p>
                                <p className="text-xs text-muted-foreground">{mentee.nextSession}</p>
                              </div>
                              <Badge>{mentee.sessions} sessions completed</Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message
                              </Button>
                              <Button size="sm" variant="outline">
                                <Calendar className="w-4 h-4 mr-1" />
                                Schedule
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Student Portal Tab - For Employees to view students */}
              <TabsContent value="students" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                    Student Directory
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
                    Connect with talented students seeking mentorship and career guidance. 
                    Build meaningful relationships to help shape the next generation of professionals.
                  </p>

                  {/* Privacy Notice */}
                  <div className="max-w-3xl mx-auto mb-6">
                    <Card className={`border-2 ${
                      isTPOUser ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className={`w-5 h-5 mt-0.5 ${
                            isTPOUser ? 'text-orange-600' : 'text-green-600'
                          }`} />
                          <div className="text-left">
                            <h4 className={`font-semibold mb-2 ${
                              isTPOUser ? 'text-orange-800' : 'text-green-800'
                            }`}>
                              Privacy Protection - {isTPOUser ? 'TPO Access' : 'Employee Access'}
                            </h4>
                            <p className={`text-sm ${
                              isTPOUser ? 'text-orange-700' : 'text-green-700'
                            }`}>
                              {isTPOUser 
                                ? "Student privacy is our priority. You can view basic academic information (name, course, year, university) for administrative purposes. Personal details like GPA, skills, projects, and contact information are protected."
                                : "Student personal information is protected. You can view academic interests and career goals to facilitate appropriate mentorship matching, while respecting their privacy boundaries."
                              }
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Search Bar */}
                <Card className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input 
                        placeholder="Search students by name, program, skills, or interests..." 
                        className="w-full"
                      />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter by Program
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Filter by Year
                    </Button>
                  </div>
                </Card>

                {/* Students Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getStudentDataForEmployees().map((student) => (
                    <Card key={student.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16 border-2 border-green-200">
                            <AvatarFallback className="bg-green-100 text-green-600 text-lg font-semibold">
                              {student.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{student.name}</h3>
                              <Badge variant={student.availability.includes('Available') ? 'default' : 'secondary'} className="text-xs">
                                {student.availability.includes('Available') ? 'Available' : 'Seeking'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{student.program}</p>
                            <p className="text-sm font-medium text-green-600">{student.year} • {student.university}</p>
                            <div className="flex items-center gap-2 mt-2">
                              {!student.hidePersonalDetails ? (
                                <>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium">GPA: {student.gpa}</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{student.projects} projects</span>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{student.internships} internships</span>
                                </>
                              ) : (
                                <span className="text-xs text-muted-foreground">Academic details protected for privacy</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{student.lookingFor}</p>
                        
                        {/* Skills */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {!student.hidePersonalDetails ? (
                              <>
                                {student.skills.slice(0, 3).map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {student.skills.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{student.skills.length - 3} more
                                  </Badge>
                                )}
                              </>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Information Protected
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Interests */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">Interests:</p>
                          <div className="flex flex-wrap gap-1">
                            {!student.hidePersonalDetails ? (
                              student.interests.map((interest, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                Information Protected
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{student.location}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          {!student.hidePersonalDetails ? (
                            <>
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="flex-1 bg-green-600 hover:bg-green-700"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Request to Mentor
                              </Button>
                              <Button variant="outline" size="sm">
                                <User className="w-4 h-4 mr-2" />
                                View Profile
                              </Button>
                            </>
                          ) : (
                            <div className="text-center py-2 w-full">
                              <p className="text-xs text-muted-foreground">
                                {isTPOUser ? "TPO View - Contact via platform only" : "Limited access for privacy"}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Help Section for Employee-Student Connection */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <Users className="w-5 h-5" />
                      How Student Mentorship Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-green-600 font-bold">1</span>
                      </div>
                      <h4 className="font-medium mb-2">Send Request</h4>
                      <p className="text-sm text-muted-foreground">Browse student profiles and send mentorship requests to those who align with your expertise.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <h4 className="font-medium mb-2">Connect & Plan</h4>
                      <p className="text-sm text-muted-foreground">Once accepted, connect with the student and create a personalized mentorship plan.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-green-600 font-bold">3</span>
                      </div>
                      <h4 className="font-medium mb-2">Guide & Grow</h4>
                      <p className="text-sm text-muted-foreground">Share your knowledge and experience to help students achieve their career goals.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Colleagues Tab */}
              <TabsContent value="colleagues" className="space-y-6">
                <Card className="p-4">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <Input 
                        placeholder="Search colleagues by name, skills, or department..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getEmployeeData().map((colleague) => (
                    <Card key={colleague.id} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16 border-2 border-blue-200">
                            <AvatarFallback className="bg-gradient-secondary text-white text-lg font-semibold">
                              {colleague.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{colleague.name}</h3>
                              <Badge variant={colleague.availability === 'Available' ? 'default' : 'secondary'} className="text-xs">
                                {colleague.availability}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{colleague.title}</p>
                            <p className="text-sm font-medium text-blue-600">{colleague.company}</p>
                            <p className="text-xs text-muted-foreground">{colleague.department}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Contact Information */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className={colleague.hidePersonalDetails ? "text-muted-foreground" : "text-blue-600 hover:underline cursor-pointer"}>
                              {colleague.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className={colleague.hidePersonalDetails ? "text-muted-foreground" : ""}>
                              {colleague.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{colleague.location}</span>
                          </div>
                        </div>

                        {/* Expertise */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">Expertise:</p>
                          <div className="flex flex-wrap gap-1">
                            {colleague.expertise.slice(0, 3).map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {colleague.expertise.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{colleague.expertise.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {!colleague.hidePersonalDetails ? (
                            <>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span>{colleague.rating}</span>
                              </div>
                              <span>{colleague.totalMentees} mentees</span>
                              <span>{colleague.experience}</span>
                            </>
                          ) : (
                            <span>Professional stats protected</span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          {!colleague.hidePersonalDetails ? (
                            <>
                              <Button variant="default" size="sm" className="flex-1">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Connect
                              </Button>
                              <Button variant="outline" size="sm">
                                <User className="w-4 h-4 mr-2" />
                                Profile
                              </Button>
                            </>
                          ) : (
                            <div className="text-center py-2 w-full">
                              <p className="text-xs text-muted-foreground">
                                Contact via platform only
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <p className="text-sm text-muted-foreground">{employeeData.name}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <p className="text-sm text-muted-foreground">{employeeData.email}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Department</label>
                            <p className="text-sm text-muted-foreground">{employeeData.department}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Position</label>
                            <p className="text-sm text-muted-foreground">{employeeData.position}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Join Date</label>
                            <p className="text-sm text-muted-foreground">{employeeData.joinDate}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Location</label>
                            <p className="text-sm text-muted-foreground">{employeeData.location}</p>
                          </div>
                        </div>
                        <Button variant="outline">
                          <Settings className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    {/* Skills */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Skills</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {employeeData.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Certifications */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Certifications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {employeeData.certifications.map((cert, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Mentorship Stats
                        <BarChart3 className="w-5 h-5" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Completed Sessions</span>
                          <span className="font-bold">{analyticsData.completedSessions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Active Mentorships</span>
                          <span className="font-bold">{analyticsData.activeMentorships}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Total Students</span>
                          <span className="font-bold">{analyticsData.totalStudentsMentored}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Performance
                        <Target className="w-5 h-5" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Average Rating</span>
                          <span className="font-bold">{analyticsData.averageRating}/5.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Feedback Count</span>
                          <span className="font-bold">{analyticsData.feedbackReceived}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Response Rate</span>
                          <span className="font-bold">98%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Growth
                        <TrendingUp className="w-5 h-5" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Skills Shared</span>
                          <span className="font-bold">{analyticsData.skillsShared}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">New Certifications</span>
                          <span className="font-bold">{analyticsData.certificationsEarned}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Projects Completed</span>
                          <span className="font-bold">{employeeData.completedProjects}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Export Reports</CardTitle>
                    <CardDescription>Download detailed analytics and reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Mentorship Report
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Performance Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Communication Dialog */}
      <Dialog open={showCommunication} onOpenChange={setShowCommunication}>
        <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Professional Communication
            </DialogTitle>
            <DialogDescription>
              Connect with TPO officers, students, and colleagues for mentorship and collaboration
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 flex-1 min-h-0 overflow-hidden">
            {/* Students Section (Left Side) */}
            <Card className="lg:col-span-1 flex flex-col h-full min-h-0 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-blue-100 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Students
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                    {employeeConversations.filter(c => c.type === 'student').length}
                  </Badge>
                </div>
              </CardHeader>
              <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto p-1" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#60a5fa #dbeafe'
                }}>
                  <div className="space-y-1">
                    {employeeConversations
                      .filter(conversation => conversation.type === 'student')
                      .map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedChat(conversation)}
                        className={`flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer transition-all duration-200 border-l-3 rounded-r-md ${
                          selectedChat?.id === conversation.id 
                            ? 'bg-blue-100 border-l-blue-500 shadow-sm' 
                            : 'border-l-transparent hover:border-l-blue-300'
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold shadow-sm">
                            {conversation.avatar}
                          </div>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-xs truncate">{conversation.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-medium text-blue-600">Student</span>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="h-3 w-3 p-0 flex items-center justify-center text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {employeeConversations.filter(c => c.type === 'student').length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <User className="w-5 h-5 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">No students</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* TPO Officers Section (Right Side) */}
            <Card className="lg:col-span-1 flex flex-col h-full min-h-0 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-purple-100 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    TPO Officers
                  </CardTitle>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 text-xs">
                    {employeeConversations.filter(c => c.type === 'tpo').length}
                  </Badge>
                </div>
              </CardHeader>
              <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto p-1" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#c084fc #f3e8ff'
                }}>
                  <div className="space-y-1">
                    {employeeConversations
                      .filter(conversation => conversation.type === 'tpo')
                      .map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedChat(conversation)}
                        className={`flex items-center gap-2 p-2 hover:bg-purple-50 cursor-pointer transition-all duration-200 border-l-3 rounded-r-md ${
                          selectedChat?.id === conversation.id 
                            ? 'bg-purple-100 border-l-purple-500 shadow-sm' 
                            : 'border-l-transparent hover:border-l-purple-300'
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-semibold shadow-sm">
                            {conversation.avatar}
                          </div>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-xs truncate">{conversation.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-medium text-purple-600">TPO Officer</span>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="h-3 w-3 p-0 flex items-center justify-center text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {employeeConversations.filter(c => c.type === 'tpo').length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <GraduationCap className="w-5 h-5 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">No TPO officers</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Chat Window */}
            <Card className="lg:col-span-2 flex flex-col shadow-lg h-full min-h-0 overflow-hidden">
              {selectedChat ? (
                <>
                  {/* Enhanced Chat Header */}
                  <CardHeader className={`pb-3 border-b ${
                    selectedChat.type === 'tpo' ? 'bg-purple-50' :
                    selectedChat.type === 'student' ? 'bg-blue-50' : 'bg-green-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-md ${
                            selectedChat.type === 'tpo' 
                              ? 'bg-purple-100 text-purple-600' 
                              : selectedChat.type === 'student'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {selectedChat.avatar}
                          </div>
                          {selectedChat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl">{selectedChat.name}</h3>
                          <p className="text-sm text-muted-foreground font-medium">{selectedChat.status}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${selectedChat.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <span className="text-xs font-medium">
                              {selectedChat.isOnline ? 'Online now' : 'Offline'}
                            </span>
                            <Badge variant="outline" className={`text-xs ml-2 ${
                              selectedChat.type === 'tpo' ? 'bg-purple-100 text-purple-800' :
                              selectedChat.type === 'student' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {selectedChat.type === 'tpo' ? 'TPO Officer' : 
                               selectedChat.type === 'student' ? 'Student' : 'Colleague'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="hover:bg-green-50">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-green-50">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-green-50">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Enhanced Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                    {selectedChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[75%] ${
                          message.isMe 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                            : 'bg-white text-gray-900 shadow-md border border-gray-200'
                        } rounded-2xl px-5 py-3 transform transition-all duration-200 hover:scale-[1.02]`}>
                          <p className="text-sm leading-relaxed">{message.message}</p>
                          <p className={`text-xs mt-2 ${
                            message.isMe ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  {/* Enhanced Message Input */}
                  <div className="p-6 border-t bg-white">
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" className="hover:bg-gray-50 rounded-full">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder={`Message ${selectedChat.name}...`}
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="pr-12 py-4 rounded-full border-2 focus:border-green-400 shadow-sm text-base"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full"
                        >
                          <Smile className="w-5 h-5" />
                        </Button>
                      </div>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!chatMessage.trim()}
                        className={`px-8 py-4 rounded-full font-semibold text-base shadow-lg ${
                          selectedChat.type === 'tpo' ? 'bg-purple-500 hover:bg-purple-600' :
                          selectedChat.type === 'student' ? 'bg-blue-500 hover:bg-blue-600' :
                          'bg-green-500 hover:bg-green-600'
                        } text-white disabled:opacity-50 transform transition-all duration-200 hover:scale-105`}
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MessageCircle className="w-20 h-20 mx-auto mb-6 opacity-30" />
                    <p className="text-2xl font-semibold mb-3">Professional Network</p>
                    <p className="text-lg mb-6">Select a contact to begin professional communication</p>
                    <div className="flex items-center justify-center gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium">TPO Officers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Colleagues</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-2xl h-[70vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </DialogTitle>
            <DialogDescription>
              Stay updated with mentorship requests and job opportunities
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3">
                {employeeNotifications.length} Total
              </Badge>
              <Badge variant="destructive" className="px-3">
                {employeeNotifications.filter(n => !n.isRead).length} Unread
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {employeeNotifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.isRead ? 'bg-blue-50 border-blue-200' : ''} hover:shadow-sm transition-all`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'mentorship' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'opportunity' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {notification.type === 'mentorship' ? '👥' :
                           notification.type === 'opportunity' ? '💼' :
                           '🔔'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            notification.priority === 'high' ? 'destructive' :
                            notification.priority === 'medium' ? 'default' :
                            'secondary'
                          } className="text-xs">
                            {notification.priority}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge variant="outline" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {notification.actionRequired && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        Take Action
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeePortal;
