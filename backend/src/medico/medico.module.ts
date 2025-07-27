import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { Medico } from './entities/medico.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { EspecialidadMedico } from 'src/especialidad-medico/entities/especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/hospital-especialidad/entities/hospital-especialidad.entity';
import { HospitalEspecialidadMedico } from 'src/hospital-especialidad-medico/entities/hospital-especialidad-medico.entity';

@Module({
  providers: [MedicoService, GenericRepositoryService],
  controllers: [MedicoController],
  imports: [
    TypeOrmModule.forFeature([
      Medico,
      Turno,
      Hospital,
      Especialidad,
      EspecialidadMedico,
      HospitalEspecialidad,
      HospitalEspecialidadMedico,
    ]),
  ],
  exports: [TypeOrmModule, MedicoService],
})
export class MedicoModule {}
