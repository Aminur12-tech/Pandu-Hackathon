import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Lightbulb, Rocket, Trophy } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Build",
    description: "Transform your ideas into working prototypes with cutting-edge technologies.",
    color: "primary",
  },
  {
    icon: Lightbulb,
    title: "Innovate",
    description: "Push boundaries and create solutions that address real-world challenges.",
    color: "secondary",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Get your project off the ground with mentorship from industry experts.",
    color: "accent",
  },
  {
    icon: Trophy,
    title: "Win",
    description: "Compete for 15k+ in prizes and exclusive opportunities.",
    color: "neon-green",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorClasses = {
    primary: "text-primary border-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]",
    secondary: "text-secondary border-secondary/30 hover:border-secondary/60 hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)]",
    accent: "text-accent border-accent/30 hover:border-accent/60 hover:shadow-[0_0_30px_hsl(var(--accent)/0.3)]",
    "neon-green": "text-neon-green border-neon-green/30 hover:border-neon-green/60 hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.3)]",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card p-8 border transition-all duration-500 group cursor-pointer ${colorClasses[feature.color as keyof typeof colorClasses]}`}
    >
      <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <feature.icon className="w-7 h-7" />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

export const About = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Pandu College Hackathon
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">Showcase Your</span>{" "}
            <span className="text-foreground">Innovation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A one-day hackathon by the Dept. of Computer Science and Application, Pandu College in collaboration with Incubation Centre and Institution's Innovation Council, Pandu College. 
            Build prototypes, solve real-world problems, and compete for exciting prizes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Glow Line Separator */}
        <div className="mt-24 glow-line" />
      </div>
    </section>
  );
};
