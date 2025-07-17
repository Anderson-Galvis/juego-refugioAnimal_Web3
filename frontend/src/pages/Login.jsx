import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/foto2.png'; 

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
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-600 flex items-center justify-center bg-gray-100">
  {/* Imagen solo si hay un archivo cargado */}
  {logo ? (
    <img src={logo} alt="Foto de perfil" className="w-full h-full object-cover  scale-125" />
  ) : (
    <span className="text-gray-400 text-sm">Sin foto</span>
  )}
</div>





        <form onSubmit={handleLogin} className="space-y-4 border border-red-600">
          <div>
            <label className="block text-gray-700">Correo electronico: </label> <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
           <br />
          <div>
            <label className="block text-gray-700">Contraseña</label> <br />
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
           <br />
           <div className="flex justify-center">
  <button
    type="submit"
    className="bg-blue-600 text-white text-center py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
  >
    Iniciar sesión
  </button>
</div>


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
