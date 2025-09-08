import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import './CompararHospitales.css';

export default function CompararHospitales() {
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('');
  const [hospitales, setHospitales] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

    const navigate = useNavigate();

  const dataSimulada = [
    {
      nombre: 'Hospital Central',
      direccion: 'Calle Falsa 123',
      telefono: '261-1234567',
      localidad: 'Ciudad',
      congestion: 'Alta',
      actualizacion: 'Hace 5 minutos',
      especialidades: ['Cardiología', 'Clínica Médica']
    },
    {
      nombre: 'Hospital Lagomaggiore',
      direccion: 'Av. Salud 456',
      telefono: '261-9876543',
      localidad: 'Ciudad',
      congestion: 'Media',
      actualizacion: 'Hace 10 minutos',
      especialidades: ['Pediatría', 'Ginecología']
    },
    {
      nombre: 'Hospital Perrupato',
      direccion: 'Ruta 50 s/n',
      telefono: '263-5551234',
      localidad: 'San Martín',
      congestion: 'Baja',
      actualizacion: 'Hace 3 minutos',
      especialidades: ['Traumatología', 'Clínica Médica']
    },
  ];

  const getPorcentajeCongestion = (nivel) => {
    switch (nivel) {
      case 'Alta': return 90;
      case 'Media': return 50;
      case 'Baja': return 20;
      default: return 0;
    }
  };

  useEffect(() => {
    if (localidadSeleccionada && localidadSeleccionada !== '') {
      const filtrados = dataSimulada.filter(h => h.localidad === localidadSeleccionada);
      setHospitales(filtrados);
      setSeleccionados([]);
    } else {
      setHospitales([]);
      setSeleccionados([]);
    }
  }, [localidadSeleccionada]);

  const handleSeleccion = (hospital) => {
    const yaSeleccionado = seleccionados.find(h => h.nombre === hospital.nombre);
    if (yaSeleccionado) {
      setSeleccionados(seleccionados.filter(h => h.nombre !== hospital.nombre));
    } else {
      setSeleccionados([...seleccionados, hospital]);
    }
  };

  return (
    <div className="contenedor-comparacion">
      <h1>Comparar Hospitales</h1>

      <label>Seleccione una localidad:</label>
      <select value={localidadSeleccionada} onChange={(e) => setLocalidadSeleccionada(e.target.value)}>
        <option value="">-- Seleccione --</option>
        <option value="Ciudad">Ciudad</option>
        <option value="San Martín">San Martín</option>
      </select>

      {hospitales.length > 0 && (
        <table className="tabla-hospitales">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Comparar</th>
            </tr>
          </thead>
          <tbody>
            {hospitales.map((h, i) => (
              <tr key={i}>
                <td>{h.nombre}</td>
                <td>{h.direccion}</td>
                <td>{h.telefono}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={seleccionados.some(sel => sel.nombre === h.nombre)}
                    onChange={() => handleSeleccion(h)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {seleccionados.length >= 2 && (
        <>
          <div className="resultados-comparacion">
            <h2>Comparación de Hospitales</h2>
            <table className="tabla-comparacion">
              <thead>
                <tr>
                  <th>Hospital</th>
                  <th>Congestión Actual</th>
                  <th>Actualización</th>
                  <th>Especialidades</th>
                </tr>
              </thead>
              <tbody>
                {seleccionados.map((h, i) => (
                  <tr key={i}>
                    <td>{h.nombre}</td>
                    <td>{h.congestion}</td>
                    <td>{h.actualizacion}</td>
                    <td>{h.especialidades.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="grafico-congestion">
              <h3>Gráfico de Porcentaje de Congestión</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={seleccionados.map(h => ({
                    nombre: h.nombre,
                    porcentaje: getPorcentajeCongestion(h.congestion)
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Bar dataKey="porcentaje" name="Congestión" label={{ position: 'top' }}>
                    {seleccionados.map((h, index) => {
                      const porcentaje = getPorcentajeCongestion(h.congestion);
                      let color = '#ffcc00'; // amarillo por defecto
                      if (porcentaje > 75) color = '#e74c3c'; // rojo
                      else if (porcentaje < 25) color = '#2ecc71'; // verde
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="leyenda-grafico">
              <p><span className="color-box rojo" /> Alta mas de 75%</p>
              <p><span className="color-box amarillo" /> Media 25% - 75%</p>
              <p><span className="color-box verde" /> Baja menos de 25%</p>
            </div>
          </div>
        </>
      )}
      <hr />
      <button className="boton-volver" onClick={() => navigate('/recomendacionPaciente')}>
        Volver al inicio
      </button>
    </div>
  );
}
