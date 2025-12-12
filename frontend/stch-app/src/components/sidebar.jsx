import './sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuario } from './UserContext';
import { useContext } from 'react';
import { UserContext } from './UserContext'; // Asegurate que el path sea correcto

export default function Sidebar() {
  const { usuario } = useUsuario();
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  // Si el usuario no está cargado aún, no renderices nada o mostrás un spinner
  if (!usuario) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="sidebar" id="sidebar">

      <div className="sidebar-header">
        <button
          className="toggle-btn"
          onClick={() => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('expanded');

            // 🔧 Esto es lo que agrega la clase al body
            if (sidebar.classList.contains('expanded')) {
              document.body.classList.add('sidebar-expanded');
            } else {
              document.body.classList.remove('sidebar-expanded');
            }
          }}
        >
          <i className="fas fa-bars"></i>
        </button>

      </div>

      <div className="sidebar-scroll">
        <nav>
          <Link to="/home">
            <i className="fas fa-home"></i>
            <span>Inicio</span>
          </Link>
          <Link to="/historia">
            <i className="fas fa-info"></i>
            <span>Historia Médica</span>
          </Link>
          <Link to="/turnos">
            <i className="fas fa-calendar"></i>
            <span>Turnos</span>
          </Link>
          {/*<a href="#">
          <i className="fas fa-box"></i>
          <span>Orders</span>
        </a>*/}
          <Link to="/notificaciones">
            <i className="fas fa-envelope"></i>
            <span>Notificaciones</span>
          </Link>
          <Link to="/ajustes">
            <i className="fas fa-cog"></i>
            <span>Configuración</span>
          </Link>
          <Link to="/reportes">
            <i className="fas fa-chart-line"></i>
            <span>Reportes</span>
          </Link>
          <Link to="/asistencia">
            <i className="fas fa-check"></i>
            <span>Registrar Asistencia</span>
          </Link>
          <Link to="/altaUsuario">
            <i className="fas fa-user-plus"></i>
            <span>Nuevo Usuario</span>
          </Link>
          <Link to="/hospitalTabla">
            <i className="fas fa-hospital"></i>
            <span>Hospitales</span>
          </Link>
          <Link to="/recomendacionPaciente">
            <i className="fas fa-info"></i>
            <span>Recomendaciones</span>
          </Link>
          <Link to="/abmRoles">
            <i className="fas fa-users"></i>
            <span>Roles</span>
          </Link>
          {/*<a href="#">
          <i className="fas fa-user"></i>
          <span>Pacientes</span>
        </a>
        <a href="#">
          <i className="fas fa-user-md"></i>
          <span>Medicos</span>
        </a>
        <a href="#">
          <i className="fas fa-user"></i>
          <span>Recepcionista/Administrador</span>
        </a>
      */}
        </nav>
      </div>


      <div className="sidebar-footer">
        <div className="user">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Usuario"
          />
          <div className="user-info">
            <strong>{usuario.username}</strong>
            <br />
            <small>Rol: {usuario.rol.toUpperCase()}</small><br />
            <small>Id: {usuario.sub}</small>
          </div>
        </div>

        <button className="logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>


    </div>
  );
}
