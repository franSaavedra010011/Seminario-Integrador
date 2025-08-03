import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { Medico } from '../domain/entities/medico.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';

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
