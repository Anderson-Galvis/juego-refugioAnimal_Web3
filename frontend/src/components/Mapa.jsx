// src/pages/Mapa.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const mapasDetalles = {
  1: "Bienvenido al Bosque Encantado, lleno de vida y misterios...",
  2: "Desierto Ardiente, cuidado con el calor y las tormentas de arena...",
  3: "Montañas Frías, prepárate para el frío y la nieve...",
  4: "Isla Misteriosa, un lugar desconocido y lleno de secretos...",
};

function Mapa() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Mapa: {mapasDetalles[id] ? mapasDetalles[id] : "Mapa desconocido"}</h1>
      <button
        onClick={() => navigate("/ciudad")}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Volver a Ciudad
      </button>
    </div>
  );
}

export default Mapa;
