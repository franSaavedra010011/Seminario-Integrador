import { Test, TestingModule } from '@nestjs/testing';
import { PacienteNotificacionController } from './paciente-notificacion.controller';
import { PacienteNotificacionService } from './paciente-notificacion.service';

describe('PacienteNotificacionController', () => {
  let controller: PacienteNotificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacienteNotificacionController],
      providers: [PacienteNotificacionService],
    }).compile();

    controller = module.get<PacienteNotificacionController>(PacienteNotificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
