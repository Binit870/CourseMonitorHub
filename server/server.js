import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Adjust the import path as necessary
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Existing Route Imports ---
import authRoutes from './routes/authRoutes.js';

// --- Initial Setup ---
dotenv.config();
connectDB(); // Connect to MongoDB
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Google Gemini AI Setup ---
// Ensure you have GEMINI_API_KEY in your .env file
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not defined in the .env file.");
  process.exit(1); // Exit the process if the key is not found
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


//================================================//
//                API ROUTES                      //
//================================================//

/**
 * @route   POST /api/chat
 * @desc    Handles chat messages using the AI model
 * @access  Public (or Protected, if you add auth middleware)
 */
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body; // Get the message from the request body

        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        // Call the Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message);
        const botReply = result.response.text();

        // Send the response back to the frontend
        res.json({ reply: botReply });

    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: 'Failed to get response from AI model.' });
    }
});


/**
 * @route   POST /api/generate-quiz
 * @desc    Generates quiz questions using AI
 * @access  Public
 */
app.post('/api/generate-quiz', async (req, res) => {
    try {
        const { topic, difficulty } = req.body;

        if (!topic || !difficulty) {
            return res.status(400).json({ error: 'Topic and difficulty are required.' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Generate 10 unique quiz questions about "${topic}" with "${difficulty}" difficulty.
            Return the output as a valid JSON array only. Do NOT include any text, explanation, or markdown formatting outside of the JSON array.
            Each object in the array must have this exact structure:
            {
              "question": "The question text",
              "options": ["option 1", "option 2", "option 3", "option 4"],
              "answer": "the correct option text"
            }
        `;
        
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        
        // The AI might still wrap the JSON in markdown, so we clean it just in case.
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        const questions = JSON.parse(cleanedJson);
        res.json({ questions });

    } catch (error) {
        console.error('AI Quiz Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate quiz questions from AI model.' });
    }
});

/**
 * @route   POST /api/generate-problem
 * @desc    Generates a coding problem using AI
 * @access  Public
 */
app.post('/api/generate-problem', async (req, res) => {
    try {
        const { language, difficulty } = req.body;

        if (!language || !difficulty) {
            return res.status(400).json({ error: 'Language and difficulty are required.' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // A detailed prompt to ensure the AI returns a clean, structured JSON object.
        const prompt = `
            Generate a coding problem with the following specifications:
            - Language: ${language}
            - Difficulty: ${difficulty}

            The output MUST be a single, valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON object.
            The JSON object must have the following exact structure:
            {
              "id": "a-unique-kebab-case-id-for-the-problem",
              "title": "A concise and descriptive title for the problem",
              "difficulty": "${difficulty}",
              "description": "A detailed description of the problem. Use HTML tags like <p>, <strong>, and <code> for formatting. Explain the task clearly.",
              "examples": [
                {
                  "input": "Example input as a string, e.g., 'nums = [2,7,11,15], target = 9'",
                  "output": "Example output as a string, e.g., '[0,1]'",
                  "explanation": "An optional but recommended explanation for the example."
                }
              ],
              "constraints": "A string listing the constraints for the problem inputs, e.g., '2 <= nums.length <= 10^4'",
              "starterCode": {
                "${language}": "The starter code snippet for the specified language. It should include a function or class signature and a comment like '// Write your code here' where the user should implement their solution."
              }
            }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean up potential markdown formatting from the AI's response
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        // Parse the cleaned text into a JSON object
        const problem = JSON.parse(cleanedJson);
        
        res.json(problem);

    } catch (error) {
        console.error('AI Problem Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate coding problem from AI model.' });
    }
});


// --- Authentication Routes ---
app.use('/api/auth', authRoutes);


// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
