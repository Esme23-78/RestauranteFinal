import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MeserosG = () => {
  const navigate = useNavigate();
  const [meseros, setMeseros] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  // Cargar desde backend
  useEffect(() => {
    axios.get('http://localhost:8080/meseros')
      .then(res => setMeseros(res.data))
      .catch(() => alert('Error al cargar los meseros'));
  }, []);

  const cerrarSesion = () => {
    navigate('/');
  };

  const eliminarMesero = () => {
    if (seleccionado !== null) {
      axios.delete(`http://localhost:8080/meseros/${seleccionado}`)
        .then(() => {
          setMeseros(prev => prev.filter(m => m.id !== seleccionado));
          setSeleccionado(null);
        })
        .catch(() => alert('Error al eliminar el mesero'));
    }
  };

  const editarMesero = () => {
    if (seleccionado !== null) {
      navigate(`/meserosg/editar/${seleccionado}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col px-6 py-8" style={{
      backgroundImage: "url('/img/mesero_fondo.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="absolute top-6 right-6 z-10 flex gap-4">
        <button
          onClick={() => navigate('/gerente')}
          className="bg-white hover:bg-gray-200 text-black text-lg font-semibold px-6 py-2 rounded-xl shadow-lg transition-all"
        >
          ← Regresar
        </button>
        <button
          onClick={cerrarSesion}
          className="bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-6 py-2 rounded-xl shadow-lg transition-all"
        >
          Cerrar sesión
        </button>
      </div>

      <h1 className="z-10 text-white text-3xl font-bold bg-black/60 px-6 py-2 rounded-xl shadow-lg w-fit mb-4">
        Gestión de Meseros del Restaurante CHEDYS
      </h1>

      <div className="z-10 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-4 w-full max-w-full">
        <div className="overflow-y-auto max-h-[500px] rounded-lg border border-gray-300">
          <table className="w-full min-w-[1200px] table-auto text-sm">
            <thead className="sticky top-0 bg-orange-500 text-white">
              <tr>
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Nombre</th>
                <th className="py-2 px-3">Paterno</th>
                <th className="py-2 px-3">Materno</th>
                <th className="py-2 px-3">Edad</th>
                <th className="py-2 px-3">Sexo</th>
                <th className="py-2 px-3">RFC</th>
                <th className="py-2 px-3">Teléfono</th>
                <th className="py-2 px-3">Correo</th>
                <th className="py-2 px-3">Dirección</th>
                <th className="py-2 px-3">Horario</th>
                <th className="py-2 px-3">Usuario</th>
                <th className="py-2 px-3">Rol</th>
              </tr>
            </thead>
            <tbody>
              {meseros.map((mesero, index) => (
                <tr
                  key={mesero.id}
                  onClick={() => setSeleccionado(mesero.id)}
                  className={`cursor-pointer ${seleccionado === mesero.id ? 'bg-orange-100' : 'hover:bg-gray-100'}`}
                >
                  <td className="py-2 px-3">{String(index + 1).padStart(3, '0')}</td>
                  <td className="py-2 px-3">{mesero.nombre}</td>
                  <td className="py-2 px-3">{mesero.paterno}</td>
                  <td className="py-2 px-3">{mesero.materno}</td>
                  <td className="py-2 px-3">{mesero.edad}</td>
                  <td className="py-2 px-3">{mesero.sexo}</td>
                  <td className="py-2 px-3">{mesero.rfc}</td>
                  <td className="py-2 px-3">{mesero.telefono}</td>
                  <td className="py-2 px-3">{mesero.correo}</td>
                  <td className="py-2 px-3">{mesero.direccion}</td>
                  <td className="py-2 px-3">{mesero.horario}</td>
                  <td className="py-2 px-3">{mesero.usuario}</td>
                  <td className="py-2 px-3">{mesero.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate('/meserosg/agregar')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            ➕ Agregar
          </button>
          <button
            onClick={editarMesero}
            disabled={seleccionado === null}
            className={`${
              seleccionado === null ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white px-4 py-2 rounded-lg text-sm shadow`}
          >
            ✏️ Editar
          </button>
          <button
            onClick={eliminarMesero}
            disabled={seleccionado === null}
            className={`${
              seleccionado === null ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
            } text-white px-4 py-2 rounded-lg text-sm shadow`}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeserosG;
