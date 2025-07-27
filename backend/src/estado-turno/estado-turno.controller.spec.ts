import { Test, TestingModule } from '@nestjs/testing';
import { EstadoTurnoController } from './estado-turno.controller';
import { EstadoTurnoService } from './estado-turno.service';

describe('EstadoTurnoController', () => {
  let controller: EstadoTurnoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoTurnoController],
      providers: [EstadoTurnoService],
    }).compile();

    controller = module.get<EstadoTurnoController>(EstadoTurnoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
