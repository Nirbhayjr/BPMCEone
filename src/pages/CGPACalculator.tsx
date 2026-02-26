import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Plus, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DemoBanner } from "@/components/ui/demo-badge";

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

const gradePoints: Record<string, number> = {
  "A+": 4.0,
  "A": 3.9,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D": 1.0,
  "F": 0.0,
};

interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export default function CGPACalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "Mathematics", credits: 4, grade: "A" },
    { id: "2", name: "Physics", credits: 3, grade: "A-" },
    { id: "3", name: "Computer Science", credits: 4, grade: "A+" },
  ]);
  const [newSubject, setNewSubject] = useState({ name: "", credits: "3", grade: "A" });

  const calculateCGPA = () => {
    if (subjects.length === 0) return "0.00";
    
    const totalPoints = subjects.reduce((sum, subject) => {
      return sum + (gradePoints[subject.grade] * subject.credits);
    }, 0);
    
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const addSubject = () => {
    if (newSubject.name.trim() && newSubject.credits) {
      setSubjects([
        ...subjects,
        {
          id: Date.now().toString(),
          name: newSubject.name,
          credits: parseInt(newSubject.credits),
          grade: newSubject.grade,
        },
      ]);
      setNewSubject({ name: "", credits: "3", grade: "A" });
    }
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateSubject = (id: string, field: string, value: any) => {
    setSubjects(subjects.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const cgpa = calculateCGPA();
  const cgpaPercentage = (parseFloat(cgpa) / 4) * 100;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-6xl mx-auto"
    >
      <DemoBanner />

      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          CGPA Calculator
        </h1>
        <p className="text-muted-foreground">
          Track and calculate your cumulative GPA across all subjects
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CGPA Display */}
        <motion.div variants={fadeInUp} className="lg:col-span-1">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Your CGPA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{cgpa}</div>
                <p className="text-muted-foreground">out of 4.0</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{cgpaPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={cgpaPercentage} className="h-3" />
              </div>

              <div className="p-3 rounded-lg bg-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Total Credits:</p>
                <p className="text-lg font-semibold text-foreground">
                  {subjects.reduce((sum, s) => sum + s.credits, 0)} Credits
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Add Subject & Subjects List */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          {/* Add Subject Form */}
          <Card className="glass-card mb-6">
            <CardHeader>
              <CardTitle>Add Subject</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="subject-name">Subject Name</Label>
                <Input
                  id="subject-name"
                  placeholder="e.g., Mathematics"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    type="number"
                    min="1"
                    max="6"
                    value={newSubject.credits}
                    onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Grade</Label>
                  <Select value={newSubject.grade} onValueChange={(value) => setNewSubject({ ...newSubject, grade: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={addSubject} className="gradient-bg text-primary-foreground w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </CardContent>
          </Card>

          {/* Subjects List */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Your Subjects ({subjects.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {subjects.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No subjects added yet</p>
                ) : (
                  subjects.map((subject, index) => (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{subject.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {subject.credits} credits × {subject.grade} ({gradePoints[subject.grade].toFixed(1)} pts)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={subject.grade} onValueChange={(value) => updateSubject(subject.id, "grade", value)}>
                          <SelectTrigger className="w-20 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(gradePoints).map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubject(subject.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
