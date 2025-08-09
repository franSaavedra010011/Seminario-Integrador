import { Module } from '@nestjs/common';
import { AppController } from '../../infrastructure/controllers/app.controller';
import { AppService } from '../../app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos de infraestructura (vía imports relativos)
import { PacienteModule } from '../../infrastructure/modules/paciente.module';
import { TurnoModule } from '../../infrastructure/modules/turno.module';
import { MedicoModule } from '../../infrastructure/modules/medico.module';
import { HospitalModule } from '../../infrastructure/modules/hospital.module';
import { EspecialidadModule } from '../../infrastructure/modules/especialidad.module';
import { UsuariosModule } from '../../infrastructure/modules/usuarios.module';
import { HistoriaMedicaModule } from '../../infrastructure/modules/historia-medica.module';
import { LocalidadModule } from '../../infrastructure/modules/localidad.module';
import { AgendaSemanalModule } from '../../infrastructure/modules/agenda-semanal.module';
import { AgendaDiaModule } from '../../infrastructure/modules/agenda-dia.module';
import { TurnoAgendaDiaModule } from '../../infrastructure/modules/turno-agenda-dia.module';
import { EstadoTurnoModule } from '../../infrastructure/modules/estado-turno.module';
import { TurnoEstadoModule } from '../../infrastructure/modules/turno-estado.module';
import { HospitalEspecialidadModule } from '../../infrastructure/modules/hospital-especialidad.module';
import { EspecialidadMedicoModule } from '../../infrastructure/modules/especialidad-medico.module';
import { CongestionActualModule } from '../../infrastructure/modules/congestion-actual.module';
import { CongestionHistoricoModule } from '../../infrastructure/modules/congestion-historico.module';
import { HospitalEspecialidadMedicoModule } from '../../infrastructure/modules/hospital-especialidad-medico.module';
import { PacienteNotificacionModule } from '../../infrastructure/modules/paciente-notificacion.module';
import { PersonalHospitalModule } from '../../infrastructure/modules/personal-hospital.module';
import { UsuarioRolModule } from '../../infrastructure/modules/usuario-rol.module';
import { RolModule } from '../../infrastructure/modules/rol.module';
import { RolPermisoModule } from '../../infrastructure/modules/rol-permiso.module';
import { PermisoModule } from '../../infrastructure/modules/permiso.module';
import { AuthModule } from '../../infrastructure/modules/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // el que configuraste
      password: '1234', // reemplaza con la real
      database: 'turnos_db',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true, // ¡solo en desarrollo!
    }),
    PacienteModule,
    TurnoModule,
    MedicoModule,
    HospitalModule,
    EspecialidadModule,
    UsuariosModule,
    AuthModule,
    HistoriaMedicaModule,
    LocalidadModule,
    AgendaSemanalModule,
    AgendaDiaModule,
    TurnoAgendaDiaModule,
    EstadoTurnoModule,
    TurnoEstadoModule,
    HospitalEspecialidadModule,
    EspecialidadMedicoModule,
    CongestionActualModule,
    CongestionHistoricoModule,
    HospitalEspecialidadMedicoModule,
    PacienteNotificacionModule,
    PersonalHospitalModule,
    UsuarioRolModule,
    RolModule,
    RolPermisoModule,
    PermisoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
