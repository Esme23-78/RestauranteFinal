import React, { useState } from 'react';
import axios from 'axios';

const Recuperar = () => {
  const [correo, setCorreo] = useState('');

  const handleEnviar = async () => {
    if (!correo.includes('@')) {
      alert('❌ Ingresa un correo válido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/recuperacion', { correo });
      alert(response.data); // ✅ Mensaje del backend
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('❌ El correo no está registrado.');
      } else {
        alert('❌ Error al enviar el correo.');
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/img/fondo.png')" }}>
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-md w-[350px] text-center">
        <h2 className="text-2xl font-bold text-orange-600 mb-2">¿Olvidaste tu contraseña?</h2>
        <p className="text-sm mb-6 text-gray-700">Ingresa tu correo electrónico para recuperar el acceso.</p>

        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="ej. chedy@mail.com"
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleEnviar}
          className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded"
        >
          Enviar enlace
        </button>

        <p className="mt-4 text-sm text-gray-700">
          ¿Ya recordaste tu contraseña?
          <a href="/" className="text-orange-600 hover:underline font-semibold"> Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Recuperar;
