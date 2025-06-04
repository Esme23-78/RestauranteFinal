import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarOrden = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pedido, setPedido] = useState(null);
  const [alimentos, setAlimentos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const pedidoRes = await axios.get(`http://localhost:8080/pedidos/${id}`);
        const detalleRes = await axios.get(`http://localhost:8080/detalle/pedido/${id}`);
        const alimentosRes = await axios.get(`http://localhost:8080/alimentos`);

        setAlimentos(alimentosRes.data);

        const agrupado = { comidas: [], bebidas: [], postres: [] };
        for (const item of detalleRes.data) {
          if (item.tipo === 'Comida') agrupado.comidas.push({ ...item });
          else if (item.tipo === 'Bebida') agrupado.bebidas.push({ ...item });
          else agrupado.postres.push({ ...item });
        }

        const pedidoCompleto = {
          ...pedidoRes.data,
          ...agrupado,
        };

        setPedido(pedidoCompleto);
        calcularTotal(pedidoCompleto);
      } catch (error) {
        console.error('❌ Error al cargar datos del pedido:', error);
      }
    };

    fetchDatos();
  }, [id]);

  const calcularTotal = (datos) => {
    const lista = [...(datos.comidas || []), ...(datos.bebidas || []), ...(datos.postres || [])];
    const suma = lista.reduce((acc, item) => acc + Number(item.precio || 0), 0);
    setTotal(suma);
  };

  const handleAgregar = (tipo) => {
    setPedido((prev) => ({
      ...prev,
      [tipo]: [...prev[tipo], { nombre: '', precio: 0 }],
    }));
  };

  const handleSeleccionar = (tipo, index, nombre) => {
    const seleccionado = alimentos.find((a) => a.nombre === nombre);
    const actualizados = [...pedido[tipo]];
    actualizados[index] = {
      nombre,
      precio: seleccionado?.precio || 0,
      id: seleccionado?.id || null,
    };
    const actualizado = { ...pedido, [tipo]: actualizados };
    setPedido(actualizado);
    calcularTotal(actualizado);
  };

  const handleEliminar = (tipo, index) => {
    const actualizados = [...pedido[tipo]];
    actualizados.splice(index, 1);
    const actualizado = { ...pedido, [tipo]: actualizados };
    setPedido(actualizado);
    calcularTotal(actualizado);
  };

  const handleGuardar = async () => {
    try {
      await axios.put(`http://localhost:8080/pedidos/${id}`, {
        cliente: pedido.cliente,
        telefono: pedido.telefono,
        total,
        estado: pedido.estado,
        hora: pedido.hora,
        mesa: pedido.mesa,
      });

      await axios.delete(`http://localhost:8080/detalle/pedido/${id}`);

      const detalles = [...pedido.comidas, ...pedido.bebidas, ...pedido.postres].filter((d) => d.nombre);
      for (const item of detalles) {
        const alimento = alimentos.find((a) => a.nombre === item.nombre);
        if (alimento) {
          await axios.post(`http://localhost:8080/detalle`, {
            pedidoId: id,
            alimentoId: alimento.id,
            precio: alimento.precio,
          });
        }
      }

      alert('✅ Pedido actualizado correctamente.');
      navigate(`/verorden/${id}`);
    } catch (error) {
      console.error('❌ Error al guardar el pedido:', error);
      alert('No se pudo guardar el pedido.');
    }
  };

  const renderCampos = (tipo, label) =>
    pedido[tipo]?.map((item, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <select
          value={item.nombre}
          onChange={(e) => handleSeleccionar(tipo, index, e.target.value)}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="">Seleccione {label}</option>
          {alimentos
            .filter((a) => a.tipo === label)
            .map((a) => (
              <option key={a.id} value={a.nombre}>
                {a.nombre}
              </option>
            ))}
        </select>
        <span className="text-sm text-gray-700 whitespace-nowrap">${item.precio}</span>
        <button
          type="button"
          onClick={() => handleEliminar(tipo, index)}
          className="text-red-500 text-sm px-2"
        >
          ❌
        </button>
      </div>
    ));

  if (!pedido) return <div className="p-8 text-red-500">Cargando pedido...</div>;

  return (
    <div className="relative min-h-screen p-8" style={{ backgroundImage: "url('/img/Orden.png')", backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-xl rounded-xl max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">Editar Pedido {pedido.id}</h1>

        <input
          type="text"
          value={pedido.cliente}
          onChange={(e) => setPedido({ ...pedido, cliente: e.target.value })}
          placeholder="Nombre del cliente"
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="text"
          value={pedido.telefono}
          onChange={(e) => setPedido({ ...pedido, telefono: e.target.value })}
          placeholder="Teléfono"
          className="w-full mb-6 p-2 border rounded"
        />

        <h2 className="text-orange-500 font-bold mb-1">🍽️ Comidas</h2>
        {renderCampos('comidas', 'Comida')}
        <button onClick={() => handleAgregar('comidas')} className="text-sm text-green-600 hover:underline mb-4">
          + Agregar comida
        </button>

        <h2 className="text-blue-500 font-bold mb-1">🥤 Bebidas</h2>
        {renderCampos('bebidas', 'Bebida')}
        <button onClick={() => handleAgregar('bebidas')} className="text-sm text-green-600 hover:underline mb-4">
          + Agregar bebida
        </button>

        <h2 className="text-pink-500 font-bold mb-1">🍰 Postres</h2>
        {renderCampos('postres', 'Postre')}
        <button onClick={() => handleAgregar('postres')} className="text-sm text-green-600 hover:underline mb-4">
          + Agregar postre
        </button>

        <div className="text-right font-bold text-lg mt-4 mb-6">Total: ${total}</div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate(`/verorden/${id}`)}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarOrden;
