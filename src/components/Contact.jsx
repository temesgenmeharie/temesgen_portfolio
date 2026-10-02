import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiAlertCircle, FiLoader, FiDownload } from "react-icons/fi";
import cvFile from "../assets/resume.pdf";

const INITIAL = { from_name: "", from_email: "", subject: "", message: "" };
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

// ⬇️ Must match the same flag in Hero.jsx — set to true when CV is ready
const CV_AVAILABLE = false;

function validate({ from_name, from_email, subject, message }) {
  if (!from_name.trim()) return "Please enter your name.";
  if (!from_email.trim()) return "Please enter your email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from_email)) return "Please enter a valid email address.";
  if (!subject.trim()) return "Please enter a subject.";
  if (!message.trim()) return "Please enter your message.";
  if (message.trim().length < 10) return "Message must be at least 10 characters.";
  return null;
}

export default function Contact({ cvRequested = false, onCvDownloaded }) {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");
  const formRef = useRef(null);

  // Auto-scroll to form and focus first field when CV is requested
  useEffect(() => {
    if (cvRequested && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [cvRequested]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateField = (name, value) => {
    if (!value.trim()) return "This field is required.";
    if (name === "from_email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Invalid email address.";
    if (name === "message" && value.trim().length < 10)
      return "Message must be at least 10 characters.";
    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const globalErr = validate(fields);
    if (globalErr) {
      const newErrors = {};
      Object.keys(INITIAL).forEach((key) => {
        newErrors[key] = validateField(key, fields[key]);
      });
      setErrors(newErrors);
      return;
    }

    setStatus("loading");
    setErrMsg("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fields.from_name,
          email: fields.from_email,
          subject: fields.subject,
          message: fields.message,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.message || "Server API unavailable");
      }

      setStatus("success");
      setFields(INITIAL);
      setErrors({});

      // If CV was requested and available, auto-download it after form submission
      if (cvRequested && CV_AVAILABLE) {
        const link = document.createElement("a");
        link.href = cvFile;
        link.download = "Temesgen-Meharie-Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (onCvDownloaded) onCvDownloaded();
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setErrMsg(err?.message || "Failed to send message. Please try again later.");
    }
  };

  const isLoading = status === "loading";

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[var(--bg)] min-h-[90vh] flex items-center transition-colors duration-300">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Developer Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('/developer-bg.png')" }}
      />

      <div className="section-container relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">
            Get in <span className="text-blue-500 dark:text-[#38bdf8]">Touch</span>
          </h2>
          <p className="text-slate-600 dark:text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium transition-colors duration-300">
            Have a project in mind? Fill out the form and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* CV Requested Banner */}
        <AnimatePresence>
          {cvRequested && status !== "success" && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="max-w-5xl mx-auto mb-6"
            >
              <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 rounded-2xl px-5 py-4 shadow-sm">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl shrink-0">
                  <FiDownload className="text-emerald-600 dark:text-emerald-400 text-lg" />
                </div>
                <div>
                  <p className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">One step to get my CV!</p>
                  <p className="text-emerald-700 dark:text-emerald-400 text-xs mt-0.5">
                    Fill in the contact form below and your download will start automatically after submission.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-5xl mx-auto">

          {/* ── Left: Contact Info Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Card: Contact */}
            <div className="bg-white dark:bg-[var(--card-bg)] rounded-[24px] p-6 md:p-8 shadow-sm hover:shadow-md border border-gray-100 dark:border-white/10 text-gray-800 dark:text-gray-200 space-y-6 transition-all duration-300">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 rounded-2xl transition-colors duration-300">
                  <FiMail size={22} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white transition-colors duration-300">Contact Details</h3>
              </div>

              <div className="flex items-center gap-4 pl-1">
                <div className="p-2.5 bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400 rounded-xl shrink-0">
                  <FiPhone size={18} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base transition-colors duration-300">+2519 85250001</p>
              </div>

              <div className="flex items-center gap-4 pl-1">
                <div className="p-2.5 bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400 rounded-xl shrink-0">
                  <FiMail size={18} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base transition-colors duration-300 break-all">temesgenmeharie71@gmail.com</p>
              </div>
            </div>

            {/* Card: Location */}
            <div className="bg-white dark:bg-[var(--card-bg)] rounded-[24px] p-6 md:p-8 shadow-sm hover:shadow-md border border-gray-100 dark:border-white/10 text-gray-800 dark:text-gray-200 space-y-6 transition-all duration-300">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 rounded-2xl transition-colors duration-300">
                  <FiMapPin size={22} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white transition-colors duration-300">Location</h3>
              </div>

              <div className="flex items-center gap-4 pl-1">
                <div className="p-2.5 bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400 rounded-xl shrink-0">
                  <FiMapPin size={18} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base transition-colors duration-300">Addis Ababa, Ethiopia</p>
              </div>
            </div>

            {/* Quick Note */}
            <p className="text-slate-500 dark:text-[var(--text-muted)] text-xs pl-1 leading-relaxed">
              💬 I typically respond within <span className="font-semibold text-blue-600 dark:text-blue-400">24 hours</span>. For urgent matters, reach me on Telegram.
            </p>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {/* ── SUCCESS STATE ── */}
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-[var(--card-bg)] p-8 rounded-[24px] shadow-sm border border-gray-100 dark:border-white/10 flex flex-col items-center text-center gap-4 min-h-[400px] justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center">
                    <FiCheckCircle size={36} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                  <p className="text-slate-600 dark:text-[var(--text-muted)] text-sm max-w-xs leading-relaxed">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  {/* Show CV downloaded confirmation if it was requested */}
                  {!cvRequested && (
                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-4 py-2.5 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                      <FiDownload size={13} />
                      Your CV download has started!
                    </div>
                  )}
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* ── FORM STATE ── */
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-[var(--card-bg)] p-6 md:p-8 rounded-[24px] space-y-4 shadow-sm border border-gray-100 dark:border-white/10 transition-colors duration-300"
                >
                  {/* Name */}
                  <div>
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      value={fields.from_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your Name *"
                      disabled={isLoading}
                      className={`w-full bg-slate-50 dark:bg-slate-900/80 border rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all text-sm ${errors.from_name
                          ? "border-red-400 dark:border-red-500"
                          : "border-gray-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400"
                        }`}
                    />
                    {errors.from_name && (
                      <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                        <FiAlertCircle size={12} /> {errors.from_name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      id="from_email"
                      name="from_email"
                      type="email"
                      value={fields.from_email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your Email *"
                      disabled={isLoading}
                      className={`w-full bg-slate-50 dark:bg-slate-900/80 border rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all text-sm ${errors.from_email
                          ? "border-red-400 dark:border-red-500"
                          : "border-gray-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400"
                        }`}
                    />
                    {errors.from_email && (
                      <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                        <FiAlertCircle size={12} /> {errors.from_email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={fields.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Subject *"
                      disabled={isLoading}
                      className={`w-full bg-slate-50 dark:bg-slate-900/80 border rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all text-sm ${errors.subject
                          ? "border-red-400 dark:border-red-500"
                          : "border-gray-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400"
                        }`}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                        <FiAlertCircle size={12} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={fields.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your Message *"
                      disabled={isLoading}
                      className={`w-full bg-slate-50 dark:bg-slate-900/80 border rounded-xl px-5 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all resize-none text-sm ${errors.message
                          ? "border-red-400 dark:border-red-500"
                          : "border-gray-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400"
                        }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                        <FiAlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error Banner */}
                  {status === "error" && (
                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
                      <FiAlertCircle size={16} className="shrink-0" />
                      {errMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 font-bold rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${
                      cvRequested
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin" size={18} />
                        Sending…
                      </>
                    ) : cvRequested ? (
                      <>
                        <FiDownload size={16} />
                        Send & Download CV
                      </>
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-white/10">
                    <a href="https://github.com/temesgenmeharie" target="_blank" rel="noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors flex flex-col items-center gap-1 group">
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                        <FiGithub size={22} className="text-black dark:text-white" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">GitHub</span>
                    </a>
                    <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-[#0a66c2] dark:hover:text-blue-400 transition-colors flex flex-col items-center gap-1 group">
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                        <FiLinkedin size={22} className="text-[#0a66c2] dark:text-blue-400" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">LinkedIn</span>
                    </a>
                    <a href="https://t.me/Ethiopia2063" target="_blank" rel="noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-[#229ED9] dark:hover:text-[#229ED9] transition-colors flex flex-col items-center gap-1 group">
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                        <FiSend size={22} className="text-[#229ED9]" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Telegram</span>
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
