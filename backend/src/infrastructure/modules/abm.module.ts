import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades
import { Usuario } from 'src/domain/entities/usuario.entity';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { Rol } from 'src/domain/entities/rol.entity';
import { Permiso } from 'src/domain/entities/permiso.entity';
import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';

// Casos de uso ABM
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { AbmRolUseCase } from 'src/application/use-cases/abm/rol/abm-rol.use-case';
import { AbmPermisoUseCase } from 'src/application/use-cases/abm/permiso/abm-permiso.use-case';
import { AbmPacienteUseCase } from 'src/application/use-cases/abm/paciente/abm-paciente.use-case';
import { AbmMedicoUseCase } from 'src/application/use-cases/abm/medico/abm-medico.use-case';
import { AbmHospitalUseCase } from 'src/application/use-cases/abm/hospital/abm-hospital.use-case';
import { AbmEspecialidadUseCase } from 'src/application/use-cases/abm/especialidad/abm-especialidad.use-case';
import { AbmEstadoTurnoUseCase } from 'src/application/use-cases/abm/estado-turno/abm-estado-turno.use-case';

// Servicios compartidos
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      UsuarioRol,
      Rol,
      Permiso,
      RolPermiso,
      Paciente,
      Medico,
      Hospital,
      EspecialidadMedico,
      HospitalEspecialidadMedico,
      HospitalEspecialidad,
      Especialidad,
      EstadoTurno
    ])
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
    AbmEstadoTurnoUseCase
  ],
  exports: [
    AbmUsuarioUseCase,
    AbmRolUseCase,
    AbmPermisoUseCase,
    AbmPacienteUseCase,
    AbmMedicoUseCase,
    AbmHospitalUseCase,
    AbmEspecialidadUseCase,
    AbmEstadoTurnoUseCase
  ]
})
export class AbmModule {}
