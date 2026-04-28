import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

async function listModels() {
  let apiKey = "";
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
  } catch (e) {
    apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
  }

  if (!apiKey) return;

  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    // There is no explicit listModels in the standard SDK easily accessible this way, 
    // but we can try a very basic model that is always there.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("test");
    console.log("Success");
  } catch (err) {
    console.log("FULL ERROR JSON:", JSON.stringify(err, null, 2));
  }
}
listModels();
