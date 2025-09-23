import './ConsultarDetalleHospital.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ConsultarHospital() {
  const navigate = useNavigate();
  const [hospitales, setHospitales] = useState([]);
  const [idHospitalSeleccionado, setIdHospitalSeleccionado] = useState('');
  const [detalle, setDetalle] = useState(null);
  const [congestion, setCongestion] = useState(null);

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

  useEffect(() => {
    if (!idHospitalSeleccionado) {
      setDetalle(null);
      setCongestion(null);
      return;
    }

    const fetchDetalle = async () => {
      const res = await fetch('http://localhost:3000/recomendacion/consultar-detalle-del-hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ idHospital: Number(idHospitalSeleccionado) })
      });
      const data = await res.json();
      setDetalle(data);
    };

    const fetchCongestion = async () => {
      const res = await fetch('http://localhost:3000/recomendacion/consultar-congestion-de-hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ idHospital: Number(idHospitalSeleccionado) })
      });
      const data = await res.json();
      setCongestion(data);
    };

    fetchDetalle();
    fetchCongestion();
  }, [idHospitalSeleccionado]);

  return (
    <div className="contenedor-detalle-hospital">
      <h1 className="titulo-detalle-hospital">Información del Hospital</h1>

      <div className="filtros-detalle">
        <label htmlFor="hospital-select">Seleccione un Hospital:</label>
        <select
          id="hospital-select"
          className="selector-hospital"
          value={idHospitalSeleccionado}
          onChange={(e) => setIdHospitalSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un hospital</option>
          {hospitales.map((h) => (
            <option key={h.id} value={h.id}>{h.nombre}</option>
          ))}
        </select>
      </div>

      {(detalle || congestion) && (
            <div className="card-hospital-dual">

                {/* Card Izquierda - Info hospital */}
                {detalle && (
                    <div className="card-info-hospital">
                        <h2 className="card-title">{detalle.nombreHospital}</h2>

                        <div className="info-row">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>
                            <strong className="info-label">Dirección:</strong> {detalle.direccionHospital}
                        </p>
                        </div>

                        <div className="info-row">
                        <i className="fas fa-envelope"></i>
                        <p>
                            <strong className="info-label">Email:</strong> {detalle.emailHospital}
                        </p>
                        </div>

                        <div className="info-row">
                        <i className="fas fa-phone"></i>
                        <p>
                            <strong className="info-label">Teléfono:</strong> {detalle.telHospital}
                        </p>
                        </div>

                        <div className="info-row">
                        <i className="fas fa-location-dot"></i>
                        <p>
                            <strong className="info-label">Localidad:</strong> {detalle.nombreLocalidad ?? '-'}
                        </p>
                        </div>
                    </div>
                )}


                {/* Card Derecha - Nivel de congestión */}
                {congestion && (
                <div className="card-congestion-nivel">
                    <span className="label-congestion">Nivel de Congestión</span>
                    <div className={`nivel-circulo ${congestion.nivelDeCongestion?.toLowerCase()}`}>
                    {congestion.nivelDeCongestion}
                    </div>
                </div>
                )}
            </div>
        )}

      <button className="boton-volver" onClick={() => navigate('/recomendacionPaciente')}>
        Volver al inicio
      </button>
    </div>
  );
}
