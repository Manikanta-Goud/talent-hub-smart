import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Brain, Users, BarChart3, Zap, Target, Sparkles, User, Briefcase, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AIAssistant from "@/components/AIAssistant";
import heroCampus from "@/assets/hero-campus.jpg";
import aiMatching from "@/assets/ai-matching.jpg";
import analyticsDashboard from "@/assets/analytics-dashboard.jpg";
import roleBasedPortals from "@/assets/role-based-portals.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  // Determine user role with fallback - default to 'student' if no role is set
  const userRole: 'student' | 'employee' | 'tpo' = userProfile?.role || 'student';

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
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

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Intelligent algorithms match students with perfect opportunities using NLP and similarity analysis.",
      image: aiMatching,
      color: "bg-gradient-primary"
    },
    {
      icon: Users,
      title: "Role-Based Portals",
      description: "Dedicated interfaces for students, employees, admins, and employers with tailored experiences for knowledge sharing.",
      image: "https://y7b6t9n6.delivery.rocketcdn.me/wp-content/uploads/2024/02/4-TOP-10-eLearning-Websites-1024x587.png.webp",
      color: "bg-campus-primary"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive dashboards providing insights on placement rates, trends, and performance metrics.",
      image: analyticsDashboard,
      color: "bg-campus-secondary"
    }
  ];

  const phases = [
    {
      phase: "Phase 1",
      title: "Foundational MVP",
      description: "Core workflow between students, employees, and admins with authentication, profiles, and knowledge sharing.",
      status: "In Development"
    },
    {
      phase: "Phase 2", 
      title: "Feature Expansion",
      description: "Mentor and employer portals, notification system, and calendar integration.",
      status: "Planned"
    },
    {
      phase: "Phase 3",
      title: "Intelligence & Analytics",
      description: "Full AI recommendation engine and advanced analytics dashboard.",
      status: "Future"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Campus-Connect</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Profile Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-12 w-12 rounded-full hover:bg-muted/50 transition-all duration-200 ring-2 ring-transparent hover:ring-primary/20 focus:ring-primary/30"
                >
                  <Avatar className="h-11 w-11 border-2 border-white/20 shadow-md">
                    <AvatarImage 
                      src={(userProfile as any)?.resume_url} 
                      alt={userProfile?.full_name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online indicator */}
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={(userProfile as any)?.resume_url} 
                      alt={userProfile?.full_name}
                    />
                    <AvatarFallback className="bg-gradient-primary text-white text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userProfile?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userProfile?.email || user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Direct Profile Access - Backup Button */}
            <Button 
              onClick={() => navigate('/profile')}
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted/50 transition-all duration-200"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroCampus} 
            alt="Campus Connect Hero" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-campus-primary text-white" variant="secondary">
              Smart India Hackathon 2024
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Welcome back, 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> {userProfile?.full_name?.split(' ')[0] || 'Student'}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {userProfile ? 
                `Ready to explore new opportunities? Access your personalized dashboard and discover ${userRole === 'student' ? 'internships' : userRole === 'employee' ? 'mentorship opportunities' : 'TPO management tools'} tailored for ${userRole === 'student' ? (userProfile as any)?.course + ' students' : userRole + 's'}.` :
                'Access your personalized dashboard and discover new opportunities tailored just for you.'
              }
            </p>
            
            {/* Quick Access Alert for Role-Based Navigation */}
            {userProfile && (
              <div className="mb-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto mb-4">
                  <p className="text-sm text-blue-800 font-medium">
                    🎯 Quick Access: As a <span className="font-bold capitalize">{userRole}</span>, 
                    your primary portal is highlighted below in blue.
                  </p>
                </div>
                
                {/* Auto-Redirect Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (userRole === 'student') navigate('/student');
                    else if (userRole === 'employee') navigate('/employee');
                    else if (userRole === 'tpo') navigate('/tpo');
                  }}
                  className="bg-green-50 border-green-200 text-green-800 hover:bg-green-100 font-medium"
                >
                  🚀 Take me to my {userRole === 'student' ? 'Student' : userRole === 'employee' ? 'Employee' : 'TPO'} Portal
                </Button>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Show role-appropriate primary button based on user role */}
              {userRole === 'student' ? (
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/student')}
                  className="text-lg px-8 py-3"
                >
                  <Users className="w-5 h-5" />
                  My Student Portal
                </Button>
              ) : userRole === 'employee' ? (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => navigate('/employee')}
                  className="text-lg px-8 py-3"
                >
                  <Briefcase className="w-5 h-5" />
                  My Employee Portal
                </Button>
              ) : userRole === 'tpo' ? (
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/tpo')}
                  className="text-lg px-8 py-3"
                >
                  <Target className="w-5 h-5" />
                  My TPO Portal
                </Button>
              ) : (
                // This should never happen with our default logic, but safety fallback
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/student')}
                  className="text-lg px-8 py-3"
                >
                  <Users className="w-5 h-5" />
                  Student Portal
                </Button>
              )}
              
              {/* Secondary portals - show other portals as secondary options (hide for TPO) */}
              {userRole !== 'tpo' && (
                <div className="flex gap-2">
                  {userRole !== 'student' && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate('/student')}
                      className="text-lg px-6 py-3"
                    >
                      <Users className="w-5 h-5" />
                      Student Portal
                    </Button>
                  )}
                  {userRole !== 'employee' && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate('/employee')}
                      className="text-lg px-6 py-3"
                    >
                      <Briefcase className="w-5 h-5" />
                      Employee Portal
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-campus-surface-elevated">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">The Challenge We're Solving</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive">Fragmented Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Scattered WhatsApp messages and emails cause opportunities to be missed</p>
                </CardContent>
              </Card>
              <Card className="border-warning/20">
                <CardHeader>
                  <CardTitle className="text-warning">Administrative Burden</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Manual spreadsheets create inefficiency and prevent strategic work</p>
                </CardContent>
              </Card>
              <Card className="border-info/20">
                <CardHeader>
                  <CardTitle className="text-info">Missed Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Students struggle to find relevant internships and placements</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Platform Features</h2>
            <p className="text-xl text-muted-foreground">Intelligent, role-based solutions for every stakeholder</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-strong transition-spring border-0 bg-campus-surface-elevated">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                {feature.image && (
                  <CardContent>
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-40 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-smooth"
                    />
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wow Feature */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white" variant="secondary">
              <Zap className="w-4 h-4 mr-2" />
              Wow Feature
            </Badge>
            <h2 className="text-4xl font-bold mb-6">Intelligent Matching Engine</h2>
            <p className="text-xl mb-8 opacity-90">
              Our core innovation goes beyond simple job boards. Using NLP and similarity algorithms, 
              we calculate personalized "Match Scores" to ensure every student sees the most relevant 
              opportunities first, dramatically increasing engagement and success rates.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Brain className="w-8 h-8 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">NLP Analysis</h3>
                <p className="opacity-80">Analyzes skills, projects, and preferences</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Target className="w-8 h-8 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">Match Scoring</h3>
                <p className="opacity-80">Calculates compatibility percentage</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Sparkles className="w-8 h-8 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">Personalized Feed</h3>
                <p className="opacity-80">Curates opportunities for each student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Phases */}
      <section className="py-16 bg-campus-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Development Roadmap</h2>
            <p className="text-xl text-muted-foreground">Strategic phases for comprehensive platform delivery</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((phase, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-medium transition-spring">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-campus-primary text-white">
                      {phase.phase}
                    </Badge>
                    <Badge variant="outline" className={
                      phase.status === 'In Development' ? 'border-success text-success' :
                      phase.status === 'Planned' ? 'border-warning text-warning' :
                      'border-muted-foreground text-muted-foreground'
                    }>
                      {phase.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{phase.title}</CardTitle>
                  <CardDescription className="text-base">{phase.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Campus?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the revolution in campus placement management. Experience the power of intelligent matching today.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Campus-Connect</span>
          </div>
          <p className="text-muted opacity-70">
            Smart India Hackathon 2024 • Revolutionizing Campus Placements with AI
          </p>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default LandingPage;