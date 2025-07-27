import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaSemanalDto } from './create-agenda-semanal.dto';

export class UpdateAgendaSemanalDto extends PartialType(CreateAgendaSemanalDto) {}
