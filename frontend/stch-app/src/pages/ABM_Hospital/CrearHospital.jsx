import { useNavigate } from 'react-router-dom';
import './CrearHospital.css';
import { useEffect, useState } from 'react';

export default function CrearHospital() {
  const navigate = useNavigate();
  const [localidades, setLocalidades] = useState([]);
  const [idLocalidad, setIdLocalidad] = useState(''); 
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    email: '',
    telefono: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/shared/listas/localidades')
    .then(response => response.json())
    .then(data => setLocalidades(data))
    .catch(error => console.error('Error al cargar localidades:', error));
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
      idLocalidad: Number(idLocalidad)
    };

    try {

      const response = await fetch('http://localhost:3000/abm/hospital/alta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dto)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear hospital');
      }

      alert('Hospital creado con éxito');
      navigate('/hospitalTabla');
      
    } catch (error) {
      alert(`Error al crear hospital: ${error.message}`);
    }
  };

  return (
    <div className="crear-hospital-container">
      <form className="crear-hospital-form" onSubmit={handleSubmit}>
        <h2>Crear Nuevo Hospital</h2>

        <div className="form-grid">
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre del hospital"
              required
            />
          </div>
          <div>
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ejemplo@hospital.com"
              required
            />
          </div>
          <div>
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Teléfono de contacto"
              required
            />
          </div>
          <div>
            <label>Localidad</label>
            <select
              name="idLocalidad"
              value={idLocalidad}
              onChange={(e) => setIdLocalidad(e.target.value)}
              required
            >
              <option value="">Seleccione una localidad</option>
              {localidades.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.nombre}
                </option>
              ))}
            </select>
          </div>


        </div>

        <button type="submit">Guardar Hospital</button>
      </form>
    </div>
  );
}
