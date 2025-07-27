import { Test, TestingModule } from '@nestjs/testing';
import { CongestionHistoricoController } from './congestion-historico.controller';
import { CongestionHistoricoService } from './congestion-historico.service';

describe('CongestionHistoricoController', () => {
  let controller: CongestionHistoricoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CongestionHistoricoController],
      providers: [CongestionHistoricoService],
    }).compile();

    controller = module.get<CongestionHistoricoController>(CongestionHistoricoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
