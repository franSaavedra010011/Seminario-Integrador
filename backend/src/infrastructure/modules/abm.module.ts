import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ENTIDADES
import { AgendaDia } from 'src/domain/entities/agenda-dia.entity';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { CongestionActual } from 'src/domain/entities/congestion-actual.entity';
import { CongestionHistorico } from 'src/domain/entities/congestion-historico.entity';
import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { HistoriaMedica } from 'src/domain/entities/historia-medica.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Localidad } from 'src/domain/entities/localidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { PacienteNotificacion } from 'src/domain/entities/paciente-notificacion.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { Permiso } from 'src/domain/entities/permiso.entity';
import { PersonalHospital } from 'src/domain/entities/personal-hospital.entity';
import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
import { Rol } from 'src/domain/entities/rol.entity';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';

// CASOS DE USO ABM
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { AbmRolUseCase } from 'src/application/use-cases/abm/rol/abm-rol.use-case';
import { AbmPermisoUseCase } from 'src/application/use-cases/abm/permiso/abm-permiso.use-case';
import { AbmPacienteUseCase } from 'src/application/use-cases/abm/paciente/abm-paciente.use-case';
import { AbmMedicoUseCase } from 'src/application/use-cases/abm/medico/abm-medico.use-case';
import { AbmHospitalUseCase } from 'src/application/use-cases/abm/hospital/abm-hospital.use-case';
import { AbmEspecialidadUseCase } from 'src/application/use-cases/abm/especialidad/abm-especialidad.use-case';
import { AbmEstadoTurnoUseCase } from 'src/application/use-cases/abm/estado-turno/abm-estado-turno.use-case';

// SERVICIOS
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { PermisoController } from '../controllers/abm/permiso.controller';
import { EspecialidadController } from '../controllers/abm/especialidad.controller';
import { UsuarioController } from '../controllers/abm/usuario.controller';
import { PacienteController } from '../controllers/abm/paciente.controller';
import { MedicoController } from '../controllers/abm/medico.controller';
import { HospitalController } from '../controllers/abm/hospital.controller';
import { RolController } from '../controllers/abm/rol.controller';
import { AbmTurnoAgendaDiaUseCase } from 'src/application/use-cases/abm/turno-agenda-dia/abm-turno-agenda-dia.use-case';
import { AbmAgendaDiaUseCase } from 'src/application/use-cases/abm/agendaDia/abm-agendaDia.use-case';
import { AbmAgendaSemanalUseCase } from 'src/application/use-cases/abm/agendaSemanal/abm-agendaSemanal.use-case';
import { AbmPacienteNotificacionUseCase } from 'src/application/use-cases/abm/pacienteNotificacion/abm-pacienteNotificacion.use-case';
import { AbmTurnoUseCase } from 'src/application/use-cases/abm/turno/abm-turno.use-case';
import { AbmTurnoEstadoUseCase } from 'src/application/use-cases/abm/turnoEstado/abm-turno-estado.use-case';
import { CancelarTurnoUseCase } from 'src/application/use-cases/modulo-turnos/cancelar-turno.use-case';
import { ConsultarDetalleDelTurnoUseCase } from 'src/application/use-cases/modulo-turnos/consultar-detalle-del-turno.use-case';
import { ConsultarTurnosActivosUseCase } from 'src/application/use-cases/modulo-turnos/consultar-turnos-activos.use-case';
import { NotificarCancelacionDeTurnoUseCase } from 'src/application/use-cases/modulo-turnos/notificar-cancelacion-de-turno.use-case';
import { NotificarProximidadDeTurnoUseCase } from 'src/application/use-cases/modulo-turnos/notificar-proximidad-de-turno.use-case';
import { RegistrarAsistenciaDePacienteUseCase } from 'src/application/use-cases/modulo-turnos/registrar-asistencia-de-paciente.use-case';
import { SolicitarTurnoUseCase } from 'src/application/use-cases/modulo-turnos/solicitar-turno.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AgendaDia,
      AgendaSemanal,
      CongestionActual,
      CongestionHistorico,
      EspecialidadMedico,
      Especialidad,
      EstadoTurno,
      HistoriaMedica,
      HospitalEspecialidadMedico,
      HospitalEspecialidad,
      Hospital,
      Localidad,
      Medico,
      PacienteNotificacion,
      Paciente,
      Permiso,
      PersonalHospital,
      RolPermiso,
      Rol,
      TurnoAgendaDia,
      TurnoEstado,
      Turno,
      UsuarioRol,
      Usuario,
    ])
  ],
  controllers: [
    PermisoController,
    EspecialidadController,
    UsuarioController,
    PacienteController,
    RolController,
    MedicoController,
    HospitalController,
  ],
  providers: [
    GenericRepositoryService,
    AbmUsuarioUseCase,
    AbmRolUseCase,
    AbmPermisoUseCase,
    AbmPacienteUseCase,
    AbmMedicoUseCase,
    AbmHospitalUseCase,
    AbmEspecialidadUseCase,
    AbmEstadoTurnoUseCase,
    AbmTurnoUseCase,
    AbmAgendaSemanalUseCase,
    AbmAgendaDiaUseCase,
    AbmPacienteNotificacionUseCase,
    AbmTurnoAgendaDiaUseCase,
    AbmTurnoEstadoUseCase,
    CancelarTurnoUseCase,
    ConsultarDetalleDelTurnoUseCase,
    ConsultarTurnosActivosUseCase,
    NotificarCancelacionDeTurnoUseCase,
    NotificarProximidadDeTurnoUseCase,
    RegistrarAsistenciaDePacienteUseCase,
    SolicitarTurnoUseCase,
  ],
  exports: [
    AbmUsuarioUseCase,
    AbmRolUseCase,
    AbmPermisoUseCase,
    AbmPacienteUseCase,
    AbmMedicoUseCase,
    AbmHospitalUseCase,
    AbmEspecialidadUseCase,
    AbmEstadoTurnoUseCase,
    AbmTurnoUseCase,
    AbmAgendaSemanalUseCase,
    AbmAgendaDiaUseCase,
    AbmPacienteNotificacionUseCase,
    AbmTurnoAgendaDiaUseCase,
    AbmTurnoEstadoUseCase,
    CancelarTurnoUseCase,
    ConsultarDetalleDelTurnoUseCase,
    ConsultarTurnosActivosUseCase,
    NotificarCancelacionDeTurnoUseCase,
    NotificarProximidadDeTurnoUseCase,
    RegistrarAsistenciaDePacienteUseCase,
    SolicitarTurnoUseCase,
  ]
})
export class AbmModule { }
