import { Module } from '@nestjs/common';
import { EstadoTurnoService } from './estado-turno.service';
import { EstadoTurnoController } from './estado-turno.controller';

@Module({
  controllers: [EstadoTurnoController],
  providers: [EstadoTurnoService],
})
export class EstadoTurnoModule {}
