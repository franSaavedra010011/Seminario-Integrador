import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum CriterioBusquedaHospital {
    Especialidades,
    Medicos,
    UltimoVisitado
}

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

    @IsEnum(CriterioBusquedaHospital)
    criterio: CriterioBusquedaHospital
}
