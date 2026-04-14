import { useState } from "react";

const Analyze = () => {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://smarthire-backend-production-9091.up.railway.app/analyze",
        {
          method: "POST", // ✅ IMPORTANT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeText }),
        }
      );

      const data = await res.json();
      console.log(data);

      setResult(data.result || data.message);

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Resume Analyzer</h1>

      <textarea
        placeholder="Paste your resume..."
        rows="10"
        cols="50"
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <br /><br />

      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Analyze;