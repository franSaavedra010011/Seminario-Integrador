import { Test, TestingModule } from '@nestjs/testing';
import { EspecialidadMedicoService } from './especialidad-medico.service';

describe('EspecialidadMedicoService', () => {
  let service: EspecialidadMedicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EspecialidadMedicoService],
    }).compile();

    service = module.get<EspecialidadMedicoService>(EspecialidadMedicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
