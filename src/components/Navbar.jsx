import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiMoon, FiSun } from "react-icons/fi";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Resume", href: "#contact" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "contact"];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (_e, link) => {
    if (link.name === "Resume" && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="section-container flex justify-between items-center">
        <a href="#" className="text-2xl font-bold font-display tracking-tighter text-[var(--text-main)]">
          TM<span className="text-[var(--accent)]">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isLinkActive = activeSection === link.href.replace("#", "") || (link.name === "Home" && activeSection === "hero");
            const isResume = link.name === "Resume";
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                target={isResume ? undefined : (link.target || undefined)}
                rel={isResume ? undefined : (link.target === "_blank" ? "noreferrer" : undefined)}
                className={`text-sm font-medium transition-all px-4 py-1.5 rounded-full ${isLinkActive && !isResume
                  ? "border border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  } cursor-pointer`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/10"></div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors ml-2 focus:outline-none">
              {theme === "dark" ? (
                <FiSun size={18} className="text-yellow-400 hover:text-yellow-300" />
              ) : (
                <FiMoon size={18} className="text-slate-600 hover:text-slate-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl text-[var(--text-main)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-slate-200 dark:border-white/10"
          >
            <div className="flex flex-col p-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-lg font-medium text-[var(--text-muted)] hover:text-[var(--accent)] cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-6 pt-4 border-t border-slate-200 dark:border-white/10 mt-2 items-center">
                <button onClick={toggleTheme} className="ml-auto text-[var(--text-muted)] hover:text-[var(--text-main)] focus:outline-none">
                  {theme === "dark" ? (
                    <FiSun size={24} className="text-yellow-400" />
                  ) : (
                    <FiMoon size={24} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}