import { useState, useEffect } from 'react';
import './RegistrarAsistencia.css';

export default function RegistrarAsistencia() {
  const [dni, setDni] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Simulación: reemplazar por llamada al backend
    setTurnos([
      { id: 1, paciente: 'Juan Pérez', especialidad: 'Cardiología', fecha: '2025-05-24', hora: '10:00', asistio: false },
      { id: 2, paciente: 'Ana García', especialidad: 'Pediatría', fecha: '2025-05-24', hora: '11:00', asistio: true },
    ]);
  }, []);

  const registrarAsistencia = (id) => {
    setTurnos(prev =>
      prev.map(turno =>
        turno.id === id ? { ...turno, asistio: true } : turno
      )
    );
    setMensaje('Asistencia registrada correctamente.');
  };

  const turnosFiltrados = turnos.filter(t => t.paciente.toLowerCase().includes(dni.toLowerCase()));

  return (
    <div className="container">
      <h1 className="titulo">Registrar asistencia de paciente</h1>
      <div className="barra-container">
        <input
          className="barra-busqueda"
          type="text"
          placeholder="Buscar por nombre o DNI..."
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
      </div>
      {mensaje && <p className="mensaje">{mensaje}</p>}

      <table className="tabla">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Especialidad</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {turnosFiltrados.map(turno => (
            <tr key={turno.id}>
              <td>{turno.paciente}</td>
              <td>{turno.especialidad}</td>
              <td>{turno.fecha}</td>
              <td>{turno.hora}</td>
              <td>
                <div className="asistencia-cell">
                  {turno.asistio ? (
                    <div>Asistió</div>
                    ) : (
                      <button className="boton" onClick={() => registrarAsistencia(turno.id)}>
                        Registrar
                      </button>
                    )}
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
