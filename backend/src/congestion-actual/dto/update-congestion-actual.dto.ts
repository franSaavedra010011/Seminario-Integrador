import { PartialType } from '@nestjs/mapped-types';
import { CreateCongestionActualDto } from './create-congestion-actual.dto';

export class UpdateCongestionActualDto extends PartialType(CreateCongestionActualDto) {}
