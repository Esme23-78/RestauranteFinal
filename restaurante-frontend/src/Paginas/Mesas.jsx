import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Mesas = () => {
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);

  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
  const nombreUsuario = `${usuarioActual?.nombre || ''} ${usuarioActual?.paterno || ''} ${usuarioActual?.materno || ''}`.trim();

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActual');
    navigate('/');
  };

  useEffect(() => {
    axios.get('http://localhost:8080/mesas')
      .then(res => {
        const ordenadas = res.data.sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
        setMesas(ordenadas);
      })
      .catch(err => {
        console.error('Error al obtener mesas:', err);
        alert('No se pudo cargar la información de las mesas');
      });
  }, []);

  const irAGenerarOVisualizarOrden = async (mesa) => {
    if (mesa.estado === 'Reservado') {
      alert(`La Mesa ${mesa.numero} está reservada. Solo puede ser usada si se desocupa.`);
      return;
    }

    if (mesa.estado === 'Ocupado') {
      try {
        const res = await axios.get(`http://localhost:8080/pedidos`);
        const pedido = res.data.find(p => p.mesa === mesa.numero && p.estado === 'Activo');
        if (pedido) {
          navigate(`/verorden/${pedido.id}`);
          return;
        } else {
          alert(`⚠️ La Mesa ${mesa.numero} está ocupada, pero no tiene un pedido activo.\nContacta al gerente para liberar la mesa o verificar el estado.`);
          return;
        }
      } catch (err) {
        console.error('Error al buscar pedido activo', err);
        alert('Hubo un error al consultar los pedidos. Intenta de nuevo.');
        return;
      }
    }

    // Si la mesa está desocupada
    navigate(`/generarorden/${mesa.numero}`);
  };

  const obtenerColorMesa = (estado) => {
    switch (estado) {
      case 'Ocupado':
        return 'bg-red-900';
      case 'Reservado':
        return 'bg-blue-900';
      default:
        return 'bg-orange-600'; // Desocupado
    }
  };

  const renderSillas = (lado, count) => {
    const sillas = [];
    for (let i = 0; i < count; i++) {
      const offset = (i - (count - 1) / 2) * 16;
      const style = {
        top: lado === 'top' ? '-12px' : undefined,
        bottom: lado === 'bottom' ? '-12px' : undefined,
        left: lado === 'left' ? '-12px' : undefined,
        right: lado === 'right' ? '-12px' : undefined,
        transform: `translate${lado === 'top' || lado === 'bottom' ? 'X' : 'Y'}(${offset}px)`,
      };
      sillas.push(
        <div
          key={lado + i}
          className="w-4 h-4 bg-white rounded-full border absolute z-10"
          style={style}
        ></div>
      );
    }
    return sillas;
  };

  return (
    <div
      className="relative min-h-screen px-6 py-8 overflow-y-auto"
      style={{
        backgroundImage: "url('/img/mesa_fondo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={cerrarSesion}
          className="bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-6 py-2 rounded-xl shadow-lg transition-all"
        >
          Cerrar sesión
        </button>
      </div>

      <h1 className="z-10 relative text-white text-3xl font-bold bg-black/60 px-6 py-2 rounded-xl shadow-lg w-fit mb-6">
        Bienvenido, {nombreUsuario}
      </h1>

      <div className="z-10 relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-12">
        {mesas.map((mesa) => {
          const capacidad = parseInt(mesa.capacidad);
          const base = Math.floor(capacidad / 4);
          let extra = capacidad % 4;
          const distribucion = [base, base, base, base];
          for (let i = 0; i < 4 && extra > 0; i++) {
            distribucion[i]++;
            extra--;
          }

          return (
            <div
              key={mesa.numero}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => irAGenerarOVisualizarOrden(mesa)}
            >
              <div className="relative w-32 h-32 bg-orange-200 rounded-xl shadow-md flex items-center justify-center">
                <div className={`${obtenerColorMesa(mesa.estado)} w-20 h-20 rounded-md absolute z-0`}></div>
                {renderSillas('top', distribucion[0])}
                {renderSillas('right', distribucion[1])}
                {renderSillas('bottom', distribucion[2])}
                {renderSillas('left', distribucion[3])}
              </div>
              <span className="mt-2 text-white font-semibold text-sm bg-black/80 px-4 py-1 rounded-full shadow">
                Mesa {String(mesa.numero).padStart(3, '0')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mesas;
