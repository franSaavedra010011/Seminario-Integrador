import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePermisoDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  rutaPermiso?: string;
}
