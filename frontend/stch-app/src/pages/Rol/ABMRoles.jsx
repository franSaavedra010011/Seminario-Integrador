import './ABMRoles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ABMRoles() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([
    {
      nombre: 'paciente',
      permisos: ['ver turnos', 'crear turno'],
    },
    {
      nombre: 'medico',
      permisos: ['ver pacientes', 'actualizar historia médica'],
    },
    {
      nombre: 'adminHospital',
      permisos: ['gestionar médicos', 'ver reportes', 'crear usuarios'],
    },
    {
      nombre: 'administrador',
      permisos: ['gestionar todo el sistema', 'asignar roles'],
    },
    {
      nombre: 'recepcionista',
      permisos: ['registrar asistencia', 'ver turnos', 'crear pacientes'],
    },
  ]);

  const handleEditar = (rol) => {
    navigate('/alta_Modificar', { state: { rol } });
  };

  const handleCrear = () => {
    navigate('/alta_Modificar'); // sin datos = nuevo
  };

  const handleEliminar = (rol) => {
    if (window.confirm(`¿Está seguro que desea eliminar el rol ${rol.nombre}?`)) {
      setRoles(roles.filter(r => r.nombre !== rol.nombre));
      toast.error(`Rol "${rol.nombre}" eliminado`, {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="contenedor-roles">
      <h1>Gestión de Roles</h1>
      <button className="boton-crear" onClick={handleCrear}>
        + Crear nuevo rol
      </button>
      <div className="tabla-roles">
        <table>
          <thead>
            <tr>
              <th>Rol</th>
              <th>Permisos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol, index) => (
              <tr key={index}>
                <td>{rol.nombre}</td>
                <td>{rol.permisos.join(', ')}</td>
                <td>
                  <i className="fas fa-pen icon-editar" onClick={() => handleEditar(rol)} title="Editar"></i>
                  <i className="fas fa-trash icon-eliminar" onClick={() => handleEliminar(rol)} title="Eliminar"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
