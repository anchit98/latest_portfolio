import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildKnowledge } from "@/lib/knowledge";
import { createAnswerer, type Answer } from "@/lib/rag";

// Retrieval always runs here. If GOOGLE_GENERATIVE_AI_API_KEY is set, Gemini rewrites the retrieved passages into a
// conversational answer; the rewrite is rejected if it introduces any number the passages don't contain.

const SYSTEM = `You answer questions about Anchit Boruah, a Product Manager, for visitors to Anchit's portfolio.
Use ONLY the passages provided. If they don't answer the question, say you don't have that information.
Never invent employers, dates, metrics, users or skills. Never describe Anchit as a software engineer.
Refer to Anchit by name, never with gendered pronouns. Keep the answer under 90 words, plain text, no markdown headings.
Do not use em dashes or en dashes. Keep figures exactly as written, including "~", "+" and "INR".`;

const MAX_LEN = 400;
const WINDOW_MS = 60_000;
const LIMIT = 20;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const numbers = (s: string) => s.match(/\d[\d,.]*/g)?.map((n) => n.replace(/,/g, "").replace(/\.$/, "")) ?? [];

async function rewrite(question: string, answer: Answer): Promise<string | null> {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key || !answer.grounded) return null;
  const passages = answer.contexts.map((c, i) => `[${i + 1}] ${c.title} (${c.source})\n${c.text}`).join("\n\n");
  try {
    const model = new GoogleGenerativeAI(key).getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      systemInstruction: SYSTEM,
      generationConfig: { temperature: 0.2, maxOutputTokens: 400 },
    });
    const result = await Promise.race([
      model.generateContent(`Passages:\n${passages}\n\nQuestion: ${question}`),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 8000)),
    ]);
    const text = result.response.text().trim().replace(/\s*[—–]\s*/g, ", ");
    if (!text) return null;
    const allowed = new Set(numbers(passages));
    return numbers(text).every((n) => allowed.has(n)) ? text : null;
  } catch (err) {
    console.warn("[chat] rewrite skipped:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many questions in a minute. Please try again shortly." }, { status: 429 });
  }

  let message = "";
  try {
    const body = await req.json();
    message = String(body?.message ?? "").slice(0, MAX_LEN).trim();
  } catch {}
  if (!message) return NextResponse.json({ error: "Ask a question." }, { status: 400 });

  // Built per request so calculated figures (years of experience) stay current.
  const answer = createAnswerer(buildKnowledge())(message);
  const llm = await rewrite(message, answer);

  return NextResponse.json({
    text: llm ?? answer.text,
    mode: llm ? "llm" : "retrieval",
    sources: answer.sources,
    links: answer.links,
    suggestions: answer.suggestions,
  });
}
