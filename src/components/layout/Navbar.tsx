import { motion } from "framer-motion";
import { Menu, Bell, Search, User, Sparkles, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
  userRole: "student" | "admin";
  onRoleSwitch: () => void;
}

export function Navbar({ onMenuClick, userRole, onRoleSwitch }: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* Search */}
          <div className={cn(
            "relative hidden sm:flex items-center transition-all duration-300",
            searchFocused ? "w-80" : "w-64"
          )}>
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search anything..."
              className={cn(
                "pl-9 pr-4 h-10 bg-muted/50 border-transparent",
                "focus:bg-background focus:border-border",
                "placeholder:text-muted-foreground/60"
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="absolute right-3 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Home Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 h-9"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Home</span>
          </Button>

          {/* Role Switch */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRoleSwitch}
            className="hidden sm:flex items-center gap-2 h-9"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">{userRole === "student" ? "Student" : "Admin"}</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-safety text-safety-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="text-xs">3 new</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-2 h-2 rounded-full bg-study" />
                  <span className="font-medium text-sm">Study reminder</span>
                  <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
                </div>
                <p className="text-xs text-muted-foreground ml-4">Your next study session starts in 30 minutes</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-2 h-2 rounded-full bg-attendance" />
                  <span className="font-medium text-sm">Attendance updated</span>
                  <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
                </div>
                <p className="text-xs text-muted-foreground ml-4">Mathematics attendance is now 85%</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-2 h-2 rounded-full bg-complaints" />
                  <span className="font-medium text-sm">Complaint resolved</span>
                  <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
                </div>
                <p className="text-xs text-muted-foreground ml-4">Your library complaint has been addressed</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'user'}`} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">{user?.name || "User"}</span>
                  <span className="text-xs text-muted-foreground">{user?.branch || "Student"}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.rollNumber || ""}</p>
                  <p className="text-xs text-muted-foreground">{user?.branch || ""}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
