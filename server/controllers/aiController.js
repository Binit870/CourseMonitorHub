// controllers/aiController.js
import genAI from '../config/gemini.js'; // Import the centralized AI instance

/**
 * @desc    Handles chat messages using the AI model
 */
export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message);
        const botReply = result.response.text();

        res.json({ reply: botReply });

    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: 'Failed to get response from AI model.' });
    }
};


/**
 * @desc    Generates quiz questions using AI
 */
export const generateQuiz = async (req, res) => {
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
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const questions = JSON.parse(cleanedJson);

        res.json({ questions });

    } catch (error) {
        console.error('AI Quiz Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate quiz questions from AI model.' });
    }
};

/**
 * @desc    Generates a coding problem using AI
 */
export const generateProblem = async (req, res) => {
    try {
        const { language, difficulty } = req.body;

        if (!language || !difficulty) {
            return res.status(400).json({ error: 'Language and difficulty are required.' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
              "description": "A detailed description of the problem. Use HTML tags like <p>, <strong>, and code> for formatting. Explain the task clearly.",
              "examples": [
                { "input": "...", "output": "...", "explanation": "..." }
              ],
              "constraints": "...",
              "starterCode": { "${language}": "..." }
            }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const problem = JSON.parse(cleanedJson);
        
        res.json(problem);

    } catch (error) {
        console.error('AI Problem Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate coding problem from AI model.' });
    }
};