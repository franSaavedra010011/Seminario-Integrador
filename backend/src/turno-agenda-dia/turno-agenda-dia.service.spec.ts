import { Test, TestingModule } from '@nestjs/testing';
import { TurnoAgendaDiaService } from './turno-agenda-dia.service';

describe('TurnoAgendaDiaService', () => {
  let service: TurnoAgendaDiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnoAgendaDiaService],
    }).compile();

    service = module.get<TurnoAgendaDiaService>(TurnoAgendaDiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
