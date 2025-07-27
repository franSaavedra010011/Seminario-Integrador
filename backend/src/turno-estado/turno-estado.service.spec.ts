import { Test, TestingModule } from '@nestjs/testing';
import { TurnoEstadoService } from './turno-estado.service';

describe('TurnoEstadoService', () => {
  let service: TurnoEstadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnoEstadoService],
    }).compile();

    service = module.get<TurnoEstadoService>(TurnoEstadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
