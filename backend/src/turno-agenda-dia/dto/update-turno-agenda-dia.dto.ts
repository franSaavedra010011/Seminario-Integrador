import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnoAgendaDiaDto } from './create-turno-agenda-dia.dto';

export class UpdateTurnoAgendaDiaDto extends PartialType(CreateTurnoAgendaDiaDto) {}
