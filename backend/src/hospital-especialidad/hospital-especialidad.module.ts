import { Module } from '@nestjs/common';
import { HospitalEspecialidadService } from './hospital-especialidad.service';
import { HospitalEspecialidadController } from './hospital-especialidad.controller';

@Module({
  controllers: [HospitalEspecialidadController],
  providers: [HospitalEspecialidadService],
})
export class HospitalEspecialidadModule {}
