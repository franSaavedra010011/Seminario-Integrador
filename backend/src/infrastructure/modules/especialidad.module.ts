import { Module } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { EspecialidadController } from './especialidad.controller';
import { Especialidad } from '../domain/entities/especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';

@Module({
  providers: [EspecialidadService, GenericRepositoryService],
  controllers: [EspecialidadController],
  imports: [TypeOrmModule.forFeature([Especialidad, Medico])],
  exports: [TypeOrmModule],
})
export class EspecialidadModule {}
