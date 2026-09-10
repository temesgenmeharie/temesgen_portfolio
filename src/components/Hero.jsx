import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import {
  SiReact, SiHtml5, SiCss3, SiTailwindcss, SiJavascript,
  SiNodedotjs, SiExpress, SiPostgresql, SiMysql, SiFlutter
} from "react-icons/si";
import cvFile from "../assets/resume.pdf";

const TECH_BADGES = [
  { name: "React", icon: SiReact, color: "#61DAFB", labelColor: "#0ea5e9", bg: "rgba(97, 218, 251, 0.12)", border: "rgba(97, 218, 251, 0.25)" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26", labelColor: "#E34F26", bg: "rgba(227, 79, 38, 0.1)", border: "rgba(227, 79, 38, 0.25)" },
  { name: "CSS", icon: SiCss3, color: "#1572B6", labelColor: "#1572B6", bg: "rgba(21, 114, 182, 0.1)", border: "rgba(21, 114, 182, 0.25)" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8", labelColor: "#0284c7", bg: "rgba(56, 189, 248, 0.1)", border: "rgba(56, 189, 248, 0.25)" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", labelColor: "#b45309", bg: "rgba(247, 223, 30, 0.1)", border: "rgba(247, 223, 30, 0.25)" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", labelColor: "#166534", bg: "rgba(51, 153, 51, 0.1)", border: "rgba(51, 153, 51, 0.25)" },
  {
    name: "Express.js", icon: SiExpress, color: "#555555", labelColor: "#374151", bg: "rgba(100, 100, 100, 0.1)", border: "rgba(100, 100, 100, 0.2)",
    colorDark: "#FFFFFF", labelColorDark: "rgba(255,255,255,0.85)"
  },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", labelColor: "#2563eb", bg: "rgba(65, 105, 225, 0.1)", border: "rgba(65, 105, 225, 0.25)" },
  { name: "MySQL", icon: SiMysql, color: "#00758F", labelColor: "#005f73", bg: "rgba(0, 117, 143, 0.1)", border: "rgba(0, 117, 143, 0.25)" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B", labelColor: "#02569B", bg: "rgba(2, 86, 155, 0.1)", border: "rgba(2, 86, 155, 0.25)" },
];

export default function Hero() {
  // Reactive dark-mode state — updates whenever the theme toggle fires
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Watch for dark class changes on <html>
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-20 relative overflow-hidden bg-[var(--bg)] transition-colors duration-300">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-40 filter blur-[8px] scale-105 pointer-events-none select-none z-0"
        style={{ backgroundImage: "url('/developer-bg.png')" }}
      />

      {/* Gradient Overlay — lighter in light mode */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-[var(--bg)]/80 dark:from-[#022c22]/50 dark:via-[#064e3b]/30 dark:to-[#0b0a10]/90 pointer-events-none z-0 transition-colors duration-300" />
      {/* Soft bg wash — reduced opacity in light mode so text stays visible */}
      <div className="absolute inset-0 bg-[var(--bg)]/40 dark:bg-[#0b0a10]/60 pointer-events-none z-0 transition-colors duration-300" />

      <div className="section-container w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left flex flex-col justify-center"
        >
          {/* Name — deep sky-700 in light, sky-400 in dark */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-sky-700 dark:text-sky-400 mb-2 font-display drop-shadow-sm">
            Temesgen Meharie
          </h1>

          {/* Role */}
          <div className="text-xl md:text-2xl font-bold mb-6 font-display h-8">
            <span className="text-slate-800 dark:text-white transition-colors duration-300">Hey I'm </span>
            <span className="text-emerald-600 dark:text-emerald-400">Full Stack Developer</span>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-[var(--text-muted)] text-sm md:text-base max-w-xl mb-8 leading-relaxed">
            I design and develop responsive web applications that solve real-world problems. With a passion for clean code, intuitive user experiences, and continuous learning, I turn ideas into digital products that people enjoy using.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={cvFile}
              target="_blank"
              rel="noreferrer"
              download="resume.pdf"
              className="px-6 py-2.5 bg-slate-800 border border-slate-600 text-white dark:bg-black dark:border-white/20 dark:hover:bg-white/10 dark:hover:border-white/40 hover:bg-slate-700 transition-all text-sm flex items-center gap-2 rounded-md"
            >
              <FiDownload />
              Download CV
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-slate-800 border border-slate-600 text-white dark:bg-black dark:border-white/20 dark:hover:bg-white/10 dark:hover:border-white/40 hover:bg-slate-700 transition-all text-sm flex items-center justify-center min-w-[110px] rounded-md"
            >
              Let's Work Together
            </a>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-3 max-w-xl">
            {TECH_BADGES.map((badge, idx) => {
              const Icon = badge.icon;
              const iconColor = isDark && badge.colorDark ? badge.colorDark : badge.color;
              const labelColor = isDark && badge.labelColorDark ? badge.labelColorDark : badge.labelColor;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl transition-all hover:scale-105 select-none w-[76px] h-[68px] text-center"
                  style={{
                    backgroundColor: badge.bg,
                    border: `1px solid ${badge.border}`
                  }}
                >
                  <Icon className="text-xl mb-1.5" style={{ color: iconColor }} />
                  <span className="text-[9px] font-semibold tracking-tight" style={{ color: labelColor }}>
                    {badge.name}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Content - Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center md:justify-end items-center"
        >
          <div className="relative w-72 h-72 md:w-[340px] md:h-[340px] flex items-center justify-center">
            {/* Blob Frame */}
            <div className="absolute inset-0 bg-[#10B981]/15 border-2 border-[#10B981]/40 rounded-full animate-blob-bounce animate-pulse-glow z-0 filter blur-[1px]"></div>
            {/* Avatar */}
            <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-[6px] border-white shadow-2xl z-10 bg-[var(--card-bg)]">
              <img
                src="/profile-placeholder.png"
                alt="Temesgen Meharie"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
