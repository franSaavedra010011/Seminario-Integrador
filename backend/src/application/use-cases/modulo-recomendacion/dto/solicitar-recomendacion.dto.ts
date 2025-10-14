// import { TipoRecomendacion } from './solicitar-recomendacion.dto';
import { Type } from "class-transformer";
import { IsEnum, IsInt } from "class-validator";

export enum criterioRecomendacion {
    CERCANIA,
    CONGESTION
}

export class SolicitarRecomendacionDto {
    @IsInt()
    @Type(() => Number)
    idUsuario: number;

    @IsEnum(criterioRecomendacion)
    criterioRecomendacion: criterioRecomendacion;
}