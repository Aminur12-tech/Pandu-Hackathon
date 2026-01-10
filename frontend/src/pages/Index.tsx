import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Highlights } from "@/components/Highlights";
import { Tracks } from "@/components/Tracks";
import { Prizes } from "@/components/Prizes";
import { Sponsors } from "@/components/Sponsors";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { RegistrationModal } from "@/components/RegistrationModel";

const Index = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const openRegistration = () => setIsRegistrationOpen(true);
  const closeRegistration = () => setIsRegistrationOpen(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar onRegisterClick={openRegistration}/>
      <Hero onRegisterClick={openRegistration} />
      <About />
      <Highlights />
      <Tracks />
      <Prizes />
      <Sponsors />
      <FAQ />
      <CTA onRegisterClick={openRegistration} />
      <Footer />
      <RegistrationModal isOpen={isRegistrationOpen} onClose={closeRegistration} />
    </div>
  );
};

export default Index;
