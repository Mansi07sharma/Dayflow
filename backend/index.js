import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.connect.js";
import router from "./routes/main.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("Express app running");
});

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
