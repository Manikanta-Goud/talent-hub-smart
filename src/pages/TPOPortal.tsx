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
  const [selectedFilter, setSelectedFilter] = useState("all");

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
      description: "Join our dynamic team to build cutting-edge web applications.",
      category: "Technology"
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
      description: "Research and develop innovative ML algorithms.",
      category: "Research"
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
      description: "Create amazing user experiences in a startup environment.",
      category: "Technology"
    },
    {
      id: 4,
      title: "Smart India Hackathon 2024",
      company: "Government of India",
      type: "Hackathon",
      location: "Multiple Cities",
      stipend: "₹1,00,000 Prize Pool",
      deadline: "2024-02-10",
      applicants: 156,
      status: "Active",
      skills: ["Problem Solving", "Innovation", "Team Work", "Presentation"],
      posted: "2024-01-02",
      description: "36-hour hackathon to solve real-world problems using technology. Form teams of 6 members.",
      category: "Competition"
    },
    {
      id: 5,
      title: "Google Summer of Code",
      company: "Google",
      type: "Open Source Program",
      location: "Remote",
      stipend: "$3,000 - $6,600",
      deadline: "2024-04-02",
      applicants: 89,
      status: "Active",
      skills: ["Open Source", "Programming", "Documentation", "Git"],
      posted: "2024-01-01",
      description: "Contribute to open source projects mentored by Google. 12-22 week program.",
      category: "Open Source"
    },
    {
      id: 6,
      title: "Microsoft Imagine Cup",
      company: "Microsoft",
      type: "Global Competition",
      location: "Global",
      stipend: "$100,000 Prize",
      deadline: "2024-03-15",
      applicants: 234,
      status: "Active",
      skills: ["Azure", "AI", "Innovation", "Entrepreneurship"],
      posted: "2024-01-04",
      description: "Global technology competition for students to create solutions that matter.",
      category: "Competition"
    },
    {
      id: 7,
      title: "Campus Ambassador Program",
      company: "TechTalks India",
      type: "Part-time",
      location: "On-Campus",
      stipend: "₹5,000/month + Perks",
      deadline: "2024-02-28",
      applicants: 67,
      status: "Active",
      skills: ["Marketing", "Communication", "Event Management", "Social Media"],
      posted: "2024-01-06",
      description: "Represent TechTalks on campus, organize events, and build tech community.",
      category: "Ambassador"
    },
    {
      id: 8,
      title: "Data Science Internship",
      company: "Analytics Pro",
      type: "Internship",
      location: "Chennai",
      stipend: "₹28,000/month",
      deadline: "2024-02-05",
      applicants: 41,
      status: "Active",
      skills: ["Python", "R", "SQL", "Data Visualization", "Statistics"],
      posted: "2024-01-07",
      description: "Work on real-world data science projects with experienced mentors.",
      category: "Data Science"
    },
    {
      id: 9,
      title: "ACM-ICPC Programming Contest",
      company: "ACM India",
      type: "Programming Contest",
      location: "Multiple Venues",
      stipend: "Certificates + Prizes",
      deadline: "2024-02-20",
      applicants: 178,
      status: "Active",
      skills: ["Algorithms", "Data Structures", "C++", "Problem Solving"],
      posted: "2024-01-08",
      description: "International collegiate programming contest. Team registration required.",
      category: "Competition"
    },
    {
      id: 10,
      title: "Cybersecurity Research Intern",
      company: "SecureNet Labs",
      type: "Internship",
      location: "Pune",
      stipend: "₹32,000/month",
      deadline: "2024-02-12",
      applicants: 29,
      status: "Active",
      skills: ["Cybersecurity", "Ethical Hacking", "Network Security", "Python"],
      posted: "2024-01-09",
      description: "Research emerging cyber threats and develop security solutions.",
      category: "Security"
    },
    {
      id: 11,
      title: "Placement Cell Student Coordinator",
      company: "College Placement Cell",
      type: "Student Position",
      location: "On-Campus",
      stipend: "Certificate + Experience",
      deadline: "2024-01-30",
      applicants: 23,
      status: "Active",
      skills: ["Leadership", "Communication", "Organization", "Database Management"],
      posted: "2024-01-10",
      description: "Assist placement cell in coordinating recruitment drives and student activities.",
      category: "Campus Role"
    },
    {
      id: 12,
      title: "NASA Space Apps Challenge",
      company: "NASA",
      type: "Global Hackathon",
      location: "Worldwide",
      stipend: "Global Recognition",
      deadline: "2024-03-01",
      applicants: 312,
      status: "Active",
      skills: ["Space Technology", "Data Analysis", "Innovation", "Teamwork"],
      posted: "2024-01-11",
      description: "48-hour hackathon to solve challenges related to space exploration and Earth science.",
      category: "Space Tech"
    },
    {
      id: 13,
      title: "Blockchain Developer Intern",
      company: "CryptoTech Solutions",
      type: "Internship",
      location: "Delhi",
      stipend: "₹35,000/month",
      deadline: "2024-02-18",
      applicants: 38,
      status: "Active",
      skills: ["Blockchain", "Solidity", "Web3", "Smart Contracts", "JavaScript"],
      posted: "2024-01-12",
      description: "Develop decentralized applications and smart contracts on blockchain platforms.",
      category: "Blockchain"
    },
    {
      id: 14,
      title: "TechFest Innovation Challenge",
      company: "IIT Bombay",
      type: "Innovation Contest",
      location: "Mumbai",
      stipend: "₹2,00,000 Prize Pool",
      deadline: "2024-02-25",
      applicants: 145,
      status: "Active",
      skills: ["Innovation", "Technology", "Presentation", "Business Model"],
      posted: "2024-01-13",
      description: "Showcase innovative technology solutions and compete for cash prizes and mentorship.",
      category: "Innovation"
    },
    {
      id: 15,
      title: "Content Creator Internship",
      company: "EduTech Media",
      type: "Internship",
      location: "Remote",
      stipend: "₹20,000/month",
      deadline: "2024-02-08",
      applicants: 52,
      status: "Active",
      skills: ["Content Writing", "Video Editing", "Social Media", "SEO"],
      posted: "2024-01-14",
      description: "Create engaging educational content for online platforms and social media.",
      category: "Content & Media"
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
    },
    {
      id: 4,
      name: "Ananya Patel",
      email: "ananya.patel@college.edu",
      year: "2nd Year",
      branch: "Computer Science Engineering",
      cgpa: "9.3",
      applications: 12,
      interviews: 8,
      offers: 3,
      skills: ["React", "TypeScript", "GraphQL", "MongoDB", "UI/UX Design", "Figma"],
      phone_number: "+91 9876543213",
      student_id: "CS22B1089",
      university: "Indian Institute of Technology",
      graduation_year: "2026",
      linkedin_url: "https://linkedin.com/in/ananyapatel",
      github_url: "https://github.com/ananyapatel",
      portfolio_url: "https://ananyapatel.design"
    },
    {
      id: 5,
      name: "Arjun Singh",
      email: "arjun.singh@college.edu",
      year: "4th Year",
      branch: "Mechanical Engineering",
      cgpa: "8.7",
      applications: 6,
      interviews: 4,
      offers: 2,
      skills: ["CAD Design", "SolidWorks", "MATLAB", "Python", "Manufacturing", "IoT"],
      phone_number: "+91 9876543214",
      student_id: "ME20B1044",
      university: "Indian Institute of Technology",
      graduation_year: "2024",
      linkedin_url: "https://linkedin.com/in/arjunsingh",
      github_url: "https://github.com/arjunsingh",
      portfolio_url: null
    },
    {
      id: 6,
      name: "Sneha Reddy",
      email: "sneha.reddy@college.edu",
      year: "3rd Year",
      branch: "Data Science",
      cgpa: "9.0",
      applications: 10,
      interviews: 7,
      offers: 4,
      skills: ["Python", "R", "Machine Learning", "Deep Learning", "SQL", "Tableau"],
      phone_number: "+91 9876543215",
      student_id: "DS21B1067",
      university: "Indian Institute of Technology",
      graduation_year: "2025",
      linkedin_url: "https://linkedin.com/in/snehareddy",
      github_url: "https://github.com/snehareddy",
      portfolio_url: "https://snehareddy.datascience.io"
    },
    {
      id: 7,
      name: "Karthik Nair",
      email: "karthik.nair@college.edu",
      year: "3rd Year",
      branch: "Cybersecurity",
      cgpa: "8.8",
      applications: 7,
      interviews: 5,
      offers: 2,
      skills: ["Ethical Hacking", "Network Security", "Python", "Cryptography", "Forensics", "Penetration Testing"],
      phone_number: "+91 9876543216",
      student_id: "CY21B1033",
      university: "Indian Institute of Technology",
      graduation_year: "2025",
      linkedin_url: "https://linkedin.com/in/karthiknair",
      github_url: "https://github.com/karthiknair",
      portfolio_url: null
    },
    {
      id: 8,
      name: "Meera Gupta",
      email: "meera.gupta@college.edu",
      year: "2nd Year",
      branch: "Artificial Intelligence",
      cgpa: "9.2",
      applications: 9,
      interviews: 6,
      offers: 3,
      skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "TensorFlow", "PyTorch"],
      phone_number: "+91 9876543217",
      student_id: "AI22B1078",
      university: "Indian Institute of Technology",
      graduation_year: "2026",
      linkedin_url: "https://linkedin.com/in/meeragupta",
      github_url: "https://github.com/meeragupta",
      portfolio_url: "https://meeragupta.ai"
    },
    {
      id: 9,
      name: "Vikram Kumar",
      email: "vikram.kumar@college.edu",
      year: "4th Year",
      branch: "Blockchain Technology",
      cgpa: "8.6",
      applications: 5,
      interviews: 3,
      offers: 1,
      skills: ["Solidity", "Web3", "Smart Contracts", "Ethereum", "DeFi", "JavaScript"],
      phone_number: "+91 9876543218",
      student_id: "BT20B1091",
      university: "Indian Institute of Technology",
      graduation_year: "2024",
      linkedin_url: "https://linkedin.com/in/vikramkumar",
      github_url: "https://github.com/vikramkumar",
      portfolio_url: "https://vikramkumar.blockchain.dev"
    },
    {
      id: 10,
      name: "Divya Joshi",
      email: "divya.joshi@college.edu",
      year: "3rd Year",
      branch: "Robotics Engineering",
      cgpa: "8.9",
      applications: 8,
      interviews: 5,
      offers: 2,
      skills: ["ROS", "Python", "C++", "Computer Vision", "Control Systems", "Arduino"],
      phone_number: "+91 9876543219",
      student_id: "RO21B1054",
      university: "Indian Institute of Technology",
      graduation_year: "2025",
      linkedin_url: "https://linkedin.com/in/divyajoshi",
      github_url: "https://github.com/divyajoshi",
      portfolio_url: null
    },
    {
      id: 11,
      name: "Rohit Agarwal",
      email: "rohit.agarwal@college.edu",
      year: "2nd Year",
      branch: "Game Development",
      cgpa: "8.4",
      applications: 4,
      interviews: 2,
      offers: 1,
      skills: ["Unity", "C#", "3D Modeling", "Game Design", "Blender", "JavaScript"],
      phone_number: "+91 9876543220",
      student_id: "GD22B1023",
      university: "Indian Institute of Technology",
      graduation_year: "2026",
      linkedin_url: "https://linkedin.com/in/rohitagarwal",
      github_url: "https://github.com/rohitagarwal",
      portfolio_url: "https://rohitagarwal.gamedev.io"
    },
    {
      id: 12,
      name: "Pooja Desai",
      email: "pooja.desai@college.edu",
      year: "4th Year",
      branch: "Digital Marketing",
      cgpa: "8.3",
      applications: 11,
      interviews: 9,
      offers: 5,
      skills: ["SEO", "Social Media Marketing", "Content Creation", "Analytics", "Adobe Creative Suite", "Photography"],
      phone_number: "+91 9876543221",
      student_id: "DM20B1087",
      university: "Indian Institute of Technology",
      graduation_year: "2024",
      linkedin_url: "https://linkedin.com/in/poojadesai",
      github_url: null,
      portfolio_url: "https://poojadesai.marketing"
    }
  ];

  const analyticsData = {
    totalApplications: 1847,
    totalInterviews: 289,
    totalOffers: 139,
    placementRate: 87,
    avgSalary: "7.8 LPA",
    topSkills: ["React", "Python", "Java", "Machine Learning", "Node.js"],
    opportunityTypes: {
      "Internships": 8,
      "Full-time Jobs": 3,
      "Hackathons": 4,
      "Competitions": 3,
      "Open Source": 1,
      "Campus Roles": 2
    }
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

  const getFilteredOpportunities = () => {
    if (selectedFilter === "all") return opportunities;
    
    const filterMap: { [key: string]: string[] } = {
      "internships": ["Internship"],
      "hackathons": ["Hackathon", "Global Hackathon"],
      "competitions": ["Programming Contest", "Global Competition", "Innovation Contest"],
      "open-source": ["Open Source Program"],
      "campus-roles": ["Student Position", "Part-time"],
      "research": ["Internship"] // Filter research-related internships by company/description
    };

    const allowedTypes = filterMap[selectedFilter] || [];
    
    if (selectedFilter === "research") {
      return opportunities.filter(opp => 
        opp.title.toLowerCase().includes("research") || 
        opp.company.toLowerCase().includes("labs") ||
        opp.description.toLowerCase().includes("research")
      );
    }
    
    return opportunities.filter(opp => allowedTypes.includes(opp.type));
  };

  const getFilterCount = (filterType: string) => {
    if (filterType === "all") return opportunities.length;
    
    const filterMap: { [key: string]: string[] } = {
      "internships": ["Internship"],
      "hackathons": ["Hackathon", "Global Hackathon"],
      "competitions": ["Programming Contest", "Global Competition", "Innovation Contest"],
      "open-source": ["Open Source Program"],
      "campus-roles": ["Student Position", "Part-time"],
      "research": []
    };

    if (filterType === "research") {
      return opportunities.filter(opp => 
        opp.title.toLowerCase().includes("research") || 
        opp.company.toLowerCase().includes("labs") ||
        opp.description.toLowerCase().includes("research")
      ).length;
    }

    const allowedTypes = filterMap[filterType] || [];
    return opportunities.filter(opp => allowedTypes.includes(opp.type)).length;
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
                  <h1 className="text-xl font-bold text-foreground">Admin Portal</h1>
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New hackathon registration</p>
                        <p className="text-xs text-muted-foreground">Alex Johnson registered for Smart India Hackathon</p>
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
                        <p className="text-sm font-medium">Competition winner</p>
                        <p className="text-xs text-muted-foreground">Team won TechFest Innovation Challenge</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1h ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-success" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New opportunity posted</p>
                        <p className="text-xs text-muted-foreground">Blockchain Developer Intern at CryptoTech</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Opportunity Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(analyticsData.opportunityTypes).map(([type, count], index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{type}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className="bg-campus-primary h-2 rounded-full" 
                                style={{ width: `${(count / 15) * 100}%` }}
                              ></div>
                            </div>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        </div>
                      ))}
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
                  <p className="text-muted-foreground">Post and manage internships, hackathons, competitions, and job opportunities</p>
                </div>
                <Button 
                  variant="tpo" 
                  onClick={() => setIsAddingOpportunity(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Opportunity
                </Button>
              </div>

              {/* Filter Section */}
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedFilter === "all" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedFilter("all")}
                  >
                    All ({getFilterCount("all")})
                  </Button>
                  <Button 
                    variant={selectedFilter === "internships" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedFilter("internships")}
                  >
                    Internships ({getFilterCount("internships")})
                  </Button>
                  <Button 
                    variant={selectedFilter === "hackathons" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedFilter("hackathons")}
                  >
                    Hackathons ({getFilterCount("hackathons")})
                  </Button>
                  <Button 
                    variant={selectedFilter === "competitions" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedFilter("competitions")}
                  >
                    Competitions ({getFilterCount("competitions")})
                  </Button>
                  <Button 
                    variant={selectedFilter === "open-source" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedFilter("open-source")}
                  >
                    Open Source ({getFilterCount("open-source")})
                  </Button>
                  <Button 
                    variant={selectedFilter === "campus-roles" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedFilter("campus-roles")}
                  >
                    Campus Roles ({getFilterCount("campus-roles")})
                  </Button>
                  <Button 
                    variant={selectedFilter === "research" ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setSelectedFilter("research")}
                  >
                    Research ({getFilterCount("research")})
                  </Button>
                </div>
              </Card>

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
                            <SelectItem value="full-time">Full-time Job</SelectItem>
                            <SelectItem value="part-time">Part-time Job</SelectItem>
                            <SelectItem value="hackathon">Hackathon</SelectItem>
                            <SelectItem value="competition">Competition</SelectItem>
                            <SelectItem value="open-source">Open Source Program</SelectItem>
                            <SelectItem value="ambassador">Campus Ambassador</SelectItem>
                            <SelectItem value="student-position">Student Position</SelectItem>
                            <SelectItem value="research">Research Program</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="research">Research</SelectItem>
                            <SelectItem value="competition">Competition</SelectItem>
                            <SelectItem value="open-source">Open Source</SelectItem>
                            <SelectItem value="data-science">Data Science</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="blockchain">Blockchain</SelectItem>
                            <SelectItem value="space-tech">Space Tech</SelectItem>
                            <SelectItem value="innovation">Innovation</SelectItem>
                            <SelectItem value="content-media">Content & Media</SelectItem>
                            <SelectItem value="campus-role">Campus Role</SelectItem>
                            <SelectItem value="ambassador">Ambassador</SelectItem>
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
                {getFilteredOpportunities().length === 0 ? (
                  <Card className="p-8 text-center">
                    <div className="text-muted-foreground">
                      <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No opportunities found</p>
                      <p className="text-sm">Try selecting a different filter or add new opportunities.</p>
                    </div>
                  </Card>
                ) : (
                  getFilteredOpportunities().map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-medium transition-spring">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                            <Badge className={getStatusColor(opportunity.status)}>
                              {opportunity.status}
                            </Badge>
                            <Badge variant="outline" className="bg-campus-primary/10 text-campus-primary border-campus-primary">
                              {opportunity.category}
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
                ))
                )}
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