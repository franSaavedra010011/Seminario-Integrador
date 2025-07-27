import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './entities/hospital.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';

@Module({
  providers: [HospitalService, GenericRepositoryService],
  controllers: [HospitalController],
  imports: [TypeOrmModule.forFeature([Hospital, Medico])],
  exports: [TypeOrmModule],
})
export class HospitalModule {}
