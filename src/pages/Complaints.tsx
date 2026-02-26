import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareWarning,
  Plus,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  ImageIcon,
  ChevronRight,
  X,
  Send,
  Tag,
  UserX,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

interface Complaint {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  date: string;
  image: string | null;
  response: string | null;
  isAnonymous: boolean;
  submittedBy?: {
    name: string;
    rollNumber: string;
    branch: string;
  };
}

// Sample data
const initialComplaints: Complaint[] = [
  {
    id: 1,
    title: "Library AC not working",
    description: "The air conditioning in the main library has been broken for 3 days. It's very uncomfortable to study.",
    category: "Infrastructure",
    priority: "high",
    status: "pending",
    date: "Dec 22, 2025",
    image: null,
    response: null,
    isAnonymous: false,
    submittedBy: {
      name: "John Doe",
      rollNumber: "21BCS101",
      branch: "CSE"
    }
  },
  {
    id: 2,
    title: "Cafeteria food quality",
    description: "The quality of food in the main cafeteria has declined significantly. Several students have reported stomach issues.",
    category: "Food & Dining",
    priority: "high",
    status: "in-progress",
    date: "Dec 20, 2025",
    image: null,
    response: "We have initiated an inspection of the cafeteria. A food safety team will visit tomorrow.",
    isAnonymous: true
  },
  {
    id: 3,
    title: "Parking space shortage",
    description: "There are not enough parking spaces for students. Many have to park far away.",
    category: "Facilities",
    priority: "medium",
    status: "in-progress",
    date: "Dec 18, 2025",
    image: null,
    response: "We are exploring options for additional parking. A temporary lot is being set up.",
    isAnonymous: false,
    submittedBy: {
      name: "Jane Smith",
      rollNumber: "21BCS102",
      branch: "CSE AIML"
    }
  },
  {
    id: 4,
    title: "Broken projector in Room 204",
    description: "The projector in lecture room 204 is not working properly. The image is very dim.",
    category: "Equipment",
    priority: "medium",
    status: "resolved",
    date: "Dec 15, 2025",
    image: null,
    response: "The projector has been replaced. Thank you for reporting this issue.",
    isAnonymous: false,
    submittedBy: {
      name: "Mike Johnson",
      rollNumber: "21BEE201",
      branch: "EEE"
    }
  },
  {
    id: 5,
    title: "Wi-Fi connectivity issues",
    description: "The Wi-Fi in the engineering building drops frequently, making it hard to attend online classes.",
    category: "IT Services",
    priority: "high",
    status: "resolved",
    date: "Dec 12, 2025",
    image: null,
    response: "Network equipment has been upgraded. Please report if issues persist.",
    isAnonymous: true
  },
];

const categories = ["All", "Infrastructure", "Food & Dining", "Facilities", "Equipment", "IT Services", "Security", "Other"];

const statusConfig = {
  pending: { label: "Pending", color: "complaints", icon: Clock },
  "in-progress": { label: "In Progress", color: "lost", icon: AlertCircle },
  resolved: { label: "Resolved", color: "attendance", icon: CheckCircle },
};

const priorityConfig = {
  high: { label: "High", color: "bg-safety/20 text-safety border-safety/30" },
  medium: { label: "Medium", color: "bg-lost/20 text-lost border-lost/30" },
  low: { label: "Low", color: "bg-muted text-muted-foreground border-border" },
};

