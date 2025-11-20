import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { useAuth } from "../contexts/AuthContext.jsx";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();  // <-- for navigation
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiPost("/auth/login", form);
    setMsg(res.message);

    if (res.success) login(res.user);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Error / success message */}
      <p>{msg}</p>

      {/* Link to Signup */}
      <p style={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{ color: "#646cff", cursor: "pointer", textDecoration: "underline" }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
