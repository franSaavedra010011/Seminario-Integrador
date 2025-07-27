import { Test, TestingModule } from '@nestjs/testing';
import { PacienteNotificacionService } from './paciente-notificacion.service';

describe('PacienteNotificacionService', () => {
  let service: PacienteNotificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacienteNotificacionService],
    }).compile();

    service = module.get<PacienteNotificacionService>(PacienteNotificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
