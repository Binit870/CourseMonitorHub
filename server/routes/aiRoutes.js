// routes/aiRoutes.js
import express from 'express';
import { handleChat, generateQuiz, generateProblem } from '../controllers/aiController.js';

const router = express.Router();

// @route   POST /api/chat
router.post('/chat', handleChat);

// @route   POST /api/generate-quiz
router.post('/generate-quiz', generateQuiz);

// @route   POST /api/generate-problem
router.post('/generate-problem', generateProblem);

export default router;