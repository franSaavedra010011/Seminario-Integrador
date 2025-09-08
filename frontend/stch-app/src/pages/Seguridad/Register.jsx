import './register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const handleVolver = () => {
    navigate('/');
  };
  const [form, setForm] = useState({
    nombrePaciente: '',
    apellidoPaciente: '',
    dniPaciente: '',
    edadPaciente: '',
    fechaNacimientoPaciente: '',
    celularPaciente: '',
    correoPaciente: '',
    grupoSanguineoPaciente: '',
    email: '',
    username: '',
    password: '',
  }
);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/paciente/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pacienteDto: {
            nombrePaciente: form.nombre,
            apellidoPaciente: form.apellido,
            edadPaciente: parseInt(form.edad),
            fechaNacimientoPaciente: form.fechaNacimiento,
            celularPaciente: form.celular,
            correoPaciente: form.correo,
            grupoSanguineoPaciente: form.grupoSanguineo,
          },
          usuarioDto: {
            emailUsuario: form.correo,
            usernameUsuario: form.username,
            passwordUsuario: form.password,
          },
      }),
      });
      console.log('apellido: ' + form.apellido)
      if (response.ok) {
        navigate('/login');
      } else {
        const error = await response.json();
        console.error('Error al registrar paciente:', error);
      }
    } catch (err) {
      console.error('Error de red:', err);
    }
  };

  return (
    <div id="contenidoRegister">
      <div id="formulario2">
        <div id="botones2">
          <h1 id="inicio2">Registrarse</h1>
        </div>
        <b>
          <p>¡Cuéntanos sobre ti!</p>
        </b>
        <form id="datos2" onSubmit={handleRegister}>
          <div id="camposRegister">
            <div id='campo1'>
              <h5 className="textdata">Nombre</h5>
              <input
                type="text"
                name="nombre"
                placeholder="Ingrese su Nombre"
                value={form.nombrePaciente}
                onChange={handleChange}
                required
              />
              <h5 className="textdata">Apellido</h5>
              <input
                type="text"
                name="apellido"
                placeholder="Ingrese su Apellido"
                value={form.apellidoPaciente}
                onChange={handleChange}
                required
              />
              <h5 className="textdata">DNI</h5>
              <input
                type="text"
                name="dni"
                placeholder="Ingrese su DNI"
                value={form.dniPaciente}
                onChange={handleChange}
                required
              />
              <h5 className="textdata">Edad</h5>
              <input
                type="text"
                name="edad"
                placeholder="Ingrese su edad"
                value={form.edadPaciente}
                onChange={handleChange}
                required
              />
              <h5 className="textdata">Fecha de Nacimiento</h5>
              <input
                type="date"
                name="fechaNacimiento"
                placeholder="Ingrese su Fecha de Nacimiento"
                value={form.fechaNacimientoPaciente}
                onChange={handleChange}
                required
              />              
            </div>
            <div id='campo2'>
              <h5 className="textdata">Teléfono</h5>
              <input
                type="text"
                name="celular"
                placeholder="Ingrese su Teléfono"
                value={form.celularPaciente}
                onChange={handleChange}
                required
              />
              <h5 className="textdata">Correo</h5>
              <input
                type="text"
                name="correo"
                placeholder="Ingrese su correo"
                value={form.correoPaciente}
                onChange={handleChange}
                required
              />
              <h5 className="textdata">Grupo Sanguineo</h5>
              <input
                type="text"
                name="grupoSanguineo"
                placeholder="Ingrese su Grupo Sanguineo"
                value={form.grupoSanguineoPaciente}
                onChange={handleChange}
                required
              />
              <h5 className="textdata">Username</h5>
              <input
                type="text"
                name="username"
                placeholder="Ingrese su username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <h5 className="textdata">Contraseña</h5>
              <input
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </div>
          <button id="ingresar" type="submit">
            Registrar
          </button>
        </form>
      </div>
      <br />
      <div>
        <button id='volver' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}
