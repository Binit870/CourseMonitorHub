// routes/interviewRoutes.js

import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const router = express.Router();

// --- Gemini AI Setup ---
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the .env file.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- API Endpoint to Generate a Question and Answer ---
router.post('/generate', async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required.' });
    }

    try {
        console.log(`✨ Generating 10 Q&A pairs for topic: ${topic}`);

        // This prompt correctly asks for a JSON array of objects.
        const prompt = `
            Generate an array of at least 10 technical interview questions and detailed answers for the topic "${topic}".
            The questions should cover a range of difficulties.
            
            IMPORTANT: Respond with ONLY a valid JSON array of objects. Each object in the array must have two keys: "question" and "answer".
            Do not include any other text, explanations, or markdown formatting like \`\`\`json.
            
            Example format:
            [
              {
                "question": "What is the first question?",
                "answer": "This is the detailed answer to the first question."
              },
              {
                "question": "What is the second question?",
                "answer": "This is the detailed answer to the second question."
              }
            ]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // --- CORRECTED JSON PARSING LOGIC ---
        // This logic replaces the old ".split('|||ANSWER|||')" method.
        
        // 1. Find the start and end of the JSON array to clean the response.
        const jsonStartIndex = text.indexOf('[');
        const jsonEndIndex = text.lastIndexOf(']');
        
        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            throw new Error("AI response did not contain a valid JSON array.");
        }

        // 2. Extract only the JSON string.
        const jsonString = text.substring(jsonStartIndex, jsonEndIndex + 1);

        // 3. Parse the cleaned JSON string into an array.
        const qaPairs = JSON.parse(jsonString);
        
        // 4. Send the full array to the frontend.
        res.status(200).json(qaPairs);

    } catch (error) {
        console.error("Error generating or parsing AI content:", error);
        res.status(500).json({ error: "Failed to generate questions. Check server logs for details." });
    }
});

export default router;