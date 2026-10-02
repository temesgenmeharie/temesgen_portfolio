import React, { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  const [cvRequested, setCvRequested] = useState(false);

  const handleDownloadCvRequest = () => {
    setCvRequested(true);
    // Scroll to contact section smoothly
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="scroll-smooth">
      <Navbar />
      <Hero onDownloadCvRequest={handleDownloadCvRequest} />
      <About />
      <Projects />
      <Skills />
      <Contact cvRequested={cvRequested} onCvDownloaded={() => setCvRequested(false)} />
      <Footer />
    </div>
  );
}