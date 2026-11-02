"use client";

import { ArrowUpRight, ArrowUp, Check, Copy, Github, Instagram, Linkedin, Phone, Send } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { FormEvent, useRef, useState } from "react";
import RevealText from "./RevealText";
import { StoryMap } from "./story/Chapter";

const EMAIL = "jobsforanchit.boruah@gmail.com";
const PHONE = { display: "+91 99109 80793", href: "tel:+919910980793" };
const SOCIALS = [
  { label: "LinkedIn", handle: "@anchitboruah", href: "https://linkedin.com/in/anchitboruah/", Icon: Linkedin },
  { label: "GitHub", handle: "@anchit98", href: "https://github.com/anchit98/", Icon: Github },
  { label: "Instagram", handle: "@anchitboruah", href: "https://instagram.com/anchitboruah/", Icon: Instagram },
];

const fieldClass =
  "peer w-full border-b border-ink/20 bg-transparent pb-3 pt-6 text-lg max-sm:text-center text-ink placeholder-transparent transition-colors focus:border-ink focus:outline-none";
const labelClass =
  "pointer-events-none absolute left-0 top-0 max-sm:right-0 max-sm:text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/50 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:font-sans peer-placeholder-shown:text-lg peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:font-mono peer-focus:text-[10.5px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-ink";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduce = usePrefersReducedMotion();

  // The section opens like a window: the daylight panel widens from an inset frame to full bleed.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 15%"] });
  const inset = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]: number[]) => `inset(0% ${i}% 0% ${i}% round ${r}px ${r}px 0 0)`);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      const response = await fetch("https://formspree.io/f/xreykdwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section ref={ref} id="contact" data-chapter="10" data-chapter-title="Next chapter" className="relative z-20 bg-[linear-gradient(to_bottom,var(--color-graphite)_50%,var(--color-daylight)_50%)]">
      <motion.div style={reduce ? undefined : { clipPath }} className="bg-daylight text-ink">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-28 max-sm:text-center sm:px-8 lg:px-12 lg:pt-40 xl:px-20">
          <p className="flex flex-wrap items-center gap-x-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 max-sm:justify-center">
            <span className="text-oak-deep">Chapter 10</span>
            <span>Next chapter</span>
          </p>
          <RevealText
            as="h2"
            segments={["Let's build", { text: "together.", className: "font-serif italic font-normal tracking-[-0.01em] text-oak-deep" }]}
            className="mt-6 text-[clamp(3.2rem,10vw,11rem)] font-medium leading-[0.88] tracking-[-0.055em]"
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/60 max-sm:mx-auto">
            Open to new projects, ideas and opportunities. Fast-track to my inbox, or just call.
          </p>
          <div className="lg:max-w-md">
            <StoryMap index={10} tone="light" />
          </div>

          <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-2 lg:gap-24">
            {/* Direct lines */}
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/50">Direct Email</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 max-sm:justify-center">
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Send an email to Anchit Boruah"
                  className="group relative text-[clamp(1.15rem,2.4vw,2rem)] font-medium tracking-[-0.02em]"
                >
                  {EMAIL}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:border-ink hover:text-ink"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <p className="mt-10 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/50">Direct line</p>
              <a
                href={PHONE.href}
                aria-label={`Call Anchit Boruah on ${PHONE.display}`}
                className="group relative mt-4 inline-flex items-center gap-3 text-[clamp(1.15rem,2.4vw,2rem)] font-medium tracking-[-0.02em]"
              >
                <Phone className="h-5 w-5 text-oak-deep" aria-hidden="true" />
                {PHONE.display}
                <span className="absolute -bottom-1 left-8 right-0 h-px origin-right scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
              </a>

              <ul className="mt-14 border-t border-ink/15">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit Anchit Boruah's ${s.label} profile`}
                      className="group flex items-center justify-between border-b border-ink/15 py-5 max-sm:justify-center max-sm:gap-4"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-mist sm:mr-5">
                        <s.Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="flex flex-1 items-baseline gap-4 max-sm:flex-none max-sm:flex-col max-sm:items-center max-sm:gap-1">
                        <span className="text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-3xl">
                          {s.label}
                        </span>
                        <span className="font-mono text-xs text-ink/45">{s.handle}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-ink/50 transition-all duration-500 group-hover:rotate-45 group-hover:text-ink" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="min-h-[420px]">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col gap-8"
                    onSubmit={handleSubmit}
                    aria-label="Contact form"
                  >
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div className="relative">
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          aria-required="true"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={fieldClass}
                          placeholder="Name"
                        />
                        <label htmlFor="contact-name" className={labelClass}>Name</label>
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
                          className={fieldClass}
                          placeholder="Email Address"
                        />
                        <label htmlFor="contact-email" className={labelClass}>Email Address</label>
                      </div>
                    </div>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        aria-required="true"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${fieldClass} resize-none`}
                        placeholder="Message"
                      />
                      <label htmlFor="contact-message" className={labelClass}>How can I help you?</label>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6 max-sm:justify-center">
                      <p role="alert" className="text-sm text-[#a33a2a]">
                        {error && "Oops! There was a problem submitting your form. Please try again."}
                      </p>
                      {/* Raised key: a solid base edge below the face, which sinks onto it when pressed. */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex items-center gap-3 rounded-xl bg-ink px-7 py-4 text-[15px] font-medium text-mist shadow-[0_6px_0_0_#000,0_14px_24px_-8px_rgba(25,24,27,0.55)] transition-[transform,box-shadow,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[#26252a] hover:shadow-[0_8px_0_0_#000,0_18px_28px_-8px_rgba(25,24,27,0.55)] active:translate-y-[6px] active:shadow-[0_0_0_0_#000,0_4px_10px_-4px_rgba(25,24,27,0.5)] disabled:pointer-events-none disabled:opacity-60 max-sm:w-full max-sm:justify-center"
                        aria-label={isSubmitting ? "Sending your message" : "Send your message"}
                      >
                        {isSubmitting ? "Sending..." : "Send message"}
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="thank-you"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex h-full flex-col justify-center max-sm:items-center"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-mist">
                      <Check className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-8 text-5xl font-medium tracking-[-0.04em]">Message Sent!</h3>
                    <p className="mt-4 max-w-sm text-lg text-ink/60">Thanks for reaching out! I&apos;ll get back to you soon.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 w-fit font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60 underline-offset-4 hover:text-ink hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <footer className="mt-28 border-t border-ink/15 pt-8 lg:mt-40">
            <div className="flex flex-col gap-6 text-sm text-ink/55 max-sm:items-center sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p>© 2026 Anchit Boruah. All Rights Reserved.</p>
                <p className="mt-1">Built with Next.js &amp; Framer Motion in Claude Code.</p>
              </div>
              <a href="#top" className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:text-ink">
                Back to top
                <ArrowUp className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true" />
              </a>
            </div>
            <p
              aria-hidden="true"
              className="mt-10 select-none whitespace-nowrap text-center text-[12.6vw] font-semibold leading-[0.8] tracking-[-0.065em] text-ink/[0.08] 2xl:text-[180px]"
            >
              Anchit Boruah
            </p>
          </footer>
        </div>
      </motion.div>
    </section>
  );
}
