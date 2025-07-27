import { Test, TestingModule } from '@nestjs/testing';
import { AgendaDiaService } from './agenda-dia.service';

describe('AgendaDiaService', () => {
  let service: AgendaDiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendaDiaService],
    }).compile();

    service = module.get<AgendaDiaService>(AgendaDiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
