import { Test, TestingModule } from '@nestjs/testing';
import { CongestionHistoricoService } from './congestion-historico.service';

describe('CongestionHistoricoService', () => {
  let service: CongestionHistoricoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CongestionHistoricoService],
    }).compile();

    service = module.get<CongestionHistoricoService>(CongestionHistoricoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
