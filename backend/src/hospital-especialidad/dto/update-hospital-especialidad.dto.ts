import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalEspecialidadDto } from './create-hospital-especialidad.dto';

export class UpdateHospitalEspecialidadDto extends PartialType(CreateHospitalEspecialidadDto) {}
