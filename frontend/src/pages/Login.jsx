import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 importar navigate

function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 👈 inicializar hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password: contrasena // 👈 el backend espera "password", no "contrasena"
      }, {
        withCredentials: true
      });

      // ✅ Guardar el token
      localStorage.setItem('token', response.data.token);
      console.log("estamos en el refugio")

      // ✅ Redirigir al refugio o dashboard
      navigate('/refugio'); // 👈 cambia por la ruta que tengas configurada

    } catch (err) {
      console.error('❌ Error al iniciar sesión:', err);
      setError('Credenciales incorrectas o error del servidor');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />
      <button type="submit">Iniciar sesión</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
