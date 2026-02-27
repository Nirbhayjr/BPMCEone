import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  BarChart3,
  MessageSquareWarning,
  Shield,
  Compass,
  Search,
  Heart,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Target,
  Zap,
  ArrowRight,
  ChevronRight,
  Brain,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AIBadge } from "@/components/ui/demo-badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Animation variants
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
const attendanceData = [
  { subject: "Math", attendance: 92, color: "hsl(var(--attendance))" },
  { subject: "Physics", attendance: 85, color: "hsl(var(--study))" },
  { subject: "CS", attendance: 96, color: "hsl(var(--primary))" },
  { subject: "English", attendance: 78, color: "hsl(var(--complaints))" },
];

const weeklyStudyData = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 5 },
  { day: "Thu", hours: 7 },
  { day: "Fri", hours: 3 },
  { day: "Sat", hours: 8 },
  { day: "Sun", hours: 4 },
];

const todaySchedule = [
  { time: "09:00", subject: "Mathematics", type: "Lecture", status: "completed" },
  { time: "11:00", subject: "Physics Lab", type: "Practical", status: "completed" },
  { time: "14:00", subject: "Computer Science", type: "Lecture", status: "current" },
  { time: "16:00", subject: "Study Session", type: "Self-study", status: "upcoming" },
];

const quickActions = [
  { icon: BookOpen, label: "Study Planner", path: "/study-planner", color: "study" },
  { icon: BarChart3, label: "Attendance", path: "/attendance", color: "attendance" },
  { icon: MessageSquareWarning, label: "Complaints", path: "/complaints", color: "complaints" },
  { icon: Shield, label: "Safety", path: "/safety", color: "safety" },
  { icon: Compass, label: "Career", path: "/career", color: "career" },
  { icon: Heart, label: "Wellness", path: "/wellness", color: "wellness" },
];

const recentActivity = [
  { type: "study", title: "Completed Physics Chapter 5", time: "2 hours ago", icon: CheckCircle, color: "attendance" },
  { type: "complaint", title: "Library AC complaint resolved", time: "5 hours ago", icon: MessageSquareWarning, color: "complaints" },
  { type: "safety", title: "Safety alert acknowledged", time: "1 day ago", icon: AlertTriangle, color: "safety" },
  { type: "career", title: "Resume review scheduled", time: "2 days ago", icon: Compass, color: "career" },
];

