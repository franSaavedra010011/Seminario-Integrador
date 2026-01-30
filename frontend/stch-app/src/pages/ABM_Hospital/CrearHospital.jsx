import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CrearHospital.css';
import '../../App.css';

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

  // Especialidades disponibles (las que NO están seleccionadas)
  const especialidadesDisponibles = especialidades.filter(
    (esp) => !especialidadesSeleccionadas.includes(esp.id)
  );

  // Especialidades actuales (las que están seleccionadas) - convertir IDs a objetos completos
  const especialidadesActuales = especialidades.filter(
    (esp) => especialidadesSeleccionadas.includes(esp.id)
  );

  const toggleAgregar = (id) => {
    setEspecialidadesSeleccionadas([...especialidadesSeleccionadas, id]);
  };

  const toggleEliminar = (id) => {
    setEspecialidadesSeleccionadas(especialidadesSeleccionadas.filter(i => i !== id));
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
    <div className="patient-card">
      <div className="header-principal-card">
        <h1>Crear nuevo hospital</h1>
        <p>Completa la información para registrar un nuevo centro médico.</p>
      </div>
      <hr />

      <form className="modificar-hospital-form" onSubmit={handleSubmit}>
        <fieldset className="modificar-hospital-fieldset">
          <legend>Datos generales</legend>
          <div className="modificar-hospital-field-group">
            <div className="modificar-hospital-campo">
              <label>
                <strong>Nombre:</strong>
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Hospital Central"
                required
              />
            </div>

            <div className="modificar-hospital-campo">
              <label>
                <strong>Dirección:</strong>
              </label>
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
        </fieldset>

        <fieldset className="modificar-hospital-fieldset">
          <legend>Contacto y Localidad</legend>
          <div className="modificar-hospital-field-group">
            <div className="modificar-hospital-campo">
              <label>
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contacto@hospital.com"
                required
              />
            </div>

            <div className="modificar-hospital-campo">
              <label>
                <strong>Teléfono</strong>
              </label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+54 9 261 1234567"
                required
              />
            </div>

            <div className="modificar-hospital-campo">
              <label>
                <strong>Localidad</strong>
              </label>
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
        </fieldset>

        <fieldset className="modificar-hospital-fieldset">
          <legend>Editor de Especialidades</legend>
          <p className="subtitle-especialidades">
            Administra las especialidades médicas moviendo elementos entre las listas.
          </p>

          <div className="especialidades-container">
            {/* Columna Izquierda - Especialidades Seleccionadas */}
            <div className="especialidades-columna">
              <div className="columna-header">
                <div className="header-title">
                  <i className="fas fa-user-md"></i>
                  <span>Mis Especialidades</span>
                </div>
                <span className="badge-count">
                  {especialidadesActuales.length} Seleccionadas
                </span>
              </div>
              <div className="especialidades-lista">
                {especialidadesActuales.length === 0 ? (
                  <div className="empty-message">
                    No hay especialidades seleccionadas. Agrega algunas desde la lista de la derecha.
                  </div>
                ) : (
                  especialidadesActuales.map((esp) => (
                    <div key={esp.id} className="especialidad-item">
                      <div className="item-content">
                        <span className="dot-indicator"></span>
                        <span className="item-text">{esp.nombre}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-eliminar"
                        onClick={() => toggleEliminar(esp.id)}
                        title="Eliminar especialidad"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Columna Derecha - Especialidades Disponibles */}
            <div className="especialidades-columna">
              <div className="columna-header">
                <div className="header-title">
                  <i className="fas fa-plus-square"></i>
                  <span>Todas las Especialidades</span>
                </div>
              </div>
              <div className="especialidades-lista">
                {especialidadesDisponibles.length === 0 ? (
                  <div className="empty-message">
                    Todas las especialidades han sido seleccionadas.
                  </div>
                ) : (
                  especialidadesDisponibles.map((esp) => (
                    <div key={esp.id} className="especialidad-item">
                      <span className="item-text">{esp.nombre}</span>
                      <button
                        type="button"
                        className="btn-agregar"
                        onClick={() => toggleAgregar(esp.id)}
                      >
                        <i className="fas fa-plus"></i> Agregar
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/hospitalTabla')}>
            <i className="fas fa-arrow-left"></i> Volver a la tabla
          </button>
          <button type="submit" className="btn-primary">
            <i className="fas fa-save"></i> Guardar Hospital
          </button>
        </div>
      </form>
    </div>
  );
}