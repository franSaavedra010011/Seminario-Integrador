import { useState, useEffect } from 'react';
import './ReporteAdministrativo.css';

export default function ReporteAdministrativo({ onVolver }) {
    const [hospitalSeleccionado, setHospitalSeleccionado] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [hospitales, setHospitales] = useState([]);
    const [reporte, setReporte] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [tipoReporte, setTipoReporte] = useState('general'); // 'general' o 'periodo'

    useEffect(() => {
        cargarHospitales();
    }, []);

    const cargarHospitales = async () => {
        try {
            const response = await fetch('http://localhost:3000/shared/listas/hospitales');
            if (response.ok) {
                const data = await response.json();
                setHospitales(data);
            }
        } catch (error) {
            console.error('Error al cargar hospitales:', error);
        }
    };

    const generarReporte = async () => {
        if (!hospitalSeleccionado) {
            alert('Por favor, seleccione un hospital');
            return;
        }

        if (tipoReporte === 'periodo' && (!fechaDesde || !fechaHasta)) {
            alert('Por favor, complete las fechas para el reporte por período');
            return;
        }

        // Validar que fechaDesde sea menor que fechaHasta (solo para reporte por período)
        if (tipoReporte === 'periodo' && new Date(fechaDesde) > new Date(fechaHasta)) {
            alert('La fecha desde debe ser menor o igual a la fecha hasta');
            return;
        } setCargando(true);
        try {
            let url;
            if (tipoReporte === 'general') {
                url = `http://localhost:3000/reportes/generarReporteAdministrativoHospital/${hospitalSeleccionado}`;
            } else {
                // Formatear fechas para asegurar formato YYYY-MM-DD
                const fechaDesdeFormatted = new Date(fechaDesde).toISOString().split('T')[0];
                const fechaHastaFormatted = new Date(fechaHasta).toISOString().split('T')[0];
                url = `http://localhost:3000/reportes/generarReporteAdministrativo/${hospitalSeleccionado}/${fechaDesdeFormatted}/${fechaHastaFormatted}`;
            }

            const response = await fetch(url);

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

            <div className="reporte-administrativo-container">

                <div className="header-reportes-subpage">
                    <h1>Reporte Administrativo</h1>
                    <p>Visualice datos y métricas generales del sistema para la gestión y toma de decisiones</p>
                </div>

                <div className="formulario-reporte">
                    <div className="campo">
                        <label>Tipo de Reporte:</label>
                        <select
                            value={tipoReporte}
                            onChange={(e) => setTipoReporte(e.target.value)}
                        >
                            <option value="general">Reporte General</option>
                            <option value="periodo">Reporte por Período</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label>Hospital:</label>
                        <select
                            value={hospitalSeleccionado}
                            onChange={(e) => setHospitalSeleccionado(e.target.value)}
                        >
                            <option value="">Seleccione un hospital</option>
                            {hospitales.map(hospital => (
                                <option key={hospital.id} value={hospital.id}>
                                    {hospital.nombreHospital}
                                </option>
                            ))}
                        </select>
                    </div>

                    {tipoReporte === 'periodo' && (
                        <>
                            <div className="campo">
                                <label>Fecha desde:</label>
                                <input
                                    type="date"
                                    value={fechaDesde}
                                    onChange={(e) => setFechaDesde(e.target.value)}
                                />
                            </div>

                            <div className="campo">
                                <label>Fecha hasta:</label>
                                <input
                                    type="date"
                                    value={fechaHasta}
                                    onChange={(e) => setFechaHasta(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <button
                        className="btn-generar"
                        onClick={generarReporte}
                        disabled={cargando}
                    >
                        {cargando ? 'Generando...' : 'Generar Reporte'}
                    </button>
                </div>

                {reporte && (
                    <div className="resultados-reporte">
                        <h3>Métricas del Hospital</h3>

                        <div className="estadisticas-grid">
                            {reporte.totalTurnos !== undefined && (
                                <div className="stat-card total">
                                    <div className="stat-number">{reporte.totalTurnos}</div>
                                    <div className="stat-label">Total de Turnos</div>
                                </div>
                            )}

                            {reporte.turnosAtendidos !== undefined && (
                                <div className="stat-card atendidos">
                                    <div className="stat-number">{reporte.turnosAtendidos}</div>
                                    <div className="stat-label">Turnos Atendidos</div>
                                </div>
                            )}

                            {reporte.turnosReservados !== undefined && (
                                <div className="stat-card reservados">
                                    <div className="stat-number">{reporte.turnosReservados}</div>
                                    <div className="stat-label">Turnos Reservados</div>
                                </div>
                            )}

                            {reporte.turnosAusentes !== undefined && (
                                <div className="stat-card ausentes">
                                    <div className="stat-number">{reporte.turnosAusentes}</div>
                                    <div className="stat-label">Ausencias</div>
                                </div>
                            )}

                            {reporte.porcentajeAsistencia !== undefined && (
                                <div className="stat-card porcentaje">
                                    <div className="stat-number">{reporte.porcentajeAsistencia}%</div>
                                    <div className="stat-label">% Asistencia</div>
                                </div>
                            )}

                            {reporte.totalMedicos !== undefined && (
                                <div className="stat-card medicos">
                                    <div className="stat-number">{reporte.totalMedicos}</div>
                                    <div className="stat-label">Médicos Activos</div>
                                </div>
                            )}
                        </div>

                        {reporte.especialidades && reporte.especialidades.length > 0 && (
                            <div className="tabla-especialidades">
                                <h4>Estadísticas por Especialidad</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Especialidad</th>
                                            <th>Turnos</th>
                                            <th>Médicos</th>
                                            <th>% Asistencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reporte.especialidades.map((esp, index) => (
                                            <tr key={index}>
                                                <td>{esp.nombre || 'N/A'}</td>
                                                <td>{esp.totalTurnos || 0}</td>
                                                <td>{esp.totalMedicos || 0}</td>
                                                <td>
                                                    <span className="porcentaje">
                                                        {esp.porcentajeAsistencia || 0}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {reporte.medicos && reporte.medicos.length > 0 && (
                            <div className="tabla-medicos">
                                <h4>Rendimiento por Médico</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Médico</th>
                                            <th>Especialidad</th>
                                            <th>Turnos Atendidos</th>
                                            <th>Turnos Reservados</th>
                                            <th>% Asistencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reporte.medicos.map((medico, index) => (
                                            <tr key={index}>
                                                <td>Dr. {medico.nombre || 'N/A'}</td>
                                                <td>{medico.especialidad || 'N/A'}</td>
                                                <td>{medico.turnosAtendidos || 0}</td>
                                                <td>{medico.turnosReservados || 0}</td>
                                                <td>
                                                    <span className="porcentaje">
                                                        {medico.porcentajeAsistencia || 0}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {reporte.resumen && (
                            <div className="resumen">
                                <h4>Resumen Ejecutivo</h4>
                                <div className="resumen-content">
                                    <p><strong>Hospital:</strong> {reporte.resumen.nombreHospital || 'N/A'}</p>
                                    <p><strong>Período:</strong> {reporte.resumen.periodo || tipoReporte}</p>
                                    <p><strong>Total de consultas:</strong> {reporte.resumen.totalConsultas || reporte.totalTurnos || 0}</p>
                                    <p><strong>Eficiencia de asistencia:</strong> {reporte.resumen.eficiencia || reporte.porcentajeAsistencia || 0}%</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}