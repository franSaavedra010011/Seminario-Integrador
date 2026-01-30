import { useState, useEffect } from 'react';
import './RegistrarAsistencia.css';
import './RegistrarAsistencia-adicional.css';
import '../../App.css';

export default function RegistrarAsistencia() {
  const [dni, setDni] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hospitales, setHospitales] = useState([]);
  const [hospitalSeleccionado, setHospitalSeleccionado] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userHospitalId, setUserHospitalId] = useState(null);

  // Decodificar el token JWT para obtener rol y hospital del usuario
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Payload del token:', payload);
        console.log('Rol del usuario:', payload.rol);
        console.log('ID Hospital:', payload.idHospital);

        setUserRole(payload.rol || '');
        setUserHospitalId(payload.idHospital || null);

        // Si no es administrador general, cargar turnos automáticamente
        if (payload.rol !== 'admin' && payload.idHospital) {
          setHospitalSeleccionado(payload.idHospital);
        }
      } catch (err) {
        console.error('Error al decodificar token:', err);
      }
    }
  }, []);

  // Cargar lista de hospitales si es administrador general
  useEffect(() => {
    if (userRole === 'admin') {
      cargarHospitales();
    }
  }, [userRole]);

  // Cargar turnos cuando se selecciona un hospital
  useEffect(() => {
    if (hospitalSeleccionado) {
      cargarTurnos(hospitalSeleccionado);
    }
  }, [hospitalSeleccionado]);

  const cargarHospitales = async () => {
    try {
      const response = await fetch('http://localhost:3000/shared/listas/hospitales?modo=simple', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar hospitales');
      }

      const data = await response.json();
      console.log('Hospitales cargados:', data);
      setHospitales(data);
    } catch (err) {
      console.error('Error al cargar hospitales:', err);
      setError('Error al cargar la lista de hospitales');
    }
  };

  const cargarTurnos = async (hospitalId) => {
    setLoading(true);
    setError('');

    try {
      if (!hospitalId) {
        setError('Debe seleccionar un hospital');
        return;
      }

      const response = await fetch(`http://localhost:3000/shared/listas/turnosPorHospital?idHospital=${hospitalId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar los turnos');
      }

      const data = await response.json();
      setTurnos(data);
    } catch (err) {
      console.error('Error al cargar turnos:', err);
      setError(err.message || 'Error al cargar los turnos');
    } finally {
      setLoading(false);
    }
  };

  const registrarAsistencia = async (idTurno) => {
    setMensaje('');
    setError('');

    try {
      const response = await fetch(`http://localhost:3000/turno/registrarAsistenciaDePaciente/${idTurno}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar asistencia');
      }

      // Actualizar el turno en la lista local
      setTurnos(prev =>
        prev.map(turno =>
          turno.id === idTurno ? { ...turno, presentismo: true } : turno
        )
      );

      setMensaje('Asistencia registrada correctamente');

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      console.error('Error al registrar asistencia:', err);
      setError(err.message || 'Error al registrar asistencia');
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-AR');
  };

  const formatearHora = (hora) => {
    if (!hora) return '-';
    return hora.substring(0, 5); // Formato HH:MM
  };

  const turnosFiltrados = turnos.filter(t => {
    if (!dni) return true;
    const pacienteNombre = `${t.paciente?.nombrePaciente || ''} ${t.paciente?.apellidoPaciente || ''}`.toLowerCase();
    const pacienteDni = t.paciente?.dniPaciente || '';
    return pacienteNombre.includes(dni.toLowerCase()) || pacienteDni.includes(dni);
  });

  return (
    <div className="container">
      <div className="container-principal">
        <div className="header-principal">
          <h1>Registrar asistencia de paciente</h1>
          <p>Controle y registre la asistencia de pacientes a sus citas médicas programadas</p>
          {/* Debug: Mostrar rol detectado */}
          {userRole && (
            <p style={{ fontSize: '12px', color: '#718096', marginTop: '5px' }}>
              Rol detectado: <strong>{userRole}</strong>
            </p>
          )}
        </div>

        {/* Selector de hospital solo para administrador general */}
        {userRole === 'admin' && (
          <div className="selector-hospital-container">
            <label htmlFor="hospital-select" className="selector-label">
              <i className="fas fa-hospital"></i> Seleccionar Hospital:
            </label>
            <select
              id="hospital-select"
              className="selector-hospital"
              value={hospitalSeleccionado}
              onChange={(e) => setHospitalSeleccionado(e.target.value)}
            >
              <option value="">-- Seleccione un hospital --</option>
              {hospitales.map(hospital => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.nombre}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="barra-container">
          <input
            className="barra-busqueda"
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <button
            className="btn-recargar"
            onClick={() => cargarTurnos(hospitalSeleccionado)}
            disabled={loading || !hospitalSeleccionado}
          >
            <i className="fas fa-sync-alt"></i> {loading ? 'Cargando...' : 'Recargar'}
          </button>
        </div>

        {error && <div className="mensaje-error">{error}</div>}
        {mensaje && <div className="mensaje-exito">{mensaje}</div>}

        {!hospitalSeleccionado && userRole === 'admin' ? (
          <div className="sin-seleccion">
            <i className="fas fa-hospital"></i>
            <p>Por favor, seleccione un hospital para ver los turnos pendientes</p>
          </div>
        ) : loading ? (
          <div className="loading">Cargando turnos...</div>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>DNI</th>
                <th>Paciente</th>
                <th>Celular</th>
                <th>Email</th>
                <th>Especialidad</th>
                <th>Médico</th>
                <th>Matrícula</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Observaciones</th>
                <th>Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {turnosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="13" className="sin-datos">
                    {dni ? 'No se encontraron turnos con ese criterio' : 'No hay turnos pendientes de asistencia'}
                  </td>
                </tr>
              ) : (
                turnosFiltrados.map(turno => (
                  <tr key={turno.id}>
                    <td><strong>#{turno.id}</strong></td>
                    <td>{turno.paciente?.dniPaciente || '-'}</td>
                    <td>{`${turno.paciente?.nombrePaciente || ''} ${turno.paciente?.apellidoPaciente || ''}`}</td>
                    <td>{turno.paciente?.celularPaciente || '-'}</td>
                    <td>{turno.paciente?.correoPaciente || '-'}</td>
                    <td>{turno.especialidad?.nombre || '-'}</td>
                    <td>{`${turno.medico?.nombreMedico || ''} ${turno.medico?.apellidoMedico || ''}`}</td>
                    <td>{turno.medico?.matriculaMedico || '-'}</td>
                    <td>{formatearFecha(turno.fecha)}</td>
                    <td>{formatearHora(turno.hora)}</td>
                    <td>
                      <span className={`badge-estado badge-${turno.estadoTurno?.nombre?.toLowerCase().replace(/\s/g, '-') || 'default'}`}>
                        {turno.estadoTurno?.nombre || '-'}
                      </span>
                    </td>
                    <td className="observaciones-cell">{turno.observaciones || '-'}</td>
                    <td>
                      <div className="asistencia-cell">
                        {turno.presentismo ? (
                          <span className="badge-asistio">✓ Asistió</span>
                        ) : (
                          <button
                            className="boton"
                            onClick={() => registrarAsistencia(turno.id)}
                          >
                            Registrar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
