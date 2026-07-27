import dotenv from "dotenv";
import { GoogleGenAI } from '@google/genai';
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI(GEMINI_API_KEY);

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Summarize the movie Inception (2010) in 100 words.',
  });
  console.log(response.text);
}

main();
