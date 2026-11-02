// Retrieval for the portfolio assistant: BM25 over the knowledge base. Runs in the browser and on the server.

import { buildKnowledge, type Chunk } from "./knowledge";

const STOP = new Set(
  "a an and are as at be been but by can could did do does for from had has have how i in is it its me my of on or our tell that the their them this to was what when where which who whom why will with would you your about anchit anchits boruah please show give know he him his she her they them their".split(" ")
);

// Folds everyday phrasing onto words the knowledge base uses.
const SYNONYMS: Record<string, string> = {
  cv: "resume", salary: "compensation", bangalore: "bengaluru", college: "education", university: "education", degree: "education",
  studied: "education", study: "education", school: "education", job: "role", designation: "role", title: "role", position: "role",
  company: "employer", employer: "employer", currently: "current", now: "current", present: "current", today: "current",
  mail: "email", number: "phone", call: "phone", reach: "contact", whatsapp: "phone",
  stack: "tools", software: "tools", kpi: "metrics", kpis: "metrics", measure: "metrics", llm: "ai", llms: "ai", genai: "ai",
  build: "built", builds: "built", made: "built", projects: "project", products: "product", coding: "code", developer: "code",
  engineer: "code", programming: "code", yrs: "years", year: "years", experienced: "experience",
};

function stem(w: string) {
  if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.length > 4 && w.endsWith("ed")) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}

export function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+%₹\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
    .map((w) => stem(SYNONYMS[w] ?? w));
}

type Indexed = { chunk: Chunk; tf: Map<string, number>; len: number; titleTokens: string[] };

export function createIndex(chunks: Chunk[] = buildKnowledge()) {
  const docs: Indexed[] = chunks.filter((c) => !c.intentOnly).map((chunk) => {
    // The title counts twice: it is the strongest signal of what a chunk is about.
    const tokens = tokenize(`${chunk.title} ${chunk.title} ${chunk.text} ${chunk.tags ?? ""}`);
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { chunk, tf, len: tokens.length, titleTokens: [...new Set(tokenize(chunk.title))] };
  });
  const avg = docs.reduce((s, d) => s + d.len, 0) / docs.length;
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);

  return function search(query: string, k = 3) {
    const q = [...new Set(tokenize(query))];
    if (!q.length) return [];
    const k1 = 1.4;
    const b = 0.7;
    return docs
      .map((d) => {
        let score = 0;
        for (const t of q) {
          const f = d.tf.get(t);
          if (!f) continue;
          const n = df.get(t) ?? 0;
          const idf = Math.log(1 + (docs.length - n + 0.5) / (n + 0.5));
          score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avg)));
        }
        // Naming something outright ("Tell me about JobAppOS") should land on that thing, not a passage that mentions it.
        if (score > 0 && d.titleTokens.length && d.titleTokens.every((t) => q.includes(t))) score += 2.5;
        // Normalise by query length so short and long questions are judged on the same scale.
        return { chunk: d.chunk, score: score / Math.sqrt(q.length) };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  };
}

/** Below this, the best match is too weak to answer from. */
export const MIN_SCORE = 1.1;

// Questions whose wording carries no searchable terms, or where keywords mislead, go straight to a known chunk.
const INTENTS: { re: RegExp; id: string }[] = [
  { re: /^(who('s| is)\s+(anchit|he|this)|introduce|about (anchit|him)\b|tell me about (anchit|him)\s*\??$)/i, id: "summary" },
  { re: /why (should|would|hire)|\bhire\b|stand ?out|different from|unique|best fit/i, id: "positioning" },
  { re: /how (many|long)|years? of (experience|work)|experience in years/i, id: "experience-years" },
  { re: /(next|future|plan|roadmap|upcoming|coming).*jobapp ?os|jobapp ?os.*(next|future|plan|roadmap|upcoming)/i, id: "jobappos-next" },
  { re: /\b(ai|llm|genai|gen ai|artificial intelligence)\b.*(experience|background|work|done|skills?)|(experience|work|worked) (with|in|on) (ai|llm)/i, id: "ai-work" },
];

const SMALL_TALK: { re: RegExp; reply: string }[] = [
  { re: /^(hi|hello|hey|hiya|yo|namaste|good (morning|afternoon|evening))\b[\s!.?]*$/i, reply: "Hi! Ask me anything about Anchit's work, projects, skills or how to get in touch." },
  { re: /^(thanks|thank you|thx|cool|great|nice|ok(ay)?)\b[\s!.?]*$/i, reply: "Happy to help. Anything else you'd like to know about Anchit?" },
  { re: /are you (a )?(bot|ai|human|real|chatgpt)|who are you|what are you/i, reply: "I'm an assistant that answers questions about Anchit using only the facts on this portfolio and Anchit's profile. If something isn't covered there, I'll say so rather than guess." },
];

export const STARTERS = ["Who is Anchit?", "What does Anchit do at WPP Media?", "Tell me about JobAppOS", "How can I contact Anchit?"];

export type Answer = {
  text: string;
  grounded: boolean;
  sources: string[];
  links: { label: string; href: string }[];
  suggestions: string[];
  /** Passages the answer was drawn from, for the language-model rewrite. */
  contexts: Chunk[];
};

const NOT_FOUND =
  "I don't have that in Anchit's profile, so I won't guess. I can tell you about Anchit's roles, projects, skills, education, principles or contact details.";

export function createAnswerer(chunks: Chunk[] = buildKnowledge()) {
  const search = createIndex(chunks);
  const byId = new Map(chunks.map((c) => [c.id, c]));

  return function answer(query: string): Answer {
    const q = query.trim();
    const talk = SMALL_TALK.find((t) => t.re.test(q));
    if (talk) return { text: talk.reply, grounded: false, sources: [], links: [], suggestions: STARTERS, contexts: [] };

    const intent = INTENTS.find((i) => i.re.test(q));
    const ranked = search(q, 4);
    const top = intent ? byId.get(intent.id)! : ranked[0]?.score >= MIN_SCORE ? ranked[0].chunk : null;
    if (!top) return { text: NOT_FOUND, grounded: false, sources: [], links: [], suggestions: STARTERS.slice(1), contexts: [] };

    const rest = ranked.filter((r) => r.chunk.id !== top.id && r.score >= MIN_SCORE).map((r) => r.chunk);
    const contexts = [top, ...rest.slice(0, 2)];
    const suggestions = rest.map((c) => c.ask).filter((a): a is string => !!a).slice(0, 2);
    return {
      text: top.text,
      grounded: true,
      sources: [top.source],
      links: top.links ?? [],
      suggestions: suggestions.length ? suggestions : STARTERS.filter((s) => s !== top.ask && s !== query.trim()).slice(0, 2),
      contexts,
    };
  };
}
