import { Test, TestingModule } from '@nestjs/testing';
import { EspecialidadMedicoController } from './especialidad-medico.controller';
import { EspecialidadMedicoService } from './especialidad-medico.service';

describe('EspecialidadMedicoController', () => {
  let controller: EspecialidadMedicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecialidadMedicoController],
      providers: [EspecialidadMedicoService],
    }).compile();

    controller = module.get<EspecialidadMedicoController>(EspecialidadMedicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
