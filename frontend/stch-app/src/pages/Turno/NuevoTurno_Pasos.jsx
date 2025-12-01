import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  User2,
  Stethoscope,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import './NuevoTurno_Pasos.css';

export default function NuevoTurno() {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);

  const [localidades, setLocalidades] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [hospitales, setHospitales] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [agendas, setAgendas] = useState([]);

  const [payload, setPayload] = useState(null);
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [hospitalSeleccionado, setHospitalSeleccionado] = useState(null);
  const [hospitalEspecialidadSeleccionado, setHospitalEspecialidadSeleccionado] = useState(null);
  const [hospitalEspecialidadMedicoSeleccionado, setHospitalEspecialidadMedicoSeleccionado] = useState(null);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [filtroOrden, setFiltroOrden] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const response = await fetch('http://localhost:3000/turno/solicitarTurno/mostrarLocalidadesYEspecialidades');
        if (!response.ok) throw new Error('Error al cargar datos iniciales');
        const data = await response.json();
        setLocalidades(data.localidades || []);
        setEspecialidades(data.especialidades || []);
      } catch (err) {
        console.error('Error al cargar localidades y especialidades:', err);
        alert('Error al cargar datos iniciales: ' + err.message);
      }
    };
    cargarDatosIniciales();
  }, []);

  const hospitalesFiltrados = [...hospitales].sort((a, b) => {
    if (filtroOrden === 'nombre') return a.nombreHospital.localeCompare(b.nombreHospital);
    if (filtroOrden === 'congestion') return (a.nivelCongestion || '').localeCompare(b.nivelCongestion || '');
    return 0;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setPayload(payload);
    } catch (error) {
      console.error('Error al decodificar token:', error);
    }
  }, []);

  useEffect(() => {
    if (!localidadSeleccionada || !especialidadSeleccionada) return;

    const cargarHospitales = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/turno/solicitarTurno/listarHospitalesConRequisitosSolicitados/${localidadSeleccionada}/${especialidadSeleccionada}`
        );
        if (!res.ok) throw new Error('Error al cargar hospitales');

        const data = await res.json();
        setHospitales(data.hospitales || []); // data = { hospitales: [...] }
      } catch (err) {
        alert('Error al cargar hospitales: ' + err.message);
      }
    };

    cargarHospitales();
  }, [localidadSeleccionada, especialidadSeleccionada]);


  useEffect(() => {
    if (!especialidadSeleccionada || !hospitalSeleccionado) return;
    const cargarMedicos = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/turno/solicitarTurno/listarMedicosRelacionadosConHospitalYEspecialidad/${hospitalSeleccionado}/${hospitalEspecialidadSeleccionado}`
        );
        if (!res.ok) throw new Error('Error al cargar médicos');
        const data = await res.json();
        setMedicos(data.medicos || []);
      } catch (err) {
        alert('Error al cargar médicos: ' + err.message);
      }
    };
    cargarMedicos();
  }, [especialidadSeleccionada, hospitalSeleccionado]);

  useEffect(() => {
    if (!medicoSeleccionado || !hospitalEspecialidadMedicoSeleccionado) return;

    const cargarAgendas = async () => {
      try {
        const resAgenda = await fetch(
          `http://localhost:3000/turno/solicitarTurno/seleccionarAgendaSemanaProxima/${medicoSeleccionado}/${hospitalEspecialidadMedicoSeleccionado}`
        );
        if (!resAgenda.ok) throw new Error('Error al cargar agenda semanal');
        const agendaData = await resAgenda.json();

        console.log('Agenda data recibida:', agendaData);

        if (agendaData && agendaData.idAgendaSemanal) {
          try {
            const resHorarios = await fetch(
              `http://localhost:3000/turno/solicitarTurno/listarHorariosDisponiblesAgenda/${agendaData.idAgendaSemanal}`
            );
            if (!resHorarios.ok) throw new Error('Error al cargar horarios');
            const horariosData = await resHorarios.json();

            console.log('Horarios data recibida:', horariosData);

            // Obtener todos los IDs de agenda día únicos y ordenarlos
            const idsAgendaDiaUnicos = [...new Set(horariosData.horarios.map(h => h.idAgendaDia))].sort((a, b) => a - b);

            // Formatear la estructura de horarios para que sea compatible con el frontend
            const horariosGroupedByDay = horariosData.horarios.reduce((acc, horario) => {
              const diaKey = horario.idAgendaDia;

              if (!acc[diaKey]) {
                // Calcular el nombre del día basándose en la agenda semanal
                let nombreDia = 'Sin fecha';
                let fechaDia = horario.fechaHoraAgendaDia;

                console.log(`Procesando día ${diaKey}, fecha original:`, fechaDia);

                // Calcular la fecha basándose en la posición del día en la semana
                try {
                  const indiceDia = idsAgendaDiaUnicos.indexOf(horario.idAgendaDia);
                  console.log(`Día ${diaKey} está en el índice ${indiceDia} de la semana`);

                  if (indiceDia >= 0 && agendaData.fechaDesdeAgendaSemanal) {
                    const fechaInicio = new Date(agendaData.fechaDesdeAgendaSemanal);
                    console.log('Fecha inicio de semana:', fechaInicio);

                    const fechaCalculada = new Date(fechaInicio);
                    fechaCalculada.setDate(fechaInicio.getDate() + indiceDia);
                    console.log(`Fecha calculada para día ${diaKey}:`, fechaCalculada);

                    fechaDia = fechaCalculada.toISOString();
                    nombreDia = obtenerNombreDia(fechaCalculada);
                    console.log(`Nombre del día calculado: ${nombreDia}`);
                  }
                } catch (error) {
                  console.warn('Error al calcular fecha del día:', error);
                  // Fallback: usar el índice en el array de horarios
                  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                  const indiceEnArray = idsAgendaDiaUnicos.indexOf(horario.idAgendaDia);
                  if (indiceEnArray >= 0 && indiceEnArray < diasSemana.length) {
                    nombreDia = diasSemana[indiceEnArray];
                  }
                }

                console.log(`Día final: ${diaKey} -> ${nombreDia}`);

                acc[diaKey] = {
                  idDia: horario.idAgendaDia,
                  fecha: fechaDia,
                  nombreDia: nombreDia,
                  turnos: []
                };
              } acc[diaKey].turnos.push({
                idTurno: horario.idTurnoAgendaDia,
                horaDesde: horario.horaDesdeTurnoAgendaDia,
                horaHasta: horario.horaHastaTurnoAgendaDia,
                disponible: horario.disponible
              });

              return acc;
            }, {});

            // Convertir el objeto en un array de días
            const diasFormateados = Object.values(horariosGroupedByDay);

            // Convertir la estructura a la esperada por el frontend
            const agendaFormateada = {
              idAgendaSemanal: agendaData.idAgendaSemanal,
              nroSemana: agendaData.nroSemana,
              fechaDesde: agendaData.fechaDesdeAgendaSemanal,
              fechaHasta: agendaData.fechaHastaAgendaSemanal,
              dias: diasFormateados
            };

            console.log('Agenda formateada:', agendaFormateada);
            setAgendas([agendaFormateada]); // Convertir a array
          } catch (err) {
            console.warn(`Error al cargar horarios para agenda ${agendaData.idAgendaSemanal}:`, err);
            setAgendas([]);
          }
        } else {
          console.warn('No se recibió una agenda válida');
          setAgendas([]);
        }
      } catch (err) {
        console.error('Error al cargar agendas:', err);
        alert('Error al cargar agendas: ' + err.message);
        setAgendas([]);
      }
    };
    cargarAgendas();
  }, [medicoSeleccionado, hospitalEspecialidadSeleccionado]);

  const avanzarPaso = () => {
    if (paso === 1 && hospitalSeleccionado) setPaso(2);
    else if (paso === 2 && medicoSeleccionado) setPaso(3);
    else if (paso === 3 && turnoSeleccionado) setPaso(4);
  };

  const retrocederPaso = () => paso > 1 && setPaso(paso - 1);

  // Función helper para obtener el nombre del día en español
  const obtenerNombreDia = (fecha) => {
    console.log('obtenerNombreDia recibió:', fecha, typeof fecha);

    if (!fecha) {
      console.log('No hay fecha, retornando Sin fecha');
      return 'Sin fecha';
    }

    try {
      // Crear objeto Date manejando diferentes formatos
      let fechaObj;

      if (fecha instanceof Date) {
        fechaObj = fecha;
      } else if (typeof fecha === 'string') {
        // Para fechas en formato YYYY-MM-DD, agregar hora para evitar problemas de zona horaria
        if (fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
          fechaObj = new Date(fecha + 'T12:00:00');
        } else {
          fechaObj = new Date(fecha);
        }
      } else {
        console.log('Tipo de fecha no soportado:', typeof fecha);
        return 'Sin fecha';
      }

      // Verificar que la fecha sea válida
      if (isNaN(fechaObj.getTime())) {
        console.warn('Fecha inválida creada:', fechaObj, 'desde:', fecha);
        return 'Sin fecha';
      }

      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const dia = fechaObj.getDay();
      const nombreDia = diasSemana[dia];

      console.log(`Fecha: ${fecha} -> Día de semana: ${dia} -> Nombre: ${nombreDia}`);

      return nombreDia;
    } catch (error) {
      console.warn('Error al obtener nombre del día:', error, 'Fecha:', fecha);
      return 'Sin fecha';
    }
  };

  // Función para obtener el email del usuario del token JWT
  const obtenerEmailDelToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || payload.sub || null;
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  };

  // Función para confirmar y finalizar la reserva del turno
  const confirmarTurno = async () => {
    if (!turnoCompleto) {
      alert('Error: No se pudo obtener la información del turno');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debe iniciar sesión para reservar un turno');
        navigate('/login');
        return;
      }

      // Obtener el email del usuario
      const userEmail = localStorage.getItem('userEmail') || obtenerEmailDelToken(token);
      if (!userEmail) {
        alert('No se pudo obtener la información del usuario');
        navigate('/login');
        return;
      }

      // Encontrar los IDs necesarios para el endpoint
      const agendaSeleccionada = agendas.find(semana => {
        return semana.dias.some(dia =>
          dia.turnos.some(turno => turno.idTurno === turnoSeleccionado)
        );
      });

      const diaSeleccionado = agendaSeleccionada?.dias.find(dia =>
        dia.turnos.some(turno => turno.idTurno === turnoSeleccionado)
      );

      if (!agendaSeleccionada || !diaSeleccionado) {
        alert('Error: No se pudo encontrar la información de la agenda');
        return;
      }

      const reservaData = {
        idTurnoAgendaDia: turnoSeleccionado,
        idHospital: hospitalSeleccionado,
        idMedico: medicoSeleccionado,
        idUsuario: payload ? payload.sub : null,
        observaciones: '' // Opcional
      };

      const response = await fetch('http://localhost:3000/turno/solicitarTurno/generarReservaTurno', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al reservar el turno');
      }

      const resultado = await response.json();
      console.log('Turno reservado:', resultado);

      // Opcional: obtener resumen del turno creado si el backend devuelve el ID
      if (resultado.idTurno) {
        try {
          const resumenResponse = await fetch(
            `http://localhost:3000/turno/solicitarTurno/generarResumenTurno/${resultado.idTurno}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          if (resumenResponse.ok) {
            const resumen = await resumenResponse.json();
            console.log('Resumen del turno:', resumen);
          }
        } catch (resumenErr) {
          console.warn('Error al obtener resumen del turno:', resumenErr);
        }
      }

      // Mostrar mensaje de éxito y redirigir
      alert('¡Turno reservado exitosamente!');
      navigate('/turnos');

    } catch (err) {
      console.error('Error al confirmar turno:', err);
      setError(err.message);
      alert('Error al reservar el turno: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función helper para encontrar el turno completo por ID
  const obtenerTurnoCompleto = (idTurno) => {
    if (!idTurno || !agendas) return null;

    for (const semana of agendas) {
      for (let indexDia = 0; indexDia < semana.dias.length; indexDia++) {
        const dia = semana.dias[indexDia];
        const turno = dia.turnos.find(t => t.idTurno === idTurno);
        if (turno) {
          // Calcular la fecha del turno basándose en la semana
          let fechaTurno = dia.fecha;

          // Si no hay fecha del día, calcularla desde fechaDesde + indexDia
          if (!fechaTurno) {
            try {
              const fechaInicio = new Date(semana.fechaDesde);
              const fechaCalculada = new Date(fechaInicio);
              fechaCalculada.setDate(fechaInicio.getDate() + indexDia);
              fechaTurno = fechaCalculada.toISOString().split('T')[0]; // formato YYYY-MM-DD
            } catch (error) {
              console.warn('Error al calcular fecha del turno:', error);
            }
          }

          return {
            ...turno,
            fecha: fechaTurno,
            nombreDia: fechaTurno ? obtenerNombreDia(fechaTurno) : dia.nombreDia,
            semana: semana.nroSemana
          };
        }
      }
    }
    return null;
  }; const turnoCompleto = obtenerTurnoCompleto(turnoSeleccionado);

  // Debug temporal para entender la estructura de datos
  useEffect(() => {
    if (turnoCompleto) {
      console.log('Turno completo encontrado:', turnoCompleto);
      console.log('Fecha del turno:', turnoCompleto.fecha);
      console.log('Agendas disponibles:', agendas);
      console.log('Médico seleccionado:', medicoSeleccionado);
      console.log('Hospital seleccionado:', hospitalSeleccionado);
      console.log('Usuario (payload):', payload);
    }
  }, [turnoCompleto, agendas]);

  return (
    <div className="nuevo-turno-container">
      <div style={{ padding: '1rem' }}>
        {/* === Paso 1: Selección de hospital === */}
        {paso === 1 && (
          <>
            <h2>Seleccioná un hospital</h2>

            <div className="filtros-container">
              <select
                value={localidadSeleccionada}
                onChange={(e) => setLocalidadSeleccionada(e.target.value)}
              >
                <option value="">Todas las localidades</option>
                {localidades.map(loc => (
                  <option key={loc.idLocalidad} value={loc.idLocalidad}>{loc.nombreLocalidad}</option>
                ))}
              </select>

              <select
                value={especialidadSeleccionada}
                onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
              >
                <option value="">Todas las especialidades</option>
                {especialidades.map(esp => (
                  <option key={esp.idEspecialidad} value={esp.idEspecialidad}>{esp.nombreEspecialidad}</option>
                ))}
              </select>

              <select value={filtroOrden} onChange={(e) => setFiltroOrden(e.target.value)}>
                <option value="">Sin orden</option>
                <option value="nombre">Nombre</option>
                <option value="congestion">Congestión</option>
              </select>
            </div>

            {hospitales.length > 0 ? (
              <div className="hospitales-grid">
                {hospitalesFiltrados.map((h) => (
                  <div
                    key={h.idHospital}
                    className={`hospital-card ${hospitalSeleccionado === h.idHospital ? 'seleccionado' : ''}`}
                    onClick={() => {
                      setHospitalSeleccionado(h.idHospital);
                      setHospitalEspecialidadSeleccionado(h.idHospitalEspecialidad);
                    }}
                  >
                    <div className="hospital-card-header">
                      <h3>{h.nombreHospital}</h3>
                      <span className={`badge congestion-${h.nivelCongestion?.toLowerCase() || 'sin'}`}>
                        {h.nivelCongestion || 'Sin datos'}
                      </span>
                    </div>
                    <p>{h.direccionHospital}</p>
                    <p>{h.idHospital}</p>
                    <p>{h.idHospitalEspecialidad}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="sin-hospitales">Seleccioná filtros para ver hospitales disponibles.</p>
            )}

            <div className="botones-turno">
              <button onClick={avanzarPaso} disabled={!hospitalSeleccionado}>Siguiente</button>
            </div>
          </>
        )}

        {/* === Paso 2: Selección de médico === */}
        {paso === 2 && (
          <>
            <h2>Seleccioná un médico</h2>

            {medicos.length > 0 ? (
              <div className="hospitales-grid">
                {medicos.map(m => (
                  <div
                    key={m.idMedico}
                    className={`hospital-card ${medicoSeleccionado === m.idMedico ? 'seleccionado' : ''}`}
                    onClick={() => {
                      setMedicoSeleccionado(m.idMedico);
                      setHospitalEspecialidadMedicoSeleccionado(m.idHEM);
                    }}
                  >
                    <div className="hospital-card-header">
                      <h3>{m.nombreMedico} {m.apellidoMedico}</h3>
                      <span className="badge congestion-sin">Médico</span>
                    </div>
                    <p>Matrícula: {m.matriculaMedico || 'N/A'}</p>
                    <p>idMedico: {m.idMedico}</p>
                    <p>idHEM: {m.idHEM}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="sin-hospitales">No hay médicos disponibles en este hospital.</p>
            )}

            <div className="botones-turno">
              <button onClick={retrocederPaso}>Atrás</button>
              <button onClick={avanzarPaso} disabled={!medicoSeleccionado}>Siguiente</button>
            </div>
          </>
        )}

        {/* === Paso 3: Selección de turno === */}
        {paso === 3 && (
          <>
            <h2>Elegí un horario disponible</h2>

            {agendas && agendas.length > 0 ? (
              agendas.map((semana, index) => {
                // Obtener todas las horas únicas de la semana
                const horas = Array.from(
                  new Set(
                    semana.dias.flatMap(dia =>
                      dia.turnos.map(turno => turno.horaDesde)
                    )
                  )
                ).sort();

                return (
                  <div key={index} className="semana-container">
                    <h3>
                      Semana #{semana.nroSemana}{' '}
                      <small>
                        ({new Date(semana.fechaDesde).toLocaleDateString()} -{' '}
                        {new Date(semana.fechaHasta).toLocaleDateString()})
                      </small>
                    </h3>

                    <div className="calendario-semanal">
                      {/* Encabezado */}
                      <div className="header-calendario">
                        <div>Hora</div>
                        {semana.dias.map((dia, indexDia) => {
                          // Función para extraer el día del mes de diferentes formatos de fecha
                          const obtenerNumeroDia = (fecha, indexDia, semana) => {
                            // Primero intentar con la fecha del día
                            if (fecha) {
                              try {
                                const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
                                if (!isNaN(fechaObj.getTime())) {
                                  return fechaObj.getDate();
                                }
                              } catch {
                                console.warn('Error al parsear fecha del día:', fecha);
                              }
                            }

                            // Estrategia alternativa: calcular basándose en fechaDesde + indexDia
                            try {
                              const fechaInicio = new Date(semana.fechaDesde);
                              const fechaCalculada = new Date(fechaInicio);
                              fechaCalculada.setDate(fechaInicio.getDate() + indexDia);
                              return fechaCalculada.getDate();
                            } catch {
                              console.warn('Error al calcular fecha basándose en semana');
                              return '';
                            }
                          };

                          return (
                            <div key={dia.idDia} className="header-dia">
                              <div className="nombre-dia">{dia.nombreDia}</div>
                              <div className="numero-dia">
                                {obtenerNumeroDia(dia.fecha, indexDia, semana)}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Filas por cada hora */}
                      {horas.map((hora, idx) => (
                        <div key={idx} className="body-calendario">
                          <div className="columna-dia hora-label">{hora}</div>
                          {semana.dias.map((dia) => {
                            const turno = dia.turnos.find(t => t.horaDesde === hora);
                            if (!turno)
                              return (
                                <div
                                  key={dia.idDia + hora}
                                  className="columna-dia"
                                ></div>
                              );

                            return (
                              <div
                                key={turno.idTurno}
                                className={`columna-dia bloque-turno ${turno.disponible
                                  ? turnoSeleccionado === turno.idTurno
                                    ? 'turno-seleccionado'
                                    : ''
                                  : 'turno-ocupado'
                                  }`}
                                onClick={() =>
                                  turno.disponible && setTurnoSeleccionado(turno.idTurno)
                                }
                              >
                                {turno.disponible ? 'Libre' : 'Ocupado'}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="sin-agendas">No hay agendas disponibles para este médico.</p>
            )}

            <div className="botones-turno">
              <button onClick={retrocederPaso}>Atrás</button>
              <button onClick={avanzarPaso} disabled={!turnoSeleccionado}>
                Confirmar
              </button>
            </div>
          </>
        )}



        {/* === Paso 4: Resumen estilizado con íconos Lucide === */}
        {paso === 4 && (
          <div className="resumen-container">
            <h2>Resumen del Turno</h2>

            {error && (
              <div className="error-message" style={{
                background: '#fee',
                border: '1px solid #fcc',
                borderRadius: '4px',
                padding: '1rem',
                margin: '1rem 0',
                color: '#c33'
              }}>
                {error}
              </div>
            )}

            <div className="resumen-card">
              <div className="resumen-item full">
                <Building2 className="resumen-icon" />
                <div>
                  <p className="resumen-titulo">Hospital</p>
                  <p className="resumen-valor">
                    {hospitales.find(h => h.idHospital === hospitalSeleccionado)?.nombreHospital || 'Hospital no disponible'}
                  </p>
                </div>
              </div>

              <div className="resumen-row">
                <div className="resumen-item">
                  <User2 className="resumen-icon" />
                  <div>
                    <p className="resumen-titulo">Médico</p>
                    <p className="resumen-valor">
                      {medicos.find(m => m.idMedico === medicoSeleccionado)?.nombreMedico || 'No asignado'} {medicos.find(m => m.idMedico === medicoSeleccionado)?.apellidoMedico || 'No asignado'}
                    </p>
                  </div>
                </div>

                <div className="resumen-item">
                  <Stethoscope className="resumen-icon" />
                  <div>
                    <p className="resumen-titulo">Especialidad</p>
                    <p className="resumen-valor">
                      {especialidades.find(e => e.id === parseInt(especialidadSeleccionada))?.nombre || 'No disponible'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="resumen-row">
                <div className="resumen-item">
                  <CalendarDays className="resumen-icon" />
                  <div>
                    <p className="resumen-titulo">Fecha</p>
                    <p className="resumen-valor">
                      {(() => {
                        if (!turnoCompleto?.fecha) return 'Fecha no disponible';

                        try {
                          const fecha = new Date(turnoCompleto.fecha);
                          // Verificar que la fecha sea válida
                          if (isNaN(fecha.getTime())) return 'Fecha no disponible';

                          const fechaFormateada = fecha.toLocaleDateString('es-AR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          });

                          // Capitalizar la primera letra
                          return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
                        } catch (error) {
                          console.warn('Error al formatear fecha:', turnoCompleto.fecha, error);
                          return 'Fecha no disponible';
                        }
                      })()}
                    </p>
                  </div>
                </div>

                <div className="resumen-item">
                  <Clock className="resumen-icon" />
                  <div>
                    <p className="resumen-titulo">Hora</p>
                    <p className="resumen-valor">
                      {turnoCompleto?.horaDesde || 'No disponible'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="resumen-item full">
                <MapPin className="resumen-icon" />
                <div>
                  <p className="resumen-titulo">Ubicación</p>
                  <p className="resumen-valor">
                    {hospitales.find(h => h.idHospital === hospitalSeleccionado)?.direccionHospital || 'Dirección no disponible'}
                  </p>
                </div>
              </div>
            </div>

            <div className="botones-turno resumen-botones">
              <button className="btn-secundario" onClick={retrocederPaso}>
                Modificar Turno
              </button>
              <button
                className="btn-primario"
                onClick={confirmarTurno}
                disabled={loading}
              >
                {loading ? 'Confirmando...' : 'Confirmar Turno'}
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
