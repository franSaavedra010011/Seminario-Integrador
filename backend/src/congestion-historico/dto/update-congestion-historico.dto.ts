import { PartialType } from '@nestjs/mapped-types';
import { CreateCongestionHistoricoDto } from './create-congestion-historico.dto';

export class UpdateCongestionHistoricoDto extends PartialType(CreateCongestionHistoricoDto) {}
