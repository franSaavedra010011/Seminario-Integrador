import { Module } from '@nestjs/common';
import { TurnoAgendaDiaService } from './turno-agenda-dia.service';
import { TurnoAgendaDiaController } from './turno-agenda-dia.controller';

@Module({
  controllers: [TurnoAgendaDiaController],
  providers: [TurnoAgendaDiaService],
})
export class TurnoAgendaDiaModule {}
