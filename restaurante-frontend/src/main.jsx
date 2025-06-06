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

import Protegido from './Componentes/Protegido';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* Acceso solo para GERENTE */}
        <Route path="/gerente" element={<Protegido rolRequerido="gerente"><Gerente /></Protegido>} />
        <Route path="/meserosg" element={<Protegido rolRequerido="gerente"><MeserosG /></Protegido>} />
        <Route path="/mesasg" element={<Protegido rolRequerido="gerente"><MesasG /></Protegido>} />
        <Route path="/alimentosg" element={<Protegido rolRequerido="gerente"><AlimentosG /></Protegido>} />
        <Route path="/meserosg/agregar" element={<Protegido rolRequerido="gerente"><AgregarMesero /></Protegido>} />
        <Route path="/meserosg/editar/:numero" element={<Protegido rolRequerido="gerente"><EditarMesero /></Protegido>} />
        <Route path="/mesasg/agregar" element={<Protegido rolRequerido="gerente"><AgregarMesa /></Protegido>} />
        <Route path="/mesasg/editar/:numero" element={<Protegido rolRequerido="gerente"><EditarMesa /></Protegido>} />
        <Route path="/alimentosg/agregar" element={<Protegido rolRequerido="gerente"><AgregarAlimento /></Protegido>} />
        <Route path="/alimentosg/editar/:id" element={<Protegido rolRequerido="gerente"><EditarAlimento /></Protegido>} />

        {/* Acceso solo para MESERO */}
        <Route path="/meseros" element={<Protegido rolRequerido="mesero"><Meseros /></Protegido>} />
        <Route path="/mesas" element={<Protegido rolRequerido="mesero"><Mesas /></Protegido>} />
        <Route path="/generarorden/:id" element={<Protegido rolRequerido="mesero"><GenerarOrden /></Protegido>} />
        <Route path="/ordenmesero/:idMesa" element={<Protegido rolRequerido="mesero"><OrdenMesero /></Protegido>} />
        <Route path="/ordenes" element={<Protegido rolRequerido="mesero"><Ordenes /></Protegido>} />
        <Route path="/verorden/:id" element={<Protegido rolRequerido="mesero"><VerOrden /></Protegido>} />
        <Route path="/editarorden/:id" element={<Protegido rolRequerido="mesero"><EditarOrden /></Protegido>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
