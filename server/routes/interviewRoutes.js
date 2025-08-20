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

// Helper function to parse JSON from AI response
const parseAIResponse = (text) => {
    const jsonStartIndex = text.indexOf('[');
    const jsonEndIndex = text.lastIndexOf(']');
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
        throw new Error("AI response did not contain a valid JSON array.");
    }
    const jsonString = text.substring(jsonStartIndex, jsonEndIndex + 1);
    return JSON.parse(jsonString);
};

// --- Endpoint to Generate Questions from a TOPIC ---
router.post('/generate', async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ error: 'Topic is required.' });
    }

    try {
        console.log(`✨ Generating Q&A for topic: ${topic}`);
        
        // --- UPDATED PROMPT ---
        const prompt = `
            Generate an array of at least 10 technical interview questions for the topic "${topic}".
            The questions should cover a range of difficulties.

            For the "answer" to each question, provide a comprehensive and detailed explanation suitable for someone preparing for an interview.
            - For technical or algorithmic questions, break down the solution step-by-step and include a clear code example in a relevant language (like JavaScript or Python).
            - For conceptual questions, explain the concept thoroughly with examples.
            
            IMPORTANT: Respond with ONLY a valid JSON array of objects. Each object must have two keys: "question" and "answer".
            Do not include any other text or markdown formatting.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const qaPairs = parseAIResponse(text);
        
        res.status(200).json(qaPairs);
    } catch (error) {
        console.error("Error in /generate endpoint:", error);
        res.status(500).json({ error: "Failed to generate questions. Check server logs." });
    }
});

// --- Endpoint to Generate Questions from a RESUME ---
router.post('/generate-from-resume', async (req, res) => {
    const { resume } = req.body;
    if (!resume) {
        return res.status(400).json({ error: 'Resume text is required.' });
    }

    try {
        console.log(`📄 Analyzing resume to generate questions...`);

        // --- UPDATED PROMPT ---
        const prompt = `
            Act as a senior technical interviewer preparing to interview a candidate. I will provide you with the candidate's resume text.
            Your task is to analyze the resume and generate an array of 10 to 15 insightful interview questions that directly relate to the experience, projects, and skills listed.
            
            For each question, provide a detailed "answer". This "answer" should first explain what an interviewer is looking for in a good response (e.g., "The candidate should demonstrate X and Y skills.").
            Then, provide a detailed, high-quality example answer that a strong candidate might give. For behavioral questions, structure this example answer using the STAR method (Situation, Task, Action, Result).

            Here is the resume:
            ---
            ${resume}
            ---

            Generate questions that:
            - Probe deeper into their listed project contributions.
            - Ask them to elaborate on a specific technology they used.
            - Challenge them with a hypothetical problem related to their experience.
            - Assess their understanding of the impact of their work.

            IMPORTANT: Respond with ONLY a valid JSON array of objects. Each object must have two keys: "question" and "answer".
            Do not include any other text, explanations, or markdown formatting.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const qaPairs = parseAIResponse(text);

        res.status(200).json(qaPairs);
    } catch (error) {
        console.error("Error in /generate-from-resume endpoint:", error);
        res.status(500).json({ error: "Failed to generate questions from resume. Check server logs." });
    }
});

export default router;