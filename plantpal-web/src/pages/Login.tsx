import { useState } from "react";
import { apiFetch } from "../API/client";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    await apiFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
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
