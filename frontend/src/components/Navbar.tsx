import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, } from "lucide-react";
import logoImage from "@/assets/logo.png";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#highlights", label: "Highlights" },
  { href: "#tracks", label: "Tracks" },
  { href: "#prizes", label: "Prizes" },
  { href: "#faq", label: "FAQ" },
];

interface NavbarProps {
  onRegisterClick: () => void;
}

export const Navbar = ({ onRegisterClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative">
            <img src={logoImage} alt="Hackathon Logo" className="w-10 h-10" />
          </div>
          <span className="font-display text-xl font-bold gradient-text">
            HACKATHON
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <Button variant="neon" size="sm" onClick={onRegisterClick}>
            Register Now
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm font-medium tracking-wide uppercase"
                >
                  {link.label}
                </a>
              ))}
              <Button variant="neon" className="w-full" onClick={onRegisterClick}>
                Register Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
