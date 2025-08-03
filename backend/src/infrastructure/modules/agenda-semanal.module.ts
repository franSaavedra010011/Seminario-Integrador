import { Module } from '@nestjs/common';
import { AgendaSemanalService } from './agenda-semanal.service';
import { AgendaSemanalController } from './agenda-semanal.controller';

@Module({
  controllers: [AgendaSemanalController],
  providers: [AgendaSemanalService],
})
export class AgendaSemanalModule {}
