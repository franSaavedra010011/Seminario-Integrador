import { useState } from 'react';
import './Reportes.css';
import ReporteMedico from './ReporteMedico/ReporteMedico';
import ReportePaciente from './ReportePaciente/ReportePaciente';
import ReporteAdministrativo from './ReporteAdministrativo/ReporteAdministrativo';

export default function Reportes() {
  const [vistaActual, setVistaActual] = useState('seleccion');

  const manejarSeleccionReporte = (tipoReporte) => {
    setVistaActual(tipoReporte);
  };

  const volverASeleccion = () => {
    setVistaActual('seleccion');
  };

  if (vistaActual === 'medico') {
    return <ReporteMedico onVolver={volverASeleccion} />;
  }

  if (vistaActual === 'paciente') {
    return <ReportePaciente onVolver={volverASeleccion} />;
  }

  if (vistaActual === 'administrativo') {
    return <ReporteAdministrativo onVolver={volverASeleccion} />;
  }

  return (
    <div className="content">
      <div className="reportes-container">
        <div className="header-reportes">
          <h1>Selección de Reporte</h1>
          <p>Elija el tipo de reporte que desea generar.</p>
        </div>

        <div className="reportes-grid">
          {/* Reporte de Médico */}
          <div className="reporte-card" onClick={() => manejarSeleccionReporte('medico')}>
            <div className="reporte-icon medico">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,6H16V4A2,2 0 0,0 14,2H10A2,2 0 0,0 8,4V6H4A2,2 0 0,0 2,8V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V8A2,2 0 0,0 20,6M10,4H14V6H10V4Z" />
              </svg>
            </div>
            <div className="reporte-content">
              <h3>Reporte de Médico</h3>
              <p>Genere reportes detallados por profesional médico, incluyendo productividad y horarios.</p>
            </div>
          </div>

          {/* Reporte de Paciente */}
          <div className="reporte-card" onClick={() => manejarSeleccionReporte('paciente')}>
            <div className="reporte-icon paciente">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
              </svg>
            </div>
            <div className="reporte-content">
              <h3>Reporte de Paciente</h3>
              <p>Consulte el historial de citas, diagnósticos y estadísticas de un paciente específico.</p>
            </div>
          </div>

          {/* Reporte Administrativo */}
          <div className="reporte-card" onClick={() => manejarSeleccionReporte('administrativo')}>
            <div className="reporte-icon administrativo">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,3H5C3.9,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3M9,17H7V10H9V17M13,17H11V7H13V17M17,17H15V13H17V17Z" />
              </svg>
            </div>
            <div className="reporte-content">
              <h3>Reporte Administrativo</h3>
              <p>Visualice datos y métricas generales del sistema para la gestión y toma de decisiones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
