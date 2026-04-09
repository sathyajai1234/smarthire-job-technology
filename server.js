app.post("/analyze", async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ error: "Resume is required" });
    }

    // ✅ SAFE IMPORT
    const { default: OpenAI } = await import("openai");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "dummy", // prevents crash
    });

    let resultText = "AI not configured";

    // ✅ Only call AI if key exists
    if (process.env.OPENAI_API_KEY) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Analyze this resume:
Give strengths, weaknesses, suggestions.

${resume}`,
          },
        ],
      });

      resultText = response.choices?.[0]?.message?.content || "No result";
    }

    res.json({ result: resultText });

  } catch (error) {
    console.error("SAFE AI ERROR:", error.message);

    // ✅ NEVER CRASH SERVER
    res.json({
      result: "AI temporarily unavailable, but backend is working ✅",
    });
  }
});