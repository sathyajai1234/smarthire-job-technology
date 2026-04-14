import { useState } from "react";

function ResumeAnalyzer() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resume) {
      alert("Paste your resume");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://smarthire-backend-4pl5.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resume })
      });

      const data = await response.json();

      if (data.error) {
        setResult("Error: " + data.error);
      } else {
        setResult(data.choices[0].message.content);
      }

    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>AI Resume Analyzer</h2>

      <textarea
        rows="10"
        cols="50"
        placeholder="Paste your resume..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <br /><br />

      <button onClick={analyzeResume}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <br /><br />

      <pre style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}

export default ResumeAnalyzer;