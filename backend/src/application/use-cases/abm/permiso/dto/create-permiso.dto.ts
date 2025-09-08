// create-permiso.dto.ts
import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class CreatePermisoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  codigo: string; // Ej: CREAR_TURNO

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  descripcion: string; // Ej: "Permite que el paciente solicite un turno"

  @IsOptional()
  @IsString()
  @MaxLength(50)
  categoria?: string; // Ej: "TURNOS"
}
