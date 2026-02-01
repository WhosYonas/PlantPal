import { useEffect, useState } from "react";
import { apiFetch } from "../API/client";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    apiFetch("/users/me")
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  return <h1>WELCOME {user.email}</h1>;
}
