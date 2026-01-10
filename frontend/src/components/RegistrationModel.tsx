import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Mail, User, Plus, Trash2, Sparkles, Rocket, FileText, GraduationCap, Building, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_URL = import.meta.env.VITE_API_URL;

const problemStatements = [
  { id: "1", title: "Daily Sustainability Tracker", domain: "Environmental Tech 🌱" },
  { id: "2", title: "Smart Civic Problem Reporter", domain: "GovTech / Smart Cities 🏙️" },
  { id: "3", title: "Property Rental Management System", domain: "Real Estate Tech 🏠" },
  { id: "4", title: "PYQ Sharing Portal", domain: "EdTech 📘" },
  { id: "5", title: "Connecting Talent with Microjobs", domain: "Gig Economy / Employment 💼" },
  { id: "6", title: "Smart Diet Recommender", domain: "HealthTech / AI 🍎" },
  { id: "7", title: "Smart Crop Disease Detection", domain: "AgriTech 🌾" },
  { id: "8", title: "Fake News Detection System", domain: "AI / Cybersecurity / NLP 📰" },
  { id: "9", title: "Social Media Hate Speech Detection", domain: "AI / NLP / Ethics 💬" },
  { id: "10", title: "Local Event Finder", domain: "Community / Location-based 📍" },
];

interface TeamMember {
  id: string;
  name: string;
  email: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const [teamName, setTeamName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", name: "", email: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { id: Date.now().toString(), name: "", email: "" }]);
    }
  };

  const removeMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const updateMember = (id: string, field: "name" | "email", value: string) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // -------- VALIDATION (UNCHANGED) --------
    if (!teamName.trim()) {
      toast({ title: "Error", description: "Please enter a team name", variant: "destructive" });
      return;
    }

    if (!collegeName.trim()) {
      toast({ title: "Error", description: "Please enter your college name", variant: "destructive" });
      return;
    }

    if (!studentClass.trim()) {
      toast({ title: "Error", description: "Please enter your class/semester", variant: "destructive" });
      return;
    }

    if (!address.trim()) {
      toast({ title: "Error", description: "Please enter your address", variant: "destructive" });
      return;
    }

    if (!selectedProblem) {
      toast({ title: "Error", description: "Please select a problem statement", variant: "destructive" });
      return;
    }

    const invalidMembers = members.filter(
      (m) => !m.name.trim() || !m.email.trim() || !m.email.includes("@")
    );

    if (invalidMembers.length > 0) {
      toast({
        title: "Error",
        description: "Please fill in all member details with valid emails",
        variant: "destructive",
      });
      return;
    }

    // -------- API CALL TO BACKEND --------
    setIsSubmitting(true);

    try {
      // 1️⃣ CREATE ORDER
      const orderRes = await fetch(`${API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const order = await orderRes.json();
      if (!order.id) throw new Error("Order creation failed");

      // 2️⃣ OPEN RAZORPAY CHECKOUT
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // PUBLIC KEY
        amount: order.amount,
        currency: "INR",
        name: "Pandu College Hackathon",
        description: "Team Registration Fee",
        order_id: order.id,

        handler: async function (response: any) {
          // 3️⃣ VERIFY PAYMENT
          const verifyRes = await fetch(`${API_URL}/api/payment/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              formData: {
                teamName,
                collegeName,
                studentClass,
                address,
                selectedProblem,
                members,
              },
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok) {
            throw new Error(verifyData.message || "Payment verification failed");
          }

          toast({
            title: "Registration Successful 🎉",
            description: "Payment completed & team registered",
          });

          // RESET FORM
          onClose();
          setTeamName("");
          setCollegeName("");
          setStudentClass("");
          setAddress("");
          setSelectedProblem("");
          setMembers([{ id: "1", name: "", email: "" }]);
        },

        prefill: {
          name: members[0].name,
          email: members[0].email,
        },

        theme: { color: "#7c3aed" },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Payment failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card border border-border/50 rounded-2xl p-6 md:p-8 relative w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="relative mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  Join the Revolution
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  <span className="gradient-text">Register Your Team</span>
                </h2>
                <p className="text-muted-foreground mt-2">
                  Teams can have 1-4 members
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30">
                  <span className="text-sm font-semibold text-accent">Registration Fee: ₹300 per team</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Team Name */}
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="flex items-center gap-2 text-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    Team Name
                  </Label>
                  <Input
                    id="teamName"
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* College Name */}
                <div className="space-y-2">
                  <Label htmlFor="collegeName" className="flex items-center gap-2 text-foreground">
                    <Building className="w-4 h-4 text-secondary" />
                    College Name
                  </Label>
                  <Input
                    id="collegeName"
                    placeholder="Enter your college name"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* Student Class */}
                <div className="space-y-2">
                  <Label htmlFor="studentClass" className="flex items-center gap-2 text-foreground">
                    <GraduationCap className="w-4 h-4 text-accent" />
                    Class / Semester
                  </Label>
                  <Input
                    id="studentClass"
                    placeholder="e.g., 3rd Year / 6th Semester"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* Problem Statement */}
                <div className="space-y-2">
                  <Label htmlFor="problemStatement" className="flex items-center gap-2 text-foreground">
                    <FileText className="w-4 h-4 text-accent" />
                    Problem Statement
                  </Label>
                  <Select value={selectedProblem} onValueChange={setSelectedProblem}>
                    <SelectTrigger className="bg-muted/50 border-border/50 focus:border-primary/50 transition-colors">
                      <SelectValue placeholder="Select a problem statement" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {problemStatements.map((problem) => (
                        <SelectItem key={problem.id} value={problem.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{problem.id}. {problem.title}</span>
                            <span className="text-xs text-muted-foreground">{problem.domain}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Team Members */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-foreground">
                      <User className="w-4 h-4 text-secondary" />
                      Team Members
                    </Label>
                    {members.length < 4 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addMember}
                        className="text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Member
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {members.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            Member {index + 1} {index === 0 && "(Team Lead)"}
                          </span>
                          {members.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMember(member.id)}
                              className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <Input
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) => updateMember(member.id, "name", e.target.value)}
                            className="bg-background/50 border-border/50 focus:border-primary/50"
                          />
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="email@example.com"
                              value={member.email}
                              onChange={(e) => updateMember(member.id, "email", e.target.value)}
                              className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="cyber"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-2" />
                      Register Team
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By registering, you agree to our terms and conditions
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
