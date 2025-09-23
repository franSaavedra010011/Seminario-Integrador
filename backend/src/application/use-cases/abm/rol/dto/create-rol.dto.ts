import { IsArray, ArrayMinSize, IsInt, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRolDto {
  @IsString()
  @MinLength(3)
  nombreRol: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  @IsInt({ each: true })
  idPermisos: number[];
}
