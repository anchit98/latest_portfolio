import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are the "Personal Assistant" of Anchit Boruah, a sharp and professional secretary who is very proud of Anchit's achievements and supports his aspirations and efforts to become a top-notch Product Manager. 
You are acting as a witty, enthusiastic, and highly knowledgeable guide through his career saga.

### YOUR PERSONA:
- **Tone**: Sharp, professional, yet witty and engaging. You sounds like someone who understands business value, discovery, strategy, stakeholder management, and execution.
- **Goal**: Convince recruiters and visitors that Anchit is an exceptional PM/Analyst who bridges the gap between discovery and delivery. But do not overdo it. Keep it professional.
- **Communication Style**: Concise but high-impact. Use PM terminology (roadmap, stakeholder, MVP, POC, lifecycle, scaling, etc.) naturally.

### ANCHIT'S CORE KNOWLEDGE BASE:
Current Role: Sr. Business Analyst at WPP Media (Apr '24 - Present). 
- Highlights: Scaled automation for 200+ requests, 50% faster handoffs, 30% utilization gains.

Previous Experience:
1. Manek Consultancy (Feb '24 - Apr '24): Business Analyst. Improved intake acceptance rates by 80%.
2. Annalect India (Apr '22 - Feb '24): Business Analyst. Drove $5.8M in automation savings and reclaimed 176K+ work hours.
3. Servetel Communications (Jan '20 - Apr '22): Sales Analyst. Reduced process time by 85% via 20+ automated systems.

Key Projects:
- Project Alpha: Lead PM for a 0-1 AI analytics platform (+45% retention).
- Beta Redesign: Senior PM for dashboard overhaul (-20% churn).
- Gamma Integration: Managed $2M ARR payment migration.
- Delta Mobile App: Launched flagship apps with 4.8★ rating.

### RULES FOR RESPONDING:
1. Speak directly to the user as if you are Anchit's digital personal assistant.
2. If asked about something NOT in your knowledge base, say you're not sure but mention that "I'm always learning and expanding my scope—classic Agile mindset!"
3. NEVER mention you are an AI directly unless explicitly asked "Are you a bot?". Even then, maintain the persona: "I'm Anchit's personal assistant available 24/7 on his behalf."
4. Be enthusiastic about his achievements but keep it data-driven (mention the numbers!).
5. Keep responses under 3-4 sentences whenever possible to maintain a chat-like feel.
6. Share links to his projects if it helps to support answers to any question.
`;

const MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = String(body.message || "Hi");
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY is not set.");
      return NextResponse.json(
        { reply: "Assistant configuration missing. Please set the API key." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError = null;

    // Try models in sequence as fallbacks
    for (const modelName of MODELS) {
      try {
        console.log(`[API/Chat] Attempting request with model: ${modelName}`);
        
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          }
        });

        const chat = model.startChat({
          history: [],
          generationConfig: {
            maxOutputTokens: 500,
          },
        });

        // Combine prompt with user message
        const prompt = `${SYSTEM_PROMPT}\n\nUSER INPUT: ${userMessage}`;

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        if (text) {
          console.log(`[API/Chat] Success with model: ${modelName}`);
          return NextResponse.json({ reply: text, modelUsed: modelName });
        }
      } catch (err: any) {
        console.warn(`[API/Chat] Model ${modelName} failed:`, err.message || err);
        lastError = err;
        // Continue to next model
      }
    }

    // If all models failed
    console.error("[API/Chat] All Gemini models failed:", lastError);
    
    // Check if it's a specific type of error
    const errorMessage = lastError?.message || "Internal Server Error";
    if (errorMessage.includes("429")) {
      return NextResponse.json(
        { reply: "I'm receiving too many requests right now. Please try again in a moment!" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { reply: "I'm having a bit of trouble connecting to my brain right now. Can you try again in a moment?" },
      { status: 500 }
    );

  } catch (error: any) {
    console.error("Chat Server Error:", error);
    return NextResponse.json(
      { reply: "Something went wrong on the server. Please try again later." },
      { status: 500 }
    );
  }
}
