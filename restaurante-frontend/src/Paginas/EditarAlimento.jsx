import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarAlimento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    precio: '',
    tipo: '',
    descripcion: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/alimentos`)
      .then(res => res.json())
      .then(data => {
        const alimento = data.find(a => a.id === parseInt(id));
        if (alimento) {
          setForm(alimento);
        } else {
          alert('Alimento no encontrado');
          navigate('/alimentosg');
        }
      })
      .catch(err => {
        console.error('Error al obtener el alimento:', err);
        alert('Error al conectar con el backend');
      });
  }, [id, navigate]);

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

  const actualizar = () => {
    if (validar()) {
      fetch(`http://localhost:8080/alimentos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: form.nombre,
          precio: parseFloat(form.precio),
          tipo: form.tipo,
          descripcion: form.descripcion
        })
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al actualizar');
          return res.json();
        })
        .then(() => {
          navigate('/alimentosg');
        })
        .catch(err => {
          console.error(err);
          alert('Error al actualizar el alimento');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Alimento</h2>

        <div className="mb-4">
          <label className="font-semibold block">ID:</label>
          <input
            type="text"
            name="id"
            value={form.id}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

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

export default EditarAlimento;