export default function Complaints() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
    category: "Infrastructure",
    priority: "medium"
  });

  // Load complaints from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("campusone_complaints");
    if (saved) {
      try {
        setComplaints(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading complaints:", e);
      }
    }
  }, []);

  // Save complaints to localStorage
  useEffect(() => {
    if (complaints.length > 0) {
      localStorage.setItem("campusone_complaints", JSON.stringify(complaints));
    }
  }, [complaints]);

  const handleSubmitComplaint = () => {
    if (!newComplaint.title.trim() || !newComplaint.description.trim()) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const complaint: Complaint = {
      id: complaints.length > 0 ? Math.max(...complaints.map(c => c.id)) + 1 : 1,
      title: newComplaint.title,
      description: newComplaint.description,
      category: newComplaint.category,
      priority: newComplaint.priority,
      status: "pending",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      image: null,
      response: null,
      isAnonymous: isAnonymous,
      ...(!isAnonymous && user ? {
        submittedBy: {
          name: user.name,
          rollNumber: user.rollNumber,
          branch: user.branch
        }
      } : {})
    };

    setComplaints([complaint, ...complaints]);
    setNewComplaint({ title: "", description: "", category: "Infrastructure", priority: "medium" });
    setIsAnonymous(false);
    setIsNewComplaintOpen(false);

    toast({
      title: "Complaint Submitted",
      description: isAnonymous 
        ? "Your anonymous complaint has been submitted successfully."
        : "Your complaint has been submitted successfully.",
    });
  };

  const filteredComplaints = complaints.filter(c => {
    if (filter !== "All" && c.category !== filter) return false;
    if (statusFilter && c.status !== statusFilter) return false;
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const groupedComplaints = {
    pending: filteredComplaints.filter(c => c.status === "pending"),
    "in-progress": filteredComplaints.filter(c => c.status === "in-progress"),
    resolved: filteredComplaints.filter(c => c.status === "resolved"),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-complaints/20 flex items-center justify-center">
              <MessageSquareWarning className="w-6 h-6 text-complaints" />
            </div>
            Complaint Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage your campus complaints
          </p>
        </div>
        
        <Dialog open={isNewComplaintOpen} onOpenChange={setIsNewComplaintOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-bg text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>File a New Complaint</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {/* Anonymous Toggle */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      isAnonymous ? "bg-primary/20" : "bg-muted"
                    )}>
                      {isAnonymous ? (
                        <UserX className="w-5 h-5 text-primary" />
                      ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <Label htmlFor="anonymous-mode" className="text-sm font-medium cursor-pointer">
                        Submit Anonymously
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {isAnonymous 
                          ? "Your identity will not be stored" 
                          : "Your details will be attached"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="anonymous-mode"
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                  />
                </div>
                {!isAnonymous && user && (
                  <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    <p>Submitting as: <span className="font-medium text-foreground">{user.name}</span></p>
                    <p>Roll: <span className="font-medium text-foreground">{user.rollNumber}</span> | Branch: <span className="font-medium text-foreground">{user.branch}</span></p>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Title</Label>
                <Input 
                  placeholder="Brief description of the issue" 
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Category</Label>
                <select 
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                  value={newComplaint.category}
                  onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Priority</Label>
                <select 
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
                  value={newComplaint.priority}
                  onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Description</Label>
                <Textarea 
                  placeholder="Provide details about the issue..." 
                  rows={4}
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Attach Image (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsNewComplaintOpen(false)}>Cancel</Button>
                <Button className="gradient-bg text-primary-foreground" onClick={handleSubmitComplaint}>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Complaint
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
              className={filter === cat ? "gradient-bg text-primary-foreground" : ""}
            >
              {cat}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-8">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = complaints.filter(c => c.status === status).length;
          const StatusIcon = config.icon;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? null : status)}
              className={cn(
                "glass-card p-4 rounded-xl text-left transition-all",
                statusFilter === status && "ring-2 ring-primary"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon className={cn("w-5 h-5", `text-${config.color}`)} />
                <span className="text-sm text-muted-foreground">{config.label}</span>
              </div>
              <p className={cn("text-3xl font-bold", `text-${config.color}`)}>{count}</p>
            </button>
          );
        })}
      </motion.div>

      {/* Kanban Board */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(groupedComplaints).map(([status, items]) => {
          const config = statusConfig[status as keyof typeof statusConfig];
          const StatusIcon = config.icon;
          
          return (
            <div key={status} className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusIcon className={cn("w-5 h-5", `text-${config.color}`)} />
                <h3 className="font-semibold text-foreground">{config.label}</h3>
                <Badge variant="secondary" className="ml-auto">{items.length}</Badge>
              </div>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {items.map((complaint) => (
                    <motion.div
                      key={complaint.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedComplaint(complaint)}
                      className="glass-card p-4 rounded-xl cursor-pointer hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm line-clamp-2">
                          {complaint.title}
                        </h4>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ml-2",
                          priorityConfig[complaint.priority as keyof typeof priorityConfig].color
                        )}>
                          {complaint.priority}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {complaint.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {complaint.category}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {complaint.date}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {items.length === 0 && (
                  <div className="glass-card p-6 rounded-xl text-center">
                    <p className="text-sm text-muted-foreground">No complaints</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Complaint Detail Modal */}
      <AnimatePresence>
        {selectedComplaint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedComplaint(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">{selectedComplaint.title}</h2>
                  <div className="flex items-center gap-2">
                    <Badge className={cn(
                      statusConfig[selectedComplaint.status as keyof typeof statusConfig].color === "complaints" && "bg-complaints/20 text-complaints",
                      statusConfig[selectedComplaint.status as keyof typeof statusConfig].color === "lost" && "bg-lost/20 text-lost",
                      statusConfig[selectedComplaint.status as keyof typeof statusConfig].color === "attendance" && "bg-attendance/20 text-attendance"
                    )}>
                      {statusConfig[selectedComplaint.status as keyof typeof statusConfig].label}
                    </Badge>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium border",
                      priorityConfig[selectedComplaint.priority as keyof typeof priorityConfig].color
                    )}>
                      {selectedComplaint.priority} priority
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedComplaint(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Submitted By Section */}
                <div className="p-3 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    {selectedComplaint.isAnonymous ? (
                      <>
                        <UserX className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Anonymous Submission</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Submitted By</span>
                      </>
                    )}
                  </div>
                  {selectedComplaint.isAnonymous ? (
                    <p className="text-xs text-muted-foreground ml-6">Identity protected for privacy</p>
                  ) : selectedComplaint.submittedBy ? (
                    <div className="ml-6 space-y-1">
                      <p className="text-sm text-foreground font-medium">{selectedComplaint.submittedBy.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Roll: {selectedComplaint.submittedBy.rollNumber} | {selectedComplaint.submittedBy.branch}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground ml-6">Unknown</p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                  <p className="text-foreground">{selectedComplaint.description}</p>
                </div>

                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category: </span>
                    <span className="text-foreground">{selectedComplaint.category}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Filed: </span>
                    <span className="text-foreground">{selectedComplaint.date}</span>
                  </div>
                </div>

                {selectedComplaint.response && (
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Admin Response</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedComplaint.response}</p>
                  </div>
                )}

                {selectedComplaint.status !== "resolved" && (
                  <div className="pt-4 border-t border-border">
                    <Textarea placeholder="Add a follow-up message..." rows={3} />
                    <div className="flex justify-end mt-2">
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
