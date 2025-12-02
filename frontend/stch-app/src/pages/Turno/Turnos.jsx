import './Turnos.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Turnos() {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [observacionTurno, setObservacionTurno] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setPayload(payload);
    } catch (err) {
      console.error('Error al parsear el token:', err);
    }
  }, []);

  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Debe iniciar sesión para ver sus turnos');
          navigate('/login');
          return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));

        const response = await fetch(`http://localhost:3000/turno/consultarTurnosActivos/${payload.sub}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al cargar los turnos');
        }

        const data = await response.json();
        // Transformar los datos del backend al formato esperado por el frontend
        const turnosFormateados = data.map(turno => ({
          idTurno: turno.idTurno, // Mantener también idTurno por claridad
          fecha: turno.fecha,
          hora: turno.hora,
          especialidad: turno.nombreEspecialidad,
          medico: `${turno.nombreMedico} ${turno.apellidoMedico}`,
          hospital: turno.nombreHospital,
          estado: 'Reservado', // Estado fijo según el backend
          observaciones: 'Sin observaciones adicionales'
        }));

        setTurnos(turnosFormateados);
      } catch (err) {
        console.error('Error al cargar turnos:', err);
        setError(err.message);
        toast.error('Error al cargar los turnos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarTurnos();
  }, [navigate]);

  const recargarTurnos = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Debe iniciar sesión para ver sus turnos');
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:3000/turno/consultarTurnosActivos/${payload.sub}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar los turnos');
      }

      const data = await response.json();
      // Transformar los datos del backend al formato esperado por el frontend
      const turnosFormateados = data.map(turno => ({
        id: turno.idTurno, // Usar el ID real del turno del backend
        idTurno: turno.idTurno, // Mantener también idTurno por claridad
        fecha: turno.fecha,
        hora: turno.hora,
        especialidad: turno.nombreEspecialidad,
        medico: `${turno.nombreMedico} ${turno.apellidoMedico}`,
        hospital: turno.nombreHospital,
        estado: 'Reservado', // Estado fijo según el backend
        observaciones: 'Sin observaciones adicionales'
      }));

      setTurnos(turnosFormateados);
    } catch (err) {
      console.error('Error al cargar turnos:', err);
      setError(err.message);
      toast.error('Error al cargar los turnos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const anularTurno = async (idTurno) => {
    const confirmacion = window.confirm('¿Está seguro que desea anular este turno?');
    if (!confirmacion) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/turno/anular/${idTurno}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al anular el turno');
      }

      toast.success('Turno anulado correctamente', {
        position: 'top-center',
        autoClose: 3000,
      });

      // Recargar la lista de turnos
      recargarTurnos();
    } catch (err) {
      console.error('Error al anular turno:', err);
      toast.error('Error al anular el turno: ' + err.message);
    }
  };

  const imprimirTurno = () => {
    // Implementar lógica de impresión
    toast.info('Función de impresión en desarrollo');
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Fecha no disponible';
    try {
      const fechaObj = new Date(fecha);
      return fechaObj.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  const mostrarInfo = (observacion) => {
    setObservacionTurno(observacion);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setObservacionTurno('');
  };

  return (
    <div className="content">
      <h1>Turnos Activos</h1>
      <button onClick={() => navigate('/nuevo-turno')}>Nuevo Turno</button>
      <hr />

      {loading && (
        <div className="loading-container">
          <p>Cargando turnos...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={recargarTurnos}>Reintentar</button>
        </div>
      )}

      {!loading && !error && (
        <div className="table-turno">
          {turnos.length === 0 ? (
            <div className="no-turnos">
              <p>No tienes turnos programados.</p>
              <button onClick={() => navigate('/nuevo-turno')}>Solicitar primer turno</button>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Especialidad</th>
                  <th>Especialista</th>
                  <th>Hospital</th>
                  <th>Estado</th>
                  <th>Anular</th>
                  <th>Imprimir</th>
                  <th>Información</th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((turno) => (
                  <tr key={turno.id}>
                    <td>{turno.idTurno}</td>
                    <td>{formatearFecha(turno.fecha)}</td>
                    <td>{turno.hora || 'N/A'}</td>
                    <td>{turno.especialidad || 'N/A'}</td>
                    <td>{turno.medico || 'N/A'}</td>
                    <td>{turno.hospital || 'N/A'}</td>
                    <td>
                      <span className={`estado-turno estado-${turno.estado?.toLowerCase() || 'pendiente'}`}>
                        {turno.estado || 'Pendiente'}
                      </span>
                    </td>
                    <td>
                      {turno.estado !== 'Anulado' && turno.estado !== 'Completado' && (
                        <i
                          className="fas fa-trash"
                          onClick={() => anularTurno(turno.id)}
                          style={{ cursor: 'pointer', color: '#dc3545' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <i
                        className="fas fa-print"
                        onClick={() => imprimirTurno()}
                        style={{ cursor: 'pointer', color: '#007bff' }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fas fa-info"
                        onClick={() => mostrarInfo(turno.observaciones || 'Sin observaciones adicionales.')}
                        style={{ cursor: 'pointer', color: '#28a745' }}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Observaciones del Turno</h2>
            <p>{observacionTurno}</p>
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
