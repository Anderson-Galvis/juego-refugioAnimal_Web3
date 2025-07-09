import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registro exitoso");
        navigate("/");
      } else {
        alert(data.error || "Error al registrarse");
      }
    } catch (err) {
      alert("Error de conexión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-sm bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Registrarse</button>
      </form>
      <p className="mt-4">
        ¿Ya tienes cuenta? <a className="text-green-600" href="/">Inicia sesión</a>
      </p>
    </div>
    </div>
  );
}

export default Register;
