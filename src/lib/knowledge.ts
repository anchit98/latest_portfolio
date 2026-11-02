// Knowledge base for the portfolio assistant. Every fact here comes from
// content/anchit-boruah-portfolio-profile.md or src/content/projects.ts. Do not add anything that isn't in those sources.

import { PROJECTS } from "@/content/projects";

export type Chunk = {
  id: string;
  title: string;
  /** Where the fact comes from, shown to the reader as the source. */
  source: string;
  text: string;
  /** Extra search terms that won't read well in the answer itself. */
  tags?: string;
  /** A natural follow-up question that this chunk answers, used for suggestion chips. */
  ask?: string;
  /** Reached only through an explicit intent, never by keyword search. */
  intentOnly?: boolean;
  links?: { label: string; href: string }[];
};

export const CONTACT = {
  email: "jobsforanchit.boruah@gmail.com",
  phone: "+91 99109 80793",
  linkedin: "https://linkedin.com/in/anchitboruah/",
  github: "https://github.com/anchit98/",
  resume: "https://drive.google.com/file/d/1bNt2ZAid8TBx8o7Vl5tIOGQKbAUJG1B6/view?usp=sharing",
};

/** Total and product-only experience, calculated from role dates (Jan 2020 and Apr 2022) to today. */
export function experience(now = new Date()) {
  const months = (y: number, m: number) => (now.getFullYear() - y) * 12 + (now.getMonth() - m);
  const fmt = (n: number) => `${Math.floor(n / 12)} years ${n % 12} months`;
  return { total: fmt(months(2020, 0)), product: fmt(months(2022, 3)) };
}

const KIND_PHRASE = { work: "shipped at work (WPP Media)", build: "an independent build, made outside the day job", case: "a concept case study" } as const;

const projectChunks: Chunk[] = PROJECTS.map((p) => {
  const link = p.downloadUrl ? [{ label: p.downloadText ?? "Open", href: p.downloadUrl }] : [];
  const extra = p.downloads?.map((d) => ({ label: d.text, href: d.url })) ?? [];
  return {
    id: `project-${p.id}`,
    title: p.title,
    source: p.kind === "case" ? "Case studies" : p.kind === "build" ? "Independent builds" : "Shipped at work",
    text: `${p.title} is ${KIND_PHRASE[p.kind]}. ${p.description}\nProblem: ${p.problem}\nAnchit's role: ${p.myRole}\nOutcome: ${p.metric}.\nBuilt or worked with: ${p.tools.join(", ")}.`,
    tags: `${p.context} ${p.role} project case study ${p.features.join(" ")} ${p.fullDescription}`,
    ask: `Tell me about ${p.title}`,
    links: [...link, ...extra],
  };
});

