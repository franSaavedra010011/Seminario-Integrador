import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecialidadMedicoDto } from './create-especialidad-medico.dto';

export class UpdateEspecialidadMedicoDto extends PartialType(CreateEspecialidadMedicoDto) {}
