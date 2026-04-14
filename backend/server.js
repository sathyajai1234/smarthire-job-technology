import express from "express";
import cors from "cors";

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 🔥 DEBUG ANALYZE ROUTE
app.post("/analyze", (req, res) => {
  try {
    console.log("📥 Incoming request body:");
    console.log(req.body);

    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        message: "No resume text received ❌",
      });
    }

    // ✅ Temporary response (to test connection)
    res.json({
      message: "API WORKING ✅",
      received: resumeText.substring(0, 100) // show part of resume
    });

  } catch (error) {
    console.error("❌ ERROR:", error);

    res.status(500).json({
      message: "Server error ❌",
    });
  }
});

// ✅ PORT (IMPORTANT for Railway)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});