import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgregarAlimento = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    tipo: '',
    descripcion: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const validar = () => {
    const nuevosErrores = {};
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!form.nombre.trim() || !soloLetras.test(form.nombre)) {
      nuevosErrores.nombre = 'Solo letras y espacios. Campo obligatorio.';
    }
    if (!form.precio || isNaN(form.precio) || Number(form.precio) <= 0) {
      nuevosErrores.precio = 'Debe ser un número mayor a 0.';
    }
    if (!form.tipo) {
      nuevosErrores.tipo = 'Seleccione un tipo de alimento.';
    }
    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = 'Campo obligatorio.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardar = () => {
    if (validar()) {
      fetch("http://localhost:8080/alimentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: form.nombre,
          precio: parseFloat(form.precio),
          tipo: form.tipo,
          descripcion: form.descripcion
        })
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al guardar en el backend");
          return res.json();
        })
        .then(() => {
          navigate('/alimentosg');
        })
        .catch((err) => {
          alert("Error al guardar el alimento: " + err.message);
        });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        backgroundImage: "url('/img/alimentos_fondo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-xl z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Agregar Alimento</h2>

        <div className="mb-4">
          <label className="font-semibold block">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errores.nombre && <p className="text-red-600 text-sm">{errores.nombre}</p>}
        </div>

        <div className="mb-4">
          <label className="font-semibold block">Precio:</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            min={1}
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errores.precio && <p className="text-red-600 text-sm">{errores.precio}</p>}
        </div>

        <div className="mb-4">
          <label className="font-semibold block">Tipo:</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Seleccione</option>
            <option value="Comida">Comida</option>
            <option value="Postre">Postre</option>
            <option value="Bebida">Bebida</option>
          </select>
          {errores.tipo && <p className="text-red-600 text-sm">{errores.tipo}</p>}
        </div>

        <div className="mb-6">
          <label className="font-semibold block">Descripción:</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded resize-none"
          ></textarea>
          {errores.descripcion && <p className="text-red-600 text-sm">{errores.descripcion}</p>}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/alimentosg')}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded"
          >
            Regresar
          </button>
          <button
            onClick={guardar}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarAlimento;
