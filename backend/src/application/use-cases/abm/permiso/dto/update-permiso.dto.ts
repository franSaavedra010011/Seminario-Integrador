// update-permiso.dto.ts
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePermisoDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  codigo?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  descripcion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  categoria?: string;
}
