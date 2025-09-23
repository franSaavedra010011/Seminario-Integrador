import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateEstadoTurnoDto {
  @IsString()
  @MinLength(3)
  nombre: string;
}