// Widget components
function AttendanceRing() {
  const overallAttendance = 88;
  const pieData = [
    { name: "Present", value: overallAttendance },
    { name: "Absent", value: 100 - overallAttendance },
  ];
  const COLORS = ["hsl(var(--attendance))", "hsl(var(--muted))"];

  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Attendance Health</h3>
        <Link to="/attendance" className="text-sm text-primary hover:underline flex items-center gap-1">
          Details <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={55}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-attendance">{overallAttendance}%</span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {attendanceData.slice(0, 3).map((item) => (
            <div key={item.subject} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.subject}</span>
              <div className="flex items-center gap-2">
                <Progress value={item.attendance} className="w-20 h-2" />
                <span className="text-sm font-medium text-foreground w-10">{item.attendance}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StudyPlanWidget() {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-study/20 flex items-center justify-center">
            <Brain className="w-4 h-4 text-study" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Today's AI Study Plan</h3>
          <AIBadge variant="gemini" className="hidden sm:inline-flex" />
        </div>
        <Link to="/study-planner" className="text-sm text-primary hover:underline flex items-center gap-1">
          Full plan <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {todaySchedule.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl transition-colors",
              item.status === "current" && "bg-study/10 border border-study/20",
              item.status === "completed" && "opacity-60",
              item.status === "upcoming" && "bg-muted/50"
            )}
          >
            <span className="text-sm text-muted-foreground w-12">{item.time}</span>
            <div className="flex-1">
              <p className={cn(
                "font-medium text-foreground",
                item.status === "completed" && "line-through"
              )}>
                {item.subject}
              </p>
              <p className="text-xs text-muted-foreground">{item.type}</p>
            </div>
            {item.status === "current" && (
              <span className="px-2 py-1 rounded-full bg-study text-study-foreground text-xs font-medium animate-pulse">
                Now
              </span>
            )}
            {item.status === "completed" && (
              <CheckCircle className="w-5 h-5 text-attendance" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ComplaintsSummary() {
  const complaints = [
    { status: "pending", count: 2, color: "complaints" },
    { status: "in-progress", count: 1, color: "lost" },
    { status: "resolved", count: 8, color: "attendance" },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Complaints</h3>
        <Link to="/complaints" className="text-sm text-primary hover:underline flex items-center gap-1">
          View all <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {complaints.map((item) => (
          <div key={item.status} className="text-center">
            <p className={cn("text-3xl font-bold", `text-${item.color}`)}>{item.count}</p>
            <p className="text-xs text-muted-foreground capitalize">{item.status.replace("-", " ")}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CareerProgress() {
  const skills = [
    { name: "Python", progress: 85 },
    { name: "React", progress: 72 },
    { name: "Data Science", progress: 60 },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-career/20 flex items-center justify-center">
            <Target className="w-4 h-4 text-career" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Career Progress</h3>
          <AIBadge className="hidden sm:inline-flex" />
        </div>
        <Link to="/career" className="text-sm text-primary hover:underline flex items-center gap-1">
          Details <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-career/10 border border-career/20">
          <Compass className="w-5 h-5 text-career" />
          <div>
            <p className="text-sm font-medium text-foreground">Recommended Path</p>
            <p className="text-xs text-muted-foreground">Full Stack Developer</p>
          </div>
        </div>

        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{skill.name}</span>
                <span className="text-foreground font-medium">{skill.progress}%</span>
              </div>
              <Progress value={skill.progress} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SafetyPanel() {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 rounded-2xl border-safety/30"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-safety/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-safety" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Campus Safety</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="status-dot-success" />
          <span className="text-xs text-attendance font-medium">All Clear</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Link
          to="/safety"
          className="p-3 rounded-xl bg-safety/10 border border-safety/20 text-center hover:bg-safety/20 transition-colors"
        >
          <Shield className="w-6 h-6 text-safety mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">Emergency</p>
        </Link>
        <Link
          to="/safety"
          className="p-3 rounded-xl bg-muted/50 border border-border text-center hover:bg-muted transition-colors"
        >
          <Search className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">Report</p>
        </Link>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Tap Emergency for instant SOS
      </p>
    </motion.div>
  );
}

function WeeklyChart() {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 rounded-2xl col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Weekly Study Hours</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4 text-attendance" />
          <span>+12% from last week</span>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyStudyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--popover-foreground))"
              }}
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function QuickActions() {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 rounded-2xl"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
              "hover:scale-105 hover:shadow-lg",
              `bg-${action.color}/10 hover:bg-${action.color}/20`
            )}
          >
            <action.icon className={cn("w-6 h-6", `text-${action.color}`)} />
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function RecentActivity() {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 rounded-2xl"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
              `bg-${activity.color}/20`
            )}>
              <activity.icon className={cn("w-4 h-4", `text-${activity.color}`)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Get first name from full name
  const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0];
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-7xl mx-auto"
    >
      {/* Back to Home Button */}
      <motion.div variants={fadeInUp} className="mb-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {getGreeting()}, {user?.name ? getFirstName(user.name) : "Student"} 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your campus life today.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Study Streak", value: "12 days", icon: Zap, color: "study", trend: "+2" },
          { label: "Attendance", value: "88%", icon: BarChart3, color: "attendance", trend: "+5%" },
          { label: "Tasks Today", value: "6", icon: CheckCircle, color: "primary", trend: "3 done" },
          { label: "Wellness Score", value: "Good", icon: Heart, color: "wellness", trend: "↑" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            className="glass-card p-4 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={cn("w-5 h-5", `text-${stat.color}`)} />
              <span className="text-xs text-attendance font-medium">{stat.trend}</span>
            </div>
            <p className={cn("text-2xl font-bold", `text-${stat.color}`)}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <StudyPlanWidget />
          <WeeklyChart />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <AttendanceRing />
          <SafetyPanel />
          <ComplaintsSummary />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <CareerProgress />
        <QuickActions />
        <RecentActivity />
      </div>
    </motion.div>
  );
}
