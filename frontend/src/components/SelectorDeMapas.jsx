import React from "react";
import { useNavigate } from "react-router-dom";

const mapas = [
  { id: 1, nombre: "Bosque Encantado" },
  { id: 2, nombre: "Ciudad Perdida" },
  { id: 3, nombre: "Desierto Místico" },
  { id: 4, nombre: "Isla Secreta" },
];

function SelectorDeMapas() {
  const navigate = useNavigate();

  const seleccionarMapa = (id) => {
    navigate(`/mapa/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Selecciona un mapa para rescatar mascotas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {mapas.map((mapa) => (
          <button
            key={mapa.id}
            onClick={() => seleccionarMapa(mapa.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg shadow"
          >
            {mapa.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectorDeMapas;
