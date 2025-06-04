import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const AgregarMesero = () => {
  const navigate = useNavigate();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    paterno: '',
    materno: '',
    edad: '',
    sexo: '',
    rfc: '',
    telefono: '',
    correo: '',
    direccion: '',
    horario: '',
    usuario: '',
    contrasena: '',
    rol: '',
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevosErrores = {};
    const soloLetras = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
    const correoValido = /^[\w.-]+@(gmail\.com|itoaxaca\.edu\.mx|hotmail\.com)$/;
    const primerNombre = form.nombre.trim().split(' ')[0];
    const usuarioValido = new RegExp(`^${primerNombre}\\d{3}$`, 'i');
    const rfcValido = /^[A-Za-z0-9]{13}$/;

    if (!soloLetras.test(form.nombre)) nuevosErrores.nombre = 'Solo letras';
    if (!soloLetras.test(form.paterno)) nuevosErrores.paterno = 'Solo letras';
    if (!soloLetras.test(form.materno)) nuevosErrores.materno = 'Solo letras';

    const edadNum = parseInt(form.edad);
    if (isNaN(edadNum) || edadNum < 18 || edadNum > 75)
      nuevosErrores.edad = 'Edad entre 18 y 75';

    if (!rfcValido.test(form.rfc)) nuevosErrores.rfc = 'Debe tener 13 caracteres alfanuméricos';
    if (!/^\d{10}$/.test(form.telefono)) nuevosErrores.telefono = 'Teléfono debe tener exactamente 10 dígitos';
    if (!correoValido.test(form.correo)) nuevosErrores.correo = 'Dominio no permitido';
    if (!form.sexo) nuevosErrores.sexo = 'Seleccione sexo';
    if (!form.horario) nuevosErrores.horario = 'Seleccione horario';
    if (!form.rol) nuevosErrores.rol = 'Seleccione un rol';
    if (!usuarioValido.test(form.usuario)) nuevosErrores.usuario = `Debe iniciar con el nombre y 3 números (Ej. ${primerNombre}123)`;
    if (!form.contrasena || form.contrasena.length !== 8) nuevosErrores.contrasena = 'Debe tener exactamente 8 caracteres';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const handleAñadir = async () => {
    if (!validar()) return;
    try {
      await axios.post('http://localhost:8080/meseros', form);
      navigate('/meserosg');
    } catch (error) {
      alert('Error al guardar el mesero');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: "url('/img/agregar_editar.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      <div className="relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-4xl border-4 border-orange-500">
        <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">Agregar Nuevo Mesero</h2>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          {/* Campos de texto */}
          {[{ name: 'nombre', placeholder: 'Nombre(s)' },
            { name: 'paterno', placeholder: 'Apellido Paterno' },
            { name: 'materno', placeholder: 'Apellido Materno' },
            { name: 'edad', placeholder: 'Edad', type: 'number' },
            { name: 'rfc', placeholder: 'RFC' },
            { name: 'telefono', placeholder: 'Teléfono' },
            { name: 'correo', placeholder: 'Correo' },
            { name: 'direccion', placeholder: 'Dirección', col: 2 },
            { name: 'usuario', placeholder: 'Usuario' }
          ].map(({ name, placeholder, type = 'text', col }) => (
            <div key={name} className={`flex flex-col ${col === 2 ? 'col-span-2' : ''}`}>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                autoComplete="off"
                className="border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2"
              />
              {errores[name] && <span className="text-red-600 text-xs mt-1">{errores[name]}</span>}
            </div>
          ))}

          {/* Contraseña */}
          <div className="col-span-2 flex flex-col relative">
            <input
              type={mostrarContrasena ? 'text' : 'password'}
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              placeholder="Contraseña"
              autoComplete="off"
              className="border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2 pr-10"
            />
            <span
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600 text-xl"
            >
              {mostrarContrasena ? <FiEyeOff /> : <FiEye />}
            </span>
            {errores.contrasena && <span className="text-red-600 text-xs mt-1">{errores.contrasena}</span>}
          </div>

          {/* Selects */}
          <div className="flex flex-col">
            <select
              name="sexo"
              value={form.sexo}
              onChange={handleChange}
              className="border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2"
            >
              <option value="">Sexo</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
            {errores.sexo && <span className="text-red-600 text-xs mt-1">{errores.sexo}</span>}
          </div>

          <div className="flex flex-col">
            <select
              name="horario"
              value={form.horario}
              onChange={handleChange}
              className="border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2"
            >
              <option value="">Seleccione horario</option>
              <option value="Lunes a Viernes 8 am - 4 pm">Lunes a Viernes 8 am - 4 pm</option>
              <option value="Lunes a Viernes 1 pm - 9 pm">Lunes a Viernes 1 pm - 9 pm</option>
              <option value="Sabado a Domingo 8 am - 9 pm">Sabado a Domingo 8 am - 9 pm</option>
            </select>
            {errores.horario && <span className="text-red-600 text-xs mt-1">{errores.horario}</span>}
          </div>

          <div className="col-span-2 flex flex-col">
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md px-3 py-2"
            >
              <option value="">Seleccione rol</option>
              <option value="Mesero">Mesero</option>
              <option value="Gerente">Gerente</option>
            </select>
            {errores.rol && <span className="text-red-600 text-xs mt-1">{errores.rol}</span>}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate('/meserosg')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
          >
            Regresar
          </button>
          <button
            type="button"
            onClick={handleAñadir}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarMesero;