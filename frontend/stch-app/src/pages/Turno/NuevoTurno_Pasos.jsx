import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // Cargar listas de localidades y especialidades
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/shared/listas/localidades').then(res => res.json()),
      fetch('http://localhost:3000/shared/listas/especialidades').then(res => res.json())
    ]).then(([localidades, especialidades]) => {
      setLocalidades(localidades);
      setEspecialidades(especialidades);
    });
  }, []);

  // Filtrar y ordenar hospitales según selección
  const hospitalesFiltrados = [...hospitales].sort((a, b) => {
    if (filtroOrden === 'nombre') {
      return a.nombreHospital.localeCompare(b.nombreHospital);
    } else if (filtroOrden === 'congestion') {
      return (a.nivelCongestion || '').localeCompare(b.nivelCongestion || '');
    } else {
      return 0;
    }
  });

  // Cargas listas de hospitales que cumplan con los criterios seleccionados
  useEffect(() => {
    if (!localidadSeleccionada || !especialidadSeleccionada) return;

    const cargarHospitales = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/turno/solicitarTurnoHospitales/${especialidadSeleccionada}/${localidadSeleccionada}`
        );

        if (!response.ok) throw new Error('Error al cargar hospitales');

        const data = await response.json();
        setHospitales(data);

      } catch (error) {
        alert('Error al cargar hospitales: ' + error.message);
      }
    };

    cargarHospitales();
  }, [localidadSeleccionada, especialidadSeleccionada]);

  // Cargar lista de médicos según hospital y especialidad seleccionados
  useEffect(() => {

    if (!especialidadSeleccionada || !hospitalSeleccionado) return;
    console.log('Cargando médicos con:', { especialidadSeleccionada, hospitalSeleccionado });

    const cargarMedicos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/turno/solicitarTurnoMedicos/${especialidadSeleccionada}/${hospitalSeleccionado}`);
        if (!response.ok) throw new Error('Error al cargar médicos');

        const data = await response.json();
        setMedicos(data);

      } catch (error) {
        alert('Error al cargar médicos: ' + error.message);
      }

    };

    cargarMedicos();
  }, [especialidadSeleccionada, hospitalSeleccionado]);

  // Cargar agendas de médicos
  useEffect(() => {
    if (!medicoSeleccionado || !hospitalSeleccionado) return;

    const cargarAgendas = async () => {
      try {
        const response = await fetch(`http://localhost:3000/turno/solicitarTurnoAgendas/${medicoSeleccionado}/${hospitalSeleccionado}`);
        if (!response.ok) throw new Error('Error al cargar agendas');

        const data = await response.json();
        setAgendas(data);
      } catch (error) {
        alert('Error al cargar agendas: ' + error.message);
      }

    };
    cargarAgendas();
  }, [medicoSeleccionado, hospitalSeleccionado]);

  const avanzarPaso = () => {
    if (paso === 1 && hospitalSeleccionado) setPaso(2);
    else if (paso === 2 && medicoSeleccionado) setPaso(3);
    else if (paso === 3 && turnoSeleccionado) setPaso(4);
  };

  const retrocederPaso = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  return (
    <div className="nuevo-turno-container">
      <div style={{ padding: '1rem' }}>

        {/** Paso 1: Selección de Hospital */}
        {paso === 1 && (
          <>
            <h2>Seleccioná un hospital</h2>

            <label>Localidad:</label>
            <select
              value={localidadSeleccionada}
              onChange={(e) => setLocalidadSeleccionada(e.target.value)}
            >
              <option value="">Todas</option>
              {localidades.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.nombre}</option>
              ))}
            </select>

            <label>Especialidad:</label>
            <select
              value={especialidadSeleccionada}
              onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
            >
              <option value="">Todas</option>
              {especialidades.map((esp) => (
                <option key={esp.id} value={esp.id}>{esp.nombre}</option>
              ))}
            </select>

            {hospitales.length > 0 && (
              <>
                <label>Ordenar por:</label>
                <select value={filtroOrden} onChange={(e) => setFiltroOrden(e.target.value)}>
                  <option value="">Sin orden</option>
                  <option value="nombre">Nombre</option>
                  <option value="congestion">Congestión</option>
                </select>

                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Dirección</th>
                      <th>Congestión</th>
                      <th>Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitalesFiltrados.map(h => (
                      <tr key={h.id}>
                        <td>{h.idHospital}</td>
                        <td>{h.nombreHospital}</td>
                        <td>{h.direccionHospital}</td>
                        <td>{h.nivelCongestion || 'Sin datos'}</td>
                        <td>
                          <input
                            type="radio"
                            name="hospital"
                            value={h.idHospital}
                            checked={hospitalSeleccionado === h.idHospital}
                            onChange={() => setHospitalSeleccionado(h.idHospital)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            <button onClick={avanzarPaso} disabled={!hospitalSeleccionado}>Siguiente</button>
          </>
        )}

        {/** Paso 2: Selección de Médico */}
        {paso === 2 && (
          <>
            <h2>Seleccioná un médico</h2>

            {medicos.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                  {medicos.map((m) => (
                    <tr key={m.idMedico}>
                      <td>{m.idMedico}</td>
                      <td>{`${m.nombreMedico} ${m.apellidoMedico}`}</td>
                      <td>
                        <input
                          type="radio"
                          name="medico"
                          value={m.idMedico}
                          checked={medicoSeleccionado === m.idMedico}
                          onChange={() => setMedicoSeleccionado(m.idMedico, m.nombreMedico + ' ' + m.apellidoMedico)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: '#666' }}>No hay médicos disponibles en este hospital.</p>
            )}

            <button onClick={retrocederPaso}>Atrás</button>
            <button onClick={avanzarPaso} disabled={!medicoSeleccionado}>Siguiente</button>
          </>
        )}

        {/** Paso 3: Selección de Horario */}
        {paso === 3 && (
          <>
            <h2>Elegí un horario</h2>

            {agendas.length > 0 ? (
              agendas.map((semana) => (
                <div key={semana.idSemana} style={{ marginBottom: '1.5rem' }}>
                  <h3>Semana #{semana.nroSemana}</h3>

                  {semana.dias.map((dia) => (
                    <div key={dia.idDia} style={{ marginBottom: '1rem' }}>
                      <h4>{dia.nombreDia}</h4>
                      <table border="1" width="100%">
                        <thead>
                          <tr>
                            <th>Hora Desde</th>
                            <th>Hora Hasta</th>
                            <th>Disponibilidad</th>
                            <th>Seleccionar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dia.turnos.map((turno) => (
                            <tr
                              key={turno.idTurno}
                              style={{
                                backgroundColor: turno.disponible
                                  ? turnoSeleccionado === turno.idTurno
                                    ? '#b2f0b2'
                                    : '#fff'
                                  : '#f88',
                              }}
                            >
                              <td>{turno.horaDesde}</td>
                              <td>{turno.horaHasta}</td>
                              <td>{turno.disponible ? 'Disponible' : 'Ocupado'}</td>
                              <td>
                                {turno.disponible && (
                                  <input
                                    type="radio"
                                    name="turno"
                                    value={turno.idTurno}
                                    checked={turnoSeleccionado === turno.idTurno}
                                    onChange={() => setTurnoSeleccionado(turno.idTurno)}
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p style={{ color: '#666' }}>No hay horarios disponibles para este médico.</p>
            )}

            <button onClick={retrocederPaso}>Atrás</button>
            <button onClick={avanzarPaso} disabled={!turnoSeleccionado}>
              Confirmar
            </button>
          </>
        )}

        {/** Paso 4: Resumen y Confirmación */}
        {paso === 4 && (
          <>
            <h2>Resumen del Turno</h2>
            <p>{console.log(medicoSeleccionado)}</p>
            <p><strong>Hospital:</strong> {hospitales.find(h => h.id === hospitalSeleccionado)?.nombreHospital}</p>
            <p><strong>Especialidad:</strong> {especialidadSeleccionada}</p>
            <p><strong>Médico:</strong> {medicoSeleccionado}</p>
            <p><strong>Fecha y Hora:</strong> {turnoSeleccionado}</p>

            <button onClick={retrocederPaso}>Atrás</button>
            <button onClick={() => {
              alert('Turno finalizado!');
              navigate('/turnos');
            }}>Finalizar</button>
          </>
        )}
      </div>
    </div>
  );
}