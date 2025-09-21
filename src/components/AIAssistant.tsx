import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Calendar,
  AlertCircle,
  Star,
  Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface OpportunityUpdate {
  type: 'new' | 'trending' | 'ending' | 'available';
  title: string;
  company: string;
  deadline?: string;
  matchScore?: number;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock data for daily updates
  const todayUpdates: OpportunityUpdate[] = [
    {
      type: 'new',
      title: 'Frontend Developer Intern',
      company: 'TechFlow Solutions',
      deadline: '2024-02-15',
      matchScore: 94
    },
    {
      type: 'new',
      title: 'AI Research Assistant',
      company: 'DataMind Labs',
      deadline: '2024-02-20',
      matchScore: 89
    },
    {
      type: 'trending',
      title: 'Full Stack Developer',
      company: 'InnovateCorp',
      deadline: '2024-02-18',
      matchScore: 92
    },
    {
      type: 'ending',
      title: 'Backend Developer Intern',
      company: 'CloudTech',
      deadline: 'Today',
      matchScore: 87
    },
    {
      type: 'ending',
      title: 'Mobile App Developer',
      company: 'AppWorks',
      deadline: 'Tomorrow',
      matchScore: 85
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting message
      setTimeout(() => {
        addAssistantMessage(
          "Hi! I'm your Campus-Connect AI Assistant 🎓\n\nI'm here to help you stay updated with:\n• New opportunities posted today\n• Trending internships\n• Deadlines ending soon\n• Personalized recommendations\n\nWhat would you like to know?",
          [
            "Show me new opportunities today",
            "What's trending?",
            "Deadlines ending soon",
            "Best matches for me"
          ]
        );
      }, 500);
    }
  }, [isOpen]);

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addAssistantMessage = (content: string, suggestions?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content,
        timestamp: new Date(),
        suggestions
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    processUserQuery(inputValue);
    setInputValue("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion);
    processUserQuery(suggestion);
  };

  const processUserQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("new") || lowerQuery.includes("today")) {
      const newOpportunities = todayUpdates.filter(update => update.type === 'new');
      let response = "🆕 **New Opportunities Posted Today:**\n\n";
      
      newOpportunities.forEach(opp => {
        response += `• **${opp.title}** at ${opp.company}\n`;
        response += `  Match Score: ${opp.matchScore}% | Deadline: ${opp.deadline}\n\n`;
      });

      response += "Would you like me to help you apply to any of these?";
      
      addAssistantMessage(response, [
        "Apply to best matches",
        "Tell me more about TechFlow",
        "Show application requirements"
      ]);

    } else if (lowerQuery.includes("trending")) {
      const trendingOpportunities = todayUpdates.filter(update => update.type === 'trending');
      let response = "🔥 **Trending Opportunities:**\n\n";
      
      trendingOpportunities.forEach(opp => {
        response += `• **${opp.title}** at ${opp.company}\n`;
        response += `  High interest • Match Score: ${opp.matchScore}%\n\n`;
      });

      response += "These are getting lots of applications! Want to apply quickly?";
      
      addAssistantMessage(response, [
        "Quick apply to trending",
        "Why are these trending?",
        "Show similar opportunities"
      ]);

    } else if (lowerQuery.includes("deadline") || lowerQuery.includes("ending")) {
      const endingOpportunities = todayUpdates.filter(update => update.type === 'ending');
      let response = "⏰ **Deadlines Ending Soon:**\n\n";
      
      endingOpportunities.forEach(opp => {
        response += `• **${opp.title}** at ${opp.company}\n`;
        response += `  ⚠️ Deadline: ${opp.deadline} | Match: ${opp.matchScore}%\n\n`;
      });

      response += "Don't miss out! Should I help you apply immediately?";
      
      addAssistantMessage(response, [
        "Apply to all ending soon",
        "Set deadline reminders",
        "Check application status"
      ]);

    } else if (lowerQuery.includes("best") || lowerQuery.includes("match")) {
      let response = "🎯 **Your Best Matches Today:**\n\n";
      
      const sortedByMatch = [...todayUpdates].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      
      sortedByMatch.slice(0, 3).forEach(opp => {
        response += `• **${opp.title}** at ${opp.company}\n`;
        response += `  🌟 ${opp.matchScore}% match based on your skills\n\n`;
      });

      response += "These are perfect for your profile! Ready to apply?";
      
      addAssistantMessage(response, [
        "Apply to top matches",
        "Why these match me?",
        "Improve my profile"
      ]);

    } else if (lowerQuery.includes("apply")) {
      const response = "🚀 **Let me help you apply!**\n\nI can:\n• Pre-fill applications with your profile\n• Check if you meet requirements\n• Track application status\n• Set interview reminders\n\nWhich opportunity interests you most?";
      
      addAssistantMessage(response, [
        "Pre-fill TechFlow application",
        "Check my eligibility",
        "Track all applications"
      ]);

    } else {
      const response = "I'm here to help you with opportunity updates! 📚\n\nI can assist you with:\n• Daily opportunity updates\n• Deadline tracking\n• Application guidance\n• Match recommendations\n\nWhat would you like to explore?";
      
      addAssistantMessage(response, [
        "Show today's updates",
        "Check deadlines",
        "Help me apply",
        "Find best matches"
      ]);
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'new': return <Sparkles className="w-4 h-4 text-success" />;
      case 'trending': return <TrendingUp className="w-4 h-4 text-info" />;
      case 'ending': return <Clock className="w-4 h-4 text-warning" />;
      default: return <Briefcase className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Notification badges */}
          <div className="absolute -top-2 -left-2 flex flex-col gap-1">
            <Badge className="bg-success text-white text-xs px-2 py-1 animate-pulse">
              2 New!
            </Badge>
            <Badge className="bg-warning text-white text-xs px-2 py-1 animate-pulse">
              Ending Soon
            </Badge>
          </div>
          
          <Button
            onClick={() => setIsOpen(true)}
            variant="ai"
            size="lg"
            className="rounded-full w-14 h-14 shadow-glow hover:scale-110 transition-spring"
          >
            <Bot className="w-6 h-6" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[600px] shadow-strong border-0 bg-campus-surface-elevated">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">Your placement guide</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[500px]">
          {/* Daily Updates Summary */}
          <div className="px-4 pb-3 border-b">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-success" />
                <span>2 New Today</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-info" />
                <span>1 Trending</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-warning" />
                <span>2 Ending Soon</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-campus-primary" />
                <span>94% Best Match</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-3">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.type === 'user'
                        ? 'bg-campus-primary text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === 'assistant' && (
                        <Bot className="w-4 h-4 mt-0.5 text-campus-primary" />
                      )}
                      <div className="whitespace-pre-line text-sm">
                        {message.content}
                      </div>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full text-xs h-8 justify-start"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Bot className="w-4 h-4 text-campus-primary" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-campus-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-campus-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-campus-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about opportunities..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                variant="student"
                size="sm"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;