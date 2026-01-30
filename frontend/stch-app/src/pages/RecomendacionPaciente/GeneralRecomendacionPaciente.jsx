import './GeneralRecomendacionPaciente.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { Hospital, Search, Activity, GitCompare, ChevronRight } from 'lucide-react';

export default function RecomendacionPaciente() {
    const navigate = useNavigate();
    const handleNavigate = (url) => {
        console.log('navega..')
        navigate(`/${url}`);
    };

    const opciones = [
        {
            id: 1,
            titulo: 'Solicitar Recomendación',
            descripcion: 'Obtené sugerencias personalizadas de hospitales según tu ubicación.',
            icono: Hospital,
            url: 'recomendacionPorFiltro',
            color: '#3b82f6'
        },
        {
            id: 2,
            titulo: 'Buscar por Criterios',
            descripcion: 'Filtrá hospitales específicos por localidad, especialidad y disponibilidad.',
            icono: Search,
            url: 'consultarHospitalesCriterios',
            color: '#8b5cf6'
        },
        {
            id: 3,
            titulo: 'Ver Congestión',
            descripcion: 'Consultá en tiempo real el nivel de ocupación y saturación de hospitales por zona.',
            icono: Activity,
            url: 'consultarCongestion',
            color: '#f59e0b'
        },
        {
            id: 4,
            titulo: 'Comparar Hospitales',
            descripcion: 'Compará múltiples hospitales lado a lado: especialidades, congestión, ubicación y más.',
            icono: GitCompare,
            url: 'compararHospitales',
            color: '#10b981'
        }
    ];

    return (
        <div className="content">
            <div className="container-principal">
                <div className="header-principal">
                    <h1>Recomendación para Pacientes</h1>
                    <p>Elegí la opción que mejor se adapte a tus necesidades</p>
                </div>

                <div className="info-cards">
                    {opciones.map((opcion) => {
                        const IconoComponente = opcion.icono;
                        return (
                            <button
                                key={opcion.id}
                                className="card"
                                onClick={() => handleNavigate(opcion.url)}
                            >
                                <div className="card-icon-container" style={{ backgroundColor: `${opcion.color}15` }}>
                                    <IconoComponente
                                        className="card-icon"
                                        size={28}
                                        style={{ color: opcion.color }}
                                    />
                                </div>
                                <div className="card-content">
                                    <h3>{opcion.titulo}</h3>
                                    <p>{opcion.descripcion}</p>
                                </div>
                                <ChevronRight className="card-arrow" size={20} />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}