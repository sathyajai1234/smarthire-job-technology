import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Analyze from "./pages/Analyze";

function App() {
  return (
    <BrowserRouter>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>SmartHire 🚀</h1>

        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/analyze">Analyze</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/analyze" element={<Analyze />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;