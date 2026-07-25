import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRouter.js";

dotenv.config();

const PORT = 4000;
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api", authRoutes);

connectDB()

app.get("/", (req, res) => {
    res.send("Hello Everyone!");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})