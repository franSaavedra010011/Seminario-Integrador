import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ConsultarHospitalesCriteriosDto {
    @IsInt()
    @Type(() => Number)
    idUsuario: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idEspecialidad?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idMedico?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    idLocalidad?: number;
}
