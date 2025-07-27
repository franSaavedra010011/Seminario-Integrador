import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalEspecialidadMedicoDto } from './create-hospital-especialidad-medico.dto';

export class UpdateHospitalEspecialidadMedicoDto extends PartialType(CreateHospitalEspecialidadMedicoDto) {}
