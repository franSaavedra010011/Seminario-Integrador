import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AltaUsuario.css';

export default function AltaUsuario() {
  const [roles, setRoles] = useState([]);
  const [hospitales, setHospitales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [hospitalSeleccionado, setHospitalSeleccionado] = useState('');
  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState([]);
  const navigate = useNavigate();

  // DTO Usuario
  const [dtoUsuario, setDtoUsuario] = useState({
    emailUsuario: '',
    usernameUsuario: '',
    passwordUsuario: '',
  });

  // DTO Médico
  const [dtoMedico, setDtoMedico] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    matricula: '',
    tiempoConsulta: '',
  });

  // DTO Paciente
  const [dtoPaciente, setDtoPaciente] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    edad: '',
    fechaNacimiento: '',
    grupoSanguineo: '',
    telefono: '',
  });

  // Cambios comunes
  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setDtoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicoChange = (e) => {
    const { name, value } = e.target;
    setDtoMedico((prev) => ({ ...prev, [name]: value }));
  };

  const handlePacienteChange = (e) => {
    const { name, value } = e.target;
    setDtoPaciente((prev) => ({ ...prev, [name]: value }));
  };

  const handleRolChange = (e) => {
    const rol = e.target.value;
    setRolSeleccionado(rol);
    setDtoMedico({
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      matricula: '',
      tiempoConsulta: '',
    });
    setDtoPaciente({
      nombre: '',
      apellido: '',
      dni: '',
      edad: '',
      fechaNacimiento: '',
      grupoSanguineo: '',
      telefono: '',
    });
    setEspecialidadesSeleccionadas([]);
  };

  const handleHospitalChange = (e) => {
    setHospitalSeleccionado(e.target.value);
  };

  const handleEspecialidadCheckboxChange = (e) => {
    const id = parseInt(e.target.value);
    if (e.target.checked) {
      setEspecialidadesSeleccionadas((prev) => [...prev, id]);
    } else {
      setEspecialidadesSeleccionadas((prev) => prev.filter((item) => item !== id));
    }
  };

  const crearDtoFinal = () => {
    if (rolSeleccionado === 'medico') {
      return {
        ...dtoUsuario,
        ...dtoMedico,
        rol: rolSeleccionado,
        tiempoConsulta: dtoMedico.tiempoConsulta ? Number(dtoMedico.tiempoConsulta) : undefined,
        hospitalId: hospitalSeleccionado ? Number(hospitalSeleccionado) : undefined,
        especialidades: especialidadesSeleccionadas.map(Number),
      };
    } else if (rolSeleccionado === 'paciente') {
      return {
        ...dtoUsuario,
        ...dtoPaciente,
        rol: rolSeleccionado,
        hospitalId: hospitalSeleccionado ? Number(hospitalSeleccionado) : undefined,
      };
    } else {
      return {
        ...dtoUsuario,
        rol: rolSeleccionado,
        hospitalId: hospitalSeleccionado,
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosAEnviar = crearDtoFinal();
    console.log(datosAEnviar)
    try {
      const response = await fetch('http://localhost:3000/usuarios/crearAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosAEnviar),
      });

      if (!response.ok) throw new Error('Error en el servidor');
      navigate('/home');
      alert('Usuario creado correctamente');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert(`Error al crear usuario: ${error.message}`);
    }
  };

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/hospital/buscarHospitales').then(res => res.json()),
      fetch('http://localhost:3000/rol/buscarRoles').then(res => res.json()),
    ])
      .then(([hospitalesData, rolesData]) => {
        setHospitales(hospitalesData);
        setRoles(rolesData);
      })
      .catch(err => console.error('Error al cargar hospitales o roles:', err));
  }, []);

  useEffect(() => {
    if (rolSeleccionado === 'medico' && hospitalSeleccionado) {
      fetch('http://localhost:3000/especialidad/buscarEspecialidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idHospital: hospitalSeleccionado }),
      })
        .then(res => res.json())
        .then(data => setEspecialidades(data))
        .catch(error => {
          console.error('Error al cargar especialidades:', error);
          alert('Error al cargar especialidades');
        });
    } else {
      setEspecialidades([]);
      setEspecialidadesSeleccionadas([]);
    }
  }, [rolSeleccionado, hospitalSeleccionado]);

  return (
    <div className="content1">
      <form className="alta-form" onSubmit={handleSubmit}>
        <h1>Alta de Usuario</h1>

        <div className="form-grid">
          {/* Usuario */}
          <div><label>Email</label>
            <input type="email" name="emailUsuario" value={dtoUsuario.emailUsuario} onChange={handleUsuarioChange} required />
          </div>
          <div><label>Usuario</label>
            <input type="text" name="usernameUsuario" value={dtoUsuario.usernameUsuario} onChange={handleUsuarioChange} required />
          </div>
          <div><label>Contraseña</label>
            <input type="password" name="passwordUsuario" value={dtoUsuario.passwordUsuario} onChange={handleUsuarioChange} required />
          </div>

          {/* Rol y Hospital */}
          <div><label>Rol</label>
            <select value={rolSeleccionado} onChange={handleRolChange} required>
              <option value="">Seleccionar rol</option>
              {roles.map((rol) => (
                <option key={rol.idRol} value={rol.nombreRol}>{rol.nombreRol}</option>
              ))}
            </select>
          </div>
          <div><label>Hospital</label>
            <select value={hospitalSeleccionado} onChange={handleHospitalChange} required>
              <option value="">Seleccione un hospital</option>
              {hospitales.map((h) => (
                <option key={h.idHospital} value={h.idHospital}>{h.nombreHospital}</option>
              ))}
            </select>
          </div>

          {/* Médico */}
          {rolSeleccionado === 'medico' && (
            <>
              <div><label>Nombre</label>
                <input name="nombre" value={dtoMedico.nombre} onChange={handleMedicoChange} required />
              </div>
              <div><label>Apellido</label>
                <input name="apellido" value={dtoMedico.apellido} onChange={handleMedicoChange} required />
              </div>
              <div><label>DNI</label>
                <input name="dni" value={dtoMedico.dni} onChange={handleMedicoChange} required />
              </div>
              <div><label>Teléfono</label>
                <input name="telefono" value={dtoMedico.telefono} onChange={handleMedicoChange} required />
              </div>
              <div><label>Matrícula</label>
                <input name="matricula" value={dtoMedico.matricula} onChange={handleMedicoChange} required />
              </div>
              <div><label>Duración consulta (min)</label>
                <input type="number" name="tiempoConsulta" value={dtoMedico.tiempoConsulta} onChange={handleMedicoChange} required />
              </div>
              <div><label>Especialidades</label>
                <div className="checkbox-group">
                  {especialidades.map((esp) => (
                    <label key={esp.idEspecialidad}>
                      <input
                        type="checkbox"
                        value={esp.idEspecialidad}
                        checked={especialidadesSeleccionadas.includes(esp.idEspecialidad)}
                        onChange={handleEspecialidadCheckboxChange}
                      />
                      {esp.nombreEspecialidad}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Paciente */}
          {rolSeleccionado === 'paciente' && (
            <>
              <div><label>Nombre</label>
                <input name="nombre" value={dtoPaciente.nombre} onChange={handlePacienteChange} required />
              </div>
              <div><label>Apellido</label>
                <input name="apellido" value={dtoPaciente.apellido} onChange={handlePacienteChange} required />
              </div>
              <div><label>DNI</label>
                <input name="dni" value={dtoPaciente.dni} onChange={handlePacienteChange} required />
              </div>
              <div><label>Edad</label>
                <input name="edad" value={dtoPaciente.edad} onChange={handlePacienteChange} required />
              </div>
              <div><label>Fecha de Nacimiento</label>
                <input type="date" name="fechaNacimiento" value={dtoPaciente.fechaNacimiento} onChange={handlePacienteChange} required />
              </div>
              <div><label>Grupo Sanguíneo</label>
                <input name="grupoSanguineo" value={dtoPaciente.grupoSanguineo} onChange={handlePacienteChange} required />
              </div>
              <div><label>Teléfono</label>
                <input name="telefono" value={dtoPaciente.telefono} onChange={handlePacienteChange} required />
              </div>
            </>
          )}
        </div>

        <button type="submit">Dar de alta</button>
      </form>
    </div>
  );
}
