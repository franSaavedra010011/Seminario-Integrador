import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateEstadoTurnoDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  nombre?: string;
}
