import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AltaUsuario.css';
import '../../App.css';
import Select from 'react-select';

export default function AltaUsuario() {
  const [roles, setRoles] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [hospitales, setHospitales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

    // Si es el campo de contraseña, validar coincidencia
    if (name === 'passwordUsuario') {
      validatePasswords(value, confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validatePasswords(dtoUsuario.passwordUsuario, value);
  };

  const validatePasswords = (password, confirmPass) => {
    if (confirmPass && password !== confirmPass) {
      setPasswordError('Las contraseñas no coinciden');
    } else {
      setPasswordError('');
    }
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

    // Validar que las contraseñas coincidan
    if (dtoUsuario.passwordUsuario !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      alert('Error: Las contraseñas no coinciden');
      return;
    }

    // Limpiar error si las contraseñas coinciden
    setPasswordError('');

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
    <div>
      <div className="patient-card">
        <div className="header-principal-card">
          <h1>Alta de Usuario</h1>
          <p>Registre nuevos usuarios en el sistema según su rol: pacientes, médicos, recepcionistas o administradores</p>
          <hr />
        </div>

        <div className="seleccionar-tipo-usuario">
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

        <form className='alta-usuario-form' onSubmit={handleSubmit}>
          {/* Datos de la cuenta */}
          <fieldset>
            <legend>Datos de la cuenta</legend>

            <div className='field-group single'>
              <div className="password-field">
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
            </div>

            <div className='field-group single'>
              <div className="password-field">
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
              <div className="password-field">
                <label>Contraseña</label>
                <div className="password-input-container">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    name="passwordUsuario"
                    placeholder="Ingrese su contraseña"
                    value={dtoUsuario.passwordUsuario}
                    onChange={handleUsuarioChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <i className={mostrarPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="field-group single">
              <div className="password-field">
                <label>Repetir Contraseña</label>
                <div className="password-input-container">
                  <input
                    type={mostrarConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repita su contraseña"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    style={{
                      borderColor: passwordError ? '#dc3545' : (confirmPassword && !passwordError) ? '#28a745' : '#ccd2e0'
                    }}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
                    aria-label={mostrarConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <i className={mostrarConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                </div>
                {passwordError && (
                  <div className="password-error">
                    <i className="fas fa-exclamation-triangle"></i>
                    {passwordError}
                  </div>
                )}
                {confirmPassword && !passwordError && (
                  <div className="password-success">
                    <i className="fas fa-check-circle"></i>
                    Las contraseñas coinciden
                  </div>
                )}
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
                      placeholder="Ej: María Elena"
                      value={dtoPaciente.nombrePaciente}
                      onChange={handlePacienteChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Apellido</label>
                    <input
                      name="apellidoPaciente"
                      placeholder="Ej: González López"
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
                      placeholder="Ej: 87654321"
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
                      placeholder="Se calcula automáticamente"
                      value={dtoPaciente.edadPaciente}
                      onChange={handlePacienteChange}
                      required
                      readOnly
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
                      placeholder="Ej: 2 hijos menores"
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
                      placeholder="Ej: Hipertensión arterial en tratamiento, dolor lumbar crónico..."
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
                      placeholder="Ej: Diabetes tipo 2 (padre), hipertensión arterial (madre)..."
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
                      placeholder="Ej: No fumador, ejercicio 3 veces por semana, consumo social de alcohol..."
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
                      placeholder="Ej: Penicilina, frutos secos, polen..."
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
                      placeholder="Ej: COVID-19, Hepatitis B"
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
                      placeholder="Ej: Primera dosis, Refuerzo"
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

                <div className="field-group single">
                  <div className='password-field'>
                    <label>Nombre</label>
                    <input
                      name="nombreMedico"
                      placeholder="Ej: Juan Carlos"
                      value={dtoMedico.nombreMedico}
                      onChange={handleMedicoChange}
                      required
                    />
                  </div>
                </div>

                <div className="field-group single">
                  <div className="password-field">
                    <label>Apellido</label>
                    <input
                      name="apellidoMedico"
                      placeholder="Ej: Pérez García"
                      value={dtoMedico.apellidoMedico}
                      onChange={handleMedicoChange}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <div className="field-group single">
                    <div className="password-field">
                      <label>DNI</label>
                      <input
                        name="dniMedico"
                        placeholder="Ej: 12345678"
                        value={dtoMedico.dniMedico}
                        onChange={handleMedicoChange}
                        required
                      />
                    </div>
                  </div>

                  <div className='field-group single'>
                    <div className="password-field">
                      <label>Matrícula</label>
                      <input
                        name="matriculaMedico"
                        placeholder="Ej: MP 12345"
                        value={dtoMedico.matriculaMedico}
                        onChange={handleMedicoChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="field-group">

                  <div className="field-group single">
                    <div className="password-field">
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

                  <div className='field-group single'>
                    <div className="password-field">
                      <label>Tiempo de consulta (minutos)</label>
                      <input
                        type="number"
                        name="tiempoConsultaMedico"
                        placeholder="Ej: 30"
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
                </div>

                <div className="field-group">
                  <div className='field-group single'>
                    <div className="password-field">
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
                  </div>

                  <div className="field-group single">
                    <div className="password-field">
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
                  <div className='password-field'>
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

    </div >
  );
}
