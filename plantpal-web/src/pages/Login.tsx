import { useState } from "react";
import { apiFetch } from "../API/client";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const data = await apiFetch("/users/login/json", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <div className="auth-container">
      <Link to="/">
        <button className="back-button">← Go Back</button>
      </Link>

      <div className="auth-card">
        <h1>🌿 Login</h1>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="primary-button" onClick={handleClick}>
          Log in
        </button>
      </div>
    </div>
  );
}
