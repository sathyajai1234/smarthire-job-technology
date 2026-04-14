app.post("/analyze", (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "No resume provided",
      });
    }

    // ✅ Simple analysis (SAFE)
    const wordCount = resumeText.split(" ").length;

    const result = {
      score: wordCount > 50 ? "Good Resume 👍" : "Improve Content ⚠️",
      words: wordCount,
      tips: [
        "Add more skills",
        "Add projects",
        "Improve formatting"
      ]
    };

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});