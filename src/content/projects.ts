// Project and case-study data, shared by the Work section and the chatbot knowledge base.

export type ProjectKind = "work" | "build" | "case";

export type ProjectType = {
  id: string;
  kind: ProjectKind;
  title: string;
  /** Short status/track label, e.g. "Shipped at WPP Media". */
  role: string;
  /** Who it was for and in what setting. */
  context: string;
  problem: string;
  myRole: string;
  description: string;
  /** The honest headline outcome: a measured result where one exists, otherwise what shipped. */
  metric: string;
  image?: string;
  /** Measured figures, shown as the cover when there is no screenshot. */
  highlights?: { value: string; label: string }[];
  fullDescription: string;
  features: string[];
  tools: string[];
  downloadUrl?: string;
  downloadText?: string;
  downloads?: { url: string; text: string }[];
};

// Facts for AB008 to AB010 come from content/anchit-boruah-portfolio-profile.md. No figures are added beyond the sources.
// Ordered as displayed (work → builds → case studies) so next/previous follows the page.
export const PROJECTS: ProjectType[] = [
  {
    id: "AB008",
    kind: "work",
    title: "Meta Campaign Activation",
    role: "Shipped at WPP Media",
    context: "WPP Media · India implementation team",
    problem: "Campaign setup on Meta was entered by hand, step by step. Repetitive entry caused costly errors.",
    myRole: "Led it: discovery, phased roadmap, prioritization, stakeholder management and delivery.",
    description: "Turned a repetitive, error-prone manual setup into a zero-touch campaign activation workflow.",
    metric: "35% FTE savings · 86% CSAT",
    highlights: [
      { value: "35%", label: "FTE savings" },
      { value: "86%", label: "CSAT" },
      { value: "₹1.5 Cr+", label: "Saved a year" },
    ],
    fullDescription:
      "The India implementation team activated Meta campaigns through repetitive manual entry, and the errors were expensive. Working through high ambiguity, I took it from discovery to a phased product roadmap and delivered a zero-touch campaign setup workflow. The pattern: understand why the manual workflow exists, redesign the process, automate the right parts, then measure the business outcome.",
    features: [
      "Replaced repetitive manual entry with zero-touch campaign setup.",
      "Delivered through a phased roadmap while the scope was still ambiguous.",
      "Measured on savings and on user satisfaction: 35% FTE savings and 86% CSAT.",
      "About ₹1.5 Cr+ in annual departmental savings.",
    ],
    tools: ["Product discovery", "Roadmapping", "Prioritization", "Stakeholder management", "Workflow design"],
  },
  {
    id: "AB009",
    kind: "work",
    title: "AI-Assisted Automation Intake",
    role: "Shipped at WPP Media",
    context: "WPP Media · organization-wide automation requests",
    problem: "Every automation request went through a slow, unstructured intake before delivery could start.",
    myRole: "Led the revamp of the intake pipeline and the AI-assisted workflow behind it.",
    description: "Rebuilt how automation requests enter the organization, with LLMs drafting the documents.",
    metric: "~70% faster intake → handoff",
    highlights: [
      { value: "~70%", label: "Faster intake → handoff" },
      { value: "100%", label: "Org-wide acceptance" },
    ],
    fullDescription:
      "Automation requests across the organization reached delivery through a manual intake process. I led the revamp of the request pipeline and introduced an AI-assisted workflow: LLM-generated BRDs and SOWs, automated discovery-call setup, automated status updates and a more structured intake. Intake-to-handoff time dropped by about 70%, and the new process was accepted across the organization.",
    features: [
      "LLM-generated BRDs and SOWs replaced hand-written first drafts.",
      "Discovery calls set up automatically.",
      "Requesters get automated status updates.",
      "A more structured intake, so requests arrive ready for discovery.",
    ],
    tools: ["LLM workflows", "Process design", "Stakeholder management", "Prioritization"],
  },
  {
    id: "AB010",
    kind: "build",
    title: "JobAppOS",
    role: "Independent build · working app",
    context: "Independent product, built outside my day job",
    problem: "Applying for jobs is repetitive: the same tailoring, cover letters, contact-hunting and emails for every role.",
    myRole: "Product architecture, workflow design, requirements, orchestration and validation, built with AI-assisted development.",
    description: "Job description in; tailored resume, cover letter and a ready-to-send referral email out.",
    metric: "~1 min end to end",
    highlights: [
      { value: "~1 min", label: "End to end, often under 40 s" },
      { value: "6", label: "Steps automated" },
    ],
    fullDescription:
      "JobAppOS automates the job-application workflow: Job Description → Tailored Resume → Customized Cover Letter → Find a Relevant Contact → Cold/Referral Email, ready to copy into any email client. It is a functioning application with sign-up, payments, one-time profile setup, master resume and cover letter, and concurrent pipeline processing. A CV Builder with real-time preview generates the master resume. Planned next, and not live yet: autonomous submission, an end-to-end job-search agent, and application tracking.",
    features: [
      "Sign-up, login and payments (Razorpay).",
      "Every email is drafted in the app, ready to copy and send from any email client.",
      "Concurrent pipeline processing: about a minute end to end, often under 40 seconds.",
      "CV Builder with industry selection and live preview.",
    ],
    tools: ["Vercel", "Supabase", "Razorpay", "OpenAI APIs", "Email"],
  },
  {
    id: "AB001",
    kind: "build",
    title: "Groww Review Analyzer Agent",
    role: "Independent build · live",
    context: "Independent project using Groww's public app-store reviews · not affiliated with Groww",
    problem: "How do product teams continuously turn thousands of unstructured reviews into decision-ready product signals, not just summaries?",
    myRole: "Product and build, end to end, with AI-assisted development.",
    description: "Built an AI-powered review intelligence and advisory system that analyzes large-scale App Store and Play Store feedback to identify user pain points and sentiment trends.",
    metric: "Live · weekly reviews → leadership report",
    image: "/projects/GrowwReviewAdvisory.webp",
    fullDescription: "Conceptualized and built an end-to-end AI-powered review intelligence and advisory system that ingests and analyzes App Store and Play Store reviews using LLM-based synthesis to identify recurring user pain points, sentiment trends, and actionable product recommendations. Designed a stateful rolling review corpus and automated weekly insight generation workflow integrated with Google Docs and Gmail MCP servers for report creation and stakeholder-ready email drafts with human-in-the-loop review.",
    features: [
      "Developed an AI-powered review intelligence system using LLM-based synthesis to identify user pain points, sentiment trends, and actionable product recommendations.",
      "Implemented automated App Store and Play Store review ingestion with rolling corpus management for continuous insight generation.",
      "Integrated Google Docs and Gmail MCP servers to automate stakeholder-ready report creation and email draft workflows.",
      "Designed scalable backend workflows and full-stack architecture using AI-assisted development tools for rapid deployment and iteration."
    ],
    tools: ["Cursor", "Google Stitch", "Groq", "Render", "Vercel", "MCP", "FastAPI"],
    downloadUrl: "https://groww-review-advisory.vercel.app/",
    downloadText: "View Live Product"
  },
  {
    id: "AB002",
    kind: "build",
    title: "Mutual Fund RAG Chatbot",
    role: "Independent build · live",
    context: "Independent project using public Groww fund pages · not affiliated with Groww",
    problem: "Mutual-fund information is fragmented, and a general-purpose LLM will answer fund questions without grounding.",
    myRole: "Product and build, end to end, with AI-assisted development.",
    description: "A factual Q&A chatbot that answers only from retrieved fund data, with citations.",
    metric: "Live · citation-backed answers",
    image: "/projects/GrowFundGyaan.webp",
    fullDescription: "Conceptualized and built an end-to-end AI-powered mutual fund Q&A chatbot leveraging Retrieval-Augmented Generation (RAG) architecture to provide factual, context-grounded responses using ingested Groww mutual fund data. Designed and automated the complete data pipeline including web scraping, parsing, chunking, embedding generation, and vector database storage, enabling efficient semantic retrieval and low-latency answer generation through LLM integration. Architected the system to minimize hallucinations by restricting responses to retrieved factual context, creating a scalable and reliable investment information assistant.",
    features: [
      "Developed a RAG-based mutual fund Q&A chatbot delivering factual, context-grounded responses using Groww fund data.",
      "Implemented automated data ingestion, parsing, chunking, embedding generation, and vector database retrieval pipelines.",
      "Integrated LLM-based answer generation with semantic search to reduce hallucinations and improve response reliability.",
      "Lesson: the LLM is one component. Data quality, retrieval, grounding, latency, cost and trust matter as much."
    ],
    tools: ["Cursor", "ChromaDB", "Google Stitch", "Supabase", "Groq", "Render", "Vercel", "bge-small-en", "FastAPI"],
    downloadUrl: "https://growwfundgenai.vercel.app/",
    downloadText: "View Live Product"
  },
  {
    id: "AB003",
    kind: "build",
    title: "AI Restaurant Recommender",
    role: "Independent build · live MVP",
    context: "Independent project · scoped to Bengaluru · not affiliated with Zomato",
    problem: "Choosing where to eat is a small decision that causes real decision fatigue.",
    myRole: "Product and build, end to end, with AI-assisted development.",
    description: "Built an AI-powered tool delivering personalized restaurant recommendations to reduce decision fatigue, currently focused on Bangalore for higher data accuracy.",
    metric: "Live MVP · Bengaluru only",
    image: "/projects/Zomato.RecAi.webp",
    fullDescription: "Conceptualized and built an end-to-end AI-driven recommendation system leveraging LLM-based reasoning to deliver context-aware restaurant suggestions based on user preferences. Scoped to Bangalore as an MVP to ensure high-quality, curated data and more accurate outputs. Designed the system architecture, integrated AI models, and deployed a scalable full-stack application using AI-assisted development tools, enabling rapid iteration from idea to production.",
    features: [
      "Developed personalized restaurant recommendations using LLM-based reasoning for context-aware suggestions.",
      "Implemented an AI-powered full-stack application using AI-assisted development tools.",
      "Trade-off: scoped to Bengaluru as the MVP, choosing data quality over coverage.",
      "Designed system architecture with integrated database and backend/frontend deployment pipelines."
    ],
    tools: ["Cursor", "Google Antigravity", "Google Stitch", "Supabase", "Groq", "Render", "Vercel", "FastAPI"],
    downloadUrl: "https://zomato-recai-frontend.vercel.app/",
    downloadText: "View Live Product"
  },
  {
    id: "AB004",
    kind: "case",
    title: "Swish: 10-Minute Promise vs Reality",
    role: "Concept case study · FoodTech",
    context: "Concept case study on public information · not affiliated with Swish",
    problem: "Swish promises 10-minute delivery, but kitchen readiness, delivery assignment and support kept breaking the promise.",
    myRole: "Mapped the SLA failure points and wrote the end-to-end optimization plan.",
    description: "Mapped where Swish's 10-minute promise breaks across kitchen, dispatch and support, and planned the fixes.",
    metric: "Deliverable: SLA optimization plan",
    image: "/projects/swish.webp",
    fullDescription: "Swish’s 10-minute delivery promise, while compelling, showed inconsistency due to breakdowns in kitchen readiness, delivery assignment, and customer support. This project focused on identifying SLA failure points and solving for the gap between promise and execution for its core 20 to 35 urban user segment. By analyzing user feedback, operational constraints, and delivery lifecycle data, I mapped business goals (improving reliability, customer trust, and retention) to targeted product interventions across dispatch logic, dynamic SLA setting, and service recovery.",
    features: [
      "Identified SLA failure points in kitchen readiness, dispatch, and customer support.",
      "Analyzed user feedback, operational constraints, and delivery lifecycle data to identify root causes.",
      "Mapped business goals: improving reliability, customer trust, and retention.",
      "Authored a comprehensive end-to-end documents and project execution plan."
    ],
    tools: ["Product Thinking", "Problem Decomposition", "Prioritization", "RICE Framework", "Estimation", "Google Stitch"],
    downloadUrl: "https://drive.google.com/drive/folders/1eF_GObhQnozQfDENCF5SmTSZhJpX3CSN?usp=sharing",
    downloadText: "View Optimization Plan"
  },
  {
    id: "AB005",
    kind: "case",
    title: "Increasing ChatGPT Voice Adoption",
    role: "Concept case study · PRD",
    context: "Concept case study on public information · not affiliated with OpenAI",
    problem: "ChatGPT's voice feature was strong but underused: people didn't discover it, and nothing guided them into it.",
    myRole: "Analyzed the adoption funnel and wrote the PRD.",
    description: "A PRD to lift adoption of ChatGPT's voice mode by fixing discoverability and onboarding gaps.",
    metric: "Deliverable: PRD + wireframes",
    image: "/projects/GPT Wireframes.webp",
    fullDescription: "ChatGPT's conversational feature, despite strong technical capabilities, remained significantly underutilized due to poor discoverability and lack of guided onboarding. This project focused on identifying adoption funnel drop-offs and solving for awareness-to-usage gaps among high-value user segments such as working professionals. By analyzing user behavior, competitive benchmarks, and adoption metrics, I mapped business goals (improving feature adoption, engagement, and retention) to targeted product interventions.",
    features: [
      "Identified awareness-to-usage gaps in the voice feature adoption funnel.",
      "Analyzed user behavior, competitive benchmarks, and adoption metrics to identify root causes.",
      "Mapped business goals (improving feature adoption, engagement, and retention) to targeted product interventions.",
      "Authored a comprehensive PRD with actionable recommendations for product and growth teams."
    ],
    tools: ["Whimsical", "ChatGPT", "Prioritization", "RICE Framework"],
    downloadUrl: "/files/Increasing ChatGPT's Voice Tech Usage_PRD.pdf",
    downloadText: "Download Full PRD"
  },
  {
    id: "AB006",
    kind: "case",
    title: "Reducing Swiggy's Support Load",
    role: "Concept case study · guesstimate",
    context: "Concept case study on public information · not affiliated with Swiggy",
    problem: "Rising support tickets were hurting customer experience and pushing up operational cost.",
    myRole: "Modeled support demand and found the product levers that matter most.",
    description: "Modeled Swiggy's support demand to find which product levers cut tickets and agent cost the most.",
    metric: "Deliverable: KPI tree + case study",
    image: "/projects/Swiggy Case Study_KPI Tree.webp",
    fullDescription: "Swiggy's Customer Support Optimization initiative was conceived to address the rising volume of support tickets impacting customer experience and operational costs. By leveraging data-driven guesstimate and root cause analysis, I modeled support demand at scale and identified key drivers of customer complaints. This enabled me to map core business outcomes (reducing support tickets, minimizing agent dependency, and driving cost savings) to targeted product outcomes such as lowering issue rates and improving average resolution time.",
    features: [
      "Identified that even a small % of order issues at scale drives massive support ticket volume.",
      "Discovered that reducing issue rate has a significantly higher impact than optimizing support capacity.",
      "Established average handling time as a critical lever influencing agent headcount requirements.",
      "Quantified that targeted product interventions can reduce support dependency and unlock substantial cost savings."
    ],
    tools: ["Whimsical", "Guesstimate", "Product Sense", "Product Thinking"],
    downloadUrl: "/files/Case Study_Swiggy.pdf",
    downloadText: "Download Full Case Study"
  },
  {
    id: "AB007",
    kind: "case",
    title: "Finding Peppo's High-Value Users",
    role: "Concept case study · growth",
    context: "Case study on a provided problem statement and dataset",
    problem: "Retention was falling and acquisition costs rising, despite strong top-of-funnel numbers.",
    myRole: "Defined the segmentation, designed the research plan and wrote the growth strategy.",
    description: "A segmentation model and research plan to focus Peppo's growth on high-intent users.",
    metric: "Deliverable: segmentation + growth plan",
    image: "/projects/Peppo User Segmentation.webp",
    fullDescription: "Peppo's growth strategy was redefined to address declining retention and rising customer acquisition costs despite strong top-of-funnel performance. By leveraging behavioral, demographic, and acquisition data, I developed a structured segmentation model to identify high-value user cohorts and uncover key drivers of retention and churn. This enabled mapping critical business goals (improving retention, reducing CAC inefficiencies, and increasing LTV) to actionable product and growth levers such as personalization, pricing experimentation, and content expansion. My role involved defining segmentation axes, designing a mixed-method user research plan (quantitative and qualitative), and translating insights into a focused growth strategy. The approach emphasized prioritizing high-intent user segments, refining acquisition channels, and aligning product experience with user motivations to drive sustainable growth.",
    features: [
      "Identified high-intent user segments through behavioral and demographic analysis.",
      "Designed a mixed-method research framework combining quantitative and qualitative methods.",
      "Defined actionable product and growth levers to improve retention and reduce CAC.",
      "Prioritized high-intent segments and refined acquisition channels to drive sustainable growth."
    ],
    tools: ["Data Cleaning", "User Segmentation", "Analytics", "Strategic Thinking"],
    downloads: [
      { url: "/files/Peppo_Problem Statement.docx", text: "Download Problem Statement" },
      { url: "/files/Cracking Growth at Peppo_Working Document.xlsx", text: "Download Solution Document" }
    ]
  },
];
