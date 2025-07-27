import { Test, TestingModule } from '@nestjs/testing';
import { PersonalHospitalController } from './personal-hospital.controller';
import { PersonalHospitalService } from './personal-hospital.service';

describe('PersonalHospitalController', () => {
  let controller: PersonalHospitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalHospitalController],
      providers: [PersonalHospitalService],
    }).compile();

    controller = module.get<PersonalHospitalController>(PersonalHospitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
