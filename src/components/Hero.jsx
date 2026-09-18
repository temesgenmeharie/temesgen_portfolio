import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiX, FiUser, FiMail, FiBriefcase, FiMessageSquare } from "react-icons/fi";
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
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", reason: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.reason) e.reason = "Please select a reason";
    return e;
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = cvFile;
    link.download = "Temesgen-Meharie-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      triggerDownload();
      setTimeout(() => {
        setShowResumeModal(false);
        setSubmitted(false);
        setFormData({ name: "", email: "", company: "", reason: "" });
      }, 1000);
    }, 600);
  };

  const handleClose = () => {
    setShowResumeModal(false);
    setSubmitted(false);
    setErrors({});
    setFormData({ name: "", email: "", company: "", reason: "" });
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-white/5 border ${
      errors[field]
        ? "border-red-400 focus:ring-red-400"
        : "border-slate-200 dark:border-white/10 focus:ring-emerald-500"
    } text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 transition-all`;

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
            <button
              onClick={() => setShowResumeModal(true)}
              className="px-6 py-2.5 bg-slate-800 border border-slate-600 text-white dark:bg-black dark:border-white/20 dark:hover:bg-white/10 dark:hover:border-white/40 hover:bg-slate-700 transition-all text-sm flex items-center gap-2 rounded-md"
            >
              <FiDownload />
              Download CV
            </button>
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

      {/* Resume Download Form Modal */}
      {showResumeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                  <FiDownload className="text-lg text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight">
                    Before You Download
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    Quick form — takes 10 seconds
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mt-0.5"
                aria-label="Close"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
                  <FiDownload className="text-2xl text-emerald-600 dark:text-emerald-400 animate-bounce" />
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">Downloading now...</p>
                <p className="text-xs text-slate-400 mt-1">Thanks, {formData.name.split(" ")[0]}!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`${inputClass("name")} pl-9`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`${inputClass("email")} pl-9`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Company (optional) */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Company / Organization <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`${inputClass("company")} pl-9`}
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Why are you downloading? <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3 text-slate-400 text-sm pointer-events-none" />
                    <select
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className={`${inputClass("reason")} pl-9 appearance-none cursor-pointer`}
                    >
                      <option value="">Select a reason...</option>
                      <option value="hiring">Considering for a job opportunity</option>
                      <option value="freelance">Freelance / contract work</option>
                      <option value="collaboration">Project collaboration</option>
                      <option value="networking">General networking</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {errors.reason && <p className="text-xs text-red-400 mt-1">{errors.reason}</p>}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FiDownload />
                    Download CV
                  </button>
                </div>

              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
