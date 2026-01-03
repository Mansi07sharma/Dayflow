import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.connect.js";


dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// database connection
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Express app running");
});

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
