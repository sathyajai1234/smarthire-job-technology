import express from "express";
import cors from "cors";

const app = express();

// ✅ IMPORTANT for Render
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Analyze route
app.post("/analyze", (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ result: "No resume provided" });
    }

    // Simple analysis (NO AI → stable)
    const result = `
Resume Analysis:

✔ Good points:
- Has structured content
- Includes skills and experience

⚠ Improvements:
- Add more technical details
- Add projects with impact
- Improve formatting

⭐ Overall Score: 7/10
`;

    res.json({ result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "Server error" });
  }
});

// ✅ VERY IMPORTANT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});