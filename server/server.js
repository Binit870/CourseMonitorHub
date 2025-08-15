import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import fetch from 'node-fetch';

// --- Route Imports ---
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js'; // <-- IMPORT THE NEW ROUTE

// --- Initial Setup ---
dotenv.config();
connectDB();
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.use('/api', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes); // <-- USE THE NEW INTERVIEW ROUTE

// --- Free edX Courses Route ---
app.get('/api/edx-courses', async (req, res) => {
  try {
    const response = await fetch('https://courses.edx.org/api/courses/v1/courses/');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch edX courses' });
  }
});

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));