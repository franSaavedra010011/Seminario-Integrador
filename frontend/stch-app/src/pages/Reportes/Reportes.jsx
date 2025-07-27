import './Reportes.css';

export default function Reportes() {
  return (
    <div className="content">
      <h1>Reportes Disponibles</h1>
      <p>Seleccioná el reporte que deseás consultar.</p>

      {/* Paciente */}
      <h2 className="section-title">🧑 Paciente</h2>
      <div className="info-cards">
        <div className="card">
          <h3>Historial de turnos</h3>
          <p>Solicitados, asistidos, cancelados.</p>
        </div>
        <div className="card">
          <h3>Tiempo de espera</h3>
          <p>Promedio para obtener un turno.</p>
        </div>
        <div className="card">
          <h3>Especialidades más consultadas</h3>
          <p>Ranking de consultas por especialidad.</p>
        </div>
        <div className="card">
          <h3>Estadísticas de uso</h3>
          <p>Frecuencia, cancelaciones, actividad.</p>
        </div>
      </div>

      {/* Médico */}
      <h2 className="section-title">🩺 Médico</h2>
      <div className="info-cards">
        <div className="card">
          <h3>Turnos asignados</h3>
          <p>Día, semana y mes.</p>
        </div>
        <div className="card">
          <h3>Asistencia de pacientes</h3>
          <p>Porcentaje de asistencia.</p>
        </div>
        <div className="card">
          <h3>Reprogramaciones</h3>
          <p>Cancelaciones por paciente.</p>
        </div>
        <div className="card">
          <h3>Distribución por tipo</h3>
          <p>Consulta o especialidad.</p>
        </div>
      </div>

      {/* Administrador */}
      <h2 className="section-title">🏥 Administrador del hospital</h2>
      <div className="info-cards">
        <div className="card">
          <h3>Ocupación por especialidad</h3>
          <p>Tasa de ocupación profesional.</p>
        </div>
        <div className="card">
          <h3>Demanda de turnos</h3>
          <p>Día, semana y mes.</p>
        </div>
        <div className="card">
          <h3>Horarios pico</h3>
          <p>Franja de mayor y menor demanda.</p>
        </div>
        <div className="card">
          <h3>Estadísticas agregadas</h3>
          <p>Por médico, especialidad y hospital.</p>
        </div>
        <div className="card">
          <h3>Tiempo de espera</h3>
          <p>Desde solicitud hasta atención.</p>
        </div>
        <div className="card">
          <h3>Cancelaciones</h3>
          <p>Total de cancelaciones y reprogramaciones.</p>
        </div>
        <div className="card">
          <h3>Comparativas históricas</h3>
          <p>Entre especialidades o áreas.</p>
        </div>
      </div>
    </div>
  );
}
