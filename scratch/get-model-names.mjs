import fs from "fs";
import path from "path";

async function listModels() {
  let apiKey = "";
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
  } catch (e) {}

  if (!apiKey) return;

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const modelNames = data.models.map(m => m.name);
    console.log("AVAILABLE_MODELS:", JSON.stringify(modelNames, null, 2));
  } catch (e) {
    console.error("LIST ERROR:", e.message);
  }
}

listModels();
