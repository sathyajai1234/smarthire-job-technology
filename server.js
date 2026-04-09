import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// SIMPLE ANALYZE (NO AI → NO CRASH)
app.post("/analyze", (req, res) => {
  const { resume } = req.body;

  if (!resume) {
    return res.status(400).json({ error: "Resume is required" });
  }

  res.json({
    result: "Resume received ✅ (AI temporarily disabled)",
  });
});

// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});