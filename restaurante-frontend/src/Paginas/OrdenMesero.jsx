import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrdenMesero = () => {
  const { idMesa } = useParams();
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

  // Cargar alimentos y asignar ID de pedido
  useEffect(() => {
    const data = localStorage.getItem('alimentos');
    if (data) {
      setAlimentos(JSON.parse(data));
    }

    const ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];
    const nextId = (ordenes.length + 1).toString().padStart(3, '0');
    setPedidoId(nextId);
  }, []);

  const getPrecio = (nombre) => {
    const producto = alimentos.find(a => a.nombre === nombre);
    return producto ? Number(producto.precio) : 0;
  };

  const calcularTotal = () => {
    const suma = [
      ...form.comidas,
      ...form.bebidas,
      ...form.postres
    ].reduce((acc, nombre) => acc + getPrecio(nombre), 0);
    setTotal(suma);
  };

  useEffect(() => {
    calcularTotal();
  }, [form]);

  const handleSelectChange = (tipo, index, value) => {
    const lista = [...form[tipo]];
    lista[index] = value;
    setForm({ ...form, [tipo]: lista });
  };

  const agregarCampo = (tipo) => {
    setForm({ ...form, [tipo]: [...form[tipo], ''] });
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generarPedido = () => {
    const ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];

    const pedido = {
      id: pedidoId,
      mesa: idMesa,
      cliente: form.cliente,
      telefono: form.telefono,
      comidas: form.comidas.filter(n => n).map(nombre => ({ nombre, precio: getPrecio(nombre) })),
      bebidas: form.bebidas.filter(n => n).map(nombre => ({ nombre, precio: getPrecio(nombre) })),
      postres: form.postres.filter(n => n).map(nombre => ({ nombre, precio: getPrecio(nombre) })),
      total,
      estado: 'Activo',
      hora: new Date().toLocaleTimeString()
    };

    localStorage.setItem('ordenes', JSON.stringify([...ordenes, pedido]));

    // Cambiar estado de mesa
    const mesas = JSON.parse(localStorage.getItem('mesas')) || [];
    const nuevas = mesas.map(m =>
      m.numero === idMesa ? { ...m, estado: 'Ocupado' } : m
    );
    localStorage.setItem('mesas', JSON.stringify(nuevas));

    alert('Pedido generado correctamente.');
    navigate('/mesas');
  };

  const opciones = (tipo) =>
    alimentos
      .filter((a) => a.tipo === tipo)
      .map((a) => (
        <option key={a.nombre} value={a.nombre}>
          {a.nombre}
        </option>
      ));

  const renderCampos = (tipo, label) =>
    form[tipo].map((nombre, idx) => (
      <div key={idx} className="flex items-center gap-2 mb-2">
        <select
          value={nombre}
          onChange={(e) => handleSelectChange(tipo, idx, e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="">Seleccione {label}</option>
          {opciones(label)}
        </select>
        <span className="text-sm text-gray-700">
          ${getPrecio(nombre)}
        </span>
      </div>
    ));

  return (
    <div className="min-h-screen bg-orange-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          Pedido para Mesa {idMesa.padStart(3, '0')}
        </h2>

        <p className="text-sm mb-4 text-gray-600">ID Pedido: {pedidoId}</p>

        <input
          type="text"
          name="cliente"
          value={form.cliente}
          onChange={handleInput}
          placeholder="Nombre del cliente"
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleInput}
          placeholder="Teléfono"
          className="w-full mb-5 px-3 py-2 border rounded"
        />

        <h3 className="font-semibold text-lg text-orange-500">🍽️ Comidas</h3>
        {renderCampos('comidas', 'Comida')}
        <button
          onClick={() => agregarCampo('comidas')}
          className="text-green-600 text-sm mb-4"
        >
          ➕ Agregar comida
        </button>

        <h3 className="font-semibold text-lg text-blue-500">🥤 Bebidas</h3>
        {renderCampos('bebidas', 'Bebida')}
        <button
          onClick={() => agregarCampo('bebidas')}
          className="text-green-600 text-sm mb-4"
        >
          ➕ Agregar bebida
        </button>

        <h3 className="font-semibold text-lg text-pink-500">🍰 Postres</h3>
        {renderCampos('postres', 'Postre')}
        <button
          onClick={() => agregarCampo('postres')}
          className="text-green-600 text-sm mb-4"
        >
          ➕ Agregar postre
        </button>

        <div className="text-right mt-6 font-bold text-lg">
          Total: ${total}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={generarPedido}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow"
          >
            Generar pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdenMesero;
