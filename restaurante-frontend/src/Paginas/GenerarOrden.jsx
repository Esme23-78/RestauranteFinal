import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GenerarOrden = () => {
  const { id } = useParams();
  const idMesa = id;
  const navigate = useNavigate();

  const [alimentos, setAlimentos] = useState([]);
  const [form, setForm] = useState({
    cliente: '',
    telefono: '',
    comidas: [''],
    bebidas: [''],
    postres: [''],
  });

  const [total, setTotal] = useState(0);
  const [pedidoId, setPedidoId] = useState('');

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const pedidosRes = await axios.get('http://localhost:8080/pedidos');

        // Verificar si ya hay pedido activo para esta mesa
        const pedidosActivos = pedidosRes.data.filter(
          p => p.mesa === idMesa.padStart(3, '0') && p.estado === 'Activo'
        );

        if (pedidosActivos.length > 0) {
          alert('⚠️ Esta mesa ya tiene un pedido activo. Te llevaremos a ese pedido.');
          navigate(`/verorden/${pedidosActivos[0].id}`);
          return;
        }

        // ✅ Generar ID correcto sin duplicados
        const idsNumericos = pedidosRes.data.map(p => parseInt(p.id)).filter(n => !isNaN(n));
        const maxId = idsNumericos.length > 0 ? Math.max(...idsNumericos) : 0;
        const nuevoId = (maxId + 1).toString().padStart(3, '0');
        setPedidoId(nuevoId);

        // Cargar alimentos
        const alimentosRes = await axios.get('http://localhost:8080/alimentos');
        setAlimentos(alimentosRes.data);

      } catch (err) {
        console.error('❌ Error cargando datos', err);
      }
    };

    fetchDatos();
  }, []);

  const getPrecio = (nombre) => {
    const producto = alimentos.find((a) => a.nombre === nombre);
    return producto ? Number(producto.precio) : 0;
  };

  useEffect(() => {
    const suma = [...form.comidas, ...form.bebidas, ...form.postres].reduce(
      (acc, nombre) => acc + getPrecio(nombre),
      0
    );
    setTotal(suma);
  }, [form]);

  const handleSelectChange = (tipo, index, value) => {
    const lista = [...form[tipo]];
    lista[index] = value;
    setForm({ ...form, [tipo]: lista });
  };

  const agregarCampo = (tipo) => {
    setForm({ ...form, [tipo]: [...form[tipo], ''] });
  };

  const eliminarCampo = (tipo, index) => {
    const nuevaLista = [...form[tipo]];
    nuevaLista.splice(index, 1);
    setForm({ ...form, [tipo]: nuevaLista });
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarPedido = async () => {
    const hayProductos = [...form.comidas, ...form.bebidas, ...form.postres].some(p => p);
    if (!hayProductos) {
      alert('Debes seleccionar al menos un producto antes de generar el pedido.');
      return;
    }

    const hora = new Date().toLocaleTimeString('es-MX', { hour12: false });

    const pedido = {
      id: pedidoId,
      mesa: idMesa.padStart(3, '0'),
      cliente: form.cliente,
      telefono: form.telefono,
      total,
      estado: 'Activo',
      hora
    };

    const detalle = [
      ...form.comidas.filter(n => n),
      ...form.bebidas.filter(n => n),
      ...form.postres.filter(n => n)
    ];

    try {
      await axios.post('http://localhost:8080/pedidos', pedido);

      for (const nombre of detalle) {
        const producto = alimentos.find(a => a.nombre === nombre);
        if (producto) {
          await axios.post('http://localhost:8080/detalle', {
            pedidoId: pedidoId,
            alimentoId: producto.id,
            precio: producto.precio
          });
        }
      }

      const mesaRes = await axios.get(`http://localhost:8080/mesas/${idMesa}`);
      const mesaCompleta = mesaRes.data;

      await axios.put(`http://localhost:8080/mesas/${idMesa}`, {
        ...mesaCompleta,
        estado: 'Ocupado'
      });

      alert('✅ Pedido generado correctamente.');
      navigate('/mesas');
    } catch (error) {
      console.error('❌ Error al generar pedido', error);
      alert('Hubo un error al generar el pedido.');
    }
  };

  const opciones = (tipo) =>
    alimentos
      .filter((a) => a.tipo === tipo)
      .map((a) => (
        <option key={a.id} value={a.nombre}>
          {a.nombre}
        </option>
      ));

  const renderCampos = (tipo, label) =>
    form[tipo].map((nombre, idx) => (
      <div key={idx} className="flex items-center gap-2 mb-2">
        <select
          value={nombre}
          onChange={(e) => handleSelectChange(tipo, idx, e.target.value)}
          className="px-2 py-1 border rounded w-full"
        >
          <option value="">Seleccione {label}</option>
          {opciones(label)}
        </select>
        <span className="text-sm text-gray-700 whitespace-nowrap">
          ${getPrecio(nombre)}
        </span>
        {form[tipo].length > 1 && (
          <button
            type="button"
            onClick={() => eliminarCampo(tipo, idx)}
            className="text-red-500 text-sm px-2"
          >
            ❌
          </button>
        )}
      </div>
    ));

  return (
    <div className="relative min-h-screen p-8" style={{ backgroundImage: "url('/img/Pedido.png')", backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      <div className="relative z-10 max-w-2xl mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-1">
          Pedido para Mesa {idMesa?.padStart(3, '0')}
        </h2>
        <p className="text-sm mb-4 text-gray-600">ID Pedido: {pedidoId}</p>

        <input
          type="text"
          name="cliente"
          value={form.cliente}
          onChange={handleInput}
          placeholder="Nombre del cliente"
          className="w-full mb-3 px-3 py-2 border rounded"
          autoComplete="off"
        />
        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleInput}
          placeholder="Teléfono"
          className="w-full mb-5 px-3 py-2 border rounded"
          autoComplete="off"
        />

        <h3 className="font-semibold text-lg text-orange-500">🍽️ Comidas</h3>
        {renderCampos('comidas', 'Comida')}
        <button onClick={() => agregarCampo('comidas')} className="text-green-600 text-sm mb-4">
          ➕ Agregar comida
        </button>

        <h3 className="font-semibold text-lg text-blue-500">🥤 Bebidas</h3>
        {renderCampos('bebidas', 'Bebida')}
        <button onClick={() => agregarCampo('bebidas')} className="text-green-600 text-sm mb-4">
          ➕ Agregar bebida
        </button>

        <h3 className="font-semibold text-lg text-pink-500">🍰 Postres</h3>
        {renderCampos('postres', 'Postre')}
        <button onClick={() => agregarCampo('postres')} className="text-green-600 text-sm mb-4">
          ➕ Agregar postre
        </button>

        <div className="text-right mt-6 font-bold text-lg text-gray-800">
          Total: ${total}
        </div>

        <div className="text-center mt-6">
          <button onClick={generarPedido} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow">
            Generar pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerarOrden;
