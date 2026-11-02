"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, MessageCircle, X } from "lucide-react";
import Logo from "./Logo";

type Message = {
  role: "user" | "assistant";
  text: string;
  sources?: string[];
  links?: { label: string; href: string }[];
  suggestions?: string[];
};

const STARTERS = ["Who is Anchit?", "What does Anchit do at WPP Media?", "Tell me about JobAppOS", "How can I contact Anchit?"];
const GREETING: Message = {
  role: "assistant",
  text: "Hi! I answer questions about Anchit's work, projects and skills, using only what's in Anchit's profile. What would you like to know?",
  suggestions: STARTERS,
};

/** Portfolio assistant: questions go to /api/chat, which retrieves from Anchit's profile and answers only from it. */
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        res.ok
          ? { role: "assistant", text: data.text, sources: data.sources, links: data.links, suggestions: data.suggestions }
          : { role: "assistant", text: data.error ?? "Something went wrong. Please try again." },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "I couldn't reach the server. Please check your connection and try again." }]);
    } finally {
      setBusy(false);
    }
  };

  const last = messages.length - 1;

  return (
    <div className="fixed bottom-5 right-5 z-[110] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ask about Anchit"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[68px] right-0 flex h-[min(560px,calc(100svh-120px))] w-[min(380px,calc(100vw-40px))] origin-bottom-right flex-col overflow-hidden rounded-[22px] border border-mist/10 bg-graphite-2 text-mist shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-mist/10 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-mist text-ink">
                  <Logo className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium">Ask about Anchit</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist/45">Answers only from Anchit&apos;s profile</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full text-mist/70 transition-colors hover:bg-mist/10 hover:text-mist" aria-label="Close chat">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div ref={listRef} data-lenis-prevent className="no-scrollbar flex-1 space-y-4 overflow-y-auto overscroll-contain p-4" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex flex-col items-start"}>
                  <div
                    className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                      m.role === "user" ? "rounded-br-md bg-oak text-ink" : "rounded-bl-md bg-graphite text-mist/90"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sources && m.sources.length > 0 && (
                    <p className="mt-1.5 pl-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-mist/35">Source: {m.sources.join(", ")}</p>
                  )}
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-oak/40 px-2.5 py-1 text-[12px] text-oak transition-colors hover:bg-oak hover:text-ink"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  )}
                  {i === last && !busy && m.suggestions && m.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => ask(s)}
                          className="rounded-full border border-mist/15 px-3 py-1.5 text-left text-[12px] text-mist/75 transition-colors hover:border-mist/40 hover:text-mist"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {busy && (
                <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-graphite px-3.5 py-3" aria-label="Thinking">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-mist/50"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-mist/10 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={400}
                placeholder="Ask about roles, projects, skills…"
                aria-label="Your question"
                className="min-w-0 flex-1 rounded-full bg-graphite px-4 py-2.5 text-[13.5px] text-mist placeholder:text-mist/35 focus:outline-none focus-visible:ring-1 focus-visible:ring-oak"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-oak text-ink transition-opacity disabled:opacity-40"
                aria-label="Send"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Ask about Anchit"}
        className="group relative grid h-14 w-14 place-items-center rounded-full border border-mist/15 bg-graphite-2 text-mist shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)] transition-transform hover:scale-105"
      >
        <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-graphite-2 bg-oak" aria-hidden="true" />
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <MessageCircle className="h-5 w-5" aria-hidden="true" />}
      </button>
    </div>
  );
}
