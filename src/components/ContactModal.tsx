"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiXMark,
  HiOutlineEnvelope,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { submitLead } from "@/lib/crm";

const RECIPIENT_EMAIL = "digitalstudiolf@gmail.com";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  subject?: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactModal({ isOpen, onClose, subject = "" }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  // When the modal transitions to open, seed the subject field from the prop.
  // Adjusting state during render (React's recommended pattern) instead of an
  // effect avoids an extra render pass.
  const [wasOpen, setWasOpen] = useState(false);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setFormData((prev) => ({ ...prev, subject }));
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const t = setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 300);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const ok = await submitLead({
      email: formData.email,
      name: formData.name,
      message: formData.message,
      projectType: formData.subject,
      source: "contact_form",
    });

    setStatus(ok ? "success" : "error");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/70"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            {status === "success" ? (
              <div className="relative p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5"
                >
                  <HiOutlineCheckCircle className="w-9 h-9 text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Thanks for reaching out. We&apos;ll get back to you within
                  24&nbsp;hours at <span className="text-primary">{formData.email}</span>.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-sm font-medium transition-all"
                >
                  Close
                </button>
              </div>
            ) : status === "error" ? (
              <div className="relative p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
                  <HiOutlineExclamationTriangle className="w-9 h-9 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Something went wrong
                </h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Couldn&apos;t send your message. Please try again, or email us
                  directly at{" "}
                  <a
                    href={`mailto:${RECIPIENT_EMAIL}`}
                    className="text-primary hover:underline"
                  >
                    {RECIPIENT_EMAIL}
                  </a>
                  .
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative p-6 sm:p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <HiOutlineEnvelope className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Get in Touch
                  </h3>
                  <p className="text-white/50 text-sm">
                    Fill out the form and we&apos;ll get back to you within
                    24&nbsp;hours.
                  </p>
                </div>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <HiOutlinePaperAirplane className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-white/30 text-xs mt-4">
                  Your message will be sent to{" "}
                  <span className="text-white/50">{RECIPIENT_EMAIL}</span>
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
