import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/fotoRegister.png';

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registro exitoso");
        navigate("/login");
      } else {
        setError(data.error || "Error al registrarse");
      }
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 text-white">
      
      {/* Imagen del logo */}
      <div className="mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-gray-600 mx-auto">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Contenedor del formulario */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 border border-gray-700">
        <h2 className="text-center text-2xl font-semibold">Crear cuenta</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nombre completo</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="Ej: juan@mail.com"
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
          >
            Registrarse
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
