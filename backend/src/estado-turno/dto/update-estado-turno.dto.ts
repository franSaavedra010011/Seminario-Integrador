import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoTurnoDto } from './create-estado-turno.dto';

export class UpdateEstadoTurnoDto extends PartialType(CreateEstadoTurnoDto) {}
