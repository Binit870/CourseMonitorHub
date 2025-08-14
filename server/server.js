import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Adjust the import path as necessary
import cors from 'cors';


// --- Existing Route Imports ---
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// --- Initial Setup ---
dotenv.config();
connectDB(); // Connect to MongoDB
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// --- Authentication Routes ---
app.use('/api', aiRoutes); // AI-related routes
app.use('/api/auth', authRoutes);


// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
