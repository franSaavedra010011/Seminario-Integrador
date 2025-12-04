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

    const cargarEspecialidades = async (idHospital) => {
        try {
            const res = await fetch(
                `http://localhost:3000/shared/listas/especialidades-hospital?idHospital=${idHospital}`,
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

    const verificarAgendaVigente = async (idHEM) => {
        try {
            const res = await fetch(
                `http://localhost:3000/turno/verificarAgendaVigente/${idHEM}`,
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

    const crearAgenda = async (idHEM) => {
        try {
            console.log("Verificando agenda vigente para HEM ID:", idHEM);
            const vigente = await verificarAgendaVigente(idHEM);

            if (vigente) {
                alert("Ya existe una agenda semanal vigente para este médico.");
                return;
            }

            const res = await fetch(
                `http://localhost:3000/turno/crearAgendaSemanal/${hospitalId}/${idHEM}`,
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

            // Recargar las especialidades para reflejar los cambios
            await cargarEspecialidades(hospitalId);
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
                <div key={esp.idHEM} className="especialidad-card">
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
                                <tr key={m.idHEM}>
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
                                                    onClick={() => {
                                                        crearAgenda(m.idHEM);
                                                    }}
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
