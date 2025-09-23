import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEspecialidadDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  descripcion?: string;
}
