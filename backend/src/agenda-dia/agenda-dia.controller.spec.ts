import { Test, TestingModule } from '@nestjs/testing';
import { AgendaDiaController } from './agenda-dia.controller';
import { AgendaDiaService } from './agenda-dia.service';

describe('AgendaDiaController', () => {
  let controller: AgendaDiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendaDiaController],
      providers: [AgendaDiaService],
    }).compile();

    controller = module.get<AgendaDiaController>(AgendaDiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
