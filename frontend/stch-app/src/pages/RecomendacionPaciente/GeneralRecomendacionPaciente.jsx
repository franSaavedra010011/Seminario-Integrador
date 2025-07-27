import './GeneralRecomendacionPaciente.css';
import { useNavigate } from 'react-router-dom';
export default function RecomendacionPaciente() {
    const navigate = useNavigate();
    const handleNavigate = (url) =>{
        console.log('navega..')
        navigate(`/${url}`);
    };
    return(
        <div className="content">
            <h1>Recomendacion Paciente</h1>
            <p>Aqui podrá realizar las siguiente acciones</p>
            <div className="info-cards">
                <button className="card" onClick={() => handleNavigate('recomendacionPorFiltro')}>
                    <h3>- Solicitar recomendación de hospital</h3>
                    <p>
                    Su próximo turno es el <strong>5 de mayo a las 10:00 AM</strong> en
                    el Hospital Central.
                    </p>
                </button>
                <button className="card">
                    <h3>- Consultar hospitales según criterios</h3>
                    <p>
                    El último hospital que visitó tenía una ocupación del{' '}
                    <strong>85%</strong>.
                    </p>
                </button>
                <button className="card">
                    <h3>- Consultar detalle del hospital</h3>
                    <p>
                    Hospital del Sur (1.2 km)
                    <br />
                    Clínica Santa Fe (2.0 km)
                    </p>
                </button>
                <button type="button" className="card"  onClick={() => handleNavigate('consultarCongestion')}>
                    <h3>- Consultar congestión de hospital</h3>
                    <p>
                    Podrá observar la congestión del Hospital, basado en los filtros:
                    <br />✔ Localidad
                    <br />✔ Especialidad
                    </p>
                </button>
                <button className="card" onClick={() => handleNavigate('compararHospitales')}>
                    <h3>- Comparar hospitales</h3>
                    <p>
                    Podrá comparar entre dos o más hospitales y observar las siguientes caracteristicas
                    <br />✔ Especialidades
                    <br />✔ Congestion
                    </p>
                </button>
            </div>
        </div>
    );
}