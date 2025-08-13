import { Routes, Route } from "react-router-dom";
import Refugio from "./pages/Refugio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ciudad from "./pages/Ciudad";
import Mapa from "./components/Mapa";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/refugio" element={<Refugio />} />
      <Route path="/ciudad" element={<Ciudad />} />
      <Route path="/mapa/:id" element={<Mapa />} />
    </Routes>
  );
}

export default App;
