import { useState, useEffect } from 'react';
import './RegistrarAsistencia.css';
import '../../App.css';

export default function RegistrarAsistencia() {
  const [dni, setDni] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [mensaje, setMensaje] = useState('');

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
      <div className="container-principal">
        <div className="header-principal">
          <h1>Registrar asistencia de paciente</h1>
          <p>Controle y registre la asistencia de pacientes a sus citas médicas programadas</p>
        </div>

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

    </div>
  );
}
