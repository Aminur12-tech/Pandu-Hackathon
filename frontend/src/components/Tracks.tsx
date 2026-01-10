import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Leaf, 
  Building2, 
  Home, 
  BookOpen, 
  Briefcase, 
  Apple, 
  Wheat, 
  Newspaper, 
  MessageSquareWarning, 
  MapPin,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const tracks = [
  {
    id: 1,
    icon: Leaf,
    title: "Daily Sustainability Tracker",
    domain: "Environmental Tech 🌱",
    goal: "Help users monitor and reduce their daily carbon footprint.",
    techStack: "Flutter/React Native, Firebase, REST APIs, IoT sensors (optional)",
    users: "General public, eco-conscious individuals",
    color: "neon-green",
    criteria: [
      { name: "Innovation", weight: "20%", desc: "Novel features (e.g., gamified sustainability)" },
      { name: "Functionality", weight: "25%", desc: "Smooth tracking of energy, water, travel habits" },
      { name: "Impact", weight: "20%", desc: "Real potential to change user habits" },
      { name: "UI/UX", weight: "15%", desc: "Clean, motivating interface" },
      { name: "Scalability", weight: "10%", desc: "Potential for integration with smart devices" },
      { name: "Presentation", weight: "10%", desc: "Clear problem–solution delivery" },
    ],
  },
  {
    id: 2,
    icon: Building2,
    title: "Smart Civic Problem Reporter",
    domain: "GovTech / Smart Cities 🏙️",
    goal: "Enable citizens to report civic issues (roads, waste, streetlights) efficiently.",
    techStack: "Android/iOS app with backend (Node.js / Django), GPS & image upload, ML-based categorization",
    users: "City residents, municipalities",
    color: "primary",
    criteria: [
      { name: "Problem Relevance", weight: "15%", desc: "Solves a real urban problem" },
      { name: "Innovation", weight: "20%", desc: "Smart categorization / auto-routing to departments" },
      { name: "Functionality", weight: "25%", desc: "GPS tagging, image upload, real-time tracking" },
      { name: "UI/UX", weight: "15%", desc: "Simple and inclusive design" },
      { name: "Impact & Feasibility", weight: "15%", desc: "Can local governments realistically adopt it?" },
      { name: "Presentation", weight: "10%", desc: "Clarity and completeness of demo" },
    ],
  },
  {
    id: 3,
    icon: Home,
    title: "Property Rental Management System",
    domain: "Real Estate Tech 🏠",
    goal: "Simplify property renting – listing, managing tenants, and payments.",
    techStack: "MERN / Django, MySQL, Payment Gateway Integration",
    users: "Property owners, tenants, real estate agents",
    color: "secondary",
    criteria: [
      { name: "Functionality", weight: "25%", desc: "End-to-end workflow (listing, booking, payments)" },
      { name: "UI/UX", weight: "15%", desc: "Ease of navigation, responsive design" },
      { name: "Innovation", weight: "15%", desc: "Predictive pricing, smart contract automation" },
      { name: "Scalability", weight: "15%", desc: "Can it handle many users/properties?" },
      { name: "Impact", weight: "15%", desc: "Value addition to real-world rental market" },
      { name: "Presentation", weight: "15%", desc: "Demo clarity & completeness" },
    ],
  },
  {
    id: 4,
    icon: BookOpen,
    title: "PYQ Sharing Portal",
    domain: "EdTech 📘",
    goal: "Centralized platform for sharing and searching previous year question papers by subject and year.",
    techStack: "React, Firebase / MongoDB, NLP-based search, file storage system",
    users: "Students, educators, academic institutions",
    color: "accent",
    criteria: [
      { name: "Functionality", weight: "25%", desc: "Easy upload/search/download of papers" },
      { name: "Innovation", weight: "20%", desc: "Smart tagging, AI-based recommendations" },
      { name: "UI/UX", weight: "15%", desc: "Clean, intuitive design for students" },
      { name: "Impact", weight: "15%", desc: "Usefulness and accessibility for learners" },
      { name: "Scalability", weight: "10%", desc: "Handles large file/database volumes" },
      { name: "Presentation", weight: "15%", desc: "Clarity and usefulness of the demo" },
    ],
  },
  {
    id: 5,
    icon: Briefcase,
    title: "Connecting Talent with Microjobs",
    domain: "Gig Economy / Employment 💼",
    goal: "Connect local freelancers with short-term tasks or gigs.",
    techStack: "React Native, Node.js, MongoDB, Geo-location APIs, Payment Gateway",
    users: "Freelancers, small businesses, individuals needing quick services",
    color: "primary",
    criteria: [
      { name: "Innovation", weight: "20%", desc: "Matching algorithms, skill-based filtering" },
      { name: "Functionality", weight: "25%", desc: "Smooth job posting, browsing, and payments" },
      { name: "Impact", weight: "20%", desc: "Supports local employment and empowerment" },
      { name: "UI/UX", weight: "15%", desc: "Seamless experience for both workers and clients" },
      { name: "Scalability", weight: "10%", desc: "Can scale to multiple regions easily" },
      { name: "Presentation", weight: "10%", desc: "Effective and clear demo" },
    ],
  },
  {
    id: 6,
    icon: Apple,
    title: "Smart Diet Recommender",
    domain: "HealthTech / AI 🍎",
    goal: "Provide personalized diet plans based on user profile, activity level, and goals.",
    techStack: "Python (ML), React, Nutrition APIs, Wearable integration",
    users: "Fitness enthusiasts, dieticians, health-conscious users",
    color: "accent",
    criteria: [
      { name: "Innovation", weight: "20%", desc: "AI-based personalization or wearable integration" },
      { name: "Functionality", weight: "25%", desc: "Accurate tracking, adaptive diet planning" },
      { name: "Impact", weight: "20%", desc: "Promotes healthier lifestyles" },
      { name: "UI/UX", weight: "15%", desc: "Engaging visualizations and easy logging" },
      { name: "Feasibility", weight: "10%", desc: "Accuracy and practicality of data sources" },
      { name: "Presentation", weight: "10%", desc: "Demo clarity and presentation quality" },
    ],
  },
  {
    id: 7,
    icon: Wheat,
    title: "Smart Crop Disease Detection",
    domain: "AgriTech 🌾",
    goal: "Detect crop diseases early and monitor growth using AI and IoT to improve yield.",
    techStack: "Python (TensorFlow / PyTorch), IoT sensors, React / Android app",
    users: "Farmers, agri-researchers, government agricultural departments",
    color: "neon-green",
    criteria: [
      { name: "Innovation", weight: "20%", desc: "Use of AI, IoT, or satellite data for detection" },
      { name: "Functionality", weight: "25%", desc: "Real-time detection accuracy and alerting" },
      { name: "Impact", weight: "20%", desc: "Helps farmers reduce losses and increase yield" },
      { name: "UI/UX", weight: "15%", desc: "Simple and intuitive interface for rural accessibility" },
      { name: "Feasibility", weight: "10%", desc: "Data availability and ease of hardware setup" },
      { name: "Presentation", weight: "10%", desc: "Clarity of demo and explanation" },
    ],
  },
  {
    id: 8,
    icon: Newspaper,
    title: "Fake News Detection System",
    domain: "AI / Cybersecurity / NLP 📰",
    goal: "Identify and flag misleading or false news content across text and social media platforms.",
    techStack: "Python (NLP libraries like Transformers/BERT), Flask/React frontend, news dataset APIs",
    users: "News platforms, fact-checkers, general public",
    color: "secondary",
    criteria: [
      { name: "Innovation", weight: "20%", desc: "Advanced NLP or ML models for linguistic detection" },
      { name: "Functionality", weight: "25%", desc: "Detection accuracy, classification, and real-time analysis" },
      { name: "Impact", weight: "20%", desc: "Potential to curb misinformation spread" },
      { name: "UI/UX", weight: "15%", desc: "Clear representation of results and reliability score" },
      { name: "Scalability", weight: "10%", desc: "Adaptability to multiple languages or platforms" },
      { name: "Presentation", weight: "10%", desc: "Clarity of presentation and dataset justification" },
    ],
  },
  {
    id: 9,
    icon: MessageSquareWarning,
    title: "Social Media Hate Speech Detection",
    domain: "AI / NLP / Ethics 💬",
    goal: "Automatically detect and report hate speech and offensive content on social media platforms.",
    techStack: "Python (NLP with BERT/DistilBERT), TensorFlow, Flask backend, dashboard frontend",
    users: "Social media platforms, moderators, NGOs, researchers",
    color: "accent",
    criteria: [
      { name: "Innovation", weight: "20%", desc: "Context-aware or multilingual hate speech detection" },
      { name: "Functionality", weight: "25%", desc: "Accuracy, precision, and handling of ambiguous language" },
      { name: "Impact", weight: "20%", desc: "Social contribution toward safer online environments" },
      { name: "UI/UX", weight: "15%", desc: "Visualization of detection results, transparency of system decisions" },
      { name: "Feasibility", weight: "10%", desc: "Real-world applicability and dataset coverage" },
      { name: "Presentation", weight: "10%", desc: "Well-structured explanation and demo clarity" },
    ],
  },
  {
    id: 10,
    icon: MapPin,
    title: "Local Event Finder",
    domain: "Community / Location-based Services 📍",
    goal: "Help users discover local events, meetups, and activities happening nearby.",
    techStack: "React Native, Google Maps API, Firebase / MongoDB, Notification APIs",
    users: "Local residents, event organizers, communities",
    color: "primary",
    criteria: [
      { name: "Innovation", weight: "20%", desc: "Personalized event recommendations or real-time updates" },
      { name: "Functionality", weight: "25%", desc: "Accurate location-based filtering and user engagement" },
      { name: "Impact", weight: "20%", desc: "Strengthens local community participation" },
      { name: "UI/UX", weight: "15%", desc: "Visually engaging maps and smooth navigation" },
      { name: "Scalability", weight: "10%", desc: "Ability to handle events across multiple cities" },
      { name: "Presentation", weight: "10%", desc: "Clear demonstration and real-life usability" },
    ],
  },
];

