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
        navigate("/login");
      });
  }, [navigate]);

  function handleCheckPlants() {
    navigate("/plants");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (!user) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome back!</h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>{user.email}</p>

        <div className="dashboard-actions">
          <button className="dashboard-button" onClick={handleCheckPlants}>
            Check My Plants
          </button>
          <button
            className="dashboard-button"
            onClick={() => navigate("/watering")}
          >
            Water Plants
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
