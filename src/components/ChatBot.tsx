"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Importing dynamic data from the site itself to ensure "Auto-Sync"
import { PROJECTS } from "./Projects";
import { CAREER_DATA } from "./Career";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// --- ENHANCED PRODUCT PERSONA & KNOWLEDGE ---
const PERSONA_SUMMARY = `
Anchit Boruah is a Senior Business Analyst working at the intersection of business, technology, and execution. 
He's an aspiring Product Manager and current PM Fellow at NextLeap, expert in translating ambiguous problems into scalable solutions.
His core focus: problem discovery, stakeholder alignment, prioritization, and outcome-driven delivery.
`;

const FALLBACKS = [
  "That's a strategic query! While I don't have that specific data point local to my neural engine, I know Anchit handles ambiguity by defining success metrics and iterating. Ask about his work at WPP or Annalect!",
  "I'm indexed on Anchit's professional saga. If you're asking about something outside his PM/BA scope, I might need a roadmap refresh. Want to hear about his $5.8M automation savings instead?",
  "Strategic pivot! Even as a digital twin, I focus on ROI-driven outcomes. Ask me about his 'Product Thinking' or his 'NextLeap' journey!",
  "I don't have a PRD for that particular question yet. However, I can walk you through his experience in scaling platform users or reducing support load. Which one interests you?"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Anchit's digital twin—his professional consciousness. I'm now synced with his latest projects and LinkedIn data. Ask me about his PM fellowship, his work at WPP, or his latest case studies!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);  // --- DYNAMIC RESPONSE ENGINE ---
  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();

    // CALCULATIVE UTILITY: Experience
    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-indexed
    const expYears = (currentYear - startYear) + (currentMonth / 12);
    const roundedExp = expYears.toFixed(1);

    // CONCISE MODE DETECTION
    const isShortQuery = q.split(" ").length <= 4 && !q.includes("describe") && !q.includes("tell me more");

    // 0. Calculative Intelligence (How many years?)
    if (q.match(/\b(how many|total|number of)\b/i) && q.match(/\b(years|experience|exp)\b/i)) {
      return `Anchit has approximately ${roundedExp} years of professional experience, starting from his role at Servetel in Jan 2020.`;
    }

    // 1. General Experience & Background (High Priority)
    if (q.match(/\b(experience|background|career|history|resume|past work|journey|resume)\b/i)) {
      if (isShortQuery) return `Currently Sr. BA at WPP, previously at Annalect and Servetel. ${roundedExp} years total ROI-driven experience.`;

      const summary = CAREER_DATA.map(c => `${c.role} at ${c.company}`).join(", then ");
      return `Anchit has a high-impact trajectory: ${summary}. He's currently a Sr. Business Analyst at WPP (Choreograph) scaling automation platforms. His journey is defined by data-driven execution and product thinking. Want to dive into a specific role or its ROI?`;
    }

    // 2. Specific Companies
    if (q.includes("wpp") || q.includes("choreograph") || q.includes("current") || q.includes("now") || q.includes("senior business analyst")) {
      if (isShortQuery) return `Sr. Business Analyst at WPP (Choreograph) since April 2024. Leads a team of 15+ and scales automation.`;
      return `Currently at WPP Media (Choreograph), Anchit is a Senior Business Analyst scaling automation platforms. He's led discovery for 200+ requests, reduced handoff time by 50%, and improved utilization by 30% using Wrike. He's currently focused on strategic transformation initiatives.`;
    }

    if (q.includes("annalect") || q.includes("savings") || q.includes("5.8") || q.includes("million") || q.includes("qa analyst")) {
      if (isShortQuery) return `BA at Annalect (2022-2024). Saved $5.8M and 176k work hours through automation.`;
      return `At Annalect, Anchit conceptualized and managed automation projects that saved $5.8M and reclaimed 176,343 work hours. He also led a major migration to Jira and mentored 5+ new team members. Pure product thinking in action.`;
    }

    if (q.includes("servetel") || q.includes("sales analyst") || q.includes("early") || q.includes("first job")) {
      return `His foundation at Servetel as a Sales Analyst was all about efficiency. He automated manual processes (reducing 20 min tasks to < 2 mins) and forecasted 230% sales growth. These early metrics-driven roles shaped his ROI-first PM approach.`;
    }

    // 3. Projects & Case Studies
    const projectMatch = PROJECTS.find(p =>
      q.includes(p.title.toLowerCase()) ||
      q.includes(p.id.toLowerCase()) ||
      p.tools.some(t => q.includes(t.toLowerCase()))
    );

    if (projectMatch || q.match(/\b(project|projects|case study|case studies|case|cases|portfolio)\b/i)) {
      const matchedProject = projectMatch || PROJECTS[0];
      if (isShortQuery) return `Check out "${matchedProject.title}"—it boosted ${matchedProject.metric}. Full details in the Projects section.`;
      return `Anchit's work on "${matchedProject.title}" as a ${matchedProject.role} is a prime example of his PM mindset. He focused on ${matchedProject.metric}. Specifically, he ${matchedProject.features[0].toLowerCase()} and used tools like ${matchedProject.tools.join(", ")}. It's all about measurable impact.`;
    }

    // 4. NextLeap / Education / Aspiring PM
    if (q.includes("nextleap") || q.includes("fellow") || q.includes("aspiring pm") || q.includes("education") || q.includes("college") || q.includes("degree")) {
      if (q.includes("degree") || q.includes("college")) return `He holds a BTech in Petroleum Engineering with Gas specialization from UPES (2016-2020).`;
      return `Anchit is a PM Fellow at NextLeap (March - June 2026), honing his skills in discovery, making trade-offs, and building platforms that scale. He's a BTech Petroleum Engineering grad from UPES who successfully pivoted into the high-octane world of Tech Product Management.`;
    }

    // 5. PM Expertise & Skills
    if (q.includes("pm") || q.includes("product management") || q.includes("skills") || q.includes("expertise") || q.includes("strategy") || q.includes("tools")) {
      if (isShortQuery) return `Expert in Jira, Wrike, PowerBI, Whimsical, and Product Discovery/Roadmapping.`;
      return `He operates at the intersection of business, tech, and execution. His PM expertise covers problem discovery, stakeholder alignment, and defining success metrics. He's an expert in Wrike, Jira, PowerBI, and using AI like ChatGPT to optimize decision-making.`;
    }

    // 6. Behavioral: Strengths
    if (q.match(/\b(strength|strengths|superpower|best at|excel|good at)\b/i)) {
      return `Anchit's true superpower is translating ambiguity into actionable roadmaps. He excels at problem discovery, stakeholder alignment, and data-driven prioritization. He doesn't just gather requirements; he ensures every feature ties back to measurable business outcomes, like the $5.8M savings at Annalect.`;
    }

    // 7. Behavioral: PM Potential
    if (q.match(/\b(good pm|become a pm|potential|product manager material|fit for pm)\b/i)) {
      return `Absolutely. While his title has been Business Analyst, his execution is pure Product Management. He owns problems end-to-end, balances trade-offs, and leads cross-functional teams. His NextLeap PM Fellowship further bolsters his core product thinking, making him highly ready for a PM role.`;
    }

    // 8. Behavioral: Weaknesses
    if (q.match(/\b(weakness|weaknesses|room for improvement|bad at|shortcoming)\b/i)) {
      return `Anchit is very detail-oriented, which means he sometimes wants to dive deep into execution rather than staying purely at the strategic level. However, he actively manages this by utilizing frameworks like RICE and enabling his 15-member team at WPP, balancing big-picture product thinking with tactical delivery.`;
    }

    // 9. Behavioral: Best Work
    if (q.match(/\b(best work|proudest|greatest achievement|top project)\b/i)) {
      return `One of his proudest achievements was at Annalect, where he conceptualized and managed automation projects that yielded $5.8M in savings and reclaimed over 176,000 work hours. It showcased his ability to scale platforms, map complex logic, and deliver massive ROI.`;
    }

    // 10. Behavioral: Documentation
    if (q.match(/\b(documentation|prd|write|documents|confluence|specs)\b/i)) {
      return `Documentation is one of his core weapons! He consistently authors detailed PRDs, test plans, and requirement traceability matrices. At WPP, he ensured a 90%+ alignment rate post-discovery through meticulous documentation. He effectively uses Jira, Wrike, and Whimsical to keep teams completely aligned.`;
    }

    // 11. Contact
    if (q.includes("contact") || q.includes("hire") || q.includes("reach") || q.includes("linkedin") || q.includes("email")) {
      return `Ready to collaborate? Find his LinkedIn link in the side bar, or scroll to the Contact section below.`;
    }

    // 12. Location
    if (q.match(/\b(location|where|city|live|based)\b/i)) {
      return `Anchit is currently based in Bengaluru, Karnataka, India.`;
    }

    // 13. General Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("yo") || q.includes("who are you")) {
      return `Greetings! I'm Anchit's Assistant. ${isShortQuery ? "How can I help you today?" : PERSONA_SUMMARY + " What part of his roadmap can I walk you through?"}`;
    }

    // 14. Intelligent Context Guard (Out of Scope Questions)
    if (q.match(/\b(weather|movie|food|politics|sports|joke|song|news|love|hate|personal|family|friends|hobbies|interests)\b/i)) {
      return `While I could talk about that, my primary directive is to walk you through Anchit's Product Management journey and his ROI-driven career. Shall we talk about his professional life instead?`;
    }

    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulated "thinking" delay
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] md:w-[350px] h-[500px] bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-foreground/10 bg-foreground/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Anchit's Assistant</h3>
                  <p className="text-[10px] text-foreground/50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Synced with his Professional life
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-foreground/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === "user"
                    ? "bg-foreground text-background rounded-tr-none shadow-lg"
                    : "bg-foreground/5 border border-foreground/10 rounded-tl-none"
                    }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-foreground/5 border border-foreground/10 p-3 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-foreground/50" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-foreground/10 bg-foreground/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full bg-background border border-foreground/10 rounded-xl py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-light"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-blue-500 hover:text-blue-600 disabled:opacity-30 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-center mt-2 text-foreground/30 uppercase tracking-widest font-medium">
                Live Data-Sync Model v3.0
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? "bg-foreground text-background shadow-none" : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20"
          }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
