import { Navigate } from 'react-router-dom';
import { useUsuario } from './UserContext';

export default function PrivateRoute({ children }) {
  const { usuario, isLoading } = useUsuario();

  if (isLoading) {
    return <div>Cargando...</div>; // o un spinner
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
