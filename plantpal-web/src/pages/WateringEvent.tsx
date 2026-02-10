import { Link } from "react-router-dom";
import { apiFetch } from "../API/client";
import { useState } from "react";

export default function Watering() {
  const [plant_id, setPlantid] = useState("");
  const [amount_ml, setAmountMl] = useState("");

  async function handleCreateWatering() {
    await apiFetch(
      `/watering-events/createWateringEvent?plant_id=${plant_id}`,
      {
        // plant_id in URL
        method: "POST",
        body: JSON.stringify({
          watered_at: new Date().toISOString(),
          amount_ml: parseInt(amount_ml),
        }),
      },
    );
  }

  return (
    <div>
      <Link to="/plants">
        <button>Go Back</button>
      </Link>
      <h1>Water plant</h1>
      <input
        type="text"
        placeholder="Plant id"
        value={plant_id}
        onChange={(e) => setPlantid(e.target.value)}
      />
      <input
        placeholder="Amount (ml)"
        value={amount_ml}
        onChange={(e) => setAmountMl(e.target.value)}
      />
      <button onClick={handleCreateWatering}>Water plant</button>
    </div>
  );
}
