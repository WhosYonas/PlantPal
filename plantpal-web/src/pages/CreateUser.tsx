import { useState } from "react";
import { apiFetch } from "../API/client";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handle click sends the request to the api endpoint with the body
  //created from user input, so when we click setEmail changes the
  //value of email to whatever the user input
  async function handleClick() {
    await apiFetch("/users/", {
      method: "POST",
      body: JSON.stringify({ email, password_hash: password }),
    });
  }

  return (
    <div>
      <h1>Create user</h1>

      <input
        placeholder="Email"
        value={email}
        //Onchange changes the input fields value every time we change it
        //using set email
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleClick}>Create User</button>
    </div>
  );
}
