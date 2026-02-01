import { useState } from "react";
import { apiFetch } from "../API/client";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const data = await apiFetch("/users/login", {
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
    <div>
      <div>
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
      <h1>Login</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Log in</button>
    </div>
  );
}
