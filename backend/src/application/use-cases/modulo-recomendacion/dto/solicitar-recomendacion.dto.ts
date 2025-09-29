import { Type } from "class-transformer";
import { IsEnum, IsInt } from "class-validator";

export enum TipoRecomendacion {
    CERCANIA = 'cercania',
    CONGESTION = 'congestion',
    VISITADO = 'visitado'
}

export class SolicitarRecomendacionDto {
    @IsInt()
    @Type(() => Number)
    idUsuario: number;

    @IsEnum(TipoRecomendacion)
    opcion: TipoRecomendacion;
}