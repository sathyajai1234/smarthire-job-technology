import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ background: "#333", padding: "15px" }}>

      <Link to="/dashboard" style={{ color: "white", marginRight: "20px" }}>
        Dashboard
      </Link>

      <Link to="/" style={{ color: "white", marginRight: "20px" }}>
        Login
      </Link>

      <Link to="/register" style={{ color: "white", marginRight: "20px" }}>
        Register
      </Link>

      <Link to="/ai-analyzer" style={{ color: "white", marginRight: "20px" }}>
        AI Analyzer
      </Link>
      
      <Link to="/analytics" style={{color:"white", marginRight:"20px"}}>
        Analytics
      </Link>

    </div>
  );
}

export default Navbar;