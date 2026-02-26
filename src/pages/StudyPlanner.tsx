import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  Plus,
  CheckCircle,
  Circle,
  BookOpen,
  Lightbulb,
  Sparkles,
  Send,
  GripVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


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

// Sample data
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const studyPlan = [
  {
    day: "Monday",
    date: "Dec 23",
    tasks: [
      { id: 1, time: "09:00 - 10:30", subject: "Mathematics", topic: "Calculus - Integration", done: true, priority: "high" },
      { id: 2, time: "11:00 - 12:30", subject: "Physics", topic: "Wave Mechanics", done: true, priority: "medium" },
      { id: 3, time: "14:00 - 15:30", subject: "Computer Science", topic: "Data Structures", done: false, priority: "high" },
      { id: 4, time: "16:00 - 17:00", subject: "English", topic: "Essay Writing", done: false, priority: "low" },
    ]
  },
  {
    day: "Tuesday",
    date: "Dec 24",
    tasks: [
      { id: 5, time: "09:00 - 11:00", subject: "Physics", topic: "Thermodynamics Lab", done: false, priority: "high" },
      { id: 6, time: "13:00 - 14:30", subject: "Mathematics", topic: "Linear Algebra", done: false, priority: "medium" },
      { id: 7, time: "15:00 - 16:30", subject: "CS", topic: "Algorithm Analysis", done: false, priority: "high" },
    ]
  },
  {
    day: "Wednesday",
    date: "Dec 25",
    tasks: [
      { id: 8, time: "10:00 - 12:00", subject: "Revision", topic: "Mathematics Practice Problems", done: false, priority: "high" },
      { id: 9, time: "14:00 - 16:00", subject: "Project", topic: "CS Project Work", done: false, priority: "medium" },
    ]
  }
];

const aiSuggestions = [
  { type: "tip", message: "Based on your performance, consider spending more time on Physics - Wave Mechanics." },
  { type: "schedule", message: "Your peak focus hours are 9-11 AM. I've scheduled important tasks during this time." },
  { type: "break", message: "Don't forget to take short breaks! The Pomodoro technique can boost your productivity." },
];

const chatMessages = [
  { role: "ai", content: "Hi Nirbhay! I'm your AI study assistant. I've analyzed your exam schedule and created an optimized study plan. Would you like me to explain the priorities?" },
  { role: "user", content: "Yes, please explain why Mathematics is scheduled first." },
  { role: "ai", content: "Great question! I've prioritized Mathematics because:\n\n1. Your exam is in 5 days\n2. Calculus requires consistent practice\n3. Your morning focus is typically higher\n\nWould you like me to adjust anything?" },
];

const priorityColors = {
  high: "bg-safety/20 text-safety border-safety/30",
  medium: "bg-lost/20 text-lost border-lost/30",
  low: "bg-muted text-muted-foreground border-border",
};

export default function StudyPlanner() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [tasks, setTasks] = useState(studyPlan);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);

  const toggleTask = (dayIndex: number, taskId: number) => {
    setTasks(prev => prev.map((day, i) => {
      if (i === dayIndex) {
        return {
          ...day,
          tasks: day.tasks.map(task => 
            task.id === taskId ? { ...task, done: !task.done } : task
          )
        };
      }
      return day;
    }));
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { role: "user", content: chatInput }]);
    setChatInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "I understand! Let me adjust your study plan based on that feedback. I'll optimize for your preferences." 
      }]);
    }, 1000);
  };

  const completedToday = tasks[selectedDay]?.tasks.filter(t => t.done).length || 0;
  const totalToday = tasks[selectedDay]?.tasks.length || 0;

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
            <div className="w-10 h-10 rounded-xl bg-study/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-study" />
            </div>
            AI Study Planner
            <AIBadge variant="gemini" />
          </h1>
          <p className="text-muted-foreground">
            Your personalized study schedule powered by AI
          </p>
        </div>
        <Button className="gradient-bg text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Week Navigation */}
          <motion.div variants={fadeInUp} className="glass-card p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h3 className="text-lg font-semibold text-foreground">December 23 - 29, 2025</h3>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(Math.min(index, tasks.length - 1))}
                  className={cn(
                    "p-3 rounded-xl text-center transition-all",
                    selectedDay === index 
                      ? "bg-study text-study-foreground" 
                      : "hover:bg-muted"
                  )}
                >
                  <p className="text-xs text-muted-foreground mb-1">{day}</p>
                  <p className="text-lg font-semibold">{23 + index}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Today's Progress */}
          <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {tasks[selectedDay]?.day || "Today"}'s Progress
              </h3>
              <span className="text-sm text-muted-foreground">
                {completedToday} of {totalToday} tasks completed
              </span>
            </div>
            <Progress value={(completedToday / totalToday) * 100} className="h-2 mb-4" />
            
            <div className="space-y-3">
              {tasks[selectedDay]?.tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group",
                    task.done 
                      ? "bg-muted/30 border-border opacity-60" 
                      : "bg-card border-border hover:border-study/30"
                  )}
                  onClick={() => toggleTask(selectedDay, task.id)}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                  
                  <button className="flex-shrink-0">
                    {task.done ? (
                      <CheckCircle className="w-6 h-6 text-attendance" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "text-sm font-medium",
                        task.done && "line-through text-muted-foreground"
                      )}>
                        {task.subject}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium border",
                        priorityColors[task.priority as keyof typeof priorityColors]
                      )}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{task.topic}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {task.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Suggestions */}
          <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-study" />
              <h3 className="text-lg font-semibold text-foreground">AI Suggestions</h3>
              <AIBadge variant="gemini" className="ml-auto" />
            </div>

            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-study/10 border border-study/20"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-study flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{suggestion.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Chat */}
          <motion.div variants={fadeInUp} className="glass-card rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Study Assistant</h3>
                  <p className="text-xs text-attendance">Online</p>
                </div>
              </div>
            </div>

            <div className="h-64 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "max-w-[85%]",
                    msg.role === "user" ? "ml-auto" : ""
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-xl text-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-muted border-transparent"
                />
                <Button size="icon" onClick={handleSendMessage} className="gradient-bg">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
