import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MesasG = () => {
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

 useEffect(() => {
  fetch('http://localhost:8080/mesas')
    .then(res => res.json())
    .then(data => {
      // Ordenar por número de mesa (numérico, no string)
      const ordenadas = [...data].sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
      setMesas(ordenadas);
    })
    .catch(err => {
      console.error('Error al cargar las mesas:', err);
      alert('No se pudo conectar con el backend');
    });
}, []);

  const cerrarSesion = () => {
    navigate('/');
  };

  const eliminarMesa = () => {
    if (seleccionado !== null) {
      fetch(`http://localhost:8080/mesas/${seleccionado}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al eliminar');
          // Actualizar lista
          setMesas(mesas.filter(m => m.numero !== seleccionado));
          setSeleccionado(null);
        })
        .catch(err => {
          console.error('Error al eliminar mesa:', err);
          alert('No se pudo eliminar la mesa');
        });
    }
  };

  const editarMesa = () => {
    if (seleccionado !== null) {
      navigate(`/mesasg/editar/${seleccionado}`);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col px-6 py-8"
      style={{
        backgroundImage: "url('/img/mesa_fondo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
        Gestión de Mesas
      </h1>

      <div className="z-10 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-4 w-full max-w-full">
        <div className="overflow-y-auto max-h-[500px] rounded-lg border border-gray-300">
          <table className="w-full min-w-[900px] table-auto text-sm">
            <thead className="sticky top-0 bg-orange-500 text-white">
              <tr>
                <th className="py-2 px-3">Número</th>
                <th className="py-2 px-3">Capacidad</th>
                <th className="py-2 px-3">Ubicación</th>
                <th className="py-2 px-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {mesas.map((mesa) => (
                <tr
                  key={mesa.numero}
                  onClick={() => setSeleccionado(mesa.numero)}
                  className={`cursor-pointer ${
                    seleccionado === mesa.numero ? 'bg-orange-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <td className="py-2 px-3">{mesa.numero}</td>
                  <td className="py-2 px-3">{mesa.capacidad}</td>
                  <td className="py-2 px-3">{mesa.ubicacion}</td>
                  <td className="py-2 px-3">{mesa.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate('/mesasg/agregar')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            ➕ Agregar
          </button>
          <button
            onClick={editarMesa}
            disabled={seleccionado === null}
            className={`${
              seleccionado === null ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white px-4 py-2 rounded-lg text-sm shadow`}
          >
            ✏️ Editar
          </button>
          <button
            onClick={eliminarMesa}
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

export default MesasG;
