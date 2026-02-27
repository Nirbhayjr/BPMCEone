import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Smile, Meh, Frown, Wind, Flame, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIBadge } from "@/components/ui/demo-badge";
import { cn } from "@/lib/utils";


export default function Wellness() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);

  const moods = [
    { id: "great", icon: Smile, label: "Great", color: "attendance" },
    { id: "okay", icon: Meh, label: "Okay", color: "lost" },
    { id: "low", icon: Frown, label: "Low", color: "complaints" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-wellness/20 flex items-center justify-center">
          <Heart className="w-6 h-6 text-wellness" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            Wellness Hub
            <AIBadge />
          </h1>
          <p className="text-muted-foreground">Your mental health companion</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mood Tracker */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4">How are you feeling today?</h3>
          <div className="flex gap-4 justify-center">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={cn(
                  "p-6 rounded-2xl transition-all",
                  selectedMood === mood.id ? `bg-${mood.color}/20 ring-2 ring-${mood.color}` : "bg-muted/50 hover:bg-muted"
                )}
              >
                <mood.icon className={cn("w-10 h-10 mx-auto mb-2", `text-${mood.color}`)} />
                <p className="text-sm font-medium text-foreground">{mood.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Breathing Exercise */}
        <div className="glass-card p-6 rounded-2xl text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4">Breathing Exercise</h3>
          <motion.div
            animate={isBreathing ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-32 h-32 rounded-full bg-wellness/20 flex items-center justify-center mx-auto mb-4"
          >
            <Wind className="w-12 h-12 text-wellness" />
          </motion.div>
          <Button onClick={() => setIsBreathing(!isBreathing)} className="bg-wellness text-wellness-foreground">
            {isBreathing ? "Stop" : "Start Breathing"}
          </Button>
        </div>

        {/* Streak */}
        <div className="glass-card p-6 rounded-2xl md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-lost/20 flex items-center justify-center">
              <Flame className="w-8 h-8 text-lost" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">7 Day Streak! 🔥</p>
              <p className="text-muted-foreground">Keep up the great work on your wellness journey</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
