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
  Star,
  LogOut,
  MessageCircle,
  Bell,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  X,
  GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TPOPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, userProfile } = useAuth();
  const [isAddingOpportunity, setIsAddingOpportunity] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showCommunication, setShowCommunication] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessage, setChatMessage] = useState("");

  // Determine which tabs to show based on user role
  const isTPOUser = userProfile?.role === 'tpo';
  const isStudentOrEmployee = userProfile?.role === 'student' || userProfile?.role === 'employee';

  console.log('🔍 TPOPortal - User role check:', {
    userRole: userProfile?.role,
    isTPOUser,
    isStudentOrEmployee,
    userProfile
  });

  // Get the portal title based on user role
  const getPortalTitle = () => {
    if (isTPOUser) return 'Admin Portal'
    return 'TPO Portal'
  }

  const getPortalSubtitle = () => {
    if (isTPOUser) return 'Placement Control Center'
    if (userProfile?.role === 'student') return 'Find Opportunities & Companies'
    if (userProfile?.role === 'employee') return 'Explore Opportunities & Companies'
    return 'Portal Access'
  }

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
    // Internship opportunities from Student Portal
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      type: "Internship",
      location: "Bangalore",
      stipend: "₹25,000/month",
      deadline: "2024-01-15",
      duration: "6 months",
      applicants: 45,
      status: "Active",
      skills: ["React", "Node.js", "JavaScript"],
      posted: "2024-01-01",
      description: "Join our dynamic team to build cutting-edge web applications.",
      category: "Technology",
      urgency: "Medium",
      isNew: true
    },
    {
      id: 2,
      title: "ML Research Intern",
      company: "DataSense Labs",
      type: "Internship",
      location: "Hyderabad",
      stipend: "₹30,000/month",
      deadline: "2024-01-20",
      duration: "4 months",
      applicants: 32,
      status: "Active",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      posted: "2024-01-03",
      description: "Research and develop innovative ML algorithms.",
      category: "Research",
      urgency: "High",
      isNew: false
    },
    {
      id: 3,
      title: "Data Science Internship",
      company: "Analytics Pro",
      type: "Internship",
      location: "Chennai",
      stipend: "₹28,000/month",
      deadline: "2024-02-05",
      duration: "5 months",
      applicants: 41,
      status: "Active",
      skills: ["Python", "R", "SQL", "Data Visualization"],
      posted: "2024-01-07",
      description: "Work on real-world data science projects with experienced mentors.",
      category: "Data Science",
      urgency: "Medium",
      isNew: true
    },
    {
      id: 4,
      title: "Cybersecurity Research Intern",
      company: "SecureNet Labs",
      type: "Internship",
      location: "Pune",
      stipend: "₹32,000/month",
      deadline: "2024-02-12",
      duration: "6 months",
      applicants: 29,
      status: "Active",
      skills: ["Cybersecurity", "Ethical Hacking", "Network Security", "Python"],
      posted: "2024-01-09",
      description: "Research emerging cyber threats and develop security solutions.",
      category: "Security",
      urgency: "High",
      isNew: false
    },
    {
      id: 5,
      title: "Blockchain Developer Intern",
      company: "CryptoTech Solutions",
      type: "Internship",
      location: "Delhi",
      stipend: "₹35,000/month",
      deadline: "2024-02-18",
      duration: "4 months",
      applicants: 38,
      status: "Active",
      skills: ["Blockchain", "Solidity", "Web3", "Smart Contracts"],
      posted: "2024-01-12",
      description: "Develop decentralized applications and smart contracts.",
      category: "Blockchain",
      urgency: "Low",
      isNew: true
    },
    {
      id: 6,
      title: "Content Creator Internship",
      company: "EduTech Media",
      type: "Internship",
      location: "Remote",
      stipend: "₹20,000/month",
      deadline: "2024-02-08",
      duration: "3 months",
      applicants: 52,
      status: "Active",
      skills: ["Content Writing", "Video Editing", "Social Media", "SEO"],
      posted: "2024-01-14",
      description: "Create engaging educational content for online platforms.",
      category: "Content & Media",
      urgency: "Medium",
      isNew: false
    },
    // Popular hackathons and competitions
    {
      id: 7,
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
      category: "Competition",
      urgency: "High"
    },
    {
      id: 8,
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
      category: "Open Source",
      urgency: "Medium"
    },
    {
      id: 9,
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
      category: "Competition",
      urgency: "Low"
    },
    {
      id: 10,
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
      category: "Space Tech",
      urgency: "Medium"
    },
    {
      id: 11,
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
      category: "Competition",
      urgency: "High"
    },
    {
      id: 12,
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
      category: "Innovation",
      urgency: "Low"
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

  // Employee data for TPO management
  const employees = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@google.com",
      company: "Google Inc.",
      department: "Frontend Engineering",
      position: "Senior Software Engineer",
      experience: "5+ years",
      location: "Bangalore",
      skills: ["React", "Node.js", "System Design", "TypeScript", "GraphQL", "Microservices"],
      mentees: 12,
      activeMentorships: 4,
      completedSessions: 78,
      rating: 4.9,
      joiningDate: "2019-03-15",
      linkedin_url: "https://linkedin.com/in/sarahchen",
      specializations: ["Web Development", "System Architecture", "Team Leadership"],
      availability: "Available",
      languages: ["English", "Mandarin"]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@microsoft.com",
      company: "Microsoft Corporation",
      department: "AI Research",
      position: "Principal ML Engineer",
      experience: "8+ years",
      location: "Hyderabad",
      skills: ["Python", "Machine Learning", "Deep Learning", "PyTorch", "Azure", "Data Science"],
      mentees: 18,
      activeMentorships: 6,
      completedSessions: 124,
      rating: 4.8,
      joiningDate: "2016-07-20",
      linkedin_url: "https://linkedin.com/in/rajeshkumar",
      specializations: ["AI/ML", "Data Science", "Research"],
      availability: "Available",
      languages: ["English", "Hindi", "Telugu"]
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya.sharma@amazon.com",
      company: "Amazon Web Services",
      department: "Cloud Infrastructure",
      position: "DevOps Engineer",
      experience: "4+ years",
      location: "Mumbai",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Python"],
      mentees: 8,
      activeMentorships: 3,
      completedSessions: 45,
      rating: 4.7,
      joiningDate: "2020-01-10",
      linkedin_url: "https://linkedin.com/in/priyasharma",
      specializations: ["DevOps", "Cloud Computing", "Infrastructure"],
      availability: "Busy - Limited slots",
      languages: ["English", "Hindi"]
    },
    {
      id: 4,
      name: "Arjun Patel",
      email: "arjun.patel@meta.com",
      company: "Meta (Facebook)",
      department: "Product Engineering",
      position: "Staff Software Engineer",
      experience: "7+ years",
      location: "Bangalore",
      skills: ["React", "JavaScript", "Python", "GraphQL", "Mobile Development", "Scalability"],
      mentees: 15,
      activeMentorships: 5,
      completedSessions: 89,
      rating: 4.9,
      joiningDate: "2017-09-12",
      linkedin_url: "https://linkedin.com/in/arjunpatel",
      specializations: ["Product Development", "Full Stack", "Mobile Apps"],
      availability: "Available",
      languages: ["English", "Gujarati"]
    },
    {
      id: 5,
      name: "Ananya Das",
      email: "ananya.das@netflix.com",
      company: "Netflix",
      department: "Data Engineering",
      position: "Senior Data Engineer",
      experience: "6+ years",
      location: "Bangalore",
      skills: ["Scala", "Apache Spark", "Kafka", "AWS", "Machine Learning", "Big Data"],
      mentees: 10,
      activeMentorships: 4,
      completedSessions: 67,
      rating: 4.8,
      joiningDate: "2018-02-28",
      linkedin_url: "https://linkedin.com/in/ananyadas",
      specializations: ["Data Engineering", "Big Data", "Streaming"],
      availability: "Available",
      languages: ["English", "Bengali"]
    },
    {
      id: 6,
      name: "Vikram Reddy",
      email: "vikram.reddy@apple.com",
      company: "Apple Inc.",
      department: "iOS Development",
      position: "Senior iOS Developer",
      experience: "5+ years",
      location: "Hyderabad",
      skills: ["Swift", "Objective-C", "iOS SDK", "Core Data", "SwiftUI", "Xcode"],
      mentees: 9,
      activeMentorships: 3,
      completedSessions: 54,
      rating: 4.7,
      joiningDate: "2019-11-05",
      linkedin_url: "https://linkedin.com/in/vikramreddy",
      specializations: ["iOS Development", "Mobile Apps", "UI/UX"],
      availability: "Available",
      languages: ["English", "Telugu"]
    },
    {
      id: 7,
      name: "Kavya Nair",
      email: "kavya.nair@uber.com",
      company: "Uber Technologies",
      department: "Backend Engineering",
      position: "Staff Backend Engineer",
      experience: "6+ years",
      location: "Bangalore",
      skills: ["Go", "Microservices", "PostgreSQL", "Redis", "Kafka", "System Design"],
      mentees: 14,
      activeMentorships: 5,
      completedSessions: 92,
      rating: 4.9,
      joiningDate: "2018-06-15",
      linkedin_url: "https://linkedin.com/in/kavyanair",
      specializations: ["Backend Development", "System Design", "Distributed Systems"],
      availability: "Available",
      languages: ["English", "Malayalam"]
    },
    {
      id: 8,
      name: "Rohit Gupta",
      email: "rohit.gupta@salesforce.com",
      company: "Salesforce",
      department: "Product Management",
      position: "Senior Product Manager",
      experience: "7+ years",
      location: "Mumbai",
      skills: ["Product Strategy", "Data Analytics", "User Research", "Agile", "Roadmapping", "Stakeholder Management"],
      mentees: 11,
      activeMentorships: 4,
      completedSessions: 73,
      rating: 4.8,
      joiningDate: "2017-04-22",
      linkedin_url: "https://linkedin.com/in/rohitgupta",
      specializations: ["Product Management", "Strategy", "Analytics"],
      availability: "Available",
      languages: ["English", "Hindi"]
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

  // TPO Conversations with Students and Employees
  const tpoConversations = [
    {
      id: 1,
      type: 'student',
      name: "Alex Johnson",
      avatar: "AJ",
      lastMessage: "Thank you for the placement guidance!",
      lastMessageTime: "5 min ago",
      unread: 2,
      isOnline: true,
      status: "3rd Year CS Student",
      messages: [
        { id: 1, sender: "Alex Johnson", message: "Hello, I have a question about the TechCorp interview", timestamp: "2:30 PM", isMe: false },
        { id: 2, sender: "Me", message: "Sure Alex, what would you like to know?", timestamp: "2:32 PM", isMe: true },
        { id: 3, sender: "Alex Johnson", message: "Thank you for the placement guidance!", timestamp: "2:35 PM", isMe: false }
      ]
    },
    {
      id: 2,
      type: 'student',
      name: "Priya Sharma",
      avatar: "PS",
      lastMessage: "When is the next campus drive?",
      lastMessageTime: "20 min ago",
      unread: 1,
      isOnline: true,
      status: "4th Year IT Student",
      messages: [
        { id: 1, sender: "Priya Sharma", message: "Hi, I wanted to ask about upcoming opportunities", timestamp: "1:00 PM", isMe: false },
        { id: 2, sender: "Me", message: "We have several companies visiting next month", timestamp: "1:15 PM", isMe: true },
        { id: 3, sender: "Priya Sharma", message: "When is the next campus drive?", timestamp: "1:30 PM", isMe: false }
      ]
    },
    {
      id: 3,
      type: 'employee',
      name: "Sarah Chen (Google)",
      avatar: "SC",
      lastMessage: "I can mentor 3 more students this semester",
      lastMessageTime: "1 hour ago",
      unread: 0,
      isOnline: true,
      status: "Senior Software Engineer",
      messages: [
        { id: 1, sender: "Sarah Chen", message: "Hello, I'd like to update my mentorship availability", timestamp: "12:00 PM", isMe: false },
        { id: 2, sender: "Me", message: "Great! How many students can you mentor?", timestamp: "12:15 PM", isMe: true },
        { id: 3, sender: "Sarah Chen", message: "I can mentor 3 more students this semester", timestamp: "12:30 PM", isMe: false }
      ]
    },
    {
      id: 4,
      type: 'employee',
      name: "Rajesh Kumar (Microsoft)",
      avatar: "RK",
      lastMessage: "Completed session with 2 students today",
      lastMessageTime: "2 hours ago",
      unread: 0,
      isOnline: false,
      status: "Principal ML Engineer",
      messages: [
        { id: 1, sender: "Rajesh Kumar", message: "Just finished mentoring session", timestamp: "11:00 AM", isMe: false },
        { id: 2, sender: "Me", message: "That's excellent! How did it go?", timestamp: "11:15 AM", isMe: true },
        { id: 3, sender: "Rajesh Kumar", message: "Completed session with 2 students today", timestamp: "11:30 AM", isMe: false }
      ]
    },
    {
      id: 5,
      type: 'student',
      name: "Rahul Verma",
      avatar: "RV",
      lastMessage: "Need help with resume preparation",
      lastMessageTime: "3 hours ago",
      unread: 3,
      isOnline: false,
      status: "3rd Year ECE Student",
      messages: [
        { id: 1, sender: "Rahul Verma", message: "Hi, I need guidance on my resume", timestamp: "10:00 AM", isMe: false },
        { id: 2, sender: "Me", message: "I'll review it. Please share your resume", timestamp: "10:15 AM", isMe: true },
        { id: 3, sender: "Rahul Verma", message: "Need help with resume preparation", timestamp: "10:30 AM", isMe: false }
      ]
    }
  ];

  // TPO Notifications
  const tpoNotifications = [
    {
      id: 1,
      type: "interview",
      title: "Interview Scheduled",
      message: "DataSense Labs has scheduled interviews with 5 students for tomorrow at 10 AM",
      timestamp: "30 min ago",
      isRead: false,
      priority: "high",
      actionRequired: true
    },
    {
      id: 2,
      type: "application",
      title: "New Applications",
      message: "12 students have applied for the Software Development Intern position at TechCorp",
      timestamp: "1 hour ago",
      isRead: false,
      priority: "medium",
      actionRequired: false
    },
    {
      id: 3,
      type: "placement",
      title: "Placement Offer",
      message: "Priya Sharma received an offer from Amazon Web Services - ₹15 LPA",
      timestamp: "2 hours ago",
      isRead: false,
      priority: "high",
      actionRequired: false
    },
    {
      id: 4,
      type: "mentorship",
      title: "Mentorship Update",
      message: "Sarah Chen has completed 10 mentorship sessions this month",
      timestamp: "4 hours ago",
      isRead: true,
      priority: "low",
      actionRequired: false
    },
    {
      id: 5,
      type: "company",
      title: "New Company Registration",
      message: "CryptoTech Solutions wants to partner for campus recruitment",
      timestamp: "5 hours ago",
      isRead: true,
      priority: "medium",
      actionRequired: true
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedChat) return;
    
    setChatMessage("");
    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedChat.name}`,
    });
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

  const handleViewEmployeeProfile = (employee: any) => {
    toast({
      title: "Employee Profile",
      description: `Viewing profile for ${employee.name} from ${employee.company}`,
    });
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
                  <h1 className="text-xl font-bold text-foreground">{getPortalTitle()}</h1>
                  <p className="text-sm text-muted-foreground">{getPortalSubtitle()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isTPOUser && (
                <>
                  <Badge className="bg-campus-secondary text-white">
                    <Target className="w-4 h-4 mr-1" />
                    Administrator
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
                      5
                    </Badge>
                  </Button>
                </>
              )}
              {isStudentOrEmployee && (
                <Badge className="bg-blue-100 text-blue-800">
                  {userProfile?.role === 'student' ? 'Student' : 'Employee'} Access
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className={`grid w-full ${isTPOUser ? 'grid-cols-6' : 'grid-cols-2'} mb-6`}>
            {/* Always show Opportunities tab */}
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Opportunities
            </TabsTrigger>
            
            {/* Always show Companies tab */}
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Companies
            </TabsTrigger>

            {/* Only show these tabs for TPO users */}
            {isTPOUser && (
              <>
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </TabsTrigger>
                
                <TabsTrigger value="students" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Students
                </TabsTrigger>
                
                <TabsTrigger value="employees" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Employees
                </TabsTrigger>
                
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* TPO-Only Tabs */}
          {isTPOUser && (
            <>
              {/* Dashboard Tab - TPO Only */}
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

          {/* Opportunities Tab - Always Available */}
          <TabsContent value="opportunities">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    {isTPOUser ? 'Manage Opportunities' : 'Browse Opportunities'}
                  </h2>
                  <p className="text-muted-foreground">
                    {isTPOUser 
                      ? 'Post and manage internships, hackathons, competitions, and job opportunities'
                      : 'Explore available internships, jobs, hackathons, and opportunities'
                    }
                  </p>
                </div>
                {isTPOUser && (
                  <Button 
                    variant="tpo" 
                    onClick={() => setIsAddingOpportunity(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Opportunity
                  </Button>
                )}
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
                
                {/* Quick stats for students/employees */}
                {isStudentOrEmployee && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Available Opportunities</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{getFilterCount("internships")}</div>
                        <div className="text-blue-700">Internships</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-600">{getFilterCount("hackathons")}</div>
                        <div className="text-purple-700">Hackathons</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">{getFilterCount("competitions")}</div>
                        <div className="text-green-700">Competitions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-orange-600">{getFilterCount("all")}</div>
                        <div className="text-orange-700">Total</div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Featured Opportunities for Students/Employees */}
              {isStudentOrEmployee && selectedFilter === "all" && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Featured Opportunities
                    </CardTitle>
                    <CardDescription className="text-blue-700">
                      Don't miss these popular opportunities with high demand!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-sm mb-1">🏆 Smart India Hackathon 2024</h4>
                        <p className="text-xs text-muted-foreground mb-2">Government of India • ₹1,00,000 Prize</p>
                        <Badge variant="secondary" className="text-xs">156 Applications</Badge>
                      </div>
                      <div className="p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-sm mb-1">💻 Google Summer of Code</h4>
                        <p className="text-xs text-muted-foreground mb-2">Google • $3,000-$6,600</p>
                        <Badge variant="secondary" className="text-xs">89 Applications</Badge>
                      </div>
                      <div className="p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-sm mb-1">🚀 NASA Space Apps Challenge</h4>
                        <p className="text-xs text-muted-foreground mb-2">NASA • Global Recognition</p>
                        <Badge variant="secondary" className="text-xs">312 Applications</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {isAddingOpportunity && isTPOUser && (
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

              {/* Internship Spotlight Section */}
              {(selectedFilter === "all" || selectedFilter === "internships") && (
                <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Users className="w-7 h-7" />
                      </div>
                      <div>
                        <span>Featured Internships</span>
                        <p className="text-blue-100 text-sm font-normal mt-1">
                          Premium opportunities for talented students
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getFilteredOpportunities()
                        .filter(opp => opp.type === 'Internship')
                        .slice(0, 6)
                        .map((internship) => (
                        <div key={internship.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-white mb-1">{internship.title}</h4>
                              <p className="text-blue-100 text-sm font-medium">{internship.company}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold text-lg">{internship.stipend}</div>
                              {internship.duration && (
                                <div className="text-blue-100 text-xs">{internship.duration}</div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-blue-100 text-sm mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{internship.location}</span>
                            <span>•</span>
                            <Users className="w-4 h-4" />
                            <span>{internship.applicants} applied</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {internship.skills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                                {skill}
                              </span>
                            ))}
                            {internship.skills.length > 3 && (
                              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                                +{internship.skills.length - 3}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {isTPOUser ? (
                              <Button size="sm" variant="outline" className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20">
                                <Eye className="w-4 h-4 mr-2" />
                                Manage
                              </Button>
                            ) : (
                              <Button size="sm" className="flex-1 bg-white text-blue-600 hover:bg-blue-50">
                                <Target className="w-4 h-4 mr-2" />
                                Apply Now
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {getFilteredOpportunities().filter(opp => opp.type === 'Internship').length === 0 && (
                      <div className="text-center text-blue-100 py-8">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-60" />
                        <p className="text-lg">No internships available at the moment</p>
                        <p className="text-sm opacity-80">Check back soon for new opportunities!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6">
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
                  <Card key={opportunity.id} className={`hover:shadow-lg transition-all duration-300 border-l-4 ${
                    opportunity.type === 'Internship' 
                      ? 'border-l-blue-500 bg-gradient-to-r from-blue-50/30 to-transparent' 
                      : opportunity.type.includes('Hackathon') 
                      ? 'border-l-purple-500 bg-gradient-to-r from-purple-50/30 to-transparent'
                      : opportunity.type.includes('Competition') 
                      ? 'border-l-yellow-500 bg-gradient-to-r from-yellow-50/30 to-transparent'
                      : 'border-l-campus-primary bg-gradient-to-r from-gray-50/30 to-transparent'
                  }`}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              opportunity.type === 'Internship' 
                                ? 'bg-blue-100 text-blue-600' 
                                : opportunity.type.includes('Hackathon') 
                                ? 'bg-purple-100 text-purple-600'
                                : opportunity.type.includes('Competition') 
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {opportunity.type === 'Hackathon' || opportunity.type === 'Global Hackathon' ? (
                                <Briefcase className="w-6 h-6" />
                              ) : opportunity.type === 'Internship' ? (
                                <Users className="w-6 h-6" />
                              ) : opportunity.type.includes('Competition') || opportunity.type === 'Programming Contest' ? (
                                <Star className="w-6 h-6" />
                              ) : opportunity.type === 'Open Source Program' ? (
                                <Building className="w-6 h-6" />
                              ) : (
                                <Briefcase className="w-6 h-6" />
                              )}
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-xl text-gray-900 mb-1">{opportunity.title}</CardTitle>
                              <p className="text-sm font-medium text-blue-600">{opportunity.company}</p>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">{opportunity.type}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className={getStatusColor(opportunity.status)}>
                              {opportunity.status}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {opportunity.category}
                            </Badge>
                            {opportunity.urgency && (
                              <Badge variant={opportunity.urgency === 'High' ? 'destructive' : opportunity.urgency === 'Medium' ? 'default' : 'secondary'}>
                                {opportunity.urgency} Priority
                              </Badge>
                            )}
                            {isStudentOrEmployee && opportunity.type === 'Internship' && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                🔥 Featured
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-blue-500" />
                              <span className="font-medium">{opportunity.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="w-4 h-4 text-green-500" />
                              <span className="font-medium">{opportunity.applicants} applicants</span>
                            </div>
                            {opportunity.duration && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span className="font-medium">{opportunity.duration}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-red-500" />
                              <span className="font-medium text-red-600">{opportunity.deadline}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-4 leading-relaxed">{opportunity.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {opportunity.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 transition-colors">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className={`text-xl font-bold mb-2 ${
                            opportunity.type === 'Internship' ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            💰 {opportunity.stipend}
                          </div>
                          {isStudentOrEmployee && (
                            <div className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full">
                              ⏰ {Math.ceil((new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-3 flex-wrap">
                        {isTPOUser ? (
                          <>
                            <Button variant="outline" size="sm" className="flex-1 min-w-fit">
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
                              className="text-destructive hover:text-destructive hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                              <Target className="w-4 h-4 mr-2" />
                              Apply Now
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-blue-50">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-orange-50">
                              <Calendar className="w-4 h-4 mr-2" />
                              Save for Later
                            </Button>
                          </>
                        )}
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

          {/* Employees Tab - TPO Only */}
          <TabsContent value="employees">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Employee Management</h2>
                  <p className="text-muted-foreground">Monitor employee mentors and their contributions</p>
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
                {employees.map((employee) => (
                  <Card key={employee.id} className="hover:shadow-soft transition-smooth">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">{employee.name}</CardTitle>
                            <Badge variant="outline">{employee.availability}</Badge>
                            <Badge variant="secondary">{employee.experience}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                            <span>📧 {employee.email}</span>
                            <span>🏢 {employee.company}</span>
                            <span>📊 {employee.department}</span>
                            <span>💼 {employee.position}</span>
                            <span>📍 {employee.location}</span>
                            <span>🗓️ Joined: {new Date(employee.joiningDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {employee.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {employee.skills.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{employee.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {employee.specializations.map((spec, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex gap-4 text-sm">
                            <span className="text-info">👥 {employee.mentees} Total Mentees</span>
                            <span className="text-success">✅ {employee.activeMentorships} Active</span>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span className="text-purple-600">📚 {employee.completedSessions} Sessions</span>
                            <span className="text-yellow-600">⭐ {employee.rating} Rating</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" onClick={() => handleViewEmployeeProfile(employee)}>
                          <FileText className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Mentorship History
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="w-4 h-4 mr-2" />
                          Current Mentees
                        </Button>
                        <Button variant="tpo" size="sm">
                          <UserCheck className="w-4 h-4 mr-2" />
                          Assign Students
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Companies Tab - Always Available */}
          <TabsContent value="companies">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    {isTPOUser ? 'Company Management' : 'Browse Companies'}
                  </h2>
                  <p className="text-muted-foreground">
                    {isTPOUser 
                      ? 'Manage company partnerships and recruitment drives'
                      : 'Explore companies and their profiles'
                    }
                  </p>
                </div>
                {isTPOUser && (
                  <Button className="bg-campus-primary hover:bg-campus-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Company
                  </Button>
                )}
              </div>

              {isTPOUser ? (
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
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">TechCorp Solutions</h3>
                          <p className="text-sm text-muted-foreground">Technology</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Leading software development company specializing in web applications and mobile solutions.</p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">Node.js</Badge>
                        <Badge variant="outline">Cloud</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        📍 Bangalore • 500+ employees • 12 open positions
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Company Profile
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">DataSense Labs</h3>
                          <p className="text-sm text-muted-foreground">Research & AI</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Cutting-edge AI research lab focusing on machine learning and data science innovations.</p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline">Python</Badge>
                        <Badge variant="outline">TensorFlow</Badge>
                        <Badge variant="outline">Research</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        📍 Hyderabad • 200+ employees • 8 open positions
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Company Profile
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Google Inc.</h3>
                          <p className="text-sm text-muted-foreground">Technology Giant</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Global technology leader in search, cloud computing, and artificial intelligence.</p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline">Go</Badge>
                        <Badge variant="outline">Kubernetes</Badge>
                        <Badge variant="outline">AI</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        📍 Mountain View • 100,000+ employees • 25 open positions
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Company Profile
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Microsoft Corporation</h3>
                          <p className="text-sm text-muted-foreground">Cloud & Software</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Leading provider of cloud services, productivity software, and enterprise solutions.</p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline">Azure</Badge>
                        <Badge variant="outline">C#</Badge>
                        <Badge variant="outline">Cloud</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        📍 Redmond • 220,000+ employees • 18 open positions
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Company Profile
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
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
            </>
          )}
        </Tabs>
      </div>

      {/* Communication Dialog */}
      <Dialog open={showCommunication} onOpenChange={setShowCommunication}>
        <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Communication Center
            </DialogTitle>
            <DialogDescription>
              Chat with students and employees for placement coordination
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 flex-1 min-h-0 overflow-hidden">
            {/* Students Section */}
            <Card className="lg:col-span-1 flex flex-col h-full min-h-0 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-blue-100 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    Students
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                    {tpoConversations.filter(c => c.type === 'student').length}
                  </Badge>
                </div>
              </CardHeader>
              <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto p-1" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#93c5fd #dbeafe'
                }}>
                  <div className="space-y-1">
                    {tpoConversations
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
                  </div>
                </div>
              </div>
            </Card>

            {/* Employees Section */}
            <Card className="lg:col-span-1 flex flex-col h-full min-h-0 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-green-100 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-green-600" />
                    Employees
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                    {tpoConversations.filter(c => c.type === 'employee').length}
                  </Badge>
                </div>
              </CardHeader>
              <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto p-1" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#86efac #dcfce7'
                }}>
                  <div className="space-y-1">
                    {tpoConversations
                      .filter(conversation => conversation.type === 'employee')
                      .map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedChat(conversation)}
                        className={`flex items-center gap-2 p-2 hover:bg-green-50 cursor-pointer transition-all duration-200 border-l-3 rounded-r-md ${
                          selectedChat?.id === conversation.id 
                            ? 'bg-green-100 border-l-green-500 shadow-sm' 
                            : 'border-l-transparent hover:border-l-green-300'
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <div className="w-7 h-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold shadow-sm">
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
                            <span className="text-xs font-medium text-green-600">Mentor</span>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="h-3 w-3 p-0 flex items-center justify-center text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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
                    selectedChat.type === 'student' ? 'bg-blue-50' : 'bg-green-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-md ${
                            selectedChat.type === 'student' 
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
                              selectedChat.type === 'student' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {selectedChat.type === 'student' ? 'Student' : 'Employee'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
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
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' 
                            : 'bg-white text-gray-900 shadow-md border border-gray-200'
                        } rounded-2xl px-5 py-3 transform transition-all duration-200 hover:scale-[1.02]`}>
                          <p className="text-sm leading-relaxed">{message.message}</p>
                          <p className={`text-xs mt-2 ${
                            message.isMe ? 'text-purple-100' : 'text-gray-500'
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
                          className="pr-12 py-4 rounded-full border-2 focus:border-purple-400 shadow-sm text-base"
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
                          selectedChat.type === 'student' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
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
                    <p className="text-2xl font-semibold mb-3">Start a conversation</p>
                    <p className="text-lg mb-6">Choose a student or employee to begin chatting</p>
                    <div className="flex items-center justify-center gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Employees</span>
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
              Stay updated with placement activities and important updates
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3">
                {tpoNotifications.length} Total
              </Badge>
              <Badge variant="destructive" className="px-3">
                {tpoNotifications.filter(n => !n.isRead).length} Unread
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {tpoNotifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.isRead ? 'bg-purple-50 border-purple-200' : ''} hover:shadow-sm transition-all`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'application' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'interview' ? 'bg-green-100 text-green-600' :
                          notification.type === 'placement' ? 'bg-purple-100 text-purple-600' :
                          notification.type === 'mentorship' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {notification.type === 'application' ? '📄' :
                           notification.type === 'interview' ? '🎤' :
                           notification.type === 'placement' ? '🎉' :
                           notification.type === 'mentorship' ? '👨‍🏫' :
                           '🏢'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
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