import { Test, TestingModule } from '@nestjs/testing';
import { HospitalEspecialidadMedicoService } from './hospital-especialidad-medico.service';

describe('HospitalEspecialidadMedicoService', () => {
  let service: HospitalEspecialidadMedicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HospitalEspecialidadMedicoService],
    }).compile();

    service = module.get<HospitalEspecialidadMedicoService>(HospitalEspecialidadMedicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
