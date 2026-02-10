import { useEffect, useState } from "react";
import { apiFetch } from "../API/client";
import { Link } from "react-router-dom";

export default function Plants() {
  const [user, setUser] = useState<any>(null);
  const [plants, setPlants] = useState<any[]>([]);
  const [plant_name, setPlantName] = useState("");
  const [plant_species, setPlantSpecies] = useState("");
  const [watering_interval_days, setWateringDays] = useState("");

  useEffect(() => {
    apiFetch("/users/me")
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  useEffect(() => {
    if (user) {
      loadPlants();
    }
  }, [user]);

  async function loadPlants() {
    try {
      const data = await apiFetch("/plants/getPlants");
      setPlants(data);
    } catch (error) {
      console.error("Failed to load plants:", error);
    }
  }

  if (!user) return <p>Loading...</p>;

  async function handleCreatePlant() {
    await apiFetch("/plants/createPlant", {
      method: "POST",
      body: JSON.stringify({
        plant_name,
        plant_species,
        watering_interval_days: parseInt(watering_interval_days),
      }),
    });

    // Clear form
    setPlantName("");
    setPlantSpecies("");
    setWateringDays("");

    // Refresh the list
    loadPlants();
  }

  return (
    <div>
      <div>
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
      <h1>Create Plant</h1>

      <input
        placeholder="Plant name"
        value={plant_name}
        onChange={(e) => setPlantName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Plant species"
        value={plant_species}
        onChange={(e) => setPlantSpecies(e.target.value)}
      />

      <input
        placeholder="Watering interval"
        value={watering_interval_days}
        onChange={(e) => setWateringDays(e.target.value)}
      />

      <button onClick={handleCreatePlant}>Create Plant</button>

      <h2>My Plants</h2>
      {plants.length === 0 ? (
        <p>No plants yet. Create one above!</p>
      ) : (
        <ul>
          {plants.map((plant) => (
            <li key={plant.id}>
              <strong>{plant.plant_name}</strong> - {plant.plant_species}
              (Water every {plant.watering_interval_days} days)
            </li>
          ))}
        </ul>
      )}

      <Link to="/watering">
        <button>Water Plant</button>
      </Link>
    </div>
  );
}
