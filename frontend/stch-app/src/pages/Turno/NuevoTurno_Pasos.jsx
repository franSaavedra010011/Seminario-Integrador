import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NuevoTurno_Pasos.css';

export default function NuevoTurno() {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);

  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');
  const [hospitalSeleccionado, setHospitalSeleccionado] = useState(null);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [filtroOrden, setFiltroOrden] = useState('');

  const localidades = ['Maipú', 'Godoy Cruz', 'Guaymallén'];
  const hospitales = [
    { id: 1, nombre: 'Hospital Central', direccion: 'Calle 1', localidad: 'Maipú', congestion: 'Alta' },
    { id: 2, nombre: 'Hospital Perrupato', direccion: 'Calle 2', localidad: 'Godoy Cruz', congestion: 'Media' },
    { id: 3, nombre: 'Clínica Santa Fe', direccion: 'Calle 3', localidad: 'Guaymallén', congestion: 'Baja' },
  ];
  const especialidades = ['Cardiología', 'Pediatría', 'Dermatología'];
  const medicosPorEspecialidad = {
    'Cardiología': [{ id: 101, nombre: 'Dr. Corazón' }],
    'Pediatría': [{ id: 102, nombre: 'Dr. Niño' }],
    'Dermatología': [{ id: 103, nombre: 'Dra. Piel' }]
  };

  const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00'];
  const diasSemana = [...Array(7)].map((_, i) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + i);
    return {
      fecha,
      label: fecha.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'numeric' })
    };
  });

  const turnosOcupados = ['2025-05-21 09:00', '2025-05-22 10:00'];

  const avanzarPaso = () => {
    if (paso === 1 && hospitalSeleccionado) setPaso(2);
    else if (paso === 2 && medicoSeleccionado) setPaso(3);
    else if (paso === 3 && turnoSeleccionado) setPaso(4);
  };

  const retrocederPaso = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  const hospitalesFiltrados = hospitales
    .filter(h =>
      (!localidadSeleccionada || h.localidad === localidadSeleccionada)
    )
    .sort((a, b) => {
      if (filtroOrden === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (filtroOrden === 'congestion') return a.congestion.localeCompare(b.congestion);
      return 0;
    });

  return (
    <div className="nuevo-turno-container">
      <div style={{ padding: '1rem' }}>
        {paso === 1 && (
          <>
            <h2>Seleccioná un hospital</h2>
            <label>Localidad:</label>
            <select value={localidadSeleccionada} onChange={(e) => setLocalidadSeleccionada(e.target.value)}>
              <option value="">Todas</option>
              {localidades.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <label>Especialidad:</label>
            <select value={especialidadSeleccionada} onChange={(e) => setEspecialidadSeleccionada(e.target.value)}>
              <option value="">Todas</option>
              {especialidades.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>

            {localidadSeleccionada && especialidadSeleccionada && (
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
                        <td>{h.congestion}</td>
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
              </>
            )}

            <button onClick={avanzarPaso} disabled={!hospitalSeleccionado}>Siguiente</button>
          </>
        )}

        {paso === 2 && (
          <>
            <h2>Seleccioná un médico</h2>
            <h3>{especialidadSeleccionada}</h3>
            <table>
              <thead>
                <tr><th>Nombre</th><th>Seleccionar</th></tr>
              </thead>
              <tbody>
                {(medicosPorEspecialidad[especialidadSeleccionada] || []).map(m => (
                  <tr key={m.id}>
                    <td>{m.nombre}</td>
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

        {paso === 4 && (
          <>
            <h2>Resumen del Turno</h2>
            <p><strong>Hospital:</strong> {hospitales.find(h => h.id === hospitalSeleccionado)?.nombre}</p>
            <p><strong>Especialidad:</strong> {especialidadSeleccionada}</p>
            <p><strong>Médico:</strong> {medicosPorEspecialidad[especialidadSeleccionada]?.find(m => m.id === medicoSeleccionado)?.nombre}</p>
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
