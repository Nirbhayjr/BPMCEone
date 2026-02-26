import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Folder, Clock, Tag, Search, Download, Trash2 } from "lucide-react";
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

const notes = [
  { id: 1, title: "Calculus - Integration Methods", subject: "Mathematics", date: "Feb 25, 2026", size: "2.4 MB", color: "bg-blue/20 text-blue" },
  { id: 2, title: "Wave Mechanics Summary", subject: "Physics", date: "Feb 24, 2026", size: "1.8 MB", color: "bg-purple/20 text-purple" },
  { id: 3, title: "Data Structures - Tree Concepts", subject: "CS", date: "Feb 23, 2026", size: "3.1 MB", color: "bg-green/20 text-green" },
  { id: 4, title: "English Literature Analysis", subject: "English", date: "Feb 22, 2026", size: "1.5 MB", color: "bg-yellow/20 text-yellow" },
  { id: 5, title: "Chemistry Organic Reactions", subject: "Chemistry", date: "Feb 21, 2026", size: "2.7 MB", color: "bg-red/20 text-red" },
  { id: 6, title: "Thermodynamics Laws", subject: "Physics", date: "Feb 20, 2026", size: "2.2 MB", color: "bg-orange/20 text-orange" },
];

const subjects = ["All", "Mathematics", "Physics", "CS", "Chemistry", "English"];

export default function NotesVault() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

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
              <FileText className="w-6 h-6 text-study" />
            </div>
            Notes Vault
          </h1>
          <p className="text-muted-foreground">
            Organize and manage all your study notes in one place
          </p>
        </div>
        <Button className="gradient-bg text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={fadeInUp} className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {subjects.map(subject => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
              className={selectedSubject === subject ? "gradient-bg text-primary-foreground" : ""}
            >
              {subject}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Notes Grid */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full glass-card p-12 rounded-xl text-center">
            <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notes found</p>
          </div>
        ) : (
          filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4 rounded-xl hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-3 rounded-lg", note.color)}>
                  <FileText className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {note.subject}
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                {note.title}
              </h3>
              <div className="space-y-2 mb-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {note.date}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  {note.size}
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="ghost" className="flex-1 h-8">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="ghost" className="h-8">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
