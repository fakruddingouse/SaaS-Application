import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const PORT = 4000;
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174" 
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB()

app.get("/", (req, res) => {
  res.send("Hello Everyone!");
})
app.use("/api/auth", authRoutes);
app.use("/api/ai/blog", blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})