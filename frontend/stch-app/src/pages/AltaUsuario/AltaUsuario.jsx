import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AltaUsuario.css';
import Select from 'react-select';

export default function AltaUsuario() {
  const [roles, setRoles] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [hospitales, setHospitales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState('');

  // Usuario
  const [dtoUsuario, setDtoUsuario] = useState({
    emailUsuario: '',
    usernameUsuario: '',
    passwordUsuario: '',
  });

  // Paciente
  const [dtoPaciente, setDtoPaciente] = useState({
    nombrePaciente: '',
    apellidoPaciente: '',
    dniPaciente: '',
    edadPaciente: '',
    fechaNacimientoPaciente: '',
    celularPaciente: '',
    correoPaciente: '',
    grupoSanguineoPaciente: '',
    familiaresACargo: '',
    problemasEnCurso: '',
    antecedentesHeredofamiliares: '',
    habitos: '',
    alergias: '',
    vacunas: [],
    idLocalidad: '',
  });

  // Nueva vacuna temporal
  const [nuevaVacuna, setNuevaVacuna] = useState({
    nombre: '',
    fechaAplicacion: '',
    dosis: '',
  });

  // Médico
  const [dtoMedico, setDtoMedico] = useState({
    nombreMedico: '',
    apellidoMedico: '',
    dniMedico: '',
    telefonoMedico: '',
    matriculaMedico: '',
    tiempoConsultaMedico: '',
    idHospital: '',
    especialidades: [],
  });


  const navigate = useNavigate();

  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setDtoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handlePacienteChange = (e) => {
    const { name, value } = e.target;

    // Si el campo es numérico, convertimos
    const numericFields = ["edadPaciente", "idLocalidad"];
    let newValue = numericFields.includes(name) ? Number(value) : value;

    // Si cambia la fecha de nacimiento, calculamos la edad automáticamente
    if (name === "fechaNacimientoPaciente") {
      const birthDate = new Date(value);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Si aún no cumplió años este año, restamos 1
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setDtoPaciente((prev) => ({
        ...prev,
        fechaNacimientoPaciente: value,
        edadPaciente: age >= 0 ? age : 0, // seguridad para evitar negativos
      }));
      return; // salimos porque ya actualizamos todo
    }

    setDtoPaciente((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleMedicoChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["tiempoConsultaMedico"];
    let newValue = numericFields.includes(name) ? Number(value) : value;
    setDtoMedico((prev) => ({ ...prev, [name]: newValue }));
  };

  // Manejo de vacunas dinámicas
  const handleVacunaChange = (e) => {
    const { name, value } = e.target;
    setNuevaVacuna((prev) => ({ ...prev, [name]: value }));
  };

  const agregarVacuna = () => {
    if (!nuevaVacuna.nombre.trim()) return;
    setDtoPaciente((prev) => ({
      ...prev,
      vacunas: [...prev.vacunas, nuevaVacuna],
    }));
    setNuevaVacuna({ nombre: '', fechaAplicacion: '', dosis: '' });
  };

  const eliminarVacuna = (index) => {
    setDtoPaciente((prev) => ({
      ...prev,
      vacunas: prev.vacunas.filter((_, i) => i !== index),
    }));
  };

  // Enviar DTO
  const crearDtoFinal = () => {
    const dto = {
      emailUsuario: dtoUsuario.emailUsuario,
      usernameUsuario: dtoUsuario.usernameUsuario,
      passwordUsuario: dtoUsuario.passwordUsuario,
      idRoles: [rolSeleccionado], // ahora envía el ID correcto
      idHospital: dtoUsuario.idHospital || null,
    };

    // Según el ID del rol asignar el bloque correspondiente
    if (rolSeleccionado === 5) dto.datosPaciente = dtoPaciente;      // paciente
    if (rolSeleccionado === 4) dto.datosMedico = dtoMedico;          // médico
    if (rolSeleccionado === 3 || rolSeleccionado === 6) {            // recepcionista o adminHospital
      dto.idHospital = dtoUsuario.idHospital;
    }

    return dto;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosAEnviar = crearDtoFinal();

    try {
      const response = await fetch('http://localhost:3000/abm/usuario/alta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosAEnviar),
      });

      if (!response.ok) throw new Error('Error en el servidor');
      alert('Usuario creado correctamente');
      navigate('/home');
    } catch (error) {
      alert(`Error al crear usuario: ${error.message}`);
    }
  };

  // Cargar roles y localidades
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/shared/listas/roles').then((res) => res.json()),
      fetch('http://localhost:3000/shared/listas/localidades').then((res) => res.json()),
      fetch('http://localhost:3000/shared/listas/hospitales').then((res) => res.json()),
      fetch('http://localhost:3000/shared/listas/especialidades').then((res) => res.json()),
    ])
      .then(([rolesData, localidadesData, hospitalesData, especialidadesData]) => {
        setRoles(rolesData);
        setLocalidades(localidadesData);
        setHospitales(hospitalesData);
        setEspecialidades(especialidadesData);
      })
      .catch((err) => console.error('Error al cargar datos:', err));
  }, []);

  return (
    <div className="alta-container">
      <form className="alta-card" onSubmit={handleSubmit}>
        <h1>Alta de Usuario</h1>

        {/* Tipo de Usuario */}
        <div className="field-group single">
          <label>Seleccione el tipo de usuario</label>
          <select value={rolSeleccionado} onChange={(e) => setRolSeleccionado(Number(e.target.value))} required>
            <option value="">Seleccione</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>

        </div>

        {/* Datos de la cuenta */}
        <fieldset>
          <legend>Datos de la cuenta</legend>

          <div className="field-group">
            <div>
              <label>Nombre de Usuario</label>
              <input
                type="text"
                name="usernameUsuario"
                placeholder="Nombre de usuario"
                value={dtoUsuario.usernameUsuario}
                onChange={handleUsuarioChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="emailUsuario"
                placeholder="ejemplo@correo.com"
                value={dtoUsuario.emailUsuario}
                onChange={handleUsuarioChange}
                required
              />
            </div>
          </div>

          <div className="field-group single">
            <div>
              <label>Contraseña</label>
              <input
                type="password"
                name="passwordUsuario"
                placeholder="Ingrese su contraseña"
                value={dtoUsuario.passwordUsuario}
                onChange={handleUsuarioChange}
                required
              />
            </div>
          </div>
        </fieldset>


        {/* Si es paciente */}
        {rolSeleccionado === 5 && (
          <>
            <fieldset>
              <legend>Información Personal</legend>
              <div className="field-group">
                <div>
                  <label>Nombre</label>
                  <input
                    name="nombrePaciente"
                    value={dtoPaciente.nombrePaciente}
                    onChange={handlePacienteChange}
                    required
                  />
                </div>
                <div>
                  <label>Apellido</label>
                  <input
                    name="apellidoPaciente"
                    value={dtoPaciente.apellidoPaciente}
                    onChange={handlePacienteChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label>DNI</label>
                  <input
                    name="dniPaciente"
                    value={dtoPaciente.dniPaciente}
                    onChange={handlePacienteChange}
                    required
                  />
                </div>
                <div>
                  <label>Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="fechaNacimientoPaciente"
                    value={dtoPaciente.fechaNacimientoPaciente}
                    onChange={handlePacienteChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label>Edad</label>
                  <input
                    name="edadPaciente"
                    value={dtoPaciente.edadPaciente}
                    onChange={handlePacienteChange}
                    required
                  />
                </div>
                <div>
                  <label>Teléfono</label>
                  <input
                    name="celularPaciente"
                    value={dtoPaciente.celularPaciente}
                    onChange={handlePacienteChange}
                    placeholder="600 123 456"
                    required
                  />
                </div>
              </div>

              <div className="field-group">

                <div>
                  <label>Localidad</label>
                  <select
                    name="idLocalidad"
                    value={dtoPaciente.idLocalidad}
                    onChange={handlePacienteChange}
                    required
                  >
                    <option value="">Seleccione</option>
                    {localidades.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Ficha Clínica */}
            <fieldset>
              <legend>Información Clínica</legend>

              <div className="field-group">
                <div>
                  <label>Familiares a cargo</label>
                  <input
                    name="familiaresACargo"
                    value={dtoPaciente.familiaresACargo}
                    onChange={handlePacienteChange}
                  />
                </div>
                <div>
                  <label>Grupo Sanguíneo</label>
                  <select
                    name="grupoSanguineoPaciente"
                    value={dtoPaciente.grupoSanguineoPaciente}
                    onChange={handlePacienteChange}
                    required
                  >
                    <option value="">Seleccione</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label>Problemas en curso</label>
                  <textarea
                    name="problemasEnCurso"
                    value={dtoPaciente.problemasEnCurso}
                    onChange={handlePacienteChange}
                  />
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label>Antecedentes heredofamiliares</label>
                  <textarea
                    name="antecedentesHeredofamiliares"
                    value={dtoPaciente.antecedentesHeredofamiliares}
                    onChange={handlePacienteChange}
                  />
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label>Hábitos</label>
                  <textarea
                    name="habitos"
                    value={dtoPaciente.habitos}
                    onChange={handlePacienteChange}
                  />
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label>Alergias</label>
                  <textarea
                    name="alergias"
                    value={dtoPaciente.alergias}
                    onChange={handlePacienteChange}
                  />
                </div>
              </div>
            </fieldset>

            {/* Vacunas */}
            <fieldset className="vacunas-section">
              <legend>Vacunas</legend>
              <div className="vacunas-inputs">
                <div>
                  <label>Nombre</label>
                  <input
                    name="nombre"
                    value={nuevaVacuna.nombre}
                    onChange={handleVacunaChange}
                  />
                </div>
                <div>
                  <label>Fecha de Aplicación</label>
                  <input
                    type="date"
                    name="fechaAplicacion"
                    value={nuevaVacuna.fechaAplicacion}
                    onChange={handleVacunaChange}
                  />
                </div>
                <div>
                  <label>Dosis</label>
                  <input
                    name="dosis"
                    value={nuevaVacuna.dosis}
                    onChange={handleVacunaChange}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn-agregar-vacuna"
                onClick={agregarVacuna}
              >
                Agregar vacuna
              </button>

              {dtoPaciente.vacunas.length > 0 && (
                <ul className="vacunas-lista">
                  {dtoPaciente.vacunas.map((v, i) => (
                    <li key={i}>
                      <span>
                        {v.nombre} ({v.dosis}) - {v.fechaAplicacion}
                      </span>
                      <button type="button" onClick={() => eliminarVacuna(i)}>
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </fieldset>
          </>
        )}

        {/* Si es médico */}
        {rolSeleccionado === 4 && (
          <>
            <fieldset>
              <legend>Información del Médico</legend>

              <div className="field-group">
                <div>
                  <label>Nombre</label>
                  <input
                    name="nombreMedico"
                    value={dtoMedico.nombreMedico}
                    onChange={handleMedicoChange}
                    required
                  />
                </div>
                <div>
                  <label>Apellido</label>
                  <input
                    name="apellidoMedico"
                    value={dtoMedico.apellidoMedico}
                    onChange={handleMedicoChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label>DNI</label>
                  <input
                    name="dniMedico"
                    value={dtoMedico.dniMedico}
                    onChange={handleMedicoChange}
                    required
                  />
                </div>
                <div>
                  <label>Teléfono</label>
                  <input
                    name="telefonoMedico"
                    value={dtoMedico.telMedico}
                    onChange={handleMedicoChange}
                    placeholder="600 123 456"
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label>Matrícula</label>
                  <input
                    name="matriculaMedico"
                    value={dtoMedico.matriculaMedico}
                    onChange={handleMedicoChange}
                    required
                  />
                </div>
                <div>
                  <label>Tiempo de consulta (minutos)</label>
                  <input
                    type="number"
                    name="tiempoConsultaMedico"
                    min="1"
                    step="1"
                    value={dtoMedico.tiempoConsultaMedico}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || Number(value) > 0) {
                        handleMedicoChange(e);
                      }
                    }}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <div>
                  <label>Hospital</label>
                  <select
                    name="idHospital"
                    value={dtoMedico.idHospital}
                    onChange={handleMedicoChange}
                    required
                  >
                    <option value="">Seleccione</option>
                    {hospitales.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="especialidades-container">
                  <label>Especialidades</label>
                  <Select
                    isMulti
                    name="especialidades"
                    options={especialidades.map((esp) => ({
                      value: esp.id,
                      label: esp.nombre,
                    }))}
                    value={especialidades
                      .filter((esp) => dtoMedico.especialidades.includes(esp.id))
                      .map((esp) => ({ value: esp.id, label: esp.nombre }))}
                    onChange={(selectedOptions) =>
                      setDtoMedico((prev) => ({
                        ...prev,
                        especialidades: selectedOptions.map((opt) => opt.value),
                      }))
                    }
                    placeholder="Buscar especialidad..."
                    className="select-especialidades"
                    classNamePrefix="react-select"
                  />
                  <small>Puede seleccionar una o más especialidades.</small>
                </div>
              </div>
            </fieldset>
          </>
        )}

        {/* Si es recepcionista o administrador del hospital */}
        {(rolSeleccionado === 3 || rolSeleccionado === 6) && (
          <>
            <fieldset>
              <legend>Información del {rolSeleccionado === 3 ? 'Recepcionista' : 'Administrador del Hospital'}</legend>



              <div className="field-group single">
                <div>
                  <label>Hospital</label>
                  <select
                    name="idHospital"
                    value={dtoUsuario.idHospital || ''}
                    onChange={(e) =>
                      setDtoUsuario((prev) => ({ ...prev, idHospital: e.target.value }))
                    }
                    required
                  >
                    <option value="">Seleccione un hospital</option>
                    {hospitales.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
          </>
        )}

        <button type="submit">Dar de alta</button>
      </form>
    </div>
  );
}
