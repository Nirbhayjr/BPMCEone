import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, User, Mail, BookOpen, Calendar, Lock, Home, MapPin, Users, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const branches = [
  "CSE",
  "CSE AIML",
  "3D A&G",
  "CIVIL ENG",
  "CIVIL WITH COMPUTER APPLICATION",
  "EEE"
];

const genders = ["Male", "Female", "Other", "Prefer not to say"];

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp, signIn, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [mode, setMode] = useState<"signup" | "signin">(() => {
    const params = new URLSearchParams(location.search);
    return params.get("mode") === "signin" ? "signin" : "signup";
  });
  
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    gender: "",
    hometown: "",
    password: ""
  });

  const [routineFile, setRoutineFile] = useState<File | null>(null);
  const [skipRoutine, setSkipRoutine] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setMode(params.get("mode") === "signin" ? "signin" : "signup");
  }, [location.search]);

  const handleModeChange = (nextMode: "signup" | "signin") => {
    navigate(`/onboarding?mode=${nextMode}`, { replace: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "signup") {
      if (!formData.name || !formData.rollNumber || !formData.password || !formData.branch || !formData.gender || !formData.hometown) {
        toast({
          title: "Incomplete Form",
          description: "Please fill in all required fields to continue.",
          variant: "destructive",
        });
        return;
      }

      signUp(formData);
      toast({
        title: "Welcome to BPMCEOne!",
        description: `Hi ${formData.name}, your account has been set up successfully.`,
      });
      navigate("/dashboard");
      return;
    }

    if (!formData.rollNumber || !formData.password) {
      toast({
        title: "Missing Details",
        description: "Please enter your registration/roll number and password.",
        variant: "destructive",
      });
      return;
    }

    const isValid = signIn(formData.rollNumber.trim(), formData.password);
    if (!isValid) {
      toast({
        title: "Sign in failed",
        description: "No account found or password is incorrect.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome back!",
      description: "Signed in successfully.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="glass-card p-8 md:p-12 text-foreground">
          <div className="flex items-center justify-between mb-6">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="text-xs text-muted-foreground">
              {mode === "signup" ? "Create account" : "Sign in"}
            </div>
          </div>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-4 shadow-glow">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {mode === "signup" ? (
                <>Welcome to <span className="gradient-text">BPMCEOne</span></>
              ) : (
                <>Sign in to <span className="gradient-text">BPMCEOne</span></>
              )}
            </h1>
            <p className="text-muted-foreground">
              {mode === "signup"
                ? "Let's get you started! Fill in your details to access your personalized campus dashboard."
                : "Enter your registration/roll number and password to continue."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <>
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-border/60"
                    required
                  />
                </div>

                {/* Registration/Roll Number */}
                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Roll/Registration Number
                  </Label>
                  <Input
                    id="rollNumber"
                    type="text"
                    placeholder="2023001"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="bg-background/50 border-border/60"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Create Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-background/50 border-border/60"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Branch */}
                  <div className="space-y-2">
                    <Label htmlFor="branch" className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Branch
                    </Label>
                    <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })} required>
                      <SelectTrigger className="bg-background/50 border-border/60">
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Gender
                    </Label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })} required>
                      <SelectTrigger className="bg-background/50 border-border/60">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Hometown */}
                <div className="space-y-2">
                  <Label htmlFor="hometown" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Hometown
                  </Label>
                  <Input
                    id="hometown"
                    type="text"
                    placeholder="Enter your hometown"
                    value={formData.hometown}
                    onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                    className="bg-background/50 border-border/60"
                    required
                  />
                </div>

                {/* Routine Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Class Routine (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="routine-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setRoutineFile(e.target.files[0]);
                          setSkipRoutine(false);
                        }
                      }}
                      className="hidden"
                    />
                    <label htmlFor="routine-upload" className="cursor-pointer">
                      <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                      {routineFile ? (
                        <p className="text-sm text-foreground font-medium">{routineFile.name}</p>
                      ) : (
                        <>
                          <p className="text-sm text-muted-foreground">Click to upload your class routine</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG</p>
                        </>
                      )}
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="skip-routine"
                      checked={skipRoutine}
                      onChange={(e) => {
                        setSkipRoutine(e.target.checked);
                        if (e.target.checked) setRoutineFile(null);
                      }}
                      className="w-4 h-4 rounded border-border"
                    />
                    <label htmlFor="skip-routine" className="text-sm text-muted-foreground cursor-pointer">
                      Upload routine later
                    </label>
                  </div>
                </div>
              </>
            )}

            {mode === "signin" && (
              <>
                {/* Registration/Roll Number */}
                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Roll/Registration Number
                  </Label>
                  <Input
                    id="rollNumber"
                    type="text"
                    placeholder="Enter your roll number"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="bg-background/50 border-border/60"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-background/50 border-border/60"
                    required
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full gradient-bg !text-white shadow-glow hover:shadow-glow-lg transition-all"
            >
              <span className="text-white font-semibold">
                {mode === "signup" ? "Get Started" : "Sign In"}
              </span>
              <ArrowRight className="w-5 h-5 ml-2 text-white" />
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground mt-6">
            {mode === "signup" ? (
              <>
                Your data is stored securely on your device and never leaves your browser. Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleModeChange("signin")}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                New to BPMCEOne?{" "}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => handleModeChange("signup")}
                  className="text-primary hover:underline p-0 h-auto font-medium"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
