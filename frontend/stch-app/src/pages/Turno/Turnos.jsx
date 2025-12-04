import './Turnos.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Turnos() {
  const navigate = useNavigate();
  const [mostrarModalResumen, setMostrarModalResumen] = useState(false);
  const [resumenTurno, setResumenTurno] = useState(null);
  const [loadingResumen, setLoadingResumen] = useState(false);
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
          id: turno.idTurno, // Usar el ID real del turno del backend
          idTurno: turno.idTurno, // Mantener también idTurno por claridad
          fecha: turno.fecha,
          hora: turno.hora,
          especialidad: turno.nombreEspecialidad,
          medico: `${turno.nombreMedico} ${turno.apellidoMedico}`,
          hospital: turno.nombreHospital,
          estado: 'Reservado', // Estado fijo según el backend
          observaciones: turno.observaciones || 'Sin observaciones'
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
        observaciones: turno.observaciones || 'Sin observaciones'
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
    const confirmacion = window.confirm('¿Está seguro que desea cancelar este turno?\n\nEsta acción no se puede deshacer.');
    if (!confirmacion) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/turno/cancelarTurno/${idTurno}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al cancelar el turno');
      }

      toast.success('Turno cancelado correctamente', {
        position: 'top-center',
        autoClose: 3000,
      });

      // Recargar la lista de turnos
      recargarTurnos();
    } catch (err) {
      console.error('Error al cancelar turno:', err);
      toast.error('Error al cancelar el turno: ' + err.message);
    }
  };

  const obtenerResumenTurno = async (idTurno) => {
    try {
      setLoadingResumen(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/turno/solicitarTurno/generarResumenTurno/${idTurno}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al obtener el resumen del turno');
      }

      const resumen = await response.json();
      setResumenTurno(resumen);
      setMostrarModalResumen(true);
    } catch (err) {
      console.error('Error al obtener resumen:', err);
      toast.error('Error al cargar el resumen: ' + err.message);
    } finally {
      setLoadingResumen(false);
    }
  };

  const imprimirTurno = async (idTurno) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/turno/solicitarTurno/generarResumenTurno/${idTurno}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al obtener el resumen del turno');
      }

      const resumen = await response.json();

      // Crear el contenido HTML para imprimir con fondo negro
      const contenidoPDF = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resumen de Turno - ${resumen.nombrePaciente} ${resumen.apellidoPaciente}</title>
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            html, body { 
              font-family: Arial, sans-serif; 
              margin: 0;
              padding: 0;
              background-color: black !important;
              height: 100vh;
              width: 100vw;
              overflow: hidden;
            }
            .content {
              display: none;
              background-color: white;
              padding: 15px;
              margin: 10px;
              border-radius: 8px;
              max-width: 100%;
              box-sizing: border-box;
            }
            .header { 
              text-align: center; 
              margin-bottom: 20px; 
              border-bottom: 2px solid #384179; 
              padding-bottom: 15px; 
            }
            .header h1 {
              font-size: 20px;
              margin-bottom: 5px;
            }
            .header p {
              font-size: 14px;
              margin: 0;
            }
            .section { 
              margin-bottom: 15px; 
              padding: 12px; 
              border: 1px solid #ddd; 
              border-radius: 6px; 
              page-break-inside: avoid;
            }
            .section h3 { 
              color: #384179; 
              margin-bottom: 8px; 
              border-bottom: 1px solid #ddd; 
              padding-bottom: 4px; 
              font-size: 16px;
            }
            .info-row { 
              margin-bottom: 6px; 
              font-size: 14px;
            }
            .label { 
              font-weight: bold; 
              color: #212529; 
            }
            .value { 
              color: #495057; 
            }
            .footer {
              margin-top: 20px; 
              text-align: center; 
              color: #6c757d; 
              font-size: 10px;
              page-break-inside: avoid;
            }
            @media print {
              html, body { 
                margin: 0 !important; 
                padding: 0 !important;
                background-color: white !important;
                height: auto !important;
                width: auto !important;
                overflow: visible !important;
              }
              .content {
                display: block !important;
                background-color: white !important;
                margin: 0 !important;
                padding: 15px !important;
                max-width: none !important;
                border-radius: 0 !important;
              }
              .section {
                margin-bottom: 12px !important;
                page-break-inside: avoid;
              }
              .footer {
                margin-top: 15px !important;
              }
            }
            @media screen {
              .content {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="content">
            <div class="header">
              <h1>Resumen de Turno Médico</h1>
              <p>Sistema de Turnos - Hospital ${resumen.nombreHospital}</p>
            </div>
            
            <div class="section">
              <h3>Información del Paciente</h3>
              <div class="info-row"><span class="label">Nombre:</span> <span class="value">${resumen.nombrePaciente} ${resumen.apellidoPaciente}</span></div>
              <div class="info-row"><span class="label">DNI:</span> <span class="value">${resumen.dniPaciente}</span></div>
              <div class="info-row"><span class="label">Fecha de Nacimiento:</span> <span class="value">${resumen.fechaNacimiento ? new Date(resumen.fechaNacimiento).toLocaleDateString('es-AR') : 'N/A'}</span></div>
            </div>
            
            <div class="section">
              <h3>Información del Turno</h3>
              <div class="info-row"><span class="label">Fecha:</span> <span class="value">${resumen.fechaTurno ? new Date(resumen.fechaTurno).toLocaleDateString('es-AR') : 'N/A'}</span></div>
              <div class="info-row"><span class="label">Hora:</span> <span class="value">${resumen.horaTurno || 'N/A'}</span></div>
              <div class="info-row"><span class="label">Especialidad:</span> <span class="value">${resumen.nombreEspecialidad || 'N/A'}</span></div>
              <div class="info-row"><span class="label">Médico:</span> <span class="value">${resumen.nombreMedico} ${resumen.apellidoMedico}</span></div>
              <div class="info-row"><span class="label">Matrícula:</span> <span class="value">${resumen.matriculaMedico || 'N/A'}</span></div>
            </div>
            
            <div class="section">
              <h3>Información del Hospital</h3>
              <div class="info-row"><span class="label">Hospital:</span> <span class="value">${resumen.nombreHospital || 'N/A'}</span></div>
              <div class="info-row"><span class="label">Dirección:</span> <span class="value">${resumen.direccionHospital || 'N/A'}</span></div>
              <div class="info-row"><span class="label">Teléfono:</span> <span class="value">${resumen.telHospital || 'N/A'}</span></div>
              <div class="info-row"><span class="label">Email:</span> <span class="value">${resumen.emailHospital || 'N/A'}</span></div>
            </div>
            
            <div class="section">
              <h3>Observaciones</h3>
              <div class="info-row"><span class="value">${resumen.observacionesTurno || 'Sin observaciones'}</span></div>
            </div>
            
            <div class="footer">
              <p>Documento generado el ${new Date().toLocaleDateString('es-AR')} a las ${new Date().toLocaleTimeString('es-AR')}</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Abrir una nueva ventana con fondo negro y mostrar directamente el diálogo
      const ventanaImpresion = window.open('', '_blank');
      ventanaImpresion.document.write(contenidoPDF);
      ventanaImpresion.document.close();

      // Inmediatamente después de cargar, mostrar el diálogo
      ventanaImpresion.onload = () => {
        // Variable para rastrear si se está imprimiendo
        let imprimiendo = false;
        let intervaloCancelacion = null;

        // Detectar cuando comienza la impresión
        ventanaImpresion.onbeforeprint = () => {
          imprimiendo = true;
          if (intervaloCancelacion) {
            clearInterval(intervaloCancelacion);
          }
        };

        // Detectar cuando termina la impresión
        ventanaImpresion.onafterprint = () => {
          if (intervaloCancelacion) {
            clearInterval(intervaloCancelacion);
          }
          ventanaImpresion.close();
        };

        // Función para detectar cancelación
        const detectarCancelacion = () => {
          intervaloCancelacion = setInterval(() => {
            // Si no está imprimiendo y la ventana sigue abierta, probablemente canceló
            if (!imprimiendo && !ventanaImpresion.closed) {
              clearInterval(intervaloCancelacion);
              ventanaImpresion.close();
            }
          }, 100); // Revisar cada 100ms para respuesta más rápida
        };

        // Mostrar el diálogo de impresión y empezar a detectar cancelación
        setTimeout(() => {
          if (!ventanaImpresion.closed) {
            ventanaImpresion.print();

            // Empezar a detectar cancelación inmediatamente después de mostrar el diálogo
            setTimeout(() => {
              if (!imprimiendo && !ventanaImpresion.closed) {
                detectarCancelacion();
              }
            }, 200); // Dar un pequeño delay para que se abra el diálogo

            // Timeout de seguridad para cerrar después de 5 segundos
            setTimeout(() => {
              if (intervaloCancelacion) {
                clearInterval(intervaloCancelacion);
              }
              if (!imprimiendo && !ventanaImpresion.closed) {
                ventanaImpresion.close();
              }
            }, 5000);
          }
        }, 100);

        // Cerrar con Escape o al perder foco
        ventanaImpresion.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            if (intervaloCancelacion) {
              clearInterval(intervaloCancelacion);
            }
            ventanaImpresion.close();
          }
        });

        // Detectar si la ventana pierde el foco (posible cancelación)
        ventanaImpresion.addEventListener('blur', () => {
          setTimeout(() => {
            if (!imprimiendo && !ventanaImpresion.closed) {
              if (intervaloCancelacion) {
                clearInterval(intervaloCancelacion);
              }
              ventanaImpresion.close();
            }
          }, 300);
        });
      };
    } catch (err) {
      console.error('Error al generar PDF:', err);
      toast.error('Error al generar el PDF: ' + err.message);
    }
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

  const mostrarInfo = (idTurno) => {
    obtenerResumenTurno(idTurno);
  };

  const cerrarModalResumen = () => {
    setMostrarModalResumen(false);
    setResumenTurno(null);
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
                      {turno.estado !== 'Anulado' && turno.estado !== 'Cancelado' && turno.estado !== 'Completado' && (
                        <i
                          className="fas fa-trash"
                          onClick={() => anularTurno(turno.idTurno)}
                          style={{ cursor: 'pointer', color: '#dc3545' }}
                          title="Cancelar turno"
                        ></i>
                      )}
                    </td>
                    <td>
                      <i
                        className="fas fa-print"
                        onClick={() => imprimirTurno(turno.idTurno)}
                        style={{ cursor: 'pointer', color: '#007bff' }}
                        title="Imprimir turno"
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fas fa-info"
                        onClick={() => mostrarInfo(turno.idTurno)}
                        style={{ cursor: 'pointer', color: '#28a745' }}
                        title="Ver resumen del turno"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {mostrarModalResumen && (
        <div className="modal">
          <div className="modal-content resumen-turno">
            <h2>Resumen del Turno</h2>
            {loadingResumen ? (
              <div className="loading-resumen">
                <p>Cargando resumen...</p>
              </div>
            ) : resumenTurno ? (
              <div className="resumen-detalles">
                <div className="resumen-seccion">
                  <h3>Información del Paciente</h3>
                  <p><strong>Nombre:</strong> {resumenTurno.nombrePaciente} {resumenTurno.apellidoPaciente}</p>
                  <p><strong>DNI:</strong> {resumenTurno.dniPaciente}</p>
                  <p><strong>Fecha de Nacimiento:</strong> {resumenTurno.fechaNacimiento ? new Date(resumenTurno.fechaNacimiento).toLocaleDateString('es-AR') : 'N/A'}</p>
                </div>

                <div className="resumen-seccion">
                  <h3>Información del Turno</h3>
                  <p><strong>Fecha:</strong> {resumenTurno.fechaTurno ? new Date(resumenTurno.fechaTurno).toLocaleDateString('es-AR') : 'N/A'}</p>
                  <p><strong>Hora:</strong> {resumenTurno.horaTurno || 'N/A'}</p>
                  <p><strong>Especialidad:</strong> {resumenTurno.nombreEspecialidad || 'N/A'}</p>
                  <p><strong>Médico:</strong> {resumenTurno.nombreMedico} {resumenTurno.apellidoMedico}</p>
                  <p><strong>Matrícula:</strong> {resumenTurno.matriculaMedico || 'N/A'}</p>
                </div>

                <div className="resumen-seccion">
                  <h3>Información del Hospital</h3>
                  <p><strong>Hospital:</strong> {resumenTurno.nombreHospital || 'N/A'}</p>
                  <p><strong>Dirección:</strong> {resumenTurno.direccionHospital || 'N/A'}</p>
                  <p><strong>Teléfono:</strong> {resumenTurno.telHospital || 'N/A'}</p>
                  <p><strong>Email:</strong> {resumenTurno.emailHospital || 'N/A'}</p>
                </div>

                <div className="resumen-seccion">
                  <h3>Observaciones</h3>
                  <p>{resumenTurno.observacionesTurno || 'Sin observaciones'}</p>
                </div>
              </div>
            ) : (
              <p>No se pudo cargar el resumen del turno</p>
            )}

            <div className="modal-botones">
              <button onClick={cerrarModalResumen} className="btn-cerrar">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
