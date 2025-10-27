import { useEffect, useState } from "react";
import "./CrearAgendaSemanal.css";

export default function CrearAgendaSemanal() {
    const [especialidades, setEspecialidades] = useState([]);
    const [hospitalId, setHospitalId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const hospital = localStorage.getItem("hospitalSeleccionado");
        if (hospital) {
            setHospitalId(hospital);
            cargarEspecialidades(hospital);
        }
    }, []);

    const cargarEspecialidades = async (id) => {
        try {
            const res = await fetch(
                `http://localhost:3000/shared/listas/especialidades-hospital?idHospital=${id}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            const data = await res.json();
            setEspecialidades(data);
        } catch (err) {
            console.error(err);
            alert("Error al cargar especialidades.");
        } finally {
            setLoading(false);
        }
    };

    // 🔍 Nueva función: verificar si ya existe una agenda vigente
    const verificarAgendaVigente = async (idRelacion) => {
        try {
            const res = await fetch(`http://localhost:3000/turno/verificarAgendaVigente/${idRelacion}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await res.json();
            return data.vigente;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const crearAgenda = async (idRelacion) => {
        try {
            const vigente = await verificarAgendaVigente(idRelacion);
            if (vigente) {
                alert("⚠️ Ya existe una agenda semanal vigente para este médico.");
                return;
            }

            const res = await fetch(`http://localhost:3000/turno/crearAgendaSemanal/${hospitalId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) throw new Error(await res.text());
            alert("✅ Agenda creada correctamente.");
            cargarEspecialidades(hospitalId);
        } catch (err) {
            alert("❌ " + err.message);
        }
    };

    if (loading) return <p>Cargando especialidades...</p>;

    return (
        <div className="crear-agenda-container">
            <h2>Creación de Agenda Semanal</h2>
            <p>Seleccione la especialidad para generar la agenda de esta semana.</p>

            {especialidades.map((esp) => (
                <div key={esp.idRelacion} className="especialidad-card">
                    <h3>{esp.nombreEspecialidad}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Médico</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {esp.medicos.map((m) => (
                                <tr key={m.idRelacion}>
                                    <td>{m.nombreMedico}</td>
                                    <td>
                                        {m.tieneAgendaVigente ? (
                                            <span className="estado-vigente">✅ Agenda vigente</span>
                                        ) : (
                                            <span className="estado-pendiente">❌ Sin agenda</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="crear-btn"
                                            onClick={() => crearAgenda(hospitalId)}
                                            disabled={m.tieneAgendaVigente}
                                            style={{
                                                backgroundColor: m.tieneAgendaVigente ? "#ccc" : "#007bff",
                                                cursor: m.tieneAgendaVigente ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            {m.tieneAgendaVigente ? "Agenda activa" : "🕒 Crear agenda"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
