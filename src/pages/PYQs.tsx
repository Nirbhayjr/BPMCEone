import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Download, Calendar, BookOpen, Filter, Upload, Plus, User } from "lucide-react";
import { DemoBanner } from "@/components/ui/demo-badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PYQ {
  id: string;
  subject: string;
  year: number;
  semester: string;
  examType: string;
  branch: string;
  uploadedBy: {
    name: string;
    rollNumber: string;
    branch: string;
  };
  uploadDate: string;
  fileName?: string;
}

const initialPYQsData: PYQ[] = [
  { 
    id: "1", 
    subject: "Data Structures", 
    year: 2024, 
    semester: "3rd", 
    examType: "Endsem", 
    branch: "CSE",
    uploadedBy: { name: "John Doe", rollNumber: "21BCS101", branch: "CSE" },
    uploadDate: "2024-01-15"
  },
  { 
    id: "2", 
    subject: "Digital Electronics", 
    year: 2024, 
    semester: "3rd", 
    examType: "Midsem", 
    branch: "CSE AIML",
    uploadedBy: { name: "Jane Smith", rollNumber: "21BCS102", branch: "CSE AIML" },
    uploadDate: "2024-01-20"
  },
  { 
    id: "3", 
    subject: "Engineering Mathematics III", 
    year: 2024, 
    semester: "3rd", 
    examType: "Endsem", 
    branch: "All",
    uploadedBy: { name: "Mike Johnson", rollNumber: "21BEE201", branch: "EEE" },
    uploadDate: "2024-02-05"
  },
  { 
    id: "4", 
    subject: "Database Management System", 
    year: 2023, 
    semester: "4th", 
    examType: "Endsem", 
    branch: "CSE",
    uploadedBy: { name: "Sarah Williams", rollNumber: "20BCS150", branch: "CSE" },
    uploadDate: "2023-11-10"
  },
  { 
    id: "5", 
    subject: "Computer Networks", 
    year: 2023, 
    semester: "5th", 
    examType: "Endsem", 
    branch: "CSE",
    uploadedBy: { name: "David Brown", rollNumber: "20BCS125", branch: "CSE" },
    uploadDate: "2023-12-01"
  },
];

const allowedBranches = ["CSE", "CSE AIML", "3D A&G", "CIVIL ENG", "CIVIL WITH COMPUTER APPLICATION", "EEE", "All"];
const years = [2024, 2023, 2022, 2021, 2020];
const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const examTypes = ["Midsem", "Endsem"];

const PYQs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedExamType, setSelectedExamType] = useState("All");
  const [pyqsData, setPyqsData] = useState<PYQ[]>(initialPYQsData);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    examType: "Midsem",
    year: "2024",
    branch: "CSE",
    semester: "1st",
    subject: "",
    fileName: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Load PYQs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("campusone_pyqs");
    if (saved) {
      try {
        setPyqsData(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading PYQs:", e);
      }
    }
  }, []);

  // Save PYQs to localStorage
  useEffect(() => {
    if (pyqsData.length > 0) {
      localStorage.setItem("campusone_pyqs", JSON.stringify(pyqsData));
    }
  }, [pyqsData]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setUploadForm({ ...uploadForm, fileName: file.name });
    }
  };

  const handleUploadSubmit = () => {
    if (!uploadForm.subject.trim()) {
      toast({
        title: "Missing Subject",
        description: "Please enter the subject name.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a PDF file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Not Authenticated",
        description: "Please log in to upload PYQs.",
        variant: "destructive",
      });
      return;
    }

    const newPYQ: PYQ = {
      id: (pyqsData.length + 1).toString(),
      subject: uploadForm.subject,
      year: parseInt(uploadForm.year),
      semester: uploadForm.semester,
      examType: uploadForm.examType,
      branch: uploadForm.branch,
      fileName: uploadForm.fileName,
      uploadedBy: {
        name: user.name,
        rollNumber: user.rollNumber,
        branch: user.branch
      },
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setPyqsData([newPYQ, ...pyqsData]);
    setUploadForm({
      examType: "Midsem",
      year: "2024",
      branch: "CSE",
      semester: "1st",
      subject: "",
      fileName: ""
    });
    setSelectedFile(null);
    setIsUploadOpen(false);

    toast({
      title: "PYQ Uploaded Successfully",
      description: `${uploadForm.subject} has been added to the repository.`,
    });
  };

  const filteredPYQs = pyqsData.filter((pyq) => {
    const matchesSearch = pyq.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === "All" || pyq.branch === selectedBranch || pyq.branch === "All";
    const matchesYear = selectedYear === "all" || pyq.year === parseInt(selectedYear);
    const matchesSemester = selectedSemester === "all" || pyq.semester === selectedSemester;
    const matchesExamType = selectedExamType === "All" || pyq.examType === selectedExamType;
    return matchesSearch && matchesBranch && matchesYear && matchesSemester && matchesExamType;
  });

  return (
    <div className="space-y-6">
      <DemoBanner />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-study/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-study" />
            </div>
            Previous Year Questions
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and download previous year question papers organized by subject and year
          </p>
        </div>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-bg text-primary-foreground gap-2">
              <Plus className="w-4 h-4" />
              Upload PYQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Previous Year Question
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {/* Uploaded By Info */}
              {user && (
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-primary" />
                    <Label className="text-sm font-medium">Uploaded By</Label>
                  </div>
                  <div className="ml-6 space-y-1">
                    <p className="text-sm text-foreground font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Roll: {user.rollNumber} | Branch: {user.branch}
                    </p>
                  </div>
                </div>
              )}

              {/* Exam Type */}
              <div className="space-y-2">
                <Label>Exam Type</Label>
                <Select 
                  value={uploadForm.examType} 
                  onValueChange={(value) => setUploadForm({ ...uploadForm, examType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year */}
              <div className="space-y-2">
                <Label>Year</Label>
                <Select 
                  value={uploadForm.year} 
                  onValueChange={(value) => setUploadForm({ ...uploadForm, year: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Branch */}
              <div className="space-y-2">
                <Label>Branch</Label>
                <Select 
                  value={uploadForm.branch} 
                  onValueChange={(value) => setUploadForm({ ...uploadForm, branch: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {allowedBranches.map((branch) => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Semester */}
              <div className="space-y-2">
                <Label>Semester</Label>
                <Select 
                  value={uploadForm.semester} 
                  onValueChange={(value) => setUploadForm({ ...uploadForm, semester: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  placeholder="e.g., Data Structures"
                  value={uploadForm.subject}
                  onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>Upload File (PDF only)</Label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors",
                      selectedFile 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 bg-muted/20"
                    )}
                  >
                    {selectedFile ? (
                      <>
                        <FileText className="w-10 h-10 text-primary mb-2" />
                        <p className="text-sm text-foreground font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF files only</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-2">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  className="gradient-bg text-primary-foreground gap-2"
                  onClick={handleUploadSubmit}
                >
                  <Upload className="w-4 h-4" />
                  Upload PYQ
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card p-6 rounded-2xl"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Papers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Branches</SelectItem>
              {allowedBranches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {semesters.map((sem) => (
                <SelectItem key={sem} value={sem}>
                  {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            variant={selectedExamType === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedExamType("All")}
            className={selectedExamType === "All" ? "gradient-bg text-primary-foreground" : ""}
          >
            All
          </Button>
          {examTypes.map((type) => (
            <Button
              key={type}
              variant={selectedExamType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedExamType(type)}
              className={selectedExamType === type ? "gradient-bg text-primary-foreground" : ""}
            >
              {type}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPYQs.length} of {pyqsData.length} papers
          </p>
        </div>

        {filteredPYQs.length === 0 ? (
          <div className="glass-card p-12 rounded-2xl text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">No papers found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPYQs.map((pyq, index) => (
              <motion.div
                key={pyq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="glass-card p-5 rounded-2xl hover:border-primary/30 transition-all cursor-pointer group h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-study/20">
                      <FileText className="h-5 w-5 text-study" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {pyq.branch}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 flex-grow">
                    {pyq.subject}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {pyq.year}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5" />
                      {pyq.semester}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {pyq.examType}
                    </Badge>
                  </div>

                  {/* Uploaded By Section */}
                  <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <User className="h-3 w-3" />
                      <span>Uploaded by</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{pyq.uploadedBy.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pyq.uploadedBy.rollNumber} • {pyq.uploadedBy.branch}
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PYQs;
