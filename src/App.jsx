import React, { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GmailAuthModal from "./components/GmailAuthModal";
import "./index.css";

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenResumeModal = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className="scroll-smooth">
      <Navbar onOpenResumeModal={handleOpenResumeModal} />
      <Hero onOpenResumeModal={handleOpenResumeModal} />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <GmailAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}