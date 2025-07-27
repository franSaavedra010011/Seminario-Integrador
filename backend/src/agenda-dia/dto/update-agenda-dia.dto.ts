import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDiaDto } from './create-agenda-dia.dto';

export class UpdateAgendaDiaDto extends PartialType(CreateAgendaDiaDto) {}
