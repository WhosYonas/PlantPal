// App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Plants from "./pages/Plants";
import Watering from "./pages/WateringEvent";

function Home() {
  return (
    <div>
      <h1>Welcome!</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/create">
        <button>Create User</button>
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/watering" element={<Watering />} />
      </Routes>
    </BrowserRouter>
  );
}
