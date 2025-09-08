import { useState } from 'react';
import './HospitalTabla.css';
import { useNavigate } from 'react-router-dom';

export default function HospitalTabla() {
  const navigate = useNavigate();
  const [hospitales, setHospitales] = useState([
    {
      id: 1,
      nombre: 'Hospital Central',
      direccion: 'Calle 1',
      email: 'central@hospital.com',
      telefono: '2611234567',
      fechaBaja: null,
    },
    {
      id: 2,
      nombre: 'Clínica del Sur',
      direccion: 'Calle 2',
      email: 'sur@clinica.com',
      telefono: '2617654321',
      fechaBaja: '2025-05-01 10:30',
    }
  ]);

  const handleEditar = (hospital) => {
    navigate('/modificarHospital', {
        state: { hospital }
    });
   };  
  const handleEliminar = (id) => {
    if (confirm('¿Estás seguro de eliminar este hospital?')) {
      setHospitales(prev => prev.filter(h => h.id !== id));
    }
  };

  const handleCrear = () => {
    //alert('Redirigir a crear nuevo hospital');
    navigate('/crearHospital')
  };

  return (
    <div className="hospitales-admin-container">
      <div className="header">
        <h2>Gestión de Hospitales</h2>
        <button className="crear-btn" onClick={handleCrear}>
          ➕ Crear nuevo hospital
        </button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Fecha de Baja</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hospitales.map(h => (
            <tr key={h.id}>
              <td>{h.nombre}</td>
              <td>{h.direccion}</td>
              <td>{h.email}</td>
              <td>{h.telefono}</td>
              <td>{h.fechaBaja || '-'}</td>
              <td>
                <button className="icon-button edit" onClick={() => handleEditar(h)}>✏️</button>
                <button className="icon-button delete" onClick={() => handleEliminar(h.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}