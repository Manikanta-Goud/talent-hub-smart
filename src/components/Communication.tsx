import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  ArrowLeft,
  Users,
  UserCheck,
  Clock,
  CheckCheck,
  X
} from 'lucide-react';

interface CommunicationProps {
  onClose: () => void;
  userRole: 'student' | 'employee' | 'tpo';
}

const Communication: React.FC<CommunicationProps> = ({ onClose, userRole }) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("students");

  // Mock data for students
  const students = [
    {
      id: 1,
      name: "Alex Kumar",
      program: "Computer Science",
      year: "3rd Year",
      avatar: "AK",
      lastMessage: "Thank you for the guidance on React components!",
      timestamp: "2 min ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      program: "Information Technology", 
      year: "2nd Year",
      avatar: "PS",
      lastMessage: "Can we schedule a session for next week?",
      timestamp: "1 hour ago",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Rahul Patel",
      program: "Software Engineering",
      year: "4th Year", 
      avatar: "RP",
      lastMessage: "The project demo went well, thanks to your tips!",
      timestamp: "3 hours ago",
      unread: 1,
      online: true
    }
  ];

  // Mock data for TPO officers
  const tpoOfficers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      position: "Senior TPO Officer",
      department: "Career Services",
      avatar: "SJ",
      lastMessage: "Please submit the monthly mentorship report by Friday",
      timestamp: "1 hour ago",
      unread: 1,
      online: true
    },
    {
      id: 2,
      name: "Prof. Rajesh Gupta",
      position: "TPO Coordinator",
      department: "Student Affairs",
      avatar: "RG",
      lastMessage: "New placement opportunities available for review",
      timestamp: "2 days ago",
      unread: 0,
      online: false
    }
  ];

  // Mock chat messages
  const chatMessages = [
    {
      id: 1,
      sender: "Alex Kumar",
      message: "Hi! I'm having trouble understanding React hooks. Could you help?",
      timestamp: "10:30 AM",
      isMe: false
    },
    {
      id: 2,
      sender: "Me",
      message: "Of course! React hooks are functions that let you use state and lifecycle features in functional components. Which specific hook are you struggling with?",
      timestamp: "10:32 AM", 
      isMe: true
    },
    {
      id: 3,
      sender: "Alex Kumar",
      message: "I'm confused about useEffect. When does it run?",
      timestamp: "10:35 AM",
      isMe: false
    },
    {
      id: 4,
      sender: "Me",
      message: "Great question! useEffect runs after the component renders. It can run on every render, or you can control when it runs using the dependency array.",
      timestamp: "10:37 AM",
      isMe: true
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message sending logic here
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const renderChatList = (contacts: any[], type: string) => (
    <div className="space-y-2">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            activeChat === `${type}-${contact.id}` 
              ? 'bg-blue-50 border-l-4 border-l-blue-500' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => setActiveChat(`${type}-${contact.id}`)}
        >
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {contact.avatar}
                </AvatarFallback>
              </Avatar>
              {contact.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium truncate">{contact.name}</h4>
                <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {type === 'student' ? `${contact.program} - ${contact.year}` : contact.position}
              </p>
              <p className="text-sm text-muted-foreground truncate mt-1">
                {contact.lastMessage}
              </p>
            </div>
            {contact.unread > 0 && (
              <Badge className="bg-blue-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {contact.unread}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Communication Hub</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Contact Lists */}
          <div className="w-1/3 border-r bg-gray-50">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <div className="p-4 border-b">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="tpo">TPO Officers</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4">
                <TabsContent value="students" className="mt-0">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Conversations</h3>
                    {renderChatList(students, 'student')}
                  </div>
                </TabsContent>

                <TabsContent value="tpo" className="mt-0">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">TPO Officers</h3>
                    {renderChatList(tpoOfficers, 'tpo')}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          AK
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Alex Kumar</h3>
                        <p className="text-sm text-muted-foreground">Computer Science - 3rd Year</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.isMe
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.isMe ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex items-center gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 min-h-[40px] max-h-[100px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} className="px-4">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500">
                    Choose a student or TPO officer to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;