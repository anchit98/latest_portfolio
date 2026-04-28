import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

async function exhaustiveTest() {
  let apiKey = "";
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
  } catch (e) {}

  if (!apiKey) {
    console.log("No API Key found");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // List of all currently active model name variations
  const models = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro",
    "gemini-1.0-pro"
  ];

  console.log("Starting Exhaustive Model Test...");

  for (const m of models) {
    try {
      console.log(`Testing: ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("hi");
      console.log(`✅ SUCCESS: ${m}`);
      process.exit(0);
    } catch (e) {
      console.log(`❌ FAILED: ${m} - ${e.message.split('\n')[0]}`);
    }
  }
  console.log("\nCONCLUSION: All models failed. Your API key or account is heavily restricted.");
}

exhaustiveTest();
