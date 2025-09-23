import { Type } from "class-transformer";
import { IsEnum, IsIn, IsInt, Min } from "class-validator";
import { NivelCongestionEnum } from "src/domain/enums/nivel-congestion.enum";

export class UpdateCongestionDto {
    @IsInt()
    @Min(1)
    @Type(() => Number)
    hospitalId: number;

    @IsEnum(NivelCongestionEnum)
    nivelCongestion: NivelCongestionEnum;

    @IsInt()
    @Min(0)
    turnosCancelados: number;

    @IsInt()
    @Min(0)
    turnosNoAsistidos: number;

    @IsInt()
    @Min(0)
    turnosAsistidos: number;

    @IsInt()
    @Min(0)
    turnosEnProceso: number;
}