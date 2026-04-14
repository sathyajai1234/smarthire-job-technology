const handleAnalyze = async () => {
  try {
    const res = await fetch(
      "https://smarthire-backend-production-9091.up.railway.app/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText }),
      }
    );

    console.log("STATUS:", res.status);

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text);

    alert("API Working ✅");

  } catch (err) {
    console.error("ERROR:", err);
    alert("Something went wrong!");
  }
};
