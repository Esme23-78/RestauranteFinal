import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const EditarMesero = () => {
  const navigate = useNavigate();
  const { numero } = useParams();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [form, setForm] = useState({
    nombre: '', paterno: '', materno: '', edad: '', sexo: '',
    rfc: '', telefono: '', correo: '', direccion: '', horario: '',
    usuario: '', contrasena: '', rol: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/meseros/${numero}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        alert('Error al obtener el mesero');
        navigate('/meserosg');
      });
  }, [numero, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleActualizar = () => {
    axios.put(`http://localhost:8080/meseros/${numero}`, form)
      .then(() => {
        navigate('/meserosg');
      })
      .catch(() => {
        alert('Error al actualizar el mesero');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative"
         style={{ backgroundImage: "url('/img/agregar_editar.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-4xl border-4 border-orange-500">
        <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">Editar Mesero</h2>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          {[
            { name: 'nombre', placeholder: 'Nombre(s)' },
            { name: 'paterno', placeholder: 'Apellido Paterno' },
            { name: 'materno', placeholder: 'Apellido Materno' },
            { name: 'edad', placeholder: 'Edad', type: 'number' },
            { name: 'rfc', placeholder: 'RFC' },
            { name: 'telefono', placeholder: 'Teléfono' },
            { name: 'correo', placeholder: 'Correo' },
            { name: 'direccion', placeholder: 'Dirección', col: 2 },
            { name: 'usuario', placeholder: 'Usuario' }
          ].map(({ name, placeholder, type = 'text', col }) => (
            <input
              key={name}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              autoComplete="off"
              placeholder={placeholder}
              className={`border border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2 ${col === 2 ? 'col-span-2' : ''}`}
            />
          ))}

          <div className="relative">
            <input
              type={mostrarContrasena ? 'text' : 'password'}
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              placeholder="Contraseña"
              autoComplete="off"
              className="border border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2 w-full pr-10"
            />
            <span
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
            >
              {mostrarContrasena ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <select name="sexo" value={form.sexo} onChange={handleChange}
                  className="border border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2">
            <option value="">Sexo</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
          </select>

          <select name="horario" value={form.horario} onChange={handleChange}
                  className="border border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2">
            <option value="">Seleccione horario</option>
            <option value="Lunes a Viernes 8 am - 4 pm">Lunes a Viernes 8 am - 4 pm</option>
            <option value="Lunes a Viernes 1 pm - 9 pm">Lunes a Viernes 1 pm - 9 pm</option>
            <option value="Sabado a Domingo 8 am - 9 pm">Sabado a Domingo 8 am - 9 pm</option>
          </select>

          <select name="rol" value={form.rol} onChange={handleChange}
                  className="col-span-2 border border-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2">
            <option value="">Seleccione rol</option>
            <option value="Mesero">Mesero</option>
            <option value="Gerente">Gerente</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={() => navigate('/meserosg')}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded">
            Regresar
          </button>
          <button onClick={handleActualizar}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarMesero;
