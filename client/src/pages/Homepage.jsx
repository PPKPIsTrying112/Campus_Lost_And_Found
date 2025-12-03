import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Homepage() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const defaultProfileImage =
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";


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

        {/* Logged OUT: show login/signup */}
        {!user && (
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => navigate("/signup")}>Get Started</button>
          </div>
        )}

        {/* Logged IN: show circular profile + logout + post */}
        {user && (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button onClick={() => navigate("/found-items")}>Looking for an Item?</button>
            <button onClick={() => navigate('/create-found-item')}>Found an Item?</button>
          </div>
        )}

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}

export default Homepage;
