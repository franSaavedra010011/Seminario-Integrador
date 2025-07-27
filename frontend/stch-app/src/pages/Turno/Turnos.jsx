import './Turnos.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Turnos() {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [observacionTurno, setObservacionTurno] = useState('');

  const anularTurno = () => {
    const confirmacion = window.confirm('¿Está seguro que desea anular este turno?');
    if (confirmacion) {
      toast.success('Turno anulado correctamente', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const mostrarInfo = (observacion) => {
    setObservacionTurno(observacion);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setObservacionTurno('');
  };

  return (
    <div className="content">
      <h1>Turnos Activos</h1>
      <button onClick={() => navigate('/nuevo-turno')}>Nuevo Turno</button>
      <hr />
      <div className="table-turno">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Especialidad</th>
              <th>Especialista</th>
              <th>Hospital</th>
              <th>Anular</th>
              <th>Imprimir</th>
              <th>Información</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>18/05/25</td>
              <td>08:00</td>
              <td>Pediatría</td>
              <td>Dr. Lucas</td>
              <td>Hospital Perrupato</td>
              <td><i className="fas fa-trash" onClick={anularTurno}></i></td>
              <td><i className="fas fa-print"></i></td>
              <td><i className="fas fa-info" onClick={() => mostrarInfo('Debe asistir en ayunas y con estudios previos.')}></i></td>
            </tr>
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Observaciones del Turno</h2>
            <p>{observacionTurno}</p>
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
