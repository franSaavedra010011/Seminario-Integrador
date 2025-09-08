import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Alta_Modificar.css';

export default function Alta_Modificar() {
  const navigate = useNavigate();

  // Simulación del rol actual y permisos posibles
  const permisosDisponibles = [
    'ver turnos',
    'crear turno',
    'ver pacientes',
    'actualizar historia médica',
    'gestionar médicos',
    'ver reportes',
    'crear usuarios',
    'gestionar todo el sistema',
    'asignar roles',
    'registrar asistencia',
    'crear pacientes'
  ];

  // Estado inicial (simulado como si se estuviera editando el rol "medico")
  const [nombreRol, setNombreRol] = useState('medico');
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([
    'ver pacientes',
    'actualizar historia médica'
  ]);

  const handleTogglePermiso = (permiso) => {
    if (permisosSeleccionados.includes(permiso)) {
      setPermisosSeleccionados(permisosSeleccionados.filter(p => p !== permiso));
    } else {
      setPermisosSeleccionados([...permisosSeleccionados, permiso]);
    }
  };

  const handleGuardar = () => {
    console.log('Rol actualizado:', {
      nombre: nombreRol,
      permisos: permisosSeleccionados
    });

    // Redirigir a la tabla de roles
    navigate('/abmRoles');
  };

  return (
    <div className="editar-rol-container">
      <h1>Modificar Rol</h1>

      <label>Nombre del Rol:</label>
      <input
        type="text"
        value={nombreRol}
        onChange={(e) => setNombreRol(e.target.value)}
      />

      <h3>Permisos:</h3>
      <div className="permisos-lista">
        {permisosDisponibles.map((permiso, idx) => (
          <label key={idx} className="permiso-item">
            <input
              type="checkbox"
              checked={permisosSeleccionados.includes(permiso)}
              onChange={() => handleTogglePermiso(permiso)}
            />
            {permiso}
          </label>
        ))}
      </div>

      <button className="guardar-btn" onClick={handleGuardar}>
        Guardar cambios
      </button>
    </div>
  );
}
