import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NuevoTurno_Pasos.css';

export default function NuevoTurno() {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);

  // Estados
  const [localidades, setLocalidades] = useState([]);
  const [hospitales, setHospitales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');
  const [hospitalSeleccionado, setHospitalSeleccionado] = useState(null);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [filtroOrden, setFiltroOrden] = useState('');

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Fetch de datos iniciales
  useEffect(() => {
    const fetchDatosIniciales = async () => {
      try {
        setCargando(true);
        const [resLoc, resEsp, resHos] = await Promise.all([
          fetch('http://localhost:3000/shared/listas/localidades'),
          fetch('http://localhost:3000/shared/listas/especialidades'),
          fetch('http://localhost:3000/shared/listas/hospitales?modo=completo')
        ]);

        if (!resLoc.ok || !resEsp.ok || !resHos.ok) {
          throw new Error('Error al obtener datos del servidor');
        }

        const [localidadesData, especialidadesData, hospitalesData] = await Promise.all([
          resLoc.json(),
          resEsp.json(),
          resHos.json()
        ]);

        setLocalidades(localidadesData);
        setEspecialidades(especialidadesData);
        setHospitales(hospitalesData);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los datos.');
      } finally {
        setCargando(false);
      }
    };

    fetchDatosIniciales();
  }, []);

  // Cuando selecciona hospital y especialidad, filtramos médicos disponibles
  useEffect(() => {
    const cargarMedicos = async () => {
      if (!hospitalSeleccionado || !especialidadSeleccionada) return;
      setCargando(true);
      try {
        const res = await fetch(
          `http://localhost:3000/shared/listas/hospitales?idHospital=${hospitalSeleccionado}&modo=completo`
        );
        const hospital = await res.json();

        // extraer médicos de la especialidad seleccionada
        const medicosEncontrados =
          hospital[0]?.hospitalEspecialidades
            ?.filter(h => h.especialidad?.nombre === especialidadSeleccionada)
            ?.flatMap(h => h.hospitalEspecialidadMedico?.map(m => m.medico)) || [];

        setMedicos(medicosEncontrados);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los médicos.');
      } finally {
        setCargando(false);
      }
    };
    cargarMedicos();
  }, [hospitalSeleccionado, especialidadSeleccionada]);

  // Datos de ejemplo para los horarios (podrías traerlos desde backend más adelante)
  const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00'];
  const diasSemana = [...Array(7)].map((_, i) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + i);
    return {
      fecha,
      label: fecha.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'numeric' })
    };
  });

  const turnosOcupados = []; // futuro: obtener desde backend

  // Manejo de pasos
  const avanzarPaso = () => {
    if (paso === 1 && hospitalSeleccionado) setPaso(2);
    else if (paso === 2 && medicoSeleccionado) setPaso(3);
    else if (paso === 3 && turnoSeleccionado) setPaso(4);
  };

  const retrocederPaso = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  // Filtrado dinámico
  const hospitalesFiltrados = hospitales
    .filter(h =>
      (!localidadSeleccionada || h.localidad?.nombre === localidadSeleccionada)
    )
    .filter(h =>
    (!especialidadSeleccionada ||
      h.hospitalEspecialidades?.some(he => he.especialidad?.nombre === especialidadSeleccionada))
    )
    .sort((a, b) => {
      if (filtroOrden === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (filtroOrden === 'congestion') {
        const congA = a.congestionesActual?.[0]?.nivelCongestion || '';
        const congB = b.congestionesActual?.[0]?.nivelCongestion || '';
        return congA.localeCompare(congB);
      }
      return 0;
    });

  // Render
  return (
    <div className="nuevo-turno-container">
      <div style={{ padding: '1rem' }}>
        {cargando && <p>Cargando datos...</p>}
        {error && <p className="error">{error}</p>}

        {/* Paso 1: Hospital */}
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
                <option key={loc.id} value={loc.nombre}>{loc.nombre}</option>
              ))}
            </select>

            <label>Especialidad:</label>
            <select
              value={especialidadSeleccionada}
              onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
            >
              <option value="">Todas</option>
              {especialidades.map(e => (
                <option key={e.id} value={e.nombre}>{e.nombre}</option>
              ))}
            </select>

            <label>Ordenar por:</label>
            <select value={filtroOrden} onChange={(e) => setFiltroOrden(e.target.value)}>
              <option value="">Sin orden</option>
              <option value="nombre">Nombre</option>
              <option value="congestion">Congestión</option>
            </select>

            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Congestión</th>
                  <th>Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {hospitalesFiltrados.map(h => (
                  <tr key={h.id}>
                    <td>{h.nombre}</td>
                    <td>{h.direccion}</td>
                    <td>{h.congestionesActual?.[0]?.nivelCongestion || 'N/A'}</td>
                    <td>
                      <input
                        type="radio"
                        name="hospital"
                        value={h.id}
                        checked={hospitalSeleccionado === h.id}
                        onChange={() => setHospitalSeleccionado(h.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={avanzarPaso} disabled={!hospitalSeleccionado}>Siguiente</button>
          </>
        )}

        {/* Paso 2: Médico */}
        {paso === 2 && (
          <>
            <h2>Seleccioná un médico</h2>
            <h3>{especialidadSeleccionada}</h3>
            <table>
              <thead>
                <tr><th>Nombre</th><th>Seleccionar</th></tr>
              </thead>
              <tbody>
                {medicos.map(m => (
                  <tr key={m.id}>
                    <td>{`${m.nombre} ${m.apellido}`}</td>
                    <td>
                      <input
                        type="radio"
                        name="medico"
                        value={m.id}
                        checked={medicoSeleccionado === m.id}
                        onChange={() => setMedicoSeleccionado(m.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={retrocederPaso}>Atrás</button>
            <button onClick={avanzarPaso} disabled={!medicoSeleccionado}>Siguiente</button>
          </>
        )}

        {/* Paso 3: Horario */}
        {paso === 3 && (
          <>
            <h2>Elegí un horario</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>Hora / Día</th>
                  {diasSemana.map(d => (
                    <th key={d.label}>{d.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {horarios.map(hora => (
                  <tr key={hora}>
                    <td>{hora}</td>
                    {diasSemana.map(d => {
                      const fechaYHora = `${d.fecha.toISOString().split('T')[0]} ${hora}`;
                      const ocupado = turnosOcupados.includes(fechaYHora);
                      const seleccionado = turnoSeleccionado === fechaYHora;
                      return (
                        <td
                          key={fechaYHora}
                          style={{
                            backgroundColor: ocupado ? '#f88' : seleccionado ? '#8f8' : '#fff',
                            textAlign: 'center',
                            cursor: ocupado ? 'not-allowed' : 'pointer'
                          }}
                          onClick={() => {
                            if (!ocupado) setTurnoSeleccionado(fechaYHora);
                          }}
                        >
                          {ocupado ? 'Ocupado' : seleccionado ? '✔' : 'Disponible'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={retrocederPaso}>Atrás</button>
            <button onClick={avanzarPaso} disabled={!turnoSeleccionado}>Confirmar</button>
          </>
        )}

        {/* Paso 4: Resumen */}
        {paso === 4 && (
          <>
            <h2>Resumen del Turno</h2>
            <p><strong>Hospital:</strong> {hospitales.find(h => h.id === hospitalSeleccionado)?.nombre}</p>
            <p><strong>Especialidad:</strong> {especialidadSeleccionada}</p>
            <p><strong>Médico:</strong> {medicos.find(m => m.id === medicoSeleccionado)?.nombre}</p>
            <p><strong>Fecha y Hora:</strong> {turnoSeleccionado}</p>
            <button onClick={retrocederPaso}>Atrás</button>
            <button onClick={() => {
              alert('Turno confirmado con éxito');
              navigate('/turnos');
            }}>Finalizar</button>
          </>
        )}
      </div>
    </div>
  );
}
