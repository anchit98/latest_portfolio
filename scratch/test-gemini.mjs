import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testGemini() {
  let apiKey = "";
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
  } catch (e) {
    console.error("Could not read .env.local file. Checking process.env...");
    apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
  }

  console.log("Checking API Key:", apiKey ? "Detected (starts with " + apiKey.substring(0, 5) + "...)" : "MISSING");

  if (!apiKey) {
    console.error("Error: No API key found.");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelsToTest = ["gemini-1.5-flash", "gemini-2.0-flash"];

  for (const modelName of modelsToTest) {
    console.log(`\n--- Testing Model: ${modelName} ---`);
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, are you there?");
      const response = await result.response;
      const text = response.text();
      console.log(`RESULT [${modelName}]:`, text);
      console.log(`STATUS: SUCCESS ✅`);
      process.exit(0);
    } catch (err) {
      console.error(`RESULT [${modelName}]: FAILED ❌`);
      console.error("ERROR TYPE:", err.name);
      console.error("ERROR MSG:", err.message);
    }
  }
  process.exit(1);
}

testGemini();
