import { Test, TestingModule } from '@nestjs/testing';
import { CongestionActualController } from './congestion-actual.controller';
import { CongestionActualService } from './congestion-actual.service';

describe('CongestionActualController', () => {
  let controller: CongestionActualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CongestionActualController],
      providers: [CongestionActualService],
    }).compile();

    controller = module.get<CongestionActualController>(CongestionActualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
