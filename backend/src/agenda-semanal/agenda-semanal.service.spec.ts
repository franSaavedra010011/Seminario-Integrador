import { Test, TestingModule } from '@nestjs/testing';
import { AgendaSemanalService } from './agenda-semanal.service';

describe('AgendaSemanalService', () => {
  let service: AgendaSemanalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendaSemanalService],
    }).compile();

    service = module.get<AgendaSemanalService>(AgendaSemanalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
