import { useState } from 'react';
import './Notificaciones.css';

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      contenido: 'Su turno ha sido confirmado para el 25 de junio a las 10:00.',
      fecha: '2025-06-20',
      leida: false,
    },
    {
      id: 2,
      contenido: 'Nueva especialidad disponible en Hospital Central: Dermatología.',
      fecha: '2025-06-18',
      leida: false,
    },
    {
      id: 3,
      contenido: 'Su historia médica fue actualizada por el Dr. Pérez.',
      fecha: '2025-06-15',
      leida: true,
    },
  ]);

  const marcarComoLeida = (id) => {
    setNotificaciones(prev =>
      prev.map(n => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  return (
    <div className="notificaciones-container">
      <h1>Notificaciones</h1>
      {notificaciones.length === 0 ? (
        <p>No hay notificaciones.</p>
      ) : (
        <ul className="notificaciones-lista">
          {notificaciones.map((n) => (
            <li key={n.id} className={`notificacion ${n.leida ? 'leida' : ''}`}>
              <div className="contenido">
                <p>{n.contenido}</p>
                <span className="fecha">{n.fecha}</span>
              </div>
              <div className="acciones">
                {n.leida ? (
                  <span className="estado-leido">✔ Leída</span>
                ) : (
                  <button onClick={() => marcarComoLeida(n.id)} className="boton-leer">
                    Marcar como leída
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
