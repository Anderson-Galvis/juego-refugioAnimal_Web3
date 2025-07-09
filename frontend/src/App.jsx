import { Routes, Route } from "react-router-dom";
import Refugio from "./pages/Refugio";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/refugio" element={<Refugio />} />
    </Routes>
  );
}

export default App;
