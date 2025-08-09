import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePermisoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  rutaPermiso: string;
}
