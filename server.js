import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze", async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ error: "Resume is required" });
    }

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: `Analyze this resume and give strengths, weaknesses, and suggestions:\n\n${resume}`,
    });

    res.json({
      result: response.output[0].content[0].text,
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI failed" });
  }
});