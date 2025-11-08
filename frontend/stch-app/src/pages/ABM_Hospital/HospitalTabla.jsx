import { useEffect, useState } from 'react';
import './HospitalTabla.css';
import { useNavigate } from 'react-router-dom';

export default function HospitalTabla() {
  const navigate = useNavigate();
  const [hospitales, setHospitales] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [filtroLocalidad, setFiltroLocalidad] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/shared/listas/localidades', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => setLocalidades(data))
      .catch(err => console.error('Error al cargar localidades:', err));

    fetch('http://localhost:3000/shared/listas/hospitales?modo=localidad', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => setHospitales(data))
      .catch(err => console.error('Error al cargar hospitales:', err));
  }, []);

  const handleEditar = (hospital) => {
    navigate('/modificarHospital', { state: { id: hospital.id } });
  };

  const handleEliminar = (id) => {
    if (confirm('¿Estás seguro de eliminar este hospital?')) {
      setHospitales(prev => prev.filter(h => h.id !== id));
    }
  };

  const handleCrear = () => {
    navigate('/crearHospital');
  };

  const handleCrearAgenda = async (hospitalId) => {
    localStorage.setItem('hospitalSeleccionado', hospitalId);
    navigate('/crearAgendaSemanal');
  };

  return (
    <div className="hospitales-admin-container">
      <div className="btn-crear-contenedor">
        <h2>Gestión de Hospitales</h2>
        <button className="crear-btn" onClick={handleCrear}>
          Crear nuevo hospital
        </button>
      </div>

      <div className="filtros-contenedor">
        <div className="filtro-item">
          <label htmlFor="busquedaNombre">Buscar por nombre</label>
          <input
            id="busquedaNombre"
            type="text"
            placeholder="Buscar hospital..."
            className="input-filtro"
            value={busquedaNombre}
            onChange={(e) => setBusquedaNombre(e.target.value)}
          />
        </div>

        <div className="filtro-item">
          <label htmlFor="filtroLocalidad">Filtrar por localidad</label>
          <select
            id="filtroLocalidad"
            className="select-filtro"
            value={filtroLocalidad}
            onChange={(e) => setFiltroLocalidad(e.target.value)}
          >
            <option value="">Todas</option>
            {localidades.map(loc => (
              <option key={loc.id} value={loc.nombre}>
                {loc.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Localidad</th>
            <th>Creado</th>
            <th>Modificado</th>
            <th>Fecha de Baja</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {hospitales
            .filter(h =>
              (!filtroLocalidad || h.localidad?.nombre === filtroLocalidad) &&
              (!busquedaNombre || h.nombre.toLowerCase().includes(busquedaNombre.toLowerCase()))
            )
            .map(h => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.nombre}</td>
                <td>{h.direccion}</td>
                <td>{h.email}</td>
                <td>{h.telefono}</td>
                <td>{h.localidad?.nombre || '-'}</td>
                <td>{new Date(h.fechaHoraCreacion).toLocaleString()}</td>
                <td>{new Date(h.fechaHoraModificacion).toLocaleString()}</td>
                <td>{h.fechaHoraBaja ? new Date(h.fechaHoraBaja).toLocaleString() : '-'}</td>
                <td>
                  <button className="icon-button edit" title="Editar" onClick={() => handleEditar(h)}>✏️</button>
                  <button className="icon-button clock" title="Crear agenda semanal" onClick={() => handleCrearAgenda(h.id)}>🕒</button>
                  <button className="icon-button delete" title="Eliminar" onClick={() => handleEliminar(h.id)}>🗑️</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
