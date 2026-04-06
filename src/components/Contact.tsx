"use client";

import { Mail, Linkedin, Github, Send, CheckCircle, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xreykdwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Oops! There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Oops! There was a problem submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full bg-background text-foreground py-32 px-6 md:px-24 z-20 overflow-hidden">

      {/* Liquid Glass Background Effects */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-screen overflow-hidden" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3 pointer-events-none mix-blend-screen overflow-hidden" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 pm-zone overflow-visible"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent leading-[1.3] overflow-visible">
            Let's build together.
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg font-light">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Fast-track to my inbox below.
          </p>
        </motion.div>

        {/* Content Details */}
        <div className="flex flex-col md:flex-row w-full gap-8 justify-center items-stretch pm-zone">

          {/* Left Glass Card: Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-[400px] flex flex-col justify-center gap-8 bg-foreground/5 backdrop-blur-2xl border border-foreground/10 rounded-3xl p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
          >
            <a href="mailto:jobsforanchit.boruah@gmail.com" aria-label="Send an email to Anchit Boruah" className="group flex items-center gap-6 hover:-translate-y-1 transition-transform pm-glass-hover p-4 rounded-2xl">
              <div className="p-4 bg-background/50 rounded-full shadow-inner text-emerald-500 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <div className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-1">Direct Email</div>
                <div className="font-medium break-all">jobsforanchit.boruah@gmail.com</div>
              </div>
            </a>

            <a href="https://linkedin.com/in/anchitboruah/" target="_blank" rel="noreferrer" aria-label="Visit Anchit Boruah's LinkedIn profile" className="group flex items-center gap-6 hover:-translate-y-1 transition-transform pm-glass-hover p-4 rounded-2xl">
              <div className="p-4 bg-background/50 rounded-full shadow-inner text-blue-500 group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <div className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-1">LinkedIn</div>
                <div className="font-medium">@anchitboruah</div>
              </div>
            </a>

            <a href="https://github.com/anchit98/" target="_blank" rel="noreferrer" aria-label="Visit Anchit Boruah's GitHub profile" className="group flex items-center gap-6 hover:-translate-y-1 transition-transform pm-glass-hover p-4 rounded-2xl">
              <div className="p-4 bg-background/50 rounded-full shadow-inner text-foreground/80 group-hover:scale-110 transition-transform">
                <Github className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <div className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-1">GitHub</div>
                <div className="font-medium">@anchit98</div>
              </div>
            </a>

            <a href="https://instagram.com/anchitboruah/" target="_blank" rel="noreferrer" aria-label="Visit Anchit Boruah's Instagram profile" className="group flex items-center gap-6 hover:-translate-y-1 transition-transform pm-glass-hover p-4 rounded-2xl">
              <div className="p-4 bg-background/50 rounded-full shadow-inner text-foreground/80 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <div className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-1">Instagram</div>
                <div className="font-medium">@anchitboruah</div>
              </div>
            </a>
          </motion.div>


          {/* Right Glass Card: Email Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-[600px] min-h-[400px] flex items-center justify-center bg-foreground/5 backdrop-blur-2xl border border-foreground/10 rounded-3xl p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col gap-8 w-full h-full justify-between"
                  onSubmit={handleSubmit}
                  aria-label="Contact form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        aria-required="true"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="peer w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:outline-none focus:border-emerald-500 transition-colors placeholder-transparent"
                        placeholder="Name"
                      />
                      <label htmlFor="contact-name" className="absolute left-0 -top-3.5 text-xs text-foreground/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-emerald-500 cursor-text">Name</label>
                    </div>

                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        aria-required="true"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="peer w-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:outline-none focus:border-emerald-500 transition-colors placeholder-transparent"
                        placeholder="Email Address"
                      />
                      <label htmlFor="contact-email" className="absolute left-0 -top-3.5 text-xs text-foreground/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-emerald-500 cursor-text">Email Address</label>
                    </div>
                  </div>

                  <div className="relative flex-grow">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      aria-required="true"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="peer w-full h-full bg-transparent border-b border-foreground/20 py-3 text-foreground focus:outline-none focus:border-emerald-500 transition-colors placeholder-transparent resize-none"
                      placeholder="Message"
                    />
                    <label htmlFor="contact-message" className="absolute left-0 -top-3.5 text-xs text-foreground/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-emerald-500 cursor-text">How can I help you?</label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full md:w-auto self-end bg-foreground text-background hover:bg-emerald-500 hover:text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-3 pm-glass-hover disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={isSubmitting ? "Sending your message" : "Send your message"}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center gap-4"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-foreground/60 text-lg font-light max-w-sm">
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

