import { Module } from '@nestjs/common';
import { TurnoEstadoService } from './turno-estado.service';
import { TurnoEstadoController } from './turno-estado.controller';

@Module({
  controllers: [TurnoEstadoController],
  providers: [TurnoEstadoService],
})
export class TurnoEstadoModule {}
