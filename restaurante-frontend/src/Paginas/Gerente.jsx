import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gerente = () => {
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
  const nombreUsuario = `${usuarioActual?.nombre || ''} ${usuarioActual?.paterno || ''} ${usuarioActual?.materno || ''}`.trim();

  const navigate = useNavigate();

  const cerrarSesion = () => {
    navigate('/');
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: "url('/img/gerente.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Capa oscura encima del fondo */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Bienvenida */}
      <div className="absolute top-6 left-6 z-10 bg-black/60 text-white px-8 py-3 rounded-xl shadow-lg text-3xl font-bold">
        Bienvenido {nombreUsuario}
      </div>

      {/* Cerrar sesión */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={cerrarSesion}
          className="bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-6 py-2 rounded-xl shadow-lg transition-all"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Botones principales */}
      <div className="flex gap-16 mt-32 z-10">
        <button
          onClick={() => navigate('/meserosg')}
          className="bg-orange-500 hover:bg-orange-600 text-white text-4xl font-bold py-6 px-14 rounded-3xl shadow-2xl transition-all"
        >
          🍽️ Meseros
        </button>

        <button
          onClick={() => navigate('/mesasg')}
          className="bg-orange-500 hover:bg-orange-600 text-white text-4xl font-bold py-6 px-14 rounded-3xl shadow-2xl transition-all"
        >
          🪑 Mesas
        </button>

        <button
          onClick={() => navigate('/alimentosg')}
          className="bg-orange-500 hover:bg-orange-600 text-white text-4xl font-bold py-6 px-14 rounded-3xl shadow-2xl transition-all"
        >
          🍲 Alimentos
        </button>
      </div>
    </div>
  );
};

export default Gerente;
