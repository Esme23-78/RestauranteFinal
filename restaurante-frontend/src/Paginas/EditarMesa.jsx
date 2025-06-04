import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditarMesa = () => {
  const navigate = useNavigate();
  const { numero } = useParams();
  const [form, setForm] = useState({
    numero: '',
    capacidad: '',
    ubicacion: '',
    estado: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/mesas/${numero}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch(() => {
        alert('Mesa no encontrada');
        navigate('/mesasg');
      });
  }, [numero, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.capacidad || isNaN(form.capacidad) || form.capacidad < 1 || form.capacidad > 12) {
      nuevosErrores.capacidad = 'Debe ser un número entre 1 y 12';
    }
    if (!form.ubicacion) {
      nuevosErrores.ubicacion = 'Seleccione una ubicación';
    }
    if (!form.estado) {
      nuevosErrores.estado = 'Seleccione un estado';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const actualizar = () => {
    if (validar()) {
      axios.put(`http://localhost:8080/mesas/${numero}`, form)
        .then(() => navigate('/mesasg'))
        .catch(() => alert('Hubo un error al actualizar la mesa'));
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        backgroundImage: "url('/img/mesa_fondo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-xl z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Mesa</h2>

        <div className="mb-4">
          <label className="font-semibold block">Número de mesa:</label>
          <input
            type="text"
            name="numero"
            value={form.numero}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold block">Capacidad:</label>
          <input
            type="number"
            name="capacidad"
            value={form.capacidad}
            onChange={handleChange}
            min={1}
            max={12}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errores.capacidad && <p className="text-red-600 text-sm">{errores.capacidad}</p>}
        </div>

        <div className="mb-4">
          <label className="font-semibold block">Ubicación:</label>
          <select
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Seleccione una zona</option>
            <option value="Zona Norte">Zona Norte</option>
            <option value="Zona Sur">Zona Sur</option>
            <option value="Zona Este">Zona Este</option>
            <option value="Zona Oeste">Zona Oeste</option>
            <option value="Zona Centro">Zona Centro</option>
          </select>
          {errores.ubicacion && <p className="text-red-600 text-sm">{errores.ubicacion}</p>}
        </div>

        <div className="mb-6">
          <label className="font-semibold block">Estado:</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Seleccione</option>
            <option value="Desocupado">Desocupado</option>
            <option value="Ocupado">Ocupado</option>
          </select>
          {errores.estado && <p className="text-red-600 text-sm">{errores.estado}</p>}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/mesasg')}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded"
          >
            Regresar
          </button>
          <button
            onClick={actualizar}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarMesa;
