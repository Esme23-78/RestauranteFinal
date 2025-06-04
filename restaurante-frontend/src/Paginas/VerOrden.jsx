import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerOrden = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [detalle, setDetalle] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const pedidoRes = await axios.get(`http://localhost:8080/pedidos/${id}`);
        setPedido(pedidoRes.data);

        const detalleRes = await axios.get(`http://localhost:8080/detalle/pedido/${id}`);
        setDetalle(detalleRes.data); // ya vienen filtrados por pedidoId
      } catch (error) {
        console.error('❌ Error al cargar pedido:', error);
        setPedido(null);
      }
    };

    fetchDatos();
  }, [id]);

  const finalizarPedido = async () => {
    try {
      await axios.put(`http://localhost:8080/pedidos/finalizar/${id}`);
      alert(`✅ Pedido finalizado.\nTotal: $${pedido.total}`);
      navigate('/mesas');
    } catch {
      alert('❌ Error al finalizar el pedido');
    }
  };

  const editarPedido = () => {
    navigate(`/editarorden/${pedido.id}`);
  };

  const renderLista = (tipo) => {
    const filtrados = detalle.filter(item => item.tipo?.toLowerCase() === tipo.toLowerCase());
    if (filtrados.length === 0) {
      return <p className="text-gray-500">Ninguno</p>;
    }

    return (
      <ul className="list-disc list-inside text-gray-800">
        {filtrados.map((item, idx) => (
          <li key={idx}>
            {item.nombre} – ${item.precio}
          </li>
        ))}
      </ul>
    );
  };

  if (!pedido) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Pedido no encontrado.
      </div>
    );
  }

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

      <div className="relative z-10 flex justify-end mb-4">
        <button
          onClick={() => navigate('/mesas')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm"
        >
          ← Regresar
        </button>
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-xl rounded-xl max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">
          Pedido {pedido.id}
        </h1>
        <p className="text-gray-600 mb-4">
          Mesa: <strong>{pedido.mesa}</strong> • Hora: {pedido.hora}
        </p>

        <div className="mb-4">
          <label className="font-semibold block text-gray-700">Cliente:</label>
          <p className="text-gray-900">{pedido.cliente || 'Sin nombre'}</p>
        </div>

        <div className="mb-4">
          <label className="font-semibold block text-gray-700">Teléfono:</label>
          <p className="text-gray-900">{pedido.telefono || 'Sin teléfono'}</p>
        </div>

        <div className="mb-4">
          <label className="font-semibold block text-orange-500">🍽️ Comidas:</label>
          {renderLista('Comida')}
        </div>

        <div className="mb-4">
          <label className="font-semibold block text-blue-500">🥤 Bebidas:</label>
          {renderLista('Bebida')}
        </div>

        <div className="mb-4">
          <label className="font-semibold block text-pink-500">🍰 Postres:</label>
          {renderLista('Postre')}
        </div>

        <div className="text-right font-bold text-lg mt-4">
          Total: ${pedido.total}
        </div>

        {pedido.estado !== 'Finalizado' ? (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={editarPedido}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
            >
              Editar pedido
            </button>
            <button
              onClick={finalizarPedido}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
            >
              Finalizar pedido
            </button>
          </div>
        ) : (
          <div className="mt-6 text-right text-green-700 font-semibold">
            Pedido ya finalizado.
          </div>
        )}
      </div>
    </div>
  );
};

export default VerOrden;
