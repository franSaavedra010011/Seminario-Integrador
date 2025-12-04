import { IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class DiaAgendaCancelacionDTO {
  @IsArray()
  @Type(() => Number) // transforma cada valor a number
  @IsInt({ each: true })
  idAgendaDia: number[];

  @IsArray()
  @Type(() => Number) // transforma cada valor a number
  @IsInt({ each: true })
  idAgendaSemana: number[];
}
