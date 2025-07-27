import { useNavigate } from 'react-router-dom';
import './CrearHospital.css';
import { useState } from 'react';

export default function CrearHospital() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    email: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);

    // Simular envío al backend (puedes reemplazarlo con una llamada real)
    setTimeout(() => {
      alert('Hospital creado con éxito');
      navigate('/hospitalTabla'); // Redirige a la lista de hospitales
    }, 500);
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
        </div>

        <button type="submit">Guardar Hospital</button>
      </form>
    </div>
  );
}
