/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ModificarHospital.css';
import '../../App.css';

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
  const [especialidadesOriginales, setEspecialidadesOriginales] = useState([]);
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
      setEspecialidadesOriginales(actuales);
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
    (esp) => !especialidadesActuales.some((e) => e.id === esp.id) && !aAgregar.includes(esp.id)
  );

  const toggleAgregar = (id) => {
    const especialidad = especialidades.find(esp => esp.id === id);
    if (especialidad) {
      // Agregar a la lista de actuales temporalmente
      setEspecialidadesActuales(prev => [...prev, especialidad]);
      // Agregar al array de IDs a agregar
      setAAgregar(prev => [...prev, id]);
    }
  };

  const toggleEliminar = (id) => {
    // Si está en la lista de "a agregar", solo quitarlo de allí
    if (aAgregar.includes(id)) {
      setAAgregar(prev => prev.filter(i => i !== id));
      setEspecialidadesActuales(prev => prev.filter(e => e.id !== id));
    } else {
      // Si es una especialidad original
      if (aEliminar.includes(id)) {
        // Desmarcar y restaurar
        setAEliminar(prev => prev.filter(i => i !== id));
        const especialidad = especialidadesOriginales.find(e => e.id === id);
        if (especialidad) {
          setEspecialidadesActuales(prev => [...prev, especialidad]);
        }
      } else {
        // Marcar para eliminar y remover de actuales
        setAEliminar(prev => [...prev, id]);
        setEspecialidadesActuales(prev => prev.filter(e => e.id !== id));
      }
    }
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
    <div className="modificar-hospital-container">
      <div className="modificar-hospital-card">
        <h1>Modificar Hospital</h1>
        <hr />

        <form className="modificar-hospital-form" onSubmit={handleModificar}>
          <fieldset className="modificar-hospital-fieldset">
            <legend>Datos generales</legend>
            <div className='modificar-hospital-field-group'>
              <div className="modificar-hospital-campo">
                <label><strong>Nombre:</strong></label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del hospital"
                  required
                />
              </div>
              <div className="modificar-hospital-campo">
                <label><strong>Dirección:</strong></label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Dirección"
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="modificar-hospital-fieldset">
            <legend>Contacto</legend>
            <div className="modificar-hospital-field-group">
              <div className="modificar-hospital-campo">
                <label><strong>Email:</strong></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  required
                />
              </div>

              <div className="modificar-hospital-campo">
                <label><strong>Teléfono:</strong></label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Teléfono"
                  required
                />
              </div>

            </div>
          </fieldset>

          <fieldset className="modificar-hospital-fieldset">
            <legend>Editor de Especialidades</legend>
            <p className="subtitle-especialidades">Administra tus especialidades médicas moviendo elementos entre las listas.</p>

            <div className="especialidades-container">
              {/* Columna Izquierda - Especialidades Actuales */}
              <div className="especialidades-columna">
                <div className="columna-header">
                  <div className="header-title">
                    <i className="fas fa-user-md"></i>
                    <span>Mis Especialidades</span>
                  </div>
                  <span className="badge-count">
                    {especialidadesActuales.filter(esp => !aEliminar.includes(esp.id)).length} Activas
                  </span>
                </div>
                <div className="especialidades-lista">
                  {especialidadesActuales
                    .filter(esp => !aEliminar.includes(esp.id))
                    .map((esp) => (
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
                    ))}
                </div>
              </div>

              {/* Columna Derecha - Especialidades Disponibles */}
              <div className="especialidades-columna">
                <div className="columna-header">
                  <div className="header-title">
                    <i className="fas fa-plus-square"></i>
                    <span>Todas las Especialidades del Hospital</span>
                  </div>
                </div>
                <div className="especialidades-lista">
                  {especialidadesDisponibles.map((esp) => (
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
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/hospitalTabla')}>
              <i className="fas fa-arrow-left"></i> Volver a la tabla
            </button>
            <button type="submit" className="btn-primary">
              <i className="fas fa-save"></i> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
