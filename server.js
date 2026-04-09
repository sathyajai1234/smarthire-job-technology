import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Analyze route (NO AI → SAFE)
app.post("/analyze", (req, res) => {
  const { resume } = req.body;

  if (!resume) {
    return res.status(400).json({ error: "Resume is required" });
  }

  // Fake AI response
  res.json({
    result: `
Strengths:
- Good technical skills
- Clear project experience

Weaknesses:
- Limited real-world exposure

Suggestions:
- Add more projects
- Improve advanced skills
    `,
  });
});

// Render port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});