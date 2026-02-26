import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Pin, Calendar, User, Search, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


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

const notices = [
  {
    id: 1,
    title: "Mid-Semester Examination Schedule Released",
    content: "The mid-semester examination schedule for all branches has been released. Check the portal for detailed timetable.",
    date: "Feb 27, 2026",
    category: "Academic",
    priority: "high",
    pinned: true,
    icon: AlertCircle
  },
  {
    id: 2,
    title: "Campus Maintenance Notice",
    content: "The main campus will undergo maintenance from March 1-5. Library services will be available.",
    date: "Feb 26, 2026",
    category: "Facilities",
    priority: "medium",
    pinned: false,
    icon: Bell
  },
  {
    id: 3,
    title: "Scholarship Application Deadline Extended",
    content: "The scholarship application deadline has been extended to March 15, 2026.",
    date: "Feb 25, 2026",
    category: "Finance",
    priority: "high",
    pinned: false,
    icon: CheckCircle
  },
  {
    id: 4,
    title: "Sports Day Registration Open",
    content: "Annual sports day registration is now open. Register your team by February 28.",
    date: "Feb 24, 2026",
    category: "Events",
    priority: "low",
    pinned: false,
    icon: Bell
  },
  {
    id: 5,
    title: "New Library Wing Inauguration",
    content: "The new library wing has been inaugurated. Visit to explore 5000+ new books and study spaces.",
    date: "Feb 23, 2026",
    category: "Facilities",
    priority: "low",
    pinned: false,
    icon: Bell
  },
];

const categories = ["All", "Academic", "Facilities", "Finance", "Events"];

export default function Notices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pinnedNotices = filteredNotices.filter(n => n.pinned);
  const otherNotices = filteredNotices.filter(n => !n.pinned);

  const priorityColor = {
    high: "bg-safety/20 text-safety border-safety/30",
    medium: "bg-lost/20 text-lost border-lost/30",
    low: "bg-muted text-muted-foreground border-border"
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-complaints/20 flex items-center justify-center">
            <Bell className="w-6 h-6 text-complaints" />
          </div>
          Notice Board
        </h1>
        <p className="text-muted-foreground">
          Stay updated with important announcements and notifications
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={fadeInUp} className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "gradient-bg text-primary-foreground" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <motion.div variants={fadeInUp} className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Pin className="w-5 h-5" />
            Pinned
          </h2>
          <div className="space-y-3">
            {pinnedNotices.map((notice, index) => {
              const IconComponent = notice.icon;
              return (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-5 rounded-xl border-l-4 border-primary hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{notice.title}</h3>
                        <Badge className={cn("flex-shrink-0", priorityColor[notice.priority as keyof typeof priorityColor])}>
                          {notice.priority}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{notice.content}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {notice.date}
                        </div>
                        <Badge variant="outline" className="text-xs">{notice.category}</Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Other Notices */}
      <motion.div variants={fadeInUp}>
        <h2 className="text-lg font-semibold text-foreground mb-4">All Notices</h2>
        <div className="space-y-3">
          {otherNotices.length === 0 ? (
            <div className="glass-card p-12 rounded-xl text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notices found</p>
            </div>
          ) : (
            otherNotices.map((notice, index) => {
              const IconComponent = notice.icon;
              return (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-5 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{notice.title}</h3>
                        <Badge className={cn("flex-shrink-0", priorityColor[notice.priority as keyof typeof priorityColor])}>
                          {notice.priority}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{notice.content}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {notice.date}
                        </div>
                        <Badge variant="outline" className="text-xs">{notice.category}</Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
