import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Ordenes = () => {
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('ordenes');
    if (data) {
      setOrdenes(JSON.parse(data));
    }
  }, []);

  const verPedido = (id) => {
    // Navega dentro de la misma app sin abrir nueva pestaña
    navigate(`/verorden/${id}`);
  };

  const finalizarPedido = (id, numeroMesa) => {
    const nuevasOrdenes = ordenes.filter((o) => o.id !== id);
    setOrdenes(nuevasOrdenes);
    localStorage.setItem('ordenes', JSON.stringify(nuevasOrdenes));

    // Liberar la mesa
    const mesas = JSON.parse(localStorage.getItem('mesas')) || [];
    const mesasActualizadas = mesas.map((m) => {
      const numero = String(m.numero).padStart(3, '0');
      return numero === String(numeroMesa).padStart(3, '0')
        ? { ...m, estado: 'Disponible' }
        : m;
    });
    localStorage.setItem('mesas', JSON.stringify(mesasActualizadas));
  };

  return (
    <div
      className="relative min-h-screen p-8"
      style={{
        backgroundImage: "url('/img/Orden.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Botón regresar */}
      <div className="relative z-10 flex justify-end mb-4">
        <button
          onClick={() => navigate('/meseros')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm"
        >
          ← Regresar
        </button>
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">Órdenes Activas</h1>

        {ordenes.length === 0 ? (
          <p className="text-center text-gray-700">No hay pedidos activos.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-4 py-2">Mesa</th>
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr
                  key={orden.id}
                  className="border-b hover:bg-orange-100 transition-all"
                >
                  <td className="px-4 py-2">Mesa {String(orden.mesa).padStart(3, '0')}</td>
                  <td className="px-4 py-2">{orden.cliente || '-'}</td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    <button
                      onClick={() => verPedido(orden.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => finalizarPedido(orden.id, orden.mesa)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Finalizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Ordenes;
