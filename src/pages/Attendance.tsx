import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Target,
  Clock,
  Plus,
  Trash2,
  Edit2,
  AlertCircle,
  TrendingUp,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface SubjectSchedule {
  subjectName: string;
  days: string[];
}

interface AttendanceRecord {
  subjectName: string;
  date: string;
  attended: boolean;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Attendance() {
  const [routine, setRoutine] = useState<SubjectSchedule[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [setupOpen, setSetupOpen] = useState(false);
  const [tempRoutine, setTempRoutine] = useState<SubjectSchedule[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedRoutine = localStorage.getItem("campusone_routine");
    const savedAttendance = localStorage.getItem("campusone_attendance");
    
    if (savedRoutine) {
      try {
        setRoutine(JSON.parse(savedRoutine));
      } catch (e) {
        console.error("Error loading routine:", e);
      }
    }
    
    if (savedAttendance) {
      try {
        setAttendanceRecords(JSON.parse(savedAttendance));
      } catch (e) {
        console.error("Error loading attendance:", e);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (routine.length > 0) {
      localStorage.setItem("campusone_routine", JSON.stringify(routine));
    }
  }, [routine]);

  useEffect(() => {
    if (attendanceRecords.length > 0) {
      localStorage.setItem("campusone_attendance", JSON.stringify(attendanceRecords));
    }
  }, [attendanceRecords]);

  const getTodayDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const getTodaySubjects = () => {
    const today = getTodayDay();
    return routine.filter(subject => subject.days.includes(today));
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const isAttendedToday = (subjectName: string) => {
    const today = getTodayDate();
    return attendanceRecords.some(
      record => record.subjectName === subjectName && record.date === today
    );
  };

  const markAttendance = (subjectName: string, attended: boolean) => {
    const today = getTodayDate();
    
    // Remove existing record for today if any
    const filtered = attendanceRecords.filter(
      record => !(record.subjectName === subjectName && record.date === today)
    );
    
    // Add new record
    const newRecord: AttendanceRecord = {
      subjectName,
      date: today,
      attended
    };
    
    setAttendanceRecords([...filtered, newRecord]);
    
    toast({
      title: attended ? "Marked Present" : "Marked Absent",
      description: `${subjectName} attendance updated for today.`,
    });
  };

  const calculateAttendance = (subjectName: string) => {
    const records = attendanceRecords.filter(r => r.subjectName === subjectName);
    if (records.length === 0) return 0;
    
    const present = records.filter(r => r.attended).length;
    return Math.round((present / records.length) * 100);
  };

  const getHealthStatus = (percentage: number) => {
    if (percentage >= 85) return { color: "attendance", label: "Excellent", bgColor: "bg-attendance/20" };
    if (percentage >= 75) return { color: "accent", label: "Good", bgColor: "bg-accent/20" };
    return { color: "safety", label: "Critical", bgColor: "bg-safety/20" };
  };

  const calculateOverallAttendance = () => {
    if (routine.length === 0) return 0;
    
    const percentages = routine.map(subject => calculateAttendance(subject.subjectName));
    const sum = percentages.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / routine.length);
  };

  const addSubjectToRoutine = () => {
    if (!newSubject.trim() || selectedDays.length === 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a subject name and select at least one day.",
        variant: "destructive",
      });
      return;
    }

    const newSchedule: SubjectSchedule = {
      subjectName: newSubject.trim(),
      days: selectedDays
    };

    setTempRoutine([...tempRoutine, newSchedule]);
    setNewSubject("");
    setSelectedDays([]);
  };

  const removeFromTempRoutine = (index: number) => {
    setTempRoutine(tempRoutine.filter((_, i) => i !== index));
  };

  const saveRoutine = () => {
    if (tempRoutine.length === 0) {
      toast({
        title: "No Subjects Added",
        description: "Please add at least one subject to your routine.",
        variant: "destructive",
      });
      return;
    }

    setRoutine(tempRoutine);
    setSetupOpen(false);
    
    toast({
      title: "Routine Saved",
      description: `Your weekly routine with ${tempRoutine.length} subjects has been saved.`,
    });
  };

  const openSetup = () => {
    setTempRoutine([...routine]);
    setSetupOpen(true);
  };

  const getTotalClasses = (subjectName: string) => {
    return attendanceRecords.filter(r => r.subjectName === subjectName).length;
  };

  const getPresentClasses = (subjectName: string) => {
    return attendanceRecords.filter(r => r.subjectName === subjectName && r.attended).length;
  };

  const overallAttendance = calculateOverallAttendance();
  const todaySubjects = getTodaySubjects();

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
            <div className="w-10 h-10 rounded-xl bg-attendance/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-attendance" />
            </div>
            Attendance Tracker
          </h1>
          <p className="text-muted-foreground">
            Track your daily attendance and maintain your academic progress
          </p>
        </div>
        
        <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
          <DialogTrigger asChild>
            <Button onClick={openSetup} className="gap-2">
              <Edit2 className="w-4 h-4" />
              {routine.length > 0 ? "Edit Routine" : "Setup Routine"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Weekly Routine Setup</DialogTitle>
              <DialogDescription>
                Add subjects and select the days they occur in your weekly schedule.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Add New Subject */}
              <div className="space-y-4 p-4 border border-border rounded-lg">
                <div>
                  <Label htmlFor="subject-name">Subject Name</Label>
                  <Input
                    id="subject-name"
                    placeholder="e.g., Mathematics"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>Select Days</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {DAYS.map(day => (
                      <Button
                        key={day}
                        type="button"
                        variant={selectedDays.includes(day) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (selectedDays.includes(day)) {
                            setSelectedDays(selectedDays.filter(d => d !== day));
                          } else {
                            setSelectedDays([...selectedDays, day]);
                          }
                        }}
                      >
                        {day.substring(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button onClick={addSubjectToRoutine} className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Subject
                </Button>
              </div>

              {/* Current Routine */}
              {tempRoutine.length > 0 && (
                <div className="space-y-2">
                  <Label>Your Routine ({tempRoutine.length} subjects)</Label>
                  {tempRoutine.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{subject.subjectName}</p>
                        <p className="text-sm text-muted-foreground">
                          {subject.days.join(", ")}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromTempRoutine(index)}
                      >
                        <Trash2 className="w-4 h-4 text-safety" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button onClick={saveRoutine} className="w-full gap-2">
                <Save className="w-4 h-4" />
                Save Routine
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {routine.length === 0 ? (
        /* No Routine Setup */
        <motion.div variants={fadeInUp} className="glass-card p-12 rounded-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No Routine Set</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start by setting up your weekly routine. Add your subjects and the days they occur to begin tracking attendance.
          </p>
          <Button onClick={openSetup} size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Setup Weekly Routine
          </Button>
        </motion.div>
      ) : (
        <>
          {/* Overview Cards */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Overall Attendance", value: `${overallAttendance}%`, icon: Target, color: getHealthStatus(overallAttendance).color },
              { label: "Total Subjects", value: routine.length.toString(), icon: BarChart3, color: "primary" },
              { label: "Today's Classes", value: todaySubjects.length.toString(), icon: Calendar, color: "study" },
              { label: "Health", value: getHealthStatus(overallAttendance).label, icon: TrendingUp, color: getHealthStatus(overallAttendance).color },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={cn("w-5 h-5", `text-${stat.color}`)} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className={cn("text-2xl font-bold", `text-${stat.color}`)}>{stat.value}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Classes */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
              {/* Today Section */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Today's Classes - {getTodayDay()}</h3>
                </div>
                
                {todaySubjects.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">No classes scheduled for today</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todaySubjects.map((subject) => {
                      const attended = isAttendedToday(subject.subjectName);
                      return (
                        <div key={subject.subjectName} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              attended ? "bg-attendance/20" : "bg-muted"
                            )}>
                              {attended ? (
                                <CheckCircle className="w-5 h-5 text-attendance" />
                              ) : (
                                <Clock className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{subject.subjectName}</p>
                              <p className="text-sm text-muted-foreground">
                                {attended ? "Marked Present" : "Not marked yet"}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={attended ? "default" : "outline"}
                              onClick={() => markAttendance(subject.subjectName, true)}
                            >
                              Present
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAttendance(subject.subjectName, false)}
                            >
                              Absent
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* All Subjects Overview */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-foreground mb-6">Subject-wise Attendance</h3>
                
                <div className="space-y-4">
                  {routine.map((subject) => {
                    const percentage = calculateAttendance(subject.subjectName);
                    const health = getHealthStatus(percentage);
                    const total = getTotalClasses(subject.subjectName);
                    const present = getPresentClasses(subject.subjectName);

                    return (
                      <div key={subject.subjectName} className={cn("p-4 rounded-xl border", health.bgColor)}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-foreground">{subject.subjectName}</h4>
                            <p className="text-xs text-muted-foreground">{subject.days.join(", ")}</p>
                          </div>
                          <div className="text-right">
                            <p className={cn("text-2xl font-bold", `text-${health.color}`)}>
                              {percentage}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {present}/{total} classes
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={cn("h-full rounded-full", `bg-${health.color}`)}
                          />
                          {/* 75% marker */}
                          <div 
                            className="absolute top-0 h-full w-0.5 bg-foreground/30"
                            style={{ left: "75%" }}
                          />
                          {/* 85% marker */}
                          <div 
                            className="absolute top-0 h-full w-0.5 bg-foreground/30"
                            style={{ left: "85%" }}
                          />
                        </div>
                        
                        <div className="flex justify-between mt-2 text-xs">
                          <span className={cn("font-medium", `text-${health.color}`)}>
                            {health.label}
                          </span>
                          <span className="text-muted-foreground">
                            Target: 75%+
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Sidebar - Health Indicators */}
            <div className="space-y-6">
              {/* Attendance Health */}
              <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Attendance Health</h3>
                </div>

                <div className="space-y-4">
                  <div className="text-center py-6">
                    <div className={cn(
                      "w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4",
                      getHealthStatus(overallAttendance).bgColor
                    )}>
                      <span className={cn(
                        "text-3xl font-bold",
                        `text-${getHealthStatus(overallAttendance).color}`
                      )}>
                        {overallAttendance}%
                      </span>
                    </div>
                    <p className={cn(
                      "text-lg font-semibold",
                      `text-${getHealthStatus(overallAttendance).color}`
                    )}>
                      {getHealthStatus(overallAttendance).label}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-attendance" />
                        <span className="text-sm text-muted-foreground">Excellent</span>
                      </div>
                      <span className="text-sm font-medium">85%+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-lost" />
                        <span className="text-sm text-muted-foreground">Good</span>
                      </div>
                      <span className="text-sm font-medium">75-84%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-safety" />
                        <span className="text-sm text-muted-foreground">Critical</span>
                      </div>
                      <span className="text-sm font-medium">&lt;75%</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Critical Subjects Warning */}
              {routine.some(s => calculateAttendance(s.subjectName) < 75) && (
                <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl border-l-4 border-safety">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-safety" />
                    <h3 className="text-lg font-semibold text-foreground">Attention Needed</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {routine
                      .filter(s => calculateAttendance(s.subjectName) < 75)
                      .map(subject => (
                        <div key={subject.subjectName} className="p-3 bg-safety/10 rounded-lg">
                          <p className="font-medium text-foreground">{subject.subjectName}</p>
                          <p className="text-sm text-muted-foreground">
                            {calculateAttendance(subject.subjectName)}% - Below minimum requirement
                          </p>
                        </div>
                      ))
                    }
                  </div>
                </motion.div>
              )}

              {/* Quick Stats */}
              <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Classes</span>
                    <span className="font-semibold">
                      {attendanceRecords.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Present</span>
                    <span className="font-semibold text-attendance">
                      {attendanceRecords.filter(r => r.attended).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Absent</span>
                    <span className="font-semibold text-safety">
                      {attendanceRecords.filter(r => !r.attended).length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
