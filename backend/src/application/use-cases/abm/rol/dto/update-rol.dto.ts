import { IsOptional, IsArray, IsInt, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRolDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  nombreRol?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  idPermisos?: number[];
}
