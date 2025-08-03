import { Module } from '@nestjs/common';
import { HistoriaMedicaService } from './historia-medica.service';
import { HistoriaMedicaController } from './historia-medica.controller';

@Module({
  controllers: [HistoriaMedicaController],
  providers: [HistoriaMedicaService],
})
export class HistoriaMedicaModule {}
