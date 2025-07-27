import { Test, TestingModule } from '@nestjs/testing';
import { PersonalHospitalService } from './personal-hospital.service';

describe('PersonalHospitalService', () => {
  let service: PersonalHospitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalHospitalService],
    }).compile();

    service = module.get<PersonalHospitalService>(PersonalHospitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
