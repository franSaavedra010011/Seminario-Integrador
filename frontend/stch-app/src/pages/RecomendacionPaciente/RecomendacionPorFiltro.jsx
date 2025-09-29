import { useState } from 'react';
import './RecomendacionPorFiltro.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function RecomendacionPorFiltro() {
  const [hospitalesRecomendados, setHospitalesRecomendados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const navigate = useNavigate();

  const handleSeleccion = (opcion) => {
    if (opcion === opcionSeleccionada) {
      setOpcionSeleccionada('');
      setHospitalesRecomendados([]);
      return;
    }
    solicitarRecomendacion(opcion);
  };

  const solicitarRecomendacion = async (opcion) => {
    setOpcionSeleccionada(opcion);
    setCargando(true);

    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const idUsuario = decoded?.sub;

      const response = await fetch('http://localhost:3000/recomendacion/solicitar-recomendacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          opcion,
          idUsuario
        })
      });

      if (!response.ok) throw new Error('Error en la solicitud');
      const data = await response.json();
      setHospitalesRecomendados(data);
    } catch (error) {
      console.error('Error al solicitar recomendación:', error);
      setHospitalesRecomendados([]);
    } finally {
      setCargando(false);
    }
  };

  const hospitalesFiltrados = hospitalesRecomendados;

  return (
    <div className="contenedor-recomendacion">
      <h1>Recomendación de Hospitales</h1>

      <div className="opciones">
        <button
          className={opcionSeleccionada === 'cercania' ? 'activo' : ''}
          onClick={() => handleSeleccion('cercania')}
        >
          Por cercanía
        </button>
        <button
          className={opcionSeleccionada === 'congestion' ? 'activo' : ''}
          onClick={() => handleSeleccion('congestion')}
        >
          Por congestión
        </button>
        <button
          className={opcionSeleccionada === 'visitado' ? 'activo' : ''}
          onClick={() => handleSeleccion('visitado')}
        >
          Último visitado
        </button>
      </div>

      {cargando && <p className="cargando">Cargando hospitales...</p>}

      {opcionSeleccionada && (
        <div className="tabla-hospitales">
          <h2>
            Resultados: {opcionSeleccionada === 'cercania'
              ? 'Por cercanía'
              : opcionSeleccionada === 'congestion'
                ? 'Por congestión baja'
                : 'Último hospital visitado'}
          </h2>

          {hospitalesFiltrados.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Localidad</th>
                  <th>Congestión</th>
                  <th>Actualización</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {hospitalesFiltrados.map((h, index) => (
                  <tr key={index}>
                    <td>{h.nombre}</td>
                    <td>{h.localidad?.nombre ?? '-'}</td>
                    <td>{h.nivelCongestion ?? 'No informado'}</td>
                    <td>{h.fechaActualizacionCongestion ?? '-'}</td>
                    <td>{h.telefono}</td>
                    <td>{h.direccion}</td>
                    <td>{h.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !cargando && (
              <p className="sin-resultados">
                No se encontraron hospitales para esta opción.
              </p>
            )
          )}
        </div>
      )}

      <hr />
      <button className="boton-volver" onClick={() => navigate('/recomendacionPaciente')}>
        Volver al inicio
      </button>
    </div>
  );
}
