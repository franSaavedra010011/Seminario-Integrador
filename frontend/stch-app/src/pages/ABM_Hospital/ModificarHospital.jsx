import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function ModificarHospital() {
  const location = useLocation();
  const navigate = useNavigate();

  const hospital = {
    id: location.state?.hospital?.id || '',
    nombre: location.state?.hospital?.nombre || '',
    direccion: location.state?.hospital?.direccion || '',
    email: location.state?.hospital?.email || '',
    telefono: location.state?.hospital?.telefono || '',
    especialidades: location.state?.hospital?.especialidades || []
  };


  const [nombre, setNombre] = useState(hospital.nombre);
  const [direccion, setDireccion] = useState(hospital.direccion);
  const [email, setEmail] = useState(hospital.email);
  const [telefono, setTelefono] = useState(hospital.telefono);

  const [especialidades, setEspecialidades] = useState([]);
  const [aAgregar, setAAgregar] = useState([]);
  const [aEliminar, setAEliminar] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/shared/listas/especialidades', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setEspecialidades(data);
      });
  }, []);

  const especialidadesActuales = especialidades.filter((esp) =>
    hospital.especialidades.some((e) => e.id === esp.id)
  );
  const especialidadesDisponibles = especialidades.filter(
    (esp) => !hospital.especialidades.some((e) => e.id === esp.id)
  );

  const toggleAgregar = (id) => {
    setAAgregar((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleEliminar = (id) => {
    setAEliminar((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleModificar = async (e) => {
    e.preventDefault();

    const dto = {
      id: hospital.id,
      nombre,
      direccion,
      email,
      telefono,
      especialidadesAgregar: aAgregar,
      especialidadesEliminar: aEliminar
    };

    try {
      const res = await fetch(`http://localhost:3000/abm/hospital/modificar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dto)
      });

      if (!res.ok) throw new Error((await res.json()).message || 'Error al modificar hospital');

      alert('Hospital modificado con éxito');
      navigate('/hospitalTabla');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="crear-hospital-contenedor">
      <form className="formulario-hospital" onSubmit={handleModificar}>
        <div className="formulario-titulo">
          <div className="formulario-icono">
            <span>✏️</span>
          </div>
          <h2>Modificar hospital</h2>
          <p className="formulario-subtitulo">
            Actualiza la información del centro médico.
          </p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
          </div>
        </div>

        <div className="form-section especialidades-gestion">
          <div className="especialidades-col">
            <h3>Eliminar especialidades</h3>
            <div className="chips-container">
              {especialidadesActuales.map((esp) => (
                <div
                  key={esp.id}
                  className={`chip ${aEliminar.includes(esp.id) ? 'selected eliminar' : ''}`}
                  onClick={() => toggleEliminar(esp.id)}
                >
                  {esp.nombre}
                </div>
              ))}
            </div>
          </div>

          <div className="especialidades-col">
            <h3>Agregar especialidades</h3>
            <div className="chips-container">
              {especialidadesDisponibles.map((esp) => (
                <div
                  key={esp.id}
                  className={`chip ${aAgregar.includes(esp.id) ? 'selected agregar' : ''}`}
                  onClick={() => toggleAgregar(esp.id)}
                >
                  {esp.nombre}
                </div>
              ))}
            </div>
          </div>
        </div>


        <button type="submit" className="btn-primary">Guardar Cambios</button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate('/hospitalTabla')}
        >
          ← Volver a la tabla
        </button>
      </form>
    </div>
  );
}
