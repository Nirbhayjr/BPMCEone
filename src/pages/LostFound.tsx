import { motion } from "framer-motion";
import { Search, MapPin, Clock, Tag, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


export default function LostFound() {
  const items = [
    { id: 1, name: "MacBook Pro", location: "Library", time: "2 hours ago", match: 95, image: "💻" },
    { id: 2, name: "AirPods Case", location: "Cafeteria", time: "5 hours ago", match: 82, image: "🎧" },
    { id: 3, name: "Student ID Card", location: "Gym", time: "1 day ago", match: 78, image: "🪪" },
    { id: 4, name: "Blue Backpack", location: "Parking Lot", time: "2 days ago", match: 65, image: "🎒" },
    { id: 5, name: "Water Bottle", location: "Science Lab", time: "3 days ago", match: null, image: "🍶" },
    { id: 6, name: "Notebook", location: "Room 204", time: "4 days ago", match: null, image: "📓" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-lost/20 flex items-center justify-center">
          <Search className="w-6 h-6 text-lost" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            Lost & Found
            <AIBadge />
          </h1>
          <p className="text-muted-foreground">AI-powered item recovery</p>
        </div>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input placeholder="Search for lost items..." className="pl-12 h-12 text-lg" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -4 }}
            className="glass-card p-4 rounded-2xl cursor-pointer hover:border-lost/30 transition-all"
          >
            <div className="text-5xl mb-3">{item.image}</div>
            <h4 className="font-semibold text-foreground mb-2">{item.name}</h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <MapPin className="w-3 h-3" /> {item.location}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
              <Clock className="w-3 h-3" /> {item.time}
            </div>
            {item.match && (
              <Badge className="bg-lost/20 text-lost border-lost/30">
                <Sparkles className="w-3 h-3 mr-1" /> {item.match}% match
              </Badge>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
