/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CrearHospital.css';

export default function ModificarHospital() {
  const location = useLocation();
  const navigate = useNavigate();
  const idHospital = location.state?.id;

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesActuales, setEspecialidadesActuales] = useState([]);
  const [aAgregar, setAAgregar] = useState([]);
  const [aEliminar, setAEliminar] = useState([]);

  // 🧠 Función reutilizable para cargar hospital
  const cargarHospital = async () => {
    try {
      const res = await fetch(`http://localhost:3000/shared/listas/hospitales?modo=especialidades&id=${idHospital}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const [data] = await res.json();
      setNombre(data.nombre);
      setDireccion(data.direccion);
      setEmail(data.email);
      setTelefono(data.telefono);

      // ✅ Solo especialidades activas (sin fechaHasta)
      const actuales = (data.hospitalEspecialidades || [])
        .filter(he => !he.fechaHasta)
        .map(he => he.especialidad);

      setEspecialidadesActuales(actuales);
    } catch (error) {
      alert('Error al cargar hospital');
    }
  };

  // Cargar hospital al montar
  useEffect(() => {
    cargarHospital();
  }, [idHospital]);

  // Cargar lista completa de especialidades
  useEffect(() => {
    fetch('http://localhost:3000/shared/listas/especialidades', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(setEspecialidades);
  }, []);

  const especialidadesDisponibles = especialidades.filter(
    (esp) => !especialidadesActuales.some((e) => e.id === esp.id)
  );

  const toggleAgregar = (id) => {
    setAAgregar(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleEliminar = (id) => {
    setAEliminar(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleModificar = async (e) => {
    e.preventDefault();

    const dto = {
      nombreHospital: nombre.trim(),
      direccionHospital: direccion.trim(),
      emailHospital: email.trim(),
      telHospital: telefono.trim(),
      idEspecialidadesAAgregar: aAgregar,
      idEspecialidadesAEliminar: aEliminar
    };

    try {
      const res = await fetch(`http://localhost:3000/abm/hospital/modificar/${idHospital}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dto)
      });

      if (!res.ok) throw new Error((await res.json()).message || 'Error al modificar hospital');

      alert('Hospital modificado con éxito');

      // 🔄 Volver a consultar hospital actualizado
      const refreshed = await fetch(`http://localhost:3000/shared/listas/hospitales?modo=especialidades&id=${idHospital}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const [data] = await refreshed.json();
      const actuales = (data.hospitalEspecialidades || [])
        .filter(he => !he.fechaHasta)
        .map(he => he.especialidad);

      setEspecialidadesActuales(actuales);
      setAAgregar([]);
      setAEliminar([]);

      // ✅ Redirigir a la tabla
      navigate('/hospitalTabla');

    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="hospital-container">
      <form className="hospital-form" onSubmit={handleModificar}>
        <h2>Modificar hospital</h2>
        <p>Actualiza la información del centro médico.</p>

        <div className="form-dual-grid">
          <div>
            <h3>Datos generales</h3>
            <div className="form-grid">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del hospital"
                required
              />
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección"
                required
              />
            </div>
          </div>

          <div>
            <h3>Contacto</h3>
            <div className="form-grid">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
              />
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Eliminar especialidades actuales</h3>
          <div className="specialties-grid">
            {especialidadesActuales.map((esp) => (
              <div
                key={esp.id}
                className={`specialty-tag ${aEliminar.includes(esp.id) ? 'selected' : ''}`}
                onClick={() => toggleEliminar(esp.id)}
              >
                {esp.nombre}
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Agregar nuevas especialidades</h3>
          <div className="specialties-grid">
            {especialidadesDisponibles.map((esp) => (
              <div
                key={esp.id}
                className={`specialty-tag ${aAgregar.includes(esp.id) ? 'selected' : ''}`}
                onClick={() => toggleAgregar(esp.id)}
              >
                {esp.nombre}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary">Guardar Cambios</button>
        <button type="button" className="btn-secondary" onClick={() => navigate('/hospitalTabla')}>
          ← Volver a la tabla
        </button>
      </form>
    </div>
  );
}
