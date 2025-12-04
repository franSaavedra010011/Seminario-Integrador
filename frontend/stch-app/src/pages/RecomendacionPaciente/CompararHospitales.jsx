import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import './CompararHospitales.css';

export default function CompararHospitales() {
  const [localidadSeleccionadaId, setLocalidadSeleccionadaId] = useState('');
  const [hospitales, setHospitales] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/shared/listas/hospitales?modo=localidad', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setHospitales(data);

        const localidadesUnicas = [];
        const idsYaAgregados = new Set();

        data.forEach(hospital => {
          const loc = hospital.localidad;
          if (loc && !idsYaAgregados.has(loc.id)) {
            idsYaAgregados.add(loc.id);
            localidadesUnicas.push({ id: loc.id, nombre: loc.nombre });
          }
        });

        setLocalidades(localidadesUnicas);
      });
  }, []);


  const hospitalesFiltrados = hospitales.filter(h => h.localidad?.id == localidadSeleccionadaId);

  const handleSeleccion = (hospital) => {
    const yaSeleccionado = seleccionados.find(h => h.id === hospital.id);
    if (yaSeleccionado) {
      setSeleccionados(seleccionados.filter(h => h.id !== hospital.id));
    } else {
      if (seleccionados.length >= 2) {
        alert('Solo se pueden comparar dos hospitales a la vez');
        return;
      }
      setSeleccionados([...seleccionados, hospital]);
    }
  };

  const compararHospitales = async () => {
    try {
      const response = await fetch('http://localhost:3000/recomendacion/comparar-hospitales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          idLocalidad: Number(localidadSeleccionadaId),
          idHospitales: seleccionados.map(h => h.id)
        })
      });

      if (!response.ok) throw new Error('Error al comparar hospitales');
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error(error);
      alert('No se pudo realizar la comparación');
    }
  };

  const getColor = (porcentaje) => {
    if (porcentaje > 60) return '#e74c3c';
    if (porcentaje < 30) return '#2ecc71';
    return '#ffcc00';
  };

  return (
    <div className="contenedor-comparacion">
      <h1>Comparar Hospitales</h1>

      <label>Seleccione una localidad:</label>
      <select value={localidadSeleccionadaId} onChange={(e) => {
        setLocalidadSeleccionadaId(e.target.value);
        setSeleccionados([]);
        setResultado([]);
      }}>
        <option value="">-- Seleccione --</option>
        {localidades.map((loc, i) => (
          <option key={i} value={loc.id}>{loc.nombre}</option>
        ))}
      </select>


      {hospitalesFiltrados.length > 0 && (
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
            {hospitalesFiltrados.map((h) => (
              <tr key={h.id}>
                <td>{h.nombre}</td>
                <td>{h.direccion}</td>
                <td>{h.telefono}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={seleccionados.some(sel => sel.id === h.id)}
                    onChange={() => handleSeleccion(h)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {seleccionados.length === 2 && (
        <button className="btn-primary" onClick={compararHospitales}>
          Comparar Hospitales
        </button>
      )}

      {resultado.length > 0 && (
        <div className="resultados-comparacion">
          <h2>Resultado de Comparación</h2>
          <table className="tabla-comparacion">
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Congestión</th>
                <th>Porcentaje</th>
                <th>Especialidades</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((h, i) => (
                <tr key={i}>
                  <td>{h.nombre}</td>
                  <td>{h.nivelDeCongestion}</td>
                  <td>{h.porcentajeCongestion}%</td>
                  <td>{h.especialidades.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grafico-congestion">
            <h3>Gráfico de Congestión</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={resultado.map(h => ({
                  nombre: h.nombre,
                  porcentaje: h.porcentajeCongestion
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="porcentaje" label={{ position: 'top' }}>
                  {resultado.map((h, index) => (
                    <Cell key={index} fill={getColor(h.porcentajeCongestion)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="leyenda-grafico">
            <p><span className="color-box rojo" /> Alta más de 75%</p>
            <p><span className="color-box amarillo" /> Media 25% - 75%</p>
            <p><span className="color-box verde" /> Baja menos de 25%</p>
          </div>
        </div>
      )}

      <hr />
      <button className="boton-volver" onClick={() => navigate('/recomendacionPaciente')}>
        Volver al inicio
      </button>
    </div>
  );
}
