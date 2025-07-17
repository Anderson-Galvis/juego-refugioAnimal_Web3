import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/fotoLogin.png';

function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password: contrasena
      }, {
        withCredentials: true
      });

      localStorage.setItem('token', response.data.token);
      navigate('/refugio');
    } catch (err) {
      console.error('❌ Error al iniciar sesión:', err);
      setError('Credenciales incorrectas o error del servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        
        {/* Imagen centrada */}
        <div className="flex justify-center mb-6">
        <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 underline"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
