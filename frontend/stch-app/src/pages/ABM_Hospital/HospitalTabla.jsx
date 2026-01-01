import { useEffect, useState } from 'react';
import './HospitalTabla.css';
import './../../App.css';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function HospitalTabla() {
  const navigate = useNavigate();
  const [hospitales, setHospitales] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [filtroLocalidad, setFiltroLocalidad] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [hospitalSeleccionado, setHospitalSeleccionado] = useState(null);

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

  const handleSeleccionarHospital = (hospital) => {
    setHospitalSeleccionado(hospital);
  };

  const handleCerrarDetalles = () => {
    setHospitalSeleccionado(null);
  };

  return (
    <div className="hospitales-admin-container">
      <PageHeader
        titulo="Gestión de Hospitales"
        subtitulo="Administración de registros hospitalarios"
        boton={{
          texto: 'Crear nuevo hospital',
          icono: '+',
          onClick: handleCrear
        }}
      />

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

      <div className="layout-contenido">
        <div className="contenido-principal">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>DIRECCIÓN</th>
                <th>EMAIL</th>
                <th>LOCALIDAD</th>
              </tr>
            </thead>

            <tbody>
              {hospitales
                .filter(h =>
                  (!filtroLocalidad || h.localidad?.nombre === filtroLocalidad) &&
                  (!busquedaNombre || h.nombre.toLowerCase().includes(busquedaNombre.toLowerCase()))
                )
                .map(h => (
                  <tr
                    key={h.id}
                    onClick={() => handleSeleccionarHospital(h)}
                    className={hospitalSeleccionado?.id === h.id ? 'fila-seleccionada' : ''}
                  >
                    <td>{h.id}</td>
                    <td>{h.nombre}</td>
                    <td>{h.direccion}</td>
                    <td>{h.email}</td>
                    <td>{h.localidad?.nombre || '-'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {hospitalSeleccionado && (
          <div className="panel-detalles">
            <div className="panel-header">
              <h3>DETALLES DEL HOSPITAL</h3>
              <button className="btn-cerrar" onClick={handleCerrarDetalles}>✕</button>
            </div>
            <h2 className="hospital-nombre">{hospitalSeleccionado.nombre}</h2>

            <div className="acciones-principales">
              <button className="btn-accion btn-editar" onClick={() => handleEditar(hospitalSeleccionado)}>
                <i className="fas fa-pen"></i> Editar
              </button>
              <div className="grupo-botones">
                <button className="btn-accion btn-registrar-agenda" onClick={() => handleCrearAgenda(hospitalSeleccionado.id)}>
                  <i className="fas fa-calendar-alt"></i> Agenda
                </button>
                <button className="btn-accion btn-borrar" onClick={() => handleEliminar(hospitalSeleccionado.id)}>
                  <i className="fas fa-trash-alt"></i> Borrar
                </button>
              </div>
            </div>

            <div className="detalles-info">
              <div className="info-item">
                <i className="fas fa-map-marker-alt info-icon"></i>
                <div className='info-item-content'>
                  <p className="info-label">DIRECCIÓN</p>
                  <p className="info-valor">{hospitalSeleccionado.direccion}</p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-envelope info-icon"></i>
                <div className='info-item-content'>
                  <p className="info-label">EMAIL</p>
                  <p className="info-valor">{hospitalSeleccionado.email}</p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-phone info-icon"></i>
                <div className='info-item-content'>
                  <p className="info-label">TELÉFONO</p>
                  <p className="info-valor">{hospitalSeleccionado.telefono}</p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-city info-icon"></i>
                <div className='info-item-content'>
                  <p className="info-label">LOCALIDAD</p>
                  <p className="info-valor">{hospitalSeleccionado.localidad?.nombre || '-'}</p>
                </div>
              </div>
            </div>

            <div className="fechas-info">
              <div>
                <p className="fecha-label">Creado</p>
                <p className="fecha-valor">{new Date(hospitalSeleccionado.fechaHoraCreacion).toLocaleString('es-AR')}</p>
              </div>
              <div>
                <p className="fecha-label">Modificado</p>
                <p className="fecha-valor">{new Date(hospitalSeleccionado.fechaHoraModificacion).toLocaleString('es-AR')}</p>
              </div>
            </div>

            <button className="btn-ver-completo">Ver registro completo</button>
          </div>
        )}
      </div>
    </div>
  );
}
