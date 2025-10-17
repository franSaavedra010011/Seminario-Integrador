import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AltaUsuario.css';

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
    localidadId: '',
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
    telMedico: '',
    matriculaMedico: '',
    tiempoConsulta: '',
    idHospital: '',
    especialidades: [],
  });


  const navigate = useNavigate();

  const MAPA_ROLES = {
    user: 1,
    admin: 2,
    recepcionista: 3,
    medico: 4,
    paciente: 5,
    adminHospital: 6,
  };

  const handleUsuarioChange = (e) => {
    const { name, value } = e.target;
    setDtoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handlePacienteChange = (e) => {
    const { name, value } = e.target;
    setDtoPaciente((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicoChange = (e) => {
    const { name, value } = e.target;
    setDtoMedico((prev) => ({ ...prev, [name]: value }));
  };

  const handleEspecialidadSeleccionada = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setDtoMedico((prev) => ({ ...prev, especialidades: values }));
  };

  const handleRolChange = (e) => setRolSeleccionado(e.target.value);

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
    const idRol = MAPA_ROLES[rolSeleccionado.toLowerCase()];
    const dto = {
      emailUsuario: dtoUsuario.emailUsuario,
      usernameUsuario: dtoUsuario.usernameUsuario,
      passwordUsuario: dtoUsuario.passwordUsuario,
      idRoles: [idRol],
    };

    if (idRol === MAPA_ROLES.paciente) dto.datosPaciente = dtoPaciente;
    if (idRol === MAPA_ROLES.medico) dto.datosMedico = dtoMedico;

    return dto;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosAEnviar = crearDtoFinal();

    try {
      const response = await fetch('http://localhost:3000/usuario/alta', {
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
          <select value={rolSeleccionado} onChange={handleRolChange} required>
            <option value="">Seleccione</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.nombre}>
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
        {rolSeleccionado === 'paciente' && (
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
                    name="localidadId"
                    value={dtoPaciente.localidadId}
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
            <fieldset>
              <legend>Vacunas</legend>
              <div className="field-group">
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
                className="btn-secundario"
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
        {rolSeleccionado === 'medico' && (
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
                    name="telMedico"
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
                    name="tiempoConsulta"
                    value={dtoMedico.tiempoConsulta}
                    onChange={handleMedicoChange}
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
                        {h.nombreHospital}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Especialidades</label>
                  <select
                    multiple
                    value={dtoMedico.especialidades}
                    onChange={handleEspecialidadSeleccionada}
                  >
                    {especialidades.map((esp) => (
                      <option key={esp.id} value={esp.id}>
                        {esp.nombre}
                      </option>
                    ))}
                  </select>
                  <small>Use Ctrl (Windows) o Cmd (Mac) para seleccionar varias</small>
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
