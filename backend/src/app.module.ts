import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from './paciente/paciente.module';
import { TurnoModule } from './turno/turno.module';
import { MedicoModule } from './medico/medico.module';
import { HospitalModule } from './hospital/hospital.module';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { HistoriaMedicaModule } from './historia-medica/historia-medica.module';
import { LocalidadModule } from './localidad/localidad.module';
import { AgendaSemanalModule } from './agenda-semanal/agenda-semanal.module';
import { AgendaDiaModule } from './agenda-dia/agenda-dia.module';
import { TurnoAgendaDiaModule } from './turno-agenda-dia/turno-agenda-dia.module';
import { EstadoTurnoModule } from './estado-turno/estado-turno.module';
import { TurnoEstadoModule } from './turno-estado/turno-estado.module';
import { HospitalEspecialidadModule } from './hospital-especialidad/hospital-especialidad.module';
import { EspecialidadMedicoModule } from './especialidad-medico/especialidad-medico.module';
import { CongestionActualModule } from './congestion-actual/congestion-actual.module';
import { CongestionHistoricoModule } from './congestion-historico/congestion-historico.module';
import { HospitalEspecialidadMedicoModule } from './hospital-especialidad-medico/hospital-especialidad-medico.module';
import { PacienteNotificacionModule } from './paciente-notificacion/paciente-notificacion.module';
import { PersonalHospitalModule } from './personal-hospital/personal-hospital.module';
import { UsuarioRolModule } from './usuario-rol/usuario-rol.module';
import { RolModule } from './rol/rol.module';
import { RolPermisoModule } from './rol-permiso/rol-permiso.module';
import { PermisoModule } from './permiso/permiso.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // el que configuraste
      password: '1234', // reemplaza con la real
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
