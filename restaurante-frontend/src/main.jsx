import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Páginas
import Login from './Paginas/Login';
import Recuperar from './Paginas/Recuperar';
import Gerente from './Paginas/Gerente';
import Meseros from './Paginas/Meseros';
import MeserosG from './Paginas/MeserosG';
import MesasG from './Paginas/MesasG';
import AlimentosG from './Paginas/AlimentosG';
import AgregarMesero from './Paginas/AgregarMesero';
import EditarMesero from './Paginas/EditarMesero';
import AgregarMesa from './Paginas/AgregarMesa';
import EditarMesa from './Paginas/EditarMesa';
import AgregarAlimento from './Paginas/AgregarAlimento';
import EditarAlimento from './Paginas/EditarAlimento';
import Mesas from './Paginas/Mesas';
import GenerarOrden from './Paginas/GenerarOrden';
import OrdenMesero from './Paginas/OrdenMesero';
import Ordenes from './Paginas/Ordenes';
import VerOrden from './Paginas/VerOrden';
import EditarOrden from './Paginas/EditarOrden';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/gerente" element={<Gerente />} />
        <Route path="/meseros" element={<Meseros />} />
        <Route path="/meserosg" element={<MeserosG />} />
        <Route path="/mesasg" element={<MesasG />} />
        <Route path="/alimentosg" element={<AlimentosG />} />

        {/* CRUD Meseros */}
        <Route path="/meserosg/agregar" element={<AgregarMesero />} />
        <Route path="/meserosg/editar/:numero" element={<EditarMesero />} />

        {/* CRUD Mesas */}
        <Route path="/mesasg/agregar" element={<AgregarMesa />} />
        <Route path="/mesasg/editar/:numero" element={<EditarMesa />} />

        {/* CRUD Alimentos */}
        <Route path="/alimentosg/agregar" element={<AgregarAlimento />} />
        <Route path="/alimentosg/editar/:id" element={<EditarAlimento />} />

        {/* Operación de mesas y órdenes */}
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/generarorden/:id" element={<GenerarOrden />} />
        <Route path="/ordenmesero/:idMesa" element={<OrdenMesero />} />
        <Route path="/ordenes" element={<Ordenes />} />
        <Route path="/verorden/:id" element={<VerOrden />} />
        <Route path="/editarorden/:id" element={<EditarOrden />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
