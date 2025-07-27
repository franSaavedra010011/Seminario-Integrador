import { Test, TestingModule } from '@nestjs/testing';
import { HospitalEspecialidadService } from './hospital-especialidad.service';

describe('HospitalEspecialidadService', () => {
  let service: HospitalEspecialidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HospitalEspecialidadService],
    }).compile();

    service = module.get<HospitalEspecialidadService>(HospitalEspecialidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
