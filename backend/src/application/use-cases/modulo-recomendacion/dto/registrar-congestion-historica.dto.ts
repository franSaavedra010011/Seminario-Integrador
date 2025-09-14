import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class RegistrarCongestionHistoricaDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  idCongestionActual: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  idHospital: number;
}
