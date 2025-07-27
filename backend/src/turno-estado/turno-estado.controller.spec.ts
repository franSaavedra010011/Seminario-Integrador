import { Test, TestingModule } from '@nestjs/testing';
import { TurnoEstadoController } from './turno-estado.controller';
import { TurnoEstadoService } from './turno-estado.service';

describe('TurnoEstadoController', () => {
  let controller: TurnoEstadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnoEstadoController],
      providers: [TurnoEstadoService],
    }).compile();

    controller = module.get<TurnoEstadoController>(TurnoEstadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