export const Tracks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const classes = {
      primary: {
        border: "border-primary/30 hover:border-primary",
        shadow: "hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]",
        icon: "text-primary bg-primary/10",
        tag: "bg-primary/10 text-primary border-primary/20",
        badge: "bg-primary/20 text-primary",
      },
      secondary: {
        border: "border-secondary/30 hover:border-secondary",
        shadow: "hover:shadow-[0_0_40px_hsl(var(--secondary)/0.3)]",
        icon: "text-secondary bg-secondary/10",
        tag: "bg-secondary/10 text-secondary border-secondary/20",
        badge: "bg-secondary/20 text-secondary",
      },
      "neon-green": {
        border: "border-neon-green/30 hover:border-neon-green",
        shadow: "hover:shadow-[0_0_40px_hsl(var(--neon-green)/0.3)]",
        icon: "text-neon-green bg-neon-green/10",
        tag: "bg-neon-green/10 text-neon-green border-neon-green/20",
        badge: "bg-neon-green/20 text-neon-green",
      },
      accent: {
        border: "border-accent/30 hover:border-accent",
        shadow: "hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)]",
        icon: "text-accent bg-accent/10",
        tag: "bg-accent/10 text-accent border-accent/20",
        badge: "bg-accent/20 text-accent",
      },
    };
    return classes[color as keyof typeof classes];
  };

  const toggleExpand = (id: number) => {
    setExpandedTrack(expandedTrack === id ? null : id);
  };

  return (
    <section id="tracks" className="py-24 relative">
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            10 Problem Statements
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            <span className="text-foreground">Choose Your</span>{" "}
            <span className="gradient-text">Challenge</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pick a problem statement that aligns with your skills and passion. 
            Each track has unique challenges and evaluation criteria.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {tracks.map((track, index) => {
            const colors = getColorClasses(track.color);
            const isExpanded = expandedTrack === track.id;
            
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`glass-card border transition-all duration-500 ${colors.border} ${colors.shadow}`}
              >
                {/* Header - Always visible */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(track.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors.icon}`}>
                      <track.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`px-2 py-0.5 text-xs font-bold rounded ${colors.badge}`}>
                          #{track.id}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {track.domain}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {track.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {track.goal}
                      </p>
                    </div>
                    <button className="shrink-0 p-2 text-muted-foreground hover:text-foreground transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 border-t border-border/50"
                  >
                    <div className="pt-4 grid md:grid-cols-2 gap-6">
                      {/* Left Column - Details */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Tech Stack (Suggested)</h4>
                          <p className="text-sm text-muted-foreground">{track.techStack}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Target Users</h4>
                          <p className="text-sm text-muted-foreground">{track.users}</p>
                        </div>
                      </div>

                      {/* Right Column - Evaluation Criteria */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Evaluation Criteria</h4>
                        <div className="space-y-2">
                          {track.criteria.map((criterion) => (
                            <div key={criterion.name} className="flex items-start gap-2">
                              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${colors.tag} shrink-0`}>
                                {criterion.weight}
                              </span>
                              <div>
                                <span className="text-sm font-medium text-foreground">{criterion.name}</span>
                                <span className="text-sm text-muted-foreground"> – {criterion.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
