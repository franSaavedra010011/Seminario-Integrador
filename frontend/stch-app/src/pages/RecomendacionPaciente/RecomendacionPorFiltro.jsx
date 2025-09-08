import { useState } from 'react';
import './RecomendacionPorFiltro.css';
import { useNavigate } from 'react-router-dom';

export default function RecomendacionPorFiltro() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const localidadUsuario = 'Ciudad';
  const ultimoVisitado = 'Hospital Lagomaggiore';

    const navigate = useNavigate();

  const hospitales = [
    {
      nombre: 'Hospital Central',
      localidad: 'Ciudad',
      congestion: 'Alta',
      actualizacion: '10:00 AM',
      telefono: '261-1234567',
      direccion: 'Calle Falsa 123',
      email: 'central@hospital.com',
    },
    {
      nombre: 'Hospital Lagomaggiore',
      localidad: 'Ciudad',
      congestion: 'Baja',
      actualizacion: '09:30 AM',
      telefono: '261-9876543',
      direccion: 'Av. Salud 456',
      email: 'lago@hospital.com',
    },
    {
      nombre: 'Hospital Perrupato',
      localidad: 'San Martín',
      congestion: 'Media',
      actualizacion: '08:45 AM',
      telefono: '263-5551234',
      direccion: 'Ruta 50 s/n',
      email: 'perrupato@hospital.com',
    },
    {
      nombre: 'Hospital del Este',
      localidad: 'Ciudad',
      congestion: 'Baja',
      actualizacion: '08:15 AM',
      telefono: '261-1122334',
      direccion: 'Calle Este 100',
      email: 'este@hospital.com',
    },
  ];

  const handleSeleccion = (opcion) => {
    setOpcionSeleccionada(prev => (prev === opcion ? '' : opcion));
  };

  const filtrarHospitales = () => {
    if (opcionSeleccionada === 'cercania') {
      return hospitales.filter(h => h.localidad === localidadUsuario);
    }
    if (opcionSeleccionada === 'congestion') {
      return hospitales.filter(h => h.congestion.toLowerCase() === 'baja' && h.localidad === localidadUsuario);
    }
    if (opcionSeleccionada === 'ultimo') {
      return hospitales.filter(h => h.nombre === ultimoVisitado);
    }
    return [];
  };

  const hospitalesFiltrados = filtrarHospitales();

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
          className={opcionSeleccionada === 'ultimo' ? 'activo' : ''}
          onClick={() => handleSeleccion('ultimo')}
        >
          Último visitado
        </button>
      </div>

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
                    <td>{h.localidad}</td>
                    <td>{h.congestion}</td>
                    <td>{h.actualizacion}</td>
                    <td>{h.telefono}</td>
                    <td>{h.direccion}</td>
                    <td>{h.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="sin-resultados">
              No se encontraron hospitales para esta opción.
            </p>
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
