import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './CrearHospital.css'; // Reutilizamos el mismo estilo que el alta

export default function ModificarHospital() {
  const location = useLocation();
  const navigate = useNavigate();

  // Supongamos que el hospital se pasa por location.state
  const hospital = location.state?.hospital || {
    id: '',
    nombre: '',
    direccion: '',
    email: '',
    telefono: ''
  };

  const [nombre, setNombre] = useState(hospital.nombre);
  const [direccion, setDireccion] = useState(hospital.direccion);
  const [email, setEmail] = useState(hospital.email);
  const [telefono, setTelefono] = useState(hospital.telefono);

  const handleModificar = (e) => {
    e.preventDefault();

    const hospitalActualizado = {
      id: hospital.id,
      nombre,
      direccion,
      email,
      telefono
    };
    if(nombre === null || direccion === null || email === null || telefono === null){
            // Aquí iría la llamada al backend para actualizar los datos
    alert('Hospital sin modificaciones:', hospital.id);

    navigate('/hospitalTabla'); // Volver a la lista de hospitales
    }else{
            // Aquí iría la llamada al backend para actualizar los datos
    alert('Hospital modificado:', hospitalActualizado);

    navigate('/hospitalTabla'); // Volver a la lista de hospitales
    }

  };

  return (
    <div className="crear-hospital-container">
      <form className="crear-hospital-form" onSubmit={handleModificar}>
        <h2>Modificar Hospital</h2>
        <div className="form-grid">
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Dirección</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Teléfono</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" onClick={handleModificar}>Guardar Cambios</button>
      </form>
    </div>
  );
}
