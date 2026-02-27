import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  GraduationCap, 
  BookOpen, 
  BarChart3, 
  MessageSquareWarning, 
  Shield, 
  Compass, 
  Search, 
  Heart,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Star,
  Info,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

// Stats data
const stats = [
  { value: "50K+", label: "Students Supported", icon: Users, color: "primary" },
  { value: "12K+", label: "Complaints Resolved", icon: CheckCircle, color: "attendance" },
  { value: "98%", label: "Safety Response Rate", icon: AlertTriangle, color: "safety" },
  { value: "4.9", label: "Student Rating", icon: Star, color: "lost" },
];

// Features data
const features = [
  {
    icon: BookOpen,
    title: "AI Study Planner",
    description: "Personalized study schedules powered by AI that adapt to your learning style and goals.",
    color: "study",
    gradient: "from-study to-primary"
  },
  {
    icon: BarChart3,
    title: "Attendance Analytics",
    description: "Real-time attendance tracking with predictive insights to keep you on track.",
    color: "attendance",
    gradient: "from-attendance to-wellness"
  },
  {
    icon: MessageSquareWarning,
    title: "Smart Complaints",
    description: "Streamlined complaint management with transparent tracking and quick resolution.",
    color: "complaints",
    gradient: "from-complaints to-lost"
  },
  {
    icon: Shield,
    title: "Campus Safety",
    description: "24/7 emergency support with real-time alerts and one-tap SOS features.",
    color: "safety",
    gradient: "from-safety to-complaints"
  },
  {
    icon: Compass,
    title: "Career Guidance",
    description: "AI-driven career recommendations with personalized skill roadmaps.",
    color: "career",
    gradient: "from-career to-primary"
  },
  {
    icon: Search,
    title: "Lost & Found",
    description: "AI-powered item matching to help recover lost belongings quickly.",
    color: "lost",
    gradient: "from-lost to-complaints"
  },
  {
    icon: Heart,
    title: "Wellness Hub",
    description: "Mental health support with mood tracking, guided exercises, and resources.",
    color: "wellness",
    gradient: "from-wellness to-study"
  },
  {
    icon: Sparkles,
    title: "Smart Dashboard",
    description: "Your personalized command center with insights that matter most.",
    color: "primary",
    gradient: "from-primary to-career"
  },
];

// Testimonials
const testimonials = [
  {
    quote: "BPMCEOne transformed how I manage my academic life. The AI study planner alone saved me hours every week.",
    author: "Nirbhay Kumar",
    role: "Computer Science, Year 3",
    avatar: "NK"
  },
  {
    quote: "The safety features gave my parents peace of mind. Knowing help is one tap away is incredibly reassuring.",
    author: "Manish Verma",
    role: "Engineering, Year 2",
    avatar: "MV"
  },
  {
    quote: "I found my lost laptop within 24 hours thanks to the AI matching system. Absolutely incredible.",
    author: "Priya Sharma",
    role: "Business, Year 4",
    avatar: "PS"
  },
];

// Section wrapper with animations
function AnimatedSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05, initialInView: true });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "visible"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="BPMCE Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-foreground">BPMCEOne</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors animated-underline">
                Features
              </a>
              <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors animated-underline">
                Impact
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors animated-underline">
                Testimonials
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/onboarding?mode=signin">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/onboarding">
                <Button size="sm" className="gradient-bg text-primary-foreground shadow-glow hover:shadow-glow-lg transition-shadow">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/campus-bg.jpg" 
            alt="" 
            className="hidden md:block w-full h-full object-cover"
          />
          <img 
            src="/campus-bg-mobile.jpg" 
            alt="" 
            className="md:hidden w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
        </div>
        
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 z-0" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Hackathon Demo Banner */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-2 mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Info className="w-3 h-3" />
                Hackathon Demo
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30">
                <Cpu className="w-3 h-3" />
                Google Gemini API Planned
              </span>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">The Future of Campus Life</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              One App. One Campus.
              <span className="block gradient-text">Every Student.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              BPMCEOne is your intelligent digital companion that unifies academics, 
              safety, wellness, and career guidance into one seamless experience.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/onboarding">
                <Button size="lg" className="gradient-bg text-primary-foreground shadow-glow hover:shadow-glow-lg transition-all h-12 px-8 text-base">
                  Explore Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-border hover:bg-muted">
                  View Features
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 md:mt-24 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              {/* Dashboard preview mockup */}
              <div className="glass-card p-2 md:p-4 rounded-2xl shadow-glow">
                <div className="bg-card rounded-xl overflow-hidden border border-border">
                  {/* Fake browser chrome */}
                  <div className="h-10 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-safety/50" />
                    <div className="w-3 h-3 rounded-full bg-lost/50" />
                    <div className="w-3 h-3 rounded-full bg-attendance/50" />
                    <div className="flex-1 flex justify-center">
                      <div className="px-4 py-1 bg-background rounded-md text-xs text-muted-foreground">
                        BPMCEone.edu/dashboard
                      </div>
                    </div>
                  </div>
                  {/* Preview content */}
                  <div className="p-6 md:p-8 bg-gradient-to-br from-background to-card">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Study Progress", value: "78%", color: "study" },
                        { label: "Attendance", value: "92%", color: "attendance" },
                        { label: "Tasks Done", value: "24", color: "primary" },
                        { label: "Wellness Score", value: "Good", color: "wellness" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="glass-card p-4 rounded-xl"
                        >
                          <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                          <p className={cn("text-2xl font-bold", `text-${item.color}`)}>{item.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-1/4 glass-card p-3 rounded-xl shadow-glow hidden md:flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-study/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-study" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Next Session</p>
                  <p className="text-sm font-medium">Physics in 30m</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-1/3 glass-card p-3 rounded-xl shadow-glow-accent hidden md:flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-attendance/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-attendance" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className="text-sm font-medium">92% this month</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection id="stats" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: index * 0.1 }}
                  className={cn(
                    "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4",
                    `bg-${stat.color}/10`
                  )}
                >
                  <stat.icon className={cn("w-8 h-8", `text-${stat.color}`)} />
                </motion.div>
                <motion.p
                  className={cn("text-4xl md:text-5xl font-bold mb-2", `text-${stat.color}`)}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection id="features" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need, <span className="gradient-text">unified</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From AI-powered academics to mental wellness, BPMCEOne brings every aspect of campus life together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card-hover p-6 rounded-2xl group cursor-pointer"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                  `bg-${feature.color}/10 group-hover:bg-${feature.color}/20`
                )}>
                  <feature.icon className={cn("w-6 h-6", `text-${feature.color}`)} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection id="testimonials" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by <span className="gradient-text">students</span> everywhere
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from the students whose campus life has been transformed by BPMCEOne.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                variants={fadeInUp}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-lost text-lost" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-medium text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            className="relative glass-card p-8 md:p-16 rounded-3xl text-center overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Ready to transform your campus life?</span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-bold text-foreground mb-6"
              >
                Join thousands of students on <span className="gradient-text">BPMCEOne</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                Experience the future of campus life. Start your journey with BPMCEOne today.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link to="/onboarding">
                  <Button size="lg" className="gradient-bg text-primary-foreground shadow-glow hover:shadow-glow-lg transition-all h-14 px-10 text-lg">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="BPMCE Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-foreground">BPMCEOne</span>
            </Link>
            
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">
                © 2025 BPMCEOne. Built for students, by students.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Developed by</span>
                <a 
                  href="https://nirbhayjr.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold gradient-text hover:underline transition-all"
                >
                  Nirbhay Jr
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
