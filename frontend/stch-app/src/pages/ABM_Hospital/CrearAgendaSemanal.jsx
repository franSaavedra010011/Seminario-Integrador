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

    const verificarAgendaVigente = async (idRelacion) => {
        try {
            const res = await fetch(
                `http://localhost:3000/turno/verificarAgendaVigente/${idRelacion}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
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
                alert("Ya existe una agenda semanal vigente para este médico.");
                return;
            }

            const res = await fetch(
                `http://localhost:3000/turno/crearAgendaSemanal/${hospitalId}/${idRelacion}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!res.ok) throw new Error(await res.text());
            alert("Agenda creada correctamente.");

            // Esperar un breve tiempo antes de recargar datos
            await new Promise((resolve) => setTimeout(resolve, 300));

            // 1. Recalcular el estado de agenda de todos los médicos
            const nuevasEspecialidades = await Promise.all(
                especialidades.map(async (esp) => ({
                    ...esp,
                    medicos: await Promise.all(
                        esp.medicos.map(async (med) => ({
                            ...med,
                            tieneAgendaVigente: await verificarAgendaVigente(med.idRelacion),
                        }))
                    ),
                }))
            );

            // 2. Actualizar el estado de React
            setEspecialidades(nuevasEspecialidades);
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        }
    };


    if (loading) return <p>Cargando especialidades...</p>;

    return (
        <div className="crear-agenda-container">
            <h2>Gestión de Agendas Semanales</h2>
            <p>Visualice las especialidades y el estado de agenda de cada médico.</p>

            {especialidades.map((esp) => (
                <div key={esp.idRelacion} className="especialidad-card">
                    <h3>{esp.nombreEspecialidad}</h3>

                    <table className="tabla-agendas">
                        <thead>
                            <tr>
                                <th>Médico</th>
                                <th>Estado de Agenda</th>
                            </tr>
                        </thead>
                        <tbody>
                            {esp.medicos.map((m) => (
                                <tr key={m.idRelacion}>
                                    <td>{m.nombreMedico}</td>
                                    <td>
                                        {m.tieneAgendaVigente ? (
                                            <div className="estado-agenda-container">
                                                <span className="estado vigente">Agenda vigente</span>
                                            </div>
                                        ) : (
                                            <div className="estado-agenda-container">
                                                <span className="estado sin-agenda">Sin agenda</span>
                                                <button
                                                    className="btn-agenda"
                                                    onClick={() => crearAgenda(m.idRelacion)}
                                                >
                                                    Crear agenda
                                                </button>
                                            </div>
                                        )}
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
