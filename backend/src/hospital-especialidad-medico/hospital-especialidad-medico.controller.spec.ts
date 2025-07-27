import { Test, TestingModule } from '@nestjs/testing';
import { HospitalEspecialidadMedicoController } from './hospital-especialidad-medico.controller';
import { HospitalEspecialidadMedicoService } from './hospital-especialidad-medico.service';

describe('HospitalEspecialidadMedicoController', () => {
  let controller: HospitalEspecialidadMedicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HospitalEspecialidadMedicoController],
      providers: [HospitalEspecialidadMedicoService],
    }).compile();

    controller = module.get<HospitalEspecialidadMedicoController>(HospitalEspecialidadMedicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
