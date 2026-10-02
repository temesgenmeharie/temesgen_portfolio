import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiDownload, FiCheckCircle, FiLock, FiAlertCircle, FiUser, FiMail, FiLogOut } from "react-icons/fi";
import cvFile from "../assets/resume.pdf";

// Custom Google 'G' SVG Logo
const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function GmailAuthModal({ isOpen, onClose }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("cv_gmail_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [isGsiLoaded, setIsGsiLoaded] = useState(false);
  const googleBtnRef = useRef(null);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  // Helper to parse JWT token from Google GIS
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  // Check valid Gmail address
  const isGmailAddress = (email) => {
    if (!email) return false;
    const lower = email.trim().toLowerCase();
    return (
      lower.endsWith("@gmail.com") ||
      lower.endsWith("@googlemail.com") ||
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(lower)
    );
  };

  // Handle successful login
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("cv_gmail_user", JSON.stringify(userData));
    setError("");
    triggerDownload();
  };

  // Trigger CV file download
  const triggerDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = cvFile;
    link.download = "Temesgen-Meharie-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
    }, 1200);
  };

  // Load Google Identity Services script
  useEffect(() => {
    if (!isOpen) return;

    if (window.google?.accounts?.id) {
      setIsGsiLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsGsiLoaded(true);
    document.head.appendChild(script);
  }, [isOpen]);

  // Initialize GIS Button if client ID exists
  useEffect(() => {
    if (isOpen && isGsiLoaded && googleClientId && googleBtnRef.current) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response) => {
            const payload = parseJwt(response.credential);
            if (payload) {
              if (!isGmailAddress(payload.email)) {
                setError("Please sign in with a valid @gmail.com account.");
                return;
              }
              handleAuthSuccess({
                name: payload.name || payload.email.split("@")[0],
                email: payload.email,
                picture: payload.picture,
                provider: "google_oauth"
              });
            }
          }
        });

        googleBtnRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          width: 320
        });
      } catch (err) {
        console.warn("GIS initialization error:", err);
      }
    }
  }, [isOpen, isGsiLoaded, googleClientId]);

  // Handle Manual Gmail Form Submission
  const handleManualSubmit = (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = inputEmail.trim();
    const cleanName = inputName.trim() || cleanEmail.split("@")[0];

    if (!cleanEmail) {
      setError("Please enter your Gmail address.");
      return;
    }

    if (!isGmailAddress(cleanEmail)) {
      setError("Must be a valid @gmail.com address (e.g. user@gmail.com).");
      return;
    }

    handleAuthSuccess({
      name: cleanName,
      email: cleanEmail,
      provider: "gmail_auth"
    });
  };

  // Handle Sign Out
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("cv_gmail_user");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 15 }}
          transition={{ type: "spring", stiffness: 320, damping: 25 }}
          className="relative z-10 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full transition-colors"
            aria-label="Close"
          >
            <FiX className="text-xl" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm">
              <GoogleIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
                Gmail Login Required
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Authenticating to download Temesgen's CV
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 flex items-center gap-2.5 text-red-600 dark:text-red-400 text-xs font-medium"
            >
              <FiAlertCircle className="text-base shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* User Already Signed In */}
          {user ? (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-center">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-emerald-500"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg mx-auto mb-2">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
                  <FiCheckCircle className="text-emerald-500" />
                  <span>Authenticated with Gmail</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
                  {user.name} ({user.email})
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={triggerDownload}
                  disabled={downloading}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-emerald-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <FiDownload className={downloading ? "animate-bounce" : ""} />
                  {downloading ? "Downloading CV..." : "Download CV Again"}
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="p-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                >
                  <FiLogOut className="text-lg" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Google OAuth Button Container */}
              {googleClientId && (
                <div className="flex flex-col items-center gap-3">
                  <div ref={googleBtnRef} className="w-full flex justify-center" />
                  <div className="relative w-full flex items-center justify-center my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
                    </div>
                    <span className="relative px-3 bg-white dark:bg-[#111827] text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                      or sign in with Gmail
                    </span>
                  </div>
                </div>
              )}

              {/* Direct Gmail Input Form */}
              <form onSubmit={handleManualSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gmail Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="email"
                      required
                      placeholder="yourname@gmail.com"
                      value={inputEmail}
                      onChange={(e) => {
                        setInputEmail(e.target.value);
                        setError("");
                      }}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <GoogleIcon className="w-4 h-4" />
                  <span>Verify Gmail & Download CV</span>
                </button>
              </form>

              <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <FiLock className="text-xs shrink-0" />
                <span>Only valid @gmail.com accounts are permitted to download.</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
