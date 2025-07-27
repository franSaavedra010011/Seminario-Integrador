import { Test, TestingModule } from '@nestjs/testing';
import { AgendaSemanalController } from './agenda-semanal.controller';
import { AgendaSemanalService } from './agenda-semanal.service';

describe('AgendaSemanalController', () => {
  let controller: AgendaSemanalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendaSemanalController],
      providers: [AgendaSemanalService],
    }).compile();

    controller = module.get<AgendaSemanalController>(AgendaSemanalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
