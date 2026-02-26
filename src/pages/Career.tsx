import { motion } from "framer-motion";
import { Compass, Target, BookOpen, Briefcase, TrendingUp, Star, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AIBadge, DemoBanner } from "@/components/ui/demo-badge";

export default function Career() {
  const skills = [
    { name: "Python", level: 85, category: "Programming" },
    { name: "React", level: 72, category: "Frontend" },
    { name: "Data Analysis", level: 68, category: "Analytics" },
    { name: "Machine Learning", level: 45, category: "AI/ML" },
  ];

  const careerPaths = [
    { title: "Full Stack Developer", match: 92, salary: "$85K - $120K" },
    { title: "Data Scientist", match: 78, salary: "$95K - $140K" },
    { title: "ML Engineer", match: 65, salary: "$100K - $150K" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
      <DemoBanner />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-career/20 flex items-center justify-center">
          <Compass className="w-6 h-6 text-career" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            Career Path
            <AIBadge variant="gemini" />
          </h1>
          <p className="text-muted-foreground">AI-driven career recommendations</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Skills Radar */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Skills</h3>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{skill.name}</span>
                  <span className="text-career">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Career Recommendations */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Paths</h3>
          <div className="space-y-3">
            {careerPaths.map((path, i) => (
              <div key={path.title} className={cn(
                "p-4 rounded-xl border transition-all cursor-pointer hover:border-career/30",
                i === 0 ? "bg-career/10 border-career/30" : "bg-muted/50 border-border"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{path.title}</span>
                  <span className={cn("text-sm font-bold", i === 0 ? "text-career" : "text-muted-foreground")}>
                    {path.match}% match
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{path.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
