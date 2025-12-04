import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CrearHospital.css';

export default function CrearHospital() {
  const navigate = useNavigate();
  const [localidades, setLocalidades] = useState([]);
  const [idLocalidad, setIdLocalidad] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState([]);

  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    email: '',
    telefono: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/shared/listas/localidades')
      .then(res => res.json())
      .then(data => setLocalidades(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/shared/listas/especialidades', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setEspecialidades(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = {
      nombreHospital: form.nombre,
      direccionHospital: form.direccion,
      emailHospital: form.email,
      telHospital: form.telefono,
      idLocalidad: Number(idLocalidad),
      idEspecialidades: especialidadesSeleccionadas
    };

    try {
      const res = await fetch('http://localhost:3000/abm/hospital/alta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dto)
      });

      if (!res.ok) throw new Error((await res.json()).message || 'Error al crear hospital');

      alert('Hospital creado con éxito');
      navigate('/hospitalTabla');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="hospital-container">
      <form className="hospital-form" onSubmit={handleSubmit}>
        <h2>Crear nuevo hospital</h2>
        <p>Completa la información para registrar un nuevo centro médico.</p>

        <div className="form-dual-grid">
          <div>
            <h3>Datos generales</h3>
            <div className="form-grid">
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Hospital Central"
                required
              />
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Ej: Av. Siempre Viva 742"
                required
              />
            </div>
          </div>

          <div>
            <h3>Contacto y Localidad</h3>
            <div className="form-grid">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contacto@hospital.com"
                required
              />
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+54 9 261 1234567"
                required
              />
              <select
                name="idLocalidad"
                value={idLocalidad}
                onChange={(e) => setIdLocalidad(e.target.value)}
                required
              >
                <option value="">Seleccione una localidad</option>
                {localidades.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Especialidades médicas</h3>
          <div className="specialties-grid">
            {especialidades.map((esp) => {
              const selected = especialidadesSeleccionadas.includes(esp.id);
              return (
                <div
                  key={esp.id}
                  className={`specialty-tag ${selected ? 'selected' : ''}`}
                  onClick={() => {
                    const id = esp.id;
                    if (selected) {
                      setEspecialidadesSeleccionadas(especialidadesSeleccionadas.filter(e => e !== id));
                    } else {
                      setEspecialidadesSeleccionadas([...especialidadesSeleccionadas, id]);
                    }
                  }}
                >
                  {esp.nombre}
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Guardar Hospital
        </button>
        <button type="button" className="btn-secondary" onClick={() => navigate('/hospitalTabla')}>
          ← Volver a la tabla
        </button>
      </form>
    </div>
  );
}
