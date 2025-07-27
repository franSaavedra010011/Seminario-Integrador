import { Test, TestingModule } from '@nestjs/testing';
import { TurnoAgendaDiaController } from './turno-agenda-dia.controller';
import { TurnoAgendaDiaService } from './turno-agenda-dia.service';

describe('TurnoAgendaDiaController', () => {
  let controller: TurnoAgendaDiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnoAgendaDiaController],
      providers: [TurnoAgendaDiaService],
    }).compile();

    controller = module.get<TurnoAgendaDiaController>(TurnoAgendaDiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
