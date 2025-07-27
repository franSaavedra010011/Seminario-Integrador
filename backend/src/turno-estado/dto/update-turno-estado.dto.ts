import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnoEstadoDto } from './create-turno-estado.dto';

export class UpdateTurnoEstadoDto extends PartialType(CreateTurnoEstadoDto) {}
