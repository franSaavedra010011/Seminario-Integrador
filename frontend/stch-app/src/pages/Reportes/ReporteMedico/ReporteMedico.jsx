import { useState, useEffect } from 'react';
import './ReporteMedico.css';
import '../../../App.css';

export default function ReporteMedico({ onVolver }) {
    const [medicoSeleccionado, setMedicoSeleccionado] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [reporte, setReporte] = useState(null);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        cargarMedicos();
    }, []);

    const cargarMedicos = async () => {
        try {
            const response = await fetch('http://localhost:3000/shared/listas/medicos');
            if (response.ok) {
                const data = await response.json();
                setMedicos(data);
            }
        } catch (error) {
            console.error('Error al cargar médicos:', error);
        }
    };

    const generarReporte = async () => {
        if (!medicoSeleccionado || !fechaDesde || !fechaHasta) {
            alert('Por favor, complete todos los campos');
            return;
        }

        // Validar que fechaDesde sea menor que fechaHasta
        if (new Date(fechaDesde) > new Date(fechaHasta)) {
            alert('La fecha desde debe ser menor o igual a la fecha hasta');
            return;
        }

        setCargando(true);
        try {
            // Formatear fechas para asegurar formato YYYY-MM-DD
            const fechaDesdeFormatted = new Date(fechaDesde).toISOString().split('T')[0];
            const fechaHastaFormatted = new Date(fechaHasta).toISOString().split('T')[0];

            const response = await fetch(
                `http://localhost:3000/reportes/generarReporteMedico/${medicoSeleccionado}/${fechaDesdeFormatted}/${fechaHastaFormatted}`
            );

            if (response.ok) {
                const data = await response.json();
                setReporte(data);
            } else {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || 'Error al generar el reporte';
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error al generar reporte:', error);
            alert('Error de conexión con el servidor');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="content">
            <div className='container-btn-volver'>
                <button className="btn-volver" onClick={onVolver}>
                    ← Volver a Reportes
                </button>
            </div>

            <div className="reporte-medico-container">


                <div className="header-principal-reportes">
                    <h1>Reporte de Médico</h1>
                    <p>Genere reportes detallados de productividad y horarios médicos</p>
                </div>

                <div className="formulario-reporte">
                    <div className="campo">
                        <label>Médico:</label>
                        <select
                            value={medicoSeleccionado}
                            onChange={(e) => setMedicoSeleccionado(e.target.value)}
                        >
                            <option value="">Seleccione un médico</option>
                            {medicos.map(medico => (
                                <option key={medico.id} value={medico.id}>
                                    Dr. {medico.nombreMedico} {medico.apellidoMedico}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="campo">
                        <label>Fecha desde:</label>
                        <input
                            type="date"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                        <small>Sugerido: 2025-12-01 (inicio del mes)</small>
                    </div>

                    <div className="campo">
                        <label>Fecha hasta:</label>
                        <input
                            type="date"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                        <small>Sugerido: 2025-12-31 (fin del mes)</small>
                    </div>
                    <div className="btn-generar-container">
                        <button
                            className="btn-generar"
                            onClick={generarReporte}
                            disabled={cargando}
                        >
                            {cargando ? 'Generando...' : 'Generar Reporte'}
                        </button>
                    </div>

                </div>

                {reporte && (
                    <div className="resultados-reporte">
                        <h3>Resultados del Reporte</h3>

                        <div className="estadisticas-grid">
                            <div className="stat-card">
                                <div className="stat-number">{reporte.turnosAtendidos || 0}</div>
                                <div className="stat-label">Turnos Atendidos</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-number">{reporte.turnosReservados || 0}</div>
                                <div className="stat-label">Turnos Reservados</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-number">{reporte.turnosAusentes || 0}</div>
                                <div className="stat-label">Turnos con Ausencias</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-number">
                                    {reporte.porcentajeAsistencia ? `${reporte.porcentajeAsistencia}%` : 'N/A'}
                                </div>
                                <div className="stat-label">% Asistencia</div>
                            </div>
                        </div>

                        {reporte.turnos && reporte.turnos.length > 0 && (
                            <div className="tabla-turnos">
                                <h4>Detalle de Turnos</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>Paciente</th>
                                            <th>Estado</th>
                                            <th>Especialidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reporte.turnos.map((turno, index) => (
                                            <tr key={index}>
                                                <td>{turno.fecha || 'N/A'}</td>
                                                <td>{turno.hora || 'N/A'}</td>
                                                <td>{turno.nombrePaciente || 'N/A'}</td>
                                                <td>
                                                    <span className={`estado ${turno.nombreEstado?.toLowerCase()}`}>
                                                        {turno.nombreEstado || 'N/A'}
                                                    </span>
                                                </td>
                                                <td>{turno.nombreEspecialidad || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}