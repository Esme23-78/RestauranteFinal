// src/Componentes/Protegido.jsx
import { Navigate } from 'react-router-dom';

const Protegido = ({ children, rolRequerido }) => {
  const usuario = localStorage.getItem('usuario');
  const rol = localStorage.getItem('rol');

  if (!usuario || !rol) {
    return <Navigate to="/" />;
  }

  if (rol.toLowerCase() !== rolRequerido.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protegido;
