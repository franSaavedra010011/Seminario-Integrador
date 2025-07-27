import { Module } from '@nestjs/common';
import { HospitalEspecialidadMedicoService } from './hospital-especialidad-medico.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalEspecialidadMedico } from './entities/hospital-especialidad-medico.entity';
import { HospitalEspecialidadMedicoController } from './hospital-especialidad-medico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HospitalEspecialidadMedico])],
  controllers: [HospitalEspecialidadMedicoController],
  providers: [HospitalEspecialidadMedicoService],
  exports: [HospitalEspecialidadMedicoService, TypeOrmModule],
})
export class HospitalEspecialidadMedicoModule {}
