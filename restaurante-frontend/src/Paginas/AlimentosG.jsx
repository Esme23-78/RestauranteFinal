import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // 👈 Asegúrate de importar tu instancia de axios

const AlimentosG = () => {
  const navigate = useNavigate();
  const [alimentos, setAlimentos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    api.get('/alimentos') // 👈 Carga desde backend
      .then(res => {
        const lista = res.data;

        // Orden personalizado
        const tipoOrden = { 'Comida': 1, 'Bebida': 2, 'Postre': 3 };
        const ordenados = [...lista].sort((a, b) => {
          const tipoA = tipoOrden[a.tipo] || 4;
          const tipoB = tipoOrden[b.tipo] || 4;
          if (tipoA !== tipoB) return tipoA - tipoB;
          return a.nombre.localeCompare(b.nombre);
        });

        setAlimentos(ordenados);
      })
      .catch(err => {
        console.error('Error al cargar alimentos:', err);
      });
  }, []);

  const cerrarSesion = () => {
    navigate('/');
  };

  const eliminarAlimento = () => {
    if (seleccionado !== null) {
      api.delete(`/alimentos/${seleccionado}`)
        .then(() => {
          const nuevos = alimentos.filter((a) => a.id !== seleccionado);
          setAlimentos(nuevos);
          setSeleccionado(null);
        })
        .catch(err => {
          console.error('Error al eliminar alimento:', err);
        });
    }
  };

  const editarAlimento = () => {
    if (seleccionado !== null) {
      navigate(`/alimentosg/editar/${seleccionado}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col px-6 py-8"
      style={{
        backgroundImage: "url('/img/alimentos_fondo.png')",
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
        Gestión de Alimentos
      </h1>

      <div className="z-10 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-4 w-full max-w-full">
        <div className="overflow-y-auto max-h-[500px] rounded-lg border border-gray-300">
          <table className="w-full min-w-[1000px] table-auto text-sm">
            <thead className="sticky top-0 bg-orange-500 text-white">
              <tr>
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Nombre</th>
                <th className="py-2 px-3">Precio</th>
                <th className="py-2 px-3">Tipo</th>
                <th className="py-2 px-3">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {alimentos.map((alimento) => (
                <tr
                  key={alimento.id}
                  onClick={() => setSeleccionado(alimento.id)}
                  className={`cursor-pointer ${seleccionado === alimento.id ? 'bg-orange-100' : 'hover:bg-gray-100'}`}
                >
                  <td className="py-2 px-3">{alimento.id}</td>
                  <td className="py-2 px-3">{alimento.nombre}</td>
                  <td className="py-2 px-3">${alimento.precio}</td>
                  <td className="py-2 px-3">{alimento.tipo}</td>
                  <td className="py-2 px-3">{alimento.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate('/alimentosg/agregar')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            ➕ Agregar
          </button>
          <button
            onClick={editarAlimento}
            disabled={seleccionado === null}
            className={`${seleccionado === null ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'} text-white px-4 py-2 rounded-lg text-sm shadow`}
          >
            ✏️ Editar
          </button>
          <button
            onClick={eliminarAlimento}
            disabled={seleccionado === null}
            className={`${seleccionado === null ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} text-white px-4 py-2 rounded-lg text-sm shadow`}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlimentosG;