export function buildKnowledge(now = new Date()): Chunk[] {
  const exp = experience(now);
  return [
    {
      id: "summary",
      title: "Who Anchit is",
      source: "Profile summary",
      text: "Anchit Boruah is a Senior Product Manager & Analyst at WPP Media in Bengaluru, focused on internal automation products and AI-enabled workflows. Anchit leads the whole product flow end to end: discovery, execution, tracking and delivery. Anchit also gives product support to an early-stage startup building a merchant-first loyalty and discovery app. Outside work, Anchit builds AI products hands-on, including JobAppOS, a review-analysis agent and a RAG chatbot.",
      tags: "about intro introduce overview who is anchit summary background tell me",
      ask: "Who is Anchit?",
    },
    {
      id: "positioning",
      title: "What kind of PM",
      source: "Profile positioning",
      text: "Anchit is an AI-powered Product Manager who turns ambiguous problems into measurable products, automations and systems. The difference is approaching AI from a product angle: find the problem, validate it is worth solving, design the workflow, decide where AI actually helps, build or prototype, measure, then iterate on evidence. Anchit has worked at both ends of scale: enterprise automation with stakeholders, governance and ROI, and solo AI building with APIs, LLM workflows, RAG and agents.",
      tags: "why hire different differentiator unique strength strengths stand out value type kind of product manager pm",
      ask: "What makes Anchit different?",
    },
    {
      id: "end-to-end",
      title: "Owns the flow end to end",
      source: "Profile, WPP Media",
      text: "Anchit leads discovery, execution, tracking and delivery. At WPP Media that means treating product as a full system: Problem, Discovery, Prioritization, Product Definition, Build, Adoption, Measurement and Iteration, rather than stopping at PRDs and backlog management.",
      tags: "process lifecycle ownership own how does anchit work execution delivery tracking discovery workflow",
      ask: "How does Anchit run a product?",
    },
    {
      id: "experience-years",
      title: "Years of experience",
      intentOnly: true,
      source: "Calculated from role dates",
      text: `Anchit has about ${exp.total} of professional experience in total, starting January 2020, and about ${exp.product} in product roles since April 2022. These figures are calculated from the role dates.`,
      tags: "how many years experience total long work worked career length seniority",
      ask: "How many years of experience does Anchit have?",
    },
    {
      id: "wpp",
      title: "Current role: WPP Media",
      source: "Career, WPP Media (Mar 2024 to now)",
      text: "Since March 2024 Anchit has been Senior Product Manager & Analyst at WPP Media, Bengaluru, working on internal automation products and AI-enabled workflows across a large organization. Highlights: product discovery for 250+ automation initiatives (about 33,000+ hours and INR 10 Cr+ in estimated savings, 30% FTE savings, 88%+ stakeholder alignment), an AI-assisted intake pipeline that cut intake-to-handoff time by about 70%, and the Meta Campaign Activation automation.",
      tags: "current job now present today company employer role position designation title wpp media choreograph",
      ask: "What does Anchit do at WPP Media?",
    },
    {
      id: "wpp-discovery",
      title: "250+ automation initiatives",
      source: "Career, WPP Media",
      text: "At WPP Media Anchit supervised product discovery for 250+ internal automation initiatives, prioritized on Voice of Customer signals, user pain points, business impact, effort, data, stakeholder alignment, automation potential and expected ROI. Across them: about 30% FTE savings, 33,000+ hours saved, INR 10 Cr+ in estimated savings and 88%+ stakeholder alignment.",
      tags: "discovery prioritization prioritize framework voc impact roi savings hours initiatives",
      ask: "How does Anchit prioritize?",
    },
    {
      id: "wpp-metrics",
      title: "Post-launch tracking",
      source: "Career, WPP Media",
      text: "Anchit tracks post-launch success KPIs across delivered products: adoption, retention, churn, CSAT, active users, usage frequency, time spent, task completion and issues raised. Representative results: about 80% adoption, 90% retention, 8 to 10% churn and 88% CSAT.",
      tags: "metrics kpi kpis measure measurement success adoption retention churn csat analytics data tracking",
      ask: "Which metrics does Anchit track?",
    },
    {
      id: "wpp-team",
      title: "Team and delivery",
      source: "Career, WPP Media",
      text: "Anchit owns Agile sprint planning, capacity forecasting, delivery tracking and resource utilization for a team of 18, and improved utilization by about 30% using Wrike planning.",
      tags: "team size manage lead leadership agile scrum sprint capacity stakeholders people wrike",
      ask: "How big a team does Anchit work with?",
    },
    {
      id: "annalect",
      title: "Annalect India",
      source: "Career, Annalect India (Apr 2022 to Mar 2024)",
      text: "From April 2022 to March 2024 Anchit was Product Manager & Analyst at Annalect India, Bengaluru. Anchit managed product strategy and execution of multiple AI automations that saved about INR 50 Cr+ and 176,000+ hours, directed the move from manual tracking to Jira (about 40% better operational and delivery efficiency), introduced RTM and quality-first frameworks (about 70% fewer defects, bug-free releases for products worth about INR 7 Cr+), and suggested UI/UX changes across 3 major products worth about INR 4 Cr+.",
      tags: "annalect previous past before omnicom jira rtm quality defects ui ux automation",
      ask: "What did Anchit do at Annalect?",
    },
    {
      id: "servetel",
      title: "Servetel Communications",
      source: "Career, Servetel (Jan 2020 to Apr 2022)",
      text: "Anchit started as a Sales Analyst at Servetel Communications in Gurugram (January 2020 to April 2022), analysing user behavior, campaign performance, marketing channels, competitors and budgets. Anchit recommended reallocating about INR 2 Cr+ of marketing spend to higher-performing segments, and the market research and recommendations contributed to a 230% increase in sales within 6 months.",
      tags: "first job start career beginning sales analyst servetel gurugram marketing",
      ask: "How did Anchit's career start?",
    },
    {
      id: "journey",
      title: "Career journey",
      source: "Profile, career arc",
      text: "Anchit's arc: Petroleum Engineering, then sales analytics, business analysis, Product Management, enterprise automation, AI Product Management and now hands-on AI product building. Analytics taught Anchit to work with evidence, product management taught turning ambiguity into products, and AI now lets Anchit go from idea to working product to measurement instead of stopping at a PRD.",
      tags: "journey story path transition switch move into product management how did become pm arc",
      ask: "How did Anchit get into product?",
    },
    {
      id: "education",
      title: "Education",
      source: "Education",
      text: "Anchit holds a B.Tech in Petroleum Engineering from the University of Petroleum & Energy Studies, Dehradun (2016 to 2020), a non computer science degree. Before that: HSSLC, Science stream, at National Public School, Guwahati (2014 to 2016), scoring 94% (top 5% of the school cohort).",
      tags: "education degree college university school study studied qualification btech upes graduate",
      ask: "What did Anchit study?",
    },
    ...projectChunks,
    {
      id: "jobappos-next",
      title: "JobAppOS roadmap",
      source: "Independent builds",
      text: "JobAppOS plans (future direction, not live yet): fully autonomous application submission, an end-to-end AI job-search agent, application tracking and analytics, better job and contact discovery, and production hardening such as monitoring, automated testing and a security review.",
      tags: "future roadmap next plans planned upcoming coming soon",
    },
    {
      id: "startup",
      title: "Early-stage product support",
      source: "0 to 1 product work",
      text: "Anchit gives product support to an early-stage startup building a merchant-first loyalty and discovery app for offline businesses in Bengaluru. Merchants are small offline businesses; buyers are local customers rewarded for shopping nearby. Anchit ran 20 to 25 merchant interviews, which kept surfacing three needs (more footfall, better conversion, more revenue), shaped the buyer and merchant flows around them, designed the entire UI, supports end-to-end testing after every feature, and contributes to go-to-market planning. The company name is not shared before launch, and the product is pre-launch.",
      tags: "startup early stage 0 to 1 zero to one company loyalty merchants offline stores discovery app interviews ui design side",
      ask: "What 0-to-1 product work has Anchit done?",
    },
    {
      id: "beyond-leadership",
      title: "Leadership and community",
      source: "Beyond work",
      text: "Outside work: President of the Assamese Association at UPES, Dehradun (March 2017 to March 2019); Vice President of the Assamese Youth Association, Dehradun (April 2019 to January 2020); an AIESEC voluntary intern at the University of Nottingham Malaysia (June to July 2018), running career sessions for high-school students; and, since August 2026, volunteer social media planner and manager for the Assam Association Bangalore, where content Anchit created reached 70k+ views in 2 months across Instagram and Facebook.",
      tags: "co-curricular extracurricular volunteer volunteering leadership president vice president association community aiesec social media instagram facebook content views hobbies outside work",
      ask: "What does Anchit do outside work?",
    },
    {
      id: "beyond-engineering",
      title: "Internship and college projects",
      source: "Beyond work",
      text: "As a project intern at Oil India Limited, Guwahati (June to July 2019), Anchit worked out the maximum flow of the 653.4 km Numaligarh to Siliguri product pipeline after adding pump stations, and trained across five departments. College projects at UPES: a redesign of the Kakinada to Bharuch East-West gas pipeline in SIMSCI PIPEPHASE (2018 to 2019), and research on turning wastewater into bio-oil through hydrothermal liquefaction (2019 to 2020).",
      tags: "internship intern oil india pipeline college projects university research engineering petroleum",
      ask: "What internships has Anchit done?",
    },
    {
      id: "builds-overview",
      title: "Independent AI builds",
      source: "Independent builds",
      text: "Outside work Anchit has built JobAppOS (a working job-application automation app), a Groww Review Analyzer agent, a Mutual Fund RAG chatbot, an AI restaurant recommender, northstar.AI (a personal assistant that gathers and summarises tech, AI and PM news and helps with interview prep, outreach and LinkedIn ideas) and a Spotify-style music discovery project with a review-analysis dashboard. These are independent projects, not client work, and are not affiliated with the brands they use. Anchit's role is product architecture, workflow design, requirements, orchestration and validation, with AI-assisted development as the build method.",
      tags: "side projects personal builds build built made ai products vibe coding portfolio projects list all what has",
      ask: "What has Anchit built?",
    },
    {
      id: "ai-work",
      title: "AI work",
      source: "Career and independent builds",
      text: "Anchit's AI work spans the day job and independent builds. At WPP Media: an AI-assisted intake pipeline with LLM-generated BRDs and SOWs that cut intake-to-handoff time by about 70%. At Annalect India: product strategy and execution of multiple AI automations that saved about INR 50 Cr+ and 176,000+ hours. Independently: JobAppOS, a review-analysis agent with MCP integrations into Gmail and Google Docs, a RAG chatbot grounded in fund data, and an AI restaurant recommender.",
      tags: "ai llm genai artificial intelligence agents agentic rag mcp machine learning",
      ask: "What AI work has Anchit done?",
    },
    {
      id: "not-engineer",
      title: "Technical depth",
      source: "Profile, skills",
      text: "Anchit is a Product Manager, not a software engineer. Anchit understands AI architecture, APIs, retrieval, embeddings, vector databases, integrations, deployment and workflows well enough to reason about them and build with AI-assisted development, approaching them through a product-management lens.",
      tags: "technical code coding developer engineer programming can anchit code tech background",
      ask: "Can Anchit code?",
    },
    {
      id: "skills",
      title: "Skills",
      source: "Profile, skills",
      text: "Product: discovery, problem framing, strategy, roadmapping, prioritization, PRDs, stakeholder management, cross-functional leadership, Agile/Scrum, GTM, Voice of Customer.\nAnalytics: KPI ownership, funnel analysis, A/B testing, adoption, retention, churn, CSAT.\nAI and automation: LLM integration, RAG, agentic AI, AI workflows, MCP integrations, process automation, AI evaluation concepts.",
      tags: "skills abilities competencies expertise good at strengths capabilities",
      ask: "What are Anchit's skills?",
    },
    {
      id: "tools",
      title: "Tools",
      source: "Profile, tools",
      text: "Research: Claude, Gemini, ChatGPT. Ideation: Miro, Whimsical. Design: Figma, Google Stitch. Build: Cursor, Google Antigravity, LLM APIs. Models: OpenAI APIs, Groq, Google AI Studio. Integration: MCP, Gmail, Google Docs. Ship: Vercel, Render, GitHub Actions, Supabase, Razorpay, Hostinger. Deliver and measure: Jira, Wrike, Power BI, SQL.",
      tags: "tools stack software use uses tech stack jira figma cursor sql power bi",
      ask: "Which tools does Anchit use?",
    },
    {
      id: "principles",
      title: "Product principles",
      source: "Profile, philosophy",
      text: "Anchit's principles: 1) Problem before technology: Problem, Evidence, Experiment, Product. 2) Data over hierarchy: \"Here is what the data suggests.\" 3) Hours saved is not proof; adoption, retention and outcomes are. 4) AI speeds up the work, but people still decide what is worth solving and what not to build. 5) Use the least autonomous system that reliably solves the problem. Core belief: as execution becomes cheaper, product judgment becomes more valuable.",
      tags: "philosophy principles values approach believe belief beliefs core mindset how think decision making disagree conflict",
      ask: "What are Anchit's product principles?",
    },
    {
      id: "interests",
      title: "Interests",
      source: "Profile, interests",
      text: "Anchit is most interested in AI agents and LLM applications, RAG, AI evaluations, AI UX and reliability, human-in-the-loop systems, automation, product analytics, 0-to-1 product development and Voice of Customer.",
      tags: "interests interested passion like enjoy focus areas domain domains",
      ask: "What is Anchit interested in?",
    },
    {
      id: "contact",
      title: "Contact",
      source: "Contact",
      text: `Email: ${CONTACT.email}\nPhone: ${CONTACT.phone}\nLinkedIn: linkedin.com/in/anchitboruah\nGitHub: github.com/anchit98\nAnchit is based in Bengaluru, India.`,
      tags: "contact reach email mail phone number call whatsapp linkedin github hire connect location based where live city bengaluru bangalore",
      ask: "How can I contact Anchit?",
      links: [
        { label: "Email", href: `mailto:${CONTACT.email}` },
        { label: "Call", href: "tel:+919910980793" },
        { label: "LinkedIn", href: CONTACT.linkedin },
      ],
    },
    {
      id: "resume",
      title: "Resume",
      source: "Contact",
      text: "Anchit's resume is available as a PDF on Google Drive.",
      tags: "resume cv download pdf",
      ask: "Can I see Anchit's resume?",
      links: [{ label: "Open resume", href: CONTACT.resume }],
    },
  ];
}
