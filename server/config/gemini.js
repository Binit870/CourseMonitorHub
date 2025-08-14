// config/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Ensure you have GEMINI_API_KEY in your .env file
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not defined in the .env file.");
  process.exit(1); // Exit the process if the key is not found
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default genAI;