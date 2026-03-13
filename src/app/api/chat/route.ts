import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // This is a simple mock logic. In a real scenario, you'd integrate OpenAI or Gemini here.
    // Given the context of a portfolio, we can provide some tailored responses.
    
    const msg = message.toLowerCase();
    let reply = "";

    if (msg.includes("experience") || msg.includes("work") || msg.includes("job")) {
      reply = "Anchit has experience as a Product Manager, working on products that scale and bridge the gap between discovery and delivery. Check out the Career section for more details!";
    } else if (msg.includes("skills") || msg.includes("tech") || msg.includes("build")) {
      reply = "Anchit specializes in product strategy, discovery, and execution. He's proficient with tools like Next.js, Framer Motion, and various PM frameworks. See his Tech Stack section!";
    } else if (msg.includes("contact") || msg.includes("email") || msg.includes("reach out")) {
      reply = "You can reach Anchit via the contact form at the bottom, or directly at jobsforanchit.boruah@gmail.com. He's also active on LinkedIn!";
    } else if (msg.includes("hello") || msg.includes("hi")) {
      reply = "Hello! How can I help you learn more about Anchit's portfolio today?";
    } else {
      reply = "That's an interesting question! While I'm just a simple assistant, I can tell you that Anchit is passionate about building products that solve real problems. Feel free to ask about his experience or projects!";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
