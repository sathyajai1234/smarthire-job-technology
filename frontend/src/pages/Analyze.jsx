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

const data = await res.json();

if (!res.ok) {
  throw new Error(data.message || "Error");
}

setResult(data.result);