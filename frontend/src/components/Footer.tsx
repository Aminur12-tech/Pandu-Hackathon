import { Zap, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import LogoImage from "@/assets/logo.png";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const footerLinks = [
  {
    title: "Event",
    links: ["Schedule", "Speakers", "Venue", "FAQ"],
  },
  {
    title: "Resources",
    links: ["Code of Conduct", "Judging Criteria", "Rules", "API Docs"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export const Footer = () => {
  return (
    <footer className="relative pt-24 pb-12 border-t border-border/50">
      <div className="absolute inset-0 cyber-grid opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="relative">
                <img src={LogoImage} alt="Hackathon Logo" className="w-10 h-10"/>
              </div>
              <span className="font-display text-xl font-bold gradient-text">
                NEXUS HACK
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The ultimate hackathon experience. 48 hours of innovation, collaboration, 
              and competition with the brightest minds in tech.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="glow-line mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Nexus Hack. All rights reserved.</p>
          <p>
            Built with{" "}
            <span className="text-accent">♥</span>{" "}
            for hackers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
