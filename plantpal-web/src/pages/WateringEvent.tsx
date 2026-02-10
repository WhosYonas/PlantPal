import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../API/client";
import { useState, useEffect } from "react";

export default function Watering() {
  const [plants, setPlants] = useState<any[]>([]);
  const [plant_id, setPlantid] = useState("");
  const [amount_ml, setAmountMl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPlants();
  }, []);

  async function loadPlants() {
    try {
      const data = await apiFetch("/plants/getPlants");
      setPlants(data);
      // Auto-select first plant if available
      if (data.length > 0) {
        setPlantid(data[0].id.toString());
      }
    } catch (error) {
      console.error("Failed to load plants:", error);
    }
  }

  async function handleCreateWatering() {
    if (!plant_id || !amount_ml) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await apiFetch(
        `/watering-events/createWateringEvent?plant_id=${plant_id}`,
        {
          method: "POST",
          body: JSON.stringify({
            watered_at: new Date().toISOString(),
            amount_ml: parseInt(amount_ml),
          }),
        },
      );

      // Show success message
      setShowSuccess(true);
      setAmountMl("");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      alert("Failed to record watering");
    }
  }

  const selectedPlant = plants.find((p) => p.id.toString() === plant_id);

  return (
    <div className="watering-container">
      <Link to="/plants">
        <button className="back-button">← Back to Plants</button>
      </Link>

      <div className="watering-card">
        <h1>💧 Water Your Plants</h1>

        {showSuccess && (
          <div className="success-message">
            ✅ Watering recorded successfully!
          </div>
        )}

        {plants.length === 0 ? (
          <div className="empty-state">
            <p>No plants found. Add a plant first!</p>
            <Link to="/plants">
              <button className="primary-button" style={{ marginTop: "1rem" }}>
                Go to Plants
              </button>
            </Link>
          </div>
        ) : (
          <div className="watering-form">
            <select
              value={plant_id}
              onChange={(e) => setPlantid(e.target.value)}
            >
              {plants.map((plant) => (
                <option key={plant.id} value={plant.id}>
                  🌿 {plant.plant_name} ({plant.plant_species})
                </option>
              ))}
            </select>

            {selectedPlant && (
              <div
                style={{
                  background: "#f0f8ff",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                💧 Needs water every {selectedPlant.watering_interval_days} days
              </div>
            )}

            <input
              type="number"
              placeholder="Amount (ml)"
              value={amount_ml}
              onChange={(e) => setAmountMl(e.target.value)}
            />

            <button className="water-button" onClick={handleCreateWatering}>
              💦 Record Watering
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
