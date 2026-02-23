import { useEffect, useState } from "react";
import { apiFetch } from "../API/client";
import { Link, useNavigate } from "react-router-dom";

export default function Plants() {
  const [user, setUser] = useState<any>(null);
  const [plants, setPlants] = useState<any[]>([]);
  const [plant_name, setPlantName] = useState("");
  const [plant_species, setPlantSpecies] = useState("");

  const [selectedSpecies, setSelectedSpecies] = useState<any | null>(null);
  const [speciesQuery, setSpeciesQuery] = useState("");
  const [speciesResults, setSpeciesResults] = useState<any[]>([]);

  const [watering_interval_days, setWateringDays] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch("/users/me")
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    if (user) {
      loadPlants();
    }
  }, [user]);

  useEffect(() => {
    if (!speciesQuery) {
      setSpeciesResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const results = await apiFetch(
          `/plants/trefle/search?q=${encodeURIComponent(speciesQuery)}`,
        );
        setSpeciesResults(results.data);
      } catch (err) {
        console.error("Species search failed", err);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [speciesQuery]);

  async function loadPlants() {
    try {
      const data = await apiFetch("/plants/getPlants");
      setPlants(data);
    } catch (error) {
      console.error("Failed to load plants:", error);
    }
  }

  async function handleCreatePlant() {
    if (!plant_name || !selectedSpecies || !watering_interval_days) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await apiFetch("/plants/createPlant", {
        method: "POST",
        body: JSON.stringify({
          plant_name,
          plant_species: selectedSpecies.scientific_name,
          watering_interval_days: parseInt(watering_interval_days),
        }),
      });

      // Clear form
      setPlantName("");
      setWateringDays("");

      // Refresh the list
      loadPlants();
    } catch (error) {
      alert("Failed to create plant");
    }
  }

  function handleSelectSpecies(species: any) {
    setSelectedSpecies(species);
    setSpeciesQuery(species.scientific_name);
    setSpeciesResults([]);
  }

  if (!user) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="plants-container">
      <div className="plants-header">
        <h1>My Plants</h1>
        <Link to="/dashboard">
          <button className="back-button-plants">← Dashboard</button>
        </Link>
      </div>

      <div className="create-plant-card">
        <h2>Add New Plant</h2>
        <div className="plant-form">
          <input
            placeholder="Plant name (e.g., Sunny the Succulent)"
            value={plant_name}
            onChange={(e) => setPlantName(e.target.value)}
          />
          <input
            placeholder="Search species..."
            value={speciesQuery}
            onChange={(e) => {
              setSpeciesQuery(e.target.value);
              setSelectedSpecies(null);
            }}
          />
          {speciesResults.length > 0 && (
            <div className="species-dropdown">
              {speciesResults.map((species) => (
                <div
                  key={species.id}
                  className="species-option"
                  onClick={() => handleSelectSpecies(species)}
                >
                  {species.common_name || "Unknown"} — {species.scientific_name}
                </div>
              ))}
            </div>
          )}
          <input
            type="number"
            placeholder="Watering interval (days)"
            value={watering_interval_days}
            onChange={(e) => setWateringDays(e.target.value)}
          />
          <button className="primary-button" onClick={handleCreatePlant}>
            Add Plant
          </button>
        </div>
      </div>

      <div className="plants-list-card">
        <h2> Your Garden</h2>
        {plants.length === 0 ? (
          <div className="empty-state">
            <p>No plants yet. Add your first plant above! 🌱</p>
          </div>
        ) : (
          <div>
            {plants.map((plant) => (
              <div key={plant.id} className="plant-item">
                <button
                  className="plant-button"
                  onClick={() =>
                    navigate("/watering", { state: { plantId: plant.id } })
                  }
                >
                  {plant.plant_name}
                </button>
                <div className="plant-item-details">
                  <span>{plant.plant_species}</span>
                  <span> • </span>
                  <span>Water every {plant.watering_interval_days} days</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
