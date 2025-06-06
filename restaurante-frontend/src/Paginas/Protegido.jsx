import { Navigate } from 'react-router-dom';

const Protegido = ({ children, rolPermitido }) => {
  const usuario = localStorage.getItem('usuario');
  const rol = localStorage.getItem('rol');

  if (!usuario || !rol) {
    return <Navigate to="/" />;
  }

  if (rol !== rolPermitido) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protegido;
