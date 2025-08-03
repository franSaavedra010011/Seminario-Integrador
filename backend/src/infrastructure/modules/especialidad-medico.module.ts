import { Module } from '@nestjs/common';
import { EspecialidadMedicoService } from './especialidad-medico.service';
import { EspecialidadMedicoController } from './especialidad-medico.controller';

@Module({
  controllers: [EspecialidadMedicoController],
  providers: [EspecialidadMedicoService],
})
export class EspecialidadMedicoModule {}
