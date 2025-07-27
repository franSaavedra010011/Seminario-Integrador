import './ConsultarCongestion.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ConsultarCongestion() {
  const navigate = useNavigate();

  const [hospitalesOriginales, setHospitalesOriginales] = useState([]);
  const [hospitalesFiltrados, setHospitalesFiltrados] = useState([]);

  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');

  useEffect(() => {
    const dataSimulada = [
      {
        nombre: 'Hospital Perrupato',
        localidad: 'San Martín',
        especialidades: ['Pediatría', 'Cardiología'],
        nivel: 'Alta',
        porcentaje: 87,
        ultimaActualizacion: 'Hace 5 minutos',
      },
      {
        nombre: 'Hospital Central',
        localidad: 'Ciudad',
        especialidades: ['Clínica Médica', 'Cardiología'],
        nivel: 'Media',
        porcentaje: 55,
        ultimaActualizacion: 'Hace 8 minutos',
      },
      {
        nombre: 'Hospital Lagomaggiore',
        localidad: 'Ciudad',
        especialidades: ['Pediatría'],
        nivel: 'Baja',
        porcentaje: 20,
        ultimaActualizacion: 'Hace 10 minutos',
      },
    ];

    setHospitalesOriginales(dataSimulada);
  }, []);

  useEffect(() => {
    if (localidadSeleccionada && especialidadSeleccionada) {
      const filtrados = hospitalesOriginales.filter(
        (h) =>
          h.localidad === localidadSeleccionada &&
          h.especialidades.includes(especialidadSeleccionada)
      );
      setHospitalesFiltrados(filtrados);
    } else {
      setHospitalesFiltrados([]);
    }
  }, [localidadSeleccionada, especialidadSeleccionada, hospitalesOriginales]);

  const colorSemaforo = (nivel) => {
    switch (nivel) {
      case 'Alta':
        return '🔴';
      case 'Media':
        return '🟡';
      case 'Baja':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div className="contenedor-congestion">
      <h1 className="titulo-congestion">Estado de Congestión en Hospitales</h1>

      <div className="filtros-congestion">
        <div>
          <label>Localidad:</label>
          <select value={localidadSeleccionada} onChange={(e) => setLocalidadSeleccionada(e.target.value)}>
            <option value="">Seleccione una localidad</option>
            <option value="Ciudad">Ciudad</option>
            <option value="San Martín">San Martín</option>
          </select>
        </div>
        <div>
          <label>Especialidad:</label>
          <select value={especialidadSeleccionada} onChange={(e) => setEspecialidadSeleccionada(e.target.value)}>
            <option value="">Seleccione una especialidad</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Clínica Médica">Clínica Médica</option>
          </select>
        </div>
      </div>

      <hr />

      {localidadSeleccionada && especialidadSeleccionada ? (
        hospitalesFiltrados.length > 0 ? (
          <div className="tabla-congestion">
            <table>
              <thead>
                <tr>
                  <th>Hospital</th>
                  <th>Congestión</th>
                  <th>Ocupación</th>
                  <th>Última Actualización</th>
                </tr>
              </thead>
              <tbody>
                {hospitalesFiltrados.map((h, index) => (
                  <tr key={index}>
                    <td>{h.nombre}</td>
                    <td>{colorSemaforo(h.nivel)} {h.nivel}</td>
                    <td>{h.porcentaje}%</td>
                    <td>{h.ultimaActualizacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mensaje-info">
            No se ha encontrado ningún hospital con esas características.
          </p>
        )
      ) : (
        <p className="mensaje-info">
          Seleccione una localidad y especialidad para ver los hospitales disponibles.
        </p>
      )}

      <hr />
      <button className="boton-volver" onClick={() => navigate('/recomendacionPaciente')}>
        Volver al inicio
      </button>
    </div>
  );
}
