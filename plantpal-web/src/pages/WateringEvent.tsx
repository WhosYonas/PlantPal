import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../API/client";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Watering() {
  const location = useLocation();
  const { plantId } = location.state || {}; // plantId from previous page
  const [plant, setPlant] = useState<any>(null);
  const [amount_ml, setAmountMl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (plantId) {
      loadPlant();
    } else {
      setLoading(false);
    }
  }, [plantId]);

  async function loadPlant() {
    try {
      setLoading(true);
      const plantData = await apiFetch(
        `/plants/getPlantById?plant_id=${plantId}`,
      );
      setPlant(plantData);
    } catch (error) {
      console.error("Failed to load plant:", error);
      alert("Failed to load plant");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateWatering() {
    if (!plantId || !amount_ml) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await apiFetch(
        `/watering-events/createWateringEvent?plant_id=${plantId}`,
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

  if (loading) {
    return (
      <div className="watering-container">
        <div className="watering-card">
          <p>Loading plant...</p>
        </div>
      </div>
    );
  }

  if (!plantId || !plant) {
    return (
      <div className="watering-container">
        <Link to="/plants">
          <button className="back-button">← Back to Plants</button>
        </Link>
        <div className="watering-card">
          <h1>💧 Water Your Plants</h1>
          <div className="empty-state">
            <p>
              No plant selected. Please select a plant from the plants page.
            </p>
            <Link to="/plants">
              <button className="primary-button" style={{ marginTop: "1rem" }}>
                Go to Plants
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="watering-container">
      <Link to="/plants">
        <button className="back-button">← Back to Plants</button>
      </Link>

      <div className="watering-card">
        <h1>💧 Water Your Plant</h1>

        {showSuccess && (
          <div className="success-message">
            ✅ Watering recorded successfully!
          </div>
        )}

        <div className="watering-form">
          <div
            style={{
              background: "#e8f5e9",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <h2 style={{ margin: "0 0 8px 0", fontSize: "1.2rem" }}>
              🌿 {plant.plant_name}
            </h2>
            <p style={{ margin: "4px 0", color: "#666" }}>
              Species: {plant.plant_species}
            </p>
            <p style={{ margin: "4px 0", color: "#666" }}>
              💧 Needs water every {plant.watering_interval_days} days
            </p>
          </div>

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
      </div>
    </div>
  );
}
