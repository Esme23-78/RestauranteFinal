import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/meseros/login', {
        usuario: usuario.trim(),
        contrasena: contrasena.trim()
      });

      const encontrado = res.data;
      localStorage.setItem('usuarioActual', JSON.stringify(encontrado));

      if (encontrado.rol === 'Gerente') {
        navigate('/gerente');
      } else if (encontrado.rol === 'Mesero') {
        navigate('/mesas');
      } else {
        setError('Rol no reconocido');
      }
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/img/fondo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-orange-600">Bienvenido al Restaurante "Chedys"</h1>
          <p className="text-gray-700">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 text-left mb-1">Usuario</label>
            <input
              type="text"
              placeholder="ej. Edith"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 text-left mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={mostrarContrasena ? 'text' : 'password'}
                placeholder="ingrese su contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600 text-xl"
              >
                {mostrarContrasena ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Iniciar Sesión
          </button>

          <div className="text-center text-sm mt-2">
            <a href="/recuperar" className="text-orange-600 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
