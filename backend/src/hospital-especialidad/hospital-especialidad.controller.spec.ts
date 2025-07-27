import { Test, TestingModule } from '@nestjs/testing';
import { HospitalEspecialidadController } from './hospital-especialidad.controller';
import { HospitalEspecialidadService } from './hospital-especialidad.service';

describe('HospitalEspecialidadController', () => {
  let controller: HospitalEspecialidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HospitalEspecialidadController],
      providers: [HospitalEspecialidadService],
    }).compile();

    controller = module.get<HospitalEspecialidadController>(HospitalEspecialidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
