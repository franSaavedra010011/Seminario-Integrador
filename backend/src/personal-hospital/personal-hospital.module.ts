import { Module } from '@nestjs/common';
import { PersonalHospitalService } from './personal-hospital.service';
import { PersonalHospitalController } from './personal-hospital.controller';

@Module({
  controllers: [PersonalHospitalController],
  providers: [PersonalHospitalService],
})
export class PersonalHospitalModule {}
