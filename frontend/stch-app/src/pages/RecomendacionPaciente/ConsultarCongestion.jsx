import './ConsultarCongestion.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ConsultarCongestion() {
  const navigate = useNavigate();

  const [hospitales, setHospitales] = useState([]);
  const [idHospitalSeleccionado, setIdHospitalSeleccionado] = useState('');
  const [resultado, setResultado] = useState(null);

  // Obtener lista de hospitales al montar
  useEffect(() => {
    fetch('http://localhost:3000/shared/listas/hospitales?modo=simple', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setHospitales(data))
      .catch(err => console.error('Error al cargar hospitales:', err));
  }, []);

  // Consultar congestión cuando cambia el hospital seleccionado
  useEffect(() => {
    if (!idHospitalSeleccionado) {
      setResultado(null);
      return;
    }

    const consultar = async () => {
      try {
        const response = await fetch('http://localhost:3000/recomendacion/consultar-congestion-de-hospital', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ idHospital: Number(idHospitalSeleccionado) }),
        });

        const data = await response.json();
        setResultado(data);
      } catch (error) {
        console.error('Error al consultar congestión:', error);
      }
    };

    consultar();
  }, [idHospitalSeleccionado]);

  return (
  <div className="contenedor-congestion">
    <h1 className="titulo-congestion">Estado de Congestión en Hospitales</h1>

    <div className="filtros-congestion">
      <label htmlFor="hospital-select">Seleccione un Hospital:</label>
      <select
        id="hospital-select"
        className="selector-hospital"
        value={idHospitalSeleccionado}
        onChange={(e) => setIdHospitalSeleccionado(e.target.value)}
      >
        <option value="">Seleccione un hospital</option>
        {hospitales.map((h) => (
          <option key={h.id} value={h.id}>
            {h.nombre}
          </option>
        ))}
      </select>
    </div>

    {resultado && (
      <div className="card-congestion">
        <div className="card-header">
          <h2>{resultado.nombreHospital}</h2>
        </div>

        <div className="nivel-congestion">
          <span>Nivel de Congestión</span>
          <span className={`badge ${resultado.nivelDeCongestion.toLowerCase()}`}>
            {resultado.nivelDeCongestion}
          </span>
        </div>

        <div className="ocupacion">
          <span>Ocupación</span>
          <div className="barra-progreso">
            <div
              className="progreso"
              style={{
                width: `${resultado.porcentajeCongestion}%`,
                backgroundColor:
                  resultado.porcentajeCongestion > 60
                    ? '#e74c3c'
                    : resultado.porcentajeCongestion > 30
                    ? '#f39c12'
                    : '#2ecc71',
              }}
            />
          </div>
          <strong>{resultado.porcentajeCongestion}%</strong>
        </div>

        <div className="actualizacion">
          ⏱️ Actualizado a las: {resultado.horaActualizacion ?? '-'}
        </div>
      </div>
    )}

    <button className="boton-volver" onClick={() => navigate('/recomendacionPaciente')}>
      Volver al inicio
    </button>
  </div>
);

}
