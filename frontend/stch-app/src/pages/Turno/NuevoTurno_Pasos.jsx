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

  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [hospitalSeleccionado, setHospitalSeleccionado] = useState(null);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [filtroOrden, setFiltroOrden] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/shared/listas/localidades').then(res => res.json()),
      fetch('http://localhost:3000/shared/listas/especialidades').then(res => res.json())
    ]).then(([localidades, especialidades]) => {
      setLocalidades(localidades);
      setEspecialidades(especialidades);
    });
  }, []);

  const hospitalesFiltrados = [...hospitales].sort((a, b) => {
    if (filtroOrden === 'nombre') return a.nombreHospital.localeCompare(b.nombreHospital);
    if (filtroOrden === 'congestion') return (a.nivelCongestion || '').localeCompare(b.nivelCongestion || '');
    return 0;
  });

  useEffect(() => {
    if (!localidadSeleccionada || !especialidadSeleccionada) return;

    const cargarHospitales = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/turno/solicitarTurnoHospitales/${especialidadSeleccionada}/${localidadSeleccionada}`
        );
        if (!res.ok) throw new Error('Error al cargar hospitales');
        const data = await res.json();
        setHospitales(data);
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
          `http://localhost:3000/turno/solicitarTurnoMedicos/${especialidadSeleccionada}/${hospitalSeleccionado}`
        );
        if (!res.ok) throw new Error('Error al cargar médicos');
        const data = await res.json();
        setMedicos(data);
      } catch (err) {
        alert('Error al cargar médicos: ' + err.message);
      }
    };
    cargarMedicos();
  }, [especialidadSeleccionada, hospitalSeleccionado]);

  useEffect(() => {
    if (!medicoSeleccionado || !hospitalSeleccionado) return;

    const cargarAgendas = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/turno/solicitarTurnoAgendas/${medicoSeleccionado}/${hospitalSeleccionado}`
        );
        if (!res.ok) throw new Error('Error al cargar agendas');
        const data = await res.json();
        setAgendas(data);
      } catch (err) {
        alert('Error al cargar agendas: ' + err.message);
      }
    };
    cargarAgendas();
  }, [medicoSeleccionado, hospitalSeleccionado]);

  const avanzarPaso = () => {
    if (paso === 1 && hospitalSeleccionado) setPaso(2);
    else if (paso === 2 && medicoSeleccionado) setPaso(3);
    else if (paso === 3 && turnoSeleccionado) setPaso(4);
  };

  const retrocederPaso = () => paso > 1 && setPaso(paso - 1);

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
            nombreDia: dia.nombreDia,
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
                  <option key={loc.id} value={loc.id}>{loc.nombre}</option>
                ))}
              </select>

              <select
                value={especialidadSeleccionada}
                onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
              >
                <option value="">Todas las especialidades</option>
                {especialidades.map(esp => (
                  <option key={esp.id} value={esp.id}>{esp.nombre}</option>
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
                    onClick={() => setHospitalSeleccionado(h.idHospital)}
                  >
                    <div className="hospital-card-header">
                      <h3>{h.nombreHospital}</h3>
                      <span className={`badge congestion-${h.nivelCongestion?.toLowerCase() || 'sin'}`}>
                        {h.nivelCongestion || 'Sin datos'}
                      </span>
                    </div>
                    <p>{h.direccionHospital}</p>
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
                    onClick={() => setMedicoSeleccionado(m.idMedico)}
                  >
                    <div className="hospital-card-header">
                      <h3>{m.nombreMedico} {m.apellidoMedico}</h3>
                      <span className="badge congestion-sin">Médico</span>
                    </div>
                    <p>Matrícula: {m.matriculaMedico || 'N/A'}</p>
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
                onClick={() => {
                  alert('Turno confirmado!');
                  navigate('/turnos');
                }}
              >
                Confirmar Turno
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
