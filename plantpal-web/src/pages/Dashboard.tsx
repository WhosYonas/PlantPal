import { useEffect, useState } from "react";
import { apiFetch } from "../API/client";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch("/users/me")
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  async function handleClick() {
    navigate("/plants");
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>WELCOME {user.email}</h1>
      <div>
        <button onClick={handleClick}>Check plants</button>
      </div>
    </div>
  );
}
