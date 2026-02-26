import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Palette, Shield, HelpCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function Settings() {
  const sections = [
    { icon: User, title: "Profile", description: "Manage your account details" },
    { icon: Bell, title: "Notifications", description: "Control alert preferences" },
    { icon: Palette, title: "Appearance", description: "Theme and display settings" },
    { icon: Shield, title: "Privacy", description: "Data and security options" },
    { icon: HelpCircle, title: "Help & Support", description: "Get assistance" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Customize your experience</p>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.title} className="glass-card p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <section.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{section.title}</p>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-4 rounded-xl mt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Dark Mode</p>
            <p className="text-sm text-muted-foreground">Use dark theme</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </motion.div>
  );
}
