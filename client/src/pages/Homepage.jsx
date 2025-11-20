import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",       // vertical centering
        justifyContent: "center",   // horizontal centering
        minHeight: "100vh",         // full viewport height
        textAlign: "center",
        padding: "0 1rem",          // optional: some horizontal padding on small screens
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",    // center content horizontally inside column
          justifyContent: "center", // center content vertically
          gap: "1.5rem",
        }}
      >
        <h1 style={{ margin: 0 }}>Lost & Found</h1>
        <p style={{ margin: 0 }}>Reconnect with your belongings.</p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/found-items")}>Found Items</button>
        </div>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}

export default Homepage;
