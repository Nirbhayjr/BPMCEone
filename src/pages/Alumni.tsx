import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, MessageCircle, Phone, Video, Send, 
  Briefcase, MapPin, GraduationCap, X, Mic, MicOff,
  VideoOff, PhoneOff, Users
} from "lucide-react";
import { DemoBanner } from "@/components/ui/demo-badge";

interface Alumni {
  id: string;
  name: string;
  batch: number;
  department: string;
  company: string;
  role: string;
  location: string;
  avatar: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isSelf: boolean;
}

const alumniData: Alumni[] = [
  { id: "1", name: "Rahul Sharma", batch: 2020, department: "CSE", company: "Google", role: "Software Engineer", location: "Bangalore", avatar: "", isOnline: true },
  { id: "2", name: "Priya Patel", batch: 2019, department: "ECE", company: "Microsoft", role: "Product Manager", location: "Hyderabad", avatar: "", isOnline: true },
  { id: "3", name: "Amit Kumar", batch: 2021, department: "CSE", company: "Amazon", role: "SDE II", location: "Pune", avatar: "", isOnline: false },
  { id: "4", name: "Sneha Gupta", batch: 2018, department: "ME", company: "Tata Motors", role: "Design Engineer", location: "Mumbai", avatar: "", isOnline: true },
  { id: "5", name: "Vikram Singh", batch: 2020, department: "EE", company: "Tesla", role: "Hardware Engineer", location: "California", avatar: "", isOnline: false },
  { id: "6", name: "Ananya Reddy", batch: 2022, department: "CSE", company: "Flipkart", role: "Frontend Developer", location: "Bangalore", avatar: "", isOnline: true },
  { id: "7", name: "Karthik Nair", batch: 2017, department: "CE", company: "L&T", role: "Project Manager", location: "Chennai", avatar: "", isOnline: false },
  { id: "8", name: "Neha Verma", batch: 2021, department: "CSE", company: "Infosys", role: "Data Analyst", location: "Delhi", avatar: "", isOnline: true },
];

const mockMessages: Message[] = [
  { id: "1", senderId: "other", text: "Hi! How can I help you with your career?", timestamp: new Date(), isSelf: false },
  { id: "2", senderId: "self", text: "Hello! I wanted to know about opportunities at your company.", timestamp: new Date(), isSelf: true },
  { id: "3", senderId: "other", text: "Sure! We have openings for freshers. What's your specialization?", timestamp: new Date(), isSelf: false },
];

const Alumni = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [callOpen, setCallOpen] = useState<"audio" | "video" | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const filteredAlumni = alumniData.filter((alumni) =>
    alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alumni.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      senderId: "self",
      text: newMessage,
      timestamp: new Date(),
      isSelf: true,
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const openChat = (alumni: Alumni) => {
    setSelectedAlumni(alumni);
    setChatOpen(true);
    setCallOpen(null);
  };

  const startCall = (alumni: Alumni, type: "audio" | "video") => {
    setSelectedAlumni(alumni);
    setCallOpen(type);
    setChatOpen(false);
  };

  return (
    <div className="space-y-6">
      <DemoBanner />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Alumni Network</h1>
        <p className="text-muted-foreground mt-1">
          Connect with alumni for mentorship, career guidance, and networking
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alumni List */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Alumni Directory
                </CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alumni..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {filteredAlumni.map((alumni, index) => (
                    <motion.div
                      key={alumni.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={alumni.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                  {alumni.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              {alumni.isOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-foreground">{alumni.name}</h3>
                                <Badge variant="secondary" className="text-xs">
                                  {alumni.department} '{alumni.batch.toString().slice(-2)}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                <Briefcase className="h-3.5 w-3.5" />
                                {alumni.role} at {alumni.company}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5" />
                                {alumni.location}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openChat(alumni)}
                                className="h-9 w-9"
                              >
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => startCall(alumni, "audio")}
                                className="h-9 w-9"
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => startCall(alumni, "video")}
                                className="h-9 w-9"
                              >
                                <Video className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chat/Call Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-[580px] flex flex-col">
            <AnimatePresence mode="wait">
              {!chatOpen && !callOpen ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="p-4 rounded-full bg-muted mb-4">
                    <MessageCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground">Start a Conversation</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select an alumni to chat or call
                  </p>
                </motion.div>
              ) : chatOpen && selectedAlumni ? (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col"
                >
                  <CardHeader className="border-b py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {selectedAlumni.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-sm">{selectedAlumni.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {selectedAlumni.isOnline ? "Online" : "Offline"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startCall(selectedAlumni, "audio")}>
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startCall(selectedAlumni, "video")}>
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setChatOpen(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.isSelf ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                              msg.isSelf
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : callOpen && selectedAlumni ? (
                <motion.div
                  key="call"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-muted/50 to-muted p-6">
                    {callOpen === "video" && (
                      <div className="w-full aspect-video bg-black/90 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                            {selectedAlumni.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {/* Self video preview */}
                        <div className="absolute bottom-3 right-3 w-24 h-16 bg-black/80 rounded-md flex items-center justify-center border border-white/20">
                          <span className="text-white/60 text-xs">You</span>
                        </div>
                      </div>
                    )}
                    {callOpen === "audio" && (
                      <Avatar className="h-28 w-28 mb-4">
                        <AvatarFallback className="bg-primary/20 text-primary text-3xl">
                          {selectedAlumni.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <h3 className="font-semibold text-lg">{selectedAlumni.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {callOpen === "video" ? "Video" : "Audio"} Call
                    </p>
                    <motion.p
                      className="text-sm text-green-500 mt-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Connecting...
                    </motion.p>
                  </div>
                  <div className="p-4 border-t flex justify-center gap-4">
                    <Button
                      variant={isMuted ? "destructive" : "outline"}
                      size="icon"
                      className="h-12 w-12 rounded-full"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    {callOpen === "video" && (
                      <Button
                        variant={isVideoOff ? "destructive" : "outline"}
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={() => setIsVideoOff(!isVideoOff)}
                      >
                        {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-12 w-12 rounded-full"
                      onClick={() => setCallOpen(null)}
                    >
                      <PhoneOff className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Alumni;
