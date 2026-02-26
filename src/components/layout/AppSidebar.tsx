import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  MessageSquareWarning, 
  Shield, 
  Compass, 
  Search, 
  Heart, 
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Users,
  Bell,
  Calculator
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/NavLink";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", color: "primary" },
  { icon: BookOpen, label: "AI Study Planner", path: "/study-planner", color: "study" },
  { icon: BarChart3, label: "Attendance", path: "/attendance", color: "attendance" },
  { icon: FileText, label: "PYQs", path: "/pyqs", color: "study" },
  { icon: FileText, label: "Notes Vault", path: "/notes-vault", color: "study" },
  { icon: Bell, label: "Notices", path: "/notices", color: "primary" },
  { icon: Calculator, label: "CGPA Calculator", path: "/cgpa-calculator", color: "attendance" },
  { icon: MessageSquareWarning, label: "Complaints", path: "/complaints", color: "complaints" },
  { icon: Shield, label: "Campus Safety", path: "/safety", color: "safety" },
  { icon: Compass, label: "Career Path", path: "/career", color: "career" },
  { icon: Users, label: "Alumni", path: "/alumni", color: "career" },
  { icon: Search, label: "Lost & Found", path: "/lost-found", color: "lost" },
  { icon: Heart, label: "Wellness", path: "/wellness", color: "wellness" },
  { icon: Settings, label: "Settings", path: "/settings", color: "muted" },
];

const colorClasses: Record<string, string> = {
  primary: "text-primary",
  study: "text-study",
  attendance: "text-attendance",
  complaints: "text-complaints",
  safety: "text-safety",
  career: "text-career",
  lost: "text-lost",
  wellness: "text-wellness",
  muted: "text-muted-foreground",
};

const bgColorClasses: Record<string, string> = {
  primary: "bg-primary/10",
  study: "bg-study/10",
  attendance: "bg-attendance/10",
  complaints: "bg-complaints/10",
  safety: "bg-safety/10",
  career: "bg-career/10",
  lost: "bg-lost/10",
  wellness: "bg-wellness/10",
  muted: "bg-muted",
};

export function AppSidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 280,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50",
          "flex flex-col transition-transform duration-300",
          !isMobileOpen && "lg:translate-x-0 -translate-x-full",
          isMobileOpen && "translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="BPMCE Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-sidebar-foreground"
              >
                BPMCEOne
              </motion.span>
            )}
          </Link>
          
          {/* Mobile close button */}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <X className="w-5 h-5 text-sidebar-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl relative",
                    "text-sidebar-foreground/70 hover:text-sidebar-foreground",
                    "hover:bg-sidebar-accent transition-all duration-200",
                    "group"
                  )}
                  activeClassName={cn(
                    "text-sidebar-foreground font-medium",
                    bgColorClasses[item.color],
                    "border-l-4 border-accent pl-2.5 shadow-glow-accent"
                  )}
                  onClick={onMobileClose}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                    "group-hover:bg-sidebar-accent",
                  )}>
                    <item.icon className={cn("w-5 h-5", colorClasses[item.color])} />
                  </div>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className={cn(
                      "absolute left-full ml-2 px-3 py-2 rounded-lg",
                      "bg-popover text-popover-foreground text-sm font-medium",
                      "opacity-0 pointer-events-none group-hover:opacity-100",
                      "transition-opacity duration-200 whitespace-nowrap z-50",
                      "shadow-lg border border-border"
                    )}>
                      {item.label}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toggle button */}
        <div className="hidden lg:block p-3 border-t border-sidebar-border">
          <button
            onClick={onToggle}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl",
              "text-sidebar-foreground/70 hover:text-sidebar-foreground",
              "hover:bg-sidebar-accent transition-colors"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
