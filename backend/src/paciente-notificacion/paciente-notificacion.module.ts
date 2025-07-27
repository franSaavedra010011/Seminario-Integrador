import { Module } from '@nestjs/common';
import { PacienteNotificacionService } from './paciente-notificacion.service';
import { PacienteNotificacionController } from './paciente-notificacion.controller';

@Module({
  controllers: [PacienteNotificacionController],
  providers: [PacienteNotificacionService],
})
export class PacienteNotificacionModule {}
