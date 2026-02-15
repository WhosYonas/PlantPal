import { useState } from "react";
import { apiFetch } from "../API/client";
import { Link } from "react-router-dom";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    try {
      await apiFetch("/users/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      alert("User created successfully!");
      setPassword("");
      setEmail("");
    } catch (err) {
      alert("Failed to create user");
    }
  }

  return (
    <div className="auth-container">
      <Link to="/">
        <button className="back-button">← Go Back</button>
      </Link>

      <div className="auth-card">
        <h1>Create Account</h1>

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
          Create Account
        </button>
      </div>
    </div>
  );
}
