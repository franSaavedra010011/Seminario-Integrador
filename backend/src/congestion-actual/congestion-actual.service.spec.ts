import { Test, TestingModule } from '@nestjs/testing';
import { CongestionActualService } from './congestion-actual.service';

describe('CongestionActualService', () => {
  let service: CongestionActualService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CongestionActualService],
    }).compile();

    service = module.get<CongestionActualService>(CongestionActualService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
