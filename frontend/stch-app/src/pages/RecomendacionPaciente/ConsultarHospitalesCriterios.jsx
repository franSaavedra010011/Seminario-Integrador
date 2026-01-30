import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './ConsultarHospitalesCriterios.css';
import '../../App.css';

export default function ConsultarHospitalesCriterios() {
    const navigate = useNavigate();
    const [especialidades, setEspecialidades] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [criterio, setCriterio] = useState('');

    const [filtros, setFiltros] = useState({
        idEspecialidad: '',
        idMedico: '',
    });

    useEffect(() => {
        fetch('http://localhost:3000/shared/listas/especialidades').then(res => res.json()).then(setEspecialidades);
        fetch('http://localhost:3000/shared/listas/medicos').then(res => res.json()).then(setMedicos);
    }, []);

    useEffect(() => {
        setFiltros({
            idEspecialidad: '',
            idMedico: ''
        });
        setResultados([]);
    }, [criterio]);

    const handleChange = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    };

    const handleBuscar = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const idUsuario = decoded?.sub;

            const body = {
                idUsuario,
                criterio: criterio !== '' ? Number(criterio) : undefined,
                idEspecialidad: filtros.idEspecialidad ? Number(filtros.idEspecialidad) : undefined,
                idMedico: filtros.idMedico ? Number(filtros.idMedico) : undefined
            };

            const res = await fetch('http://localhost:3000/recomendacion/consultar-segun-criterios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error('Error al buscar hospitales');
            const data = await res.json();
            setResultados(data);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="main-content">
            <div className="content">
                <div className="container-principal">
                    <div className="header-principal">
                        <h1>Buscar Hospitales por Criterios</h1>
                        <p>Refiná tu búsqueda para obtener mejores resultados.</p>
                    </div>

                    <div className="filtros">
                        <select value={criterio} onChange={(e) => setCriterio(e.target.value)}>
                            <option value="">-- Seleccionar criterio --</option>
                            <option value="2">Último hospital visitado</option>
                            <option value="0">Por especialidad</option>
                            <option value="1">Por médico</option>
                        </select>

                        {criterio === '0' && (
                            <select name="idEspecialidad" value={filtros.idEspecialidad} onChange={handleChange}>
                                <option value="">-- Especialidad --</option>
                                {especialidades.map(esp => <option key={esp.id} value={esp.id}>{esp.nombre}</option>)}
                            </select>
                        )}

                        {criterio === '1' && (
                            <select name="idMedico" value={filtros.idMedico} onChange={handleChange}>
                                <option value="">-- Médico --</option>
                                {medicos.map(m => <option key={m.id} value={m.id}>{m.nombre} {m.apellido}</option>)}
                            </select>
                        )}

                        <button onClick={handleBuscar}>Buscar</button>
                    </div>

                    <div className="resultados">
                        {resultados.length === 0 ? (
                            <p>No se encontraron hospitales con los filtros seleccionados.</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Hospital</th>
                                        <th>Dirección</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                        <th>Localidad</th>
                                        <th>Congestión</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultados.map(h => (
                                        <tr key={h.idHospital}>
                                            <td>{h.nombreHospital}</td>
                                            <td>{h.direccionHospital}</td>
                                            <td>{h.emailHospital}</td>
                                            <td>{h.telHospital}</td>
                                            <td>{h.nombreLocalidad}</td>
                                            <td>{h.nivelDeCongestion || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <button className="boton-volver" onClick={() => navigate('/recomendacionPaciente')}>
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>

    );
}
