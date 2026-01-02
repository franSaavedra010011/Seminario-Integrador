import { useState, useEffect } from 'react';
import './ReportePaciente.css';

export default function ReportePaciente({ onVolver }) {
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
    const [fechaDesde, setFechaDesde] = useState('2025-12-01'); // Valor por defecto
    const [fechaHasta, setFechaHasta] = useState('2025-12-31'); // Valor por defecto
    const [usuarios, setUsuarios] = useState([]);
    const [reporte, setReporte] = useState(null);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:3000/shared/listas/usuarios');
            if (response.ok) {
                const data = await response.json();
                // Filtrar solo usuarios que son pacientes
                const usuariosPacientes = data.filter(usuario => usuario.paciente);
                setUsuarios(usuariosPacientes);
            }
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    const generarReporte = async () => {
        if (!usuarioSeleccionado || !fechaDesde || !fechaHasta) {
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

            const url = `http://localhost:3000/reportes/generarReportePaciente/${usuarioSeleccionado}/${fechaDesdeFormatted}/${fechaHastaFormatted}`;
            console.log('🌐 URL del request:', url);
            console.log('📋 Parámetros:', {
                usuarioSeleccionado,
                fechaDesde,
                fechaHasta,
                fechaDesdeFormatted,
                fechaHastaFormatted
            });

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('📊 Datos del reporte recibidos:', data);
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

    const calcularTotalTurnos = () => {
        if (!reporte) return 0;
        return (reporte.turnosAtendidos || 0) + (reporte.turnosReservados || 0) + (reporte.turnosAusentes || 0);
    };

    return (
        <div className="content">
            <div className='container-btn-volver'>
                <button className="btn-volver" onClick={onVolver}>
                    ← Volver a Reportes
                </button>
            </div>

            <div className="reporte-paciente-container">


                <div className="header-reportes-subpage">
                    <h1>Reporte de Paciente</h1>
                    <p>Consulte el historial de citas, diagnósticos y estadísticas de un paciente específico</p>
                </div>

                <div className="formulario-reporte">
                    <div className="campo">
                        <label>Paciente:</label>
                        <select
                            value={usuarioSeleccionado}
                            onChange={(e) => setUsuarioSeleccionado(e.target.value)}
                        >
                            <option value="">Seleccione un paciente</option>
                            {usuarios.map(usuario => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.paciente?.nombrePaciente} {usuario.paciente?.apellidoPaciente} - {usuario.emailUsuario}
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
                        <h3>Historial de Turnos</h3>

                        <div className="estadisticas-grid">
                            <div className="stat-card atendidos">
                                <div className="stat-number">{reporte.turnosAtendidos || 0}</div>
                                <div className="stat-label">Turnos Atendidos</div>
                            </div>

                            <div className="stat-card reservados">
                                <div className="stat-number">{reporte.turnosReservados || 0}</div>
                                <div className="stat-label">Turnos Reservados</div>
                            </div>

                            <div className="stat-card ausentes">
                                <div className="stat-number">{reporte.turnosAusentes || 0}</div>
                                <div className="stat-label">Ausencias</div>
                            </div>

                            <div className="stat-card total">
                                <div className="stat-number">{calcularTotalTurnos()}</div>
                                <div className="stat-label">Total de Turnos</div>
                            </div>
                        </div>

                        {reporte.turnos && reporte.turnos.length > 0 ? (
                            <div className="tabla-turnos">
                                <h4>Detalle de Turnos en el Período</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Especialidad</th>
                                            <th>Médico</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reporte.turnos.map((turno, index) => (
                                            <tr key={index}>
                                                <td>{turno.nombreEspecialidad || 'N/A'}</td>
                                                <td>
                                                    Dr. {turno.nombreMedico || 'N/A'} {turno.apellidoMedico || ''}
                                                </td>
                                                <td>
                                                    <span className={`estado ${turno.nombreEstado?.toLowerCase()}`}>
                                                        {turno.nombreEstado || 'N/A'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="sin-turnos">
                                {calcularTotalTurnos() > 0 ? (
                                    <div>
                                        <p><strong>Se encontraron {calcularTotalTurnos()} turnos en el período, pero no se pudo obtener el detalle.</strong></p>
                                        <p>Turnos: {reporte.turnosAtendidos || 0} atendidos, {reporte.turnosReservados || 0} reservados, {reporte.turnosAusentes || 0} ausencias</p>
                                        <p><em>Nota: El array de turnos está vacío en la respuesta del servidor.</em></p>
                                        {console.log('⚠️ Contadores positivos pero array vacío. Array turnos:', reporte.turnos)}
                                    </div>
                                ) : (
                                    <p>No se encontraron turnos en el período seleccionado.</p>
                                )}
                            </div>
                        )}

                        {calcularTotalTurnos() > 0 && (
                            <div className="analisis">
                                <h4>Análisis del Período</h4>
                                <div className="metricas">
                                    <div className="metrica">
                                        <span className="metrica-label">Porcentaje de Asistencia:</span>
                                        <span className="metrica-valor">
                                            {calcularTotalTurnos() > 0
                                                ? Math.round((reporte.turnosAtendidos / calcularTotalTurnos()) * 100)
                                                : 0}%
                                        </span>
                                    </div>
                                    <div className="metrica">
                                        <span className="metrica-label">Porcentaje de Ausencias:</span>
                                        <span className="metrica-valor">
                                            {calcularTotalTurnos() > 0
                                                ? Math.round((reporte.turnosAusentes / calcularTotalTurnos()) * 100)
                                                : 0}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}