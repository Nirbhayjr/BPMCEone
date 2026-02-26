import { motion } from "framer-motion";
import { Shield, Phone, MapPin, AlertTriangle, Bell, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Safety() {
  const emergencyContacts = [
    { name: "Campus Security", phone: "911", available: "24/7" },
    { name: "Health Center", phone: "555-0123", available: "8AM - 10PM" },
    { name: "Counseling", phone: "555-0124", available: "9AM - 6PM" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-safety/20 flex items-center justify-center">
          <Shield className="w-6 h-6 text-safety" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campus Safety</h1>
          <p className="text-muted-foreground">24/7 emergency support</p>
        </div>
      </div>

      {/* Emergency Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-8 rounded-2xl bg-safety/20 border-2 border-safety/50 mb-8 group"
      >
        <div className="w-20 h-20 rounded-full bg-safety flex items-center justify-center mx-auto mb-4 animate-pulse group-hover:animate-none">
          <AlertTriangle className="w-10 h-10 text-safety-foreground" />
        </div>
        <p className="text-2xl font-bold text-safety mb-2">TAP FOR EMERGENCY SOS</p>
        <p className="text-sm text-muted-foreground">Instantly alert campus security with your location</p>
      </motion.button>

      {/* Status */}
      <div className="glass-card p-6 rounded-2xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="status-dot-success" />
            <span className="font-medium text-foreground">Campus Status: All Clear</span>
          </div>
          <span className="text-sm text-muted-foreground">Last updated: 5 mins ago</span>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          {emergencyContacts.map((contact) => (
            <div key={contact.name} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div>
                <p className="font-medium text-foreground">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.available}</p>
              </div>
              <Button variant="outline" className="text-safety border-safety/30">
                <Phone className="w-4 h-4 mr-2" />
                {contact.phone}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
