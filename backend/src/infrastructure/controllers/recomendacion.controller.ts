import { Body, Post } from "@nestjs/common";
import { ActualizarNivelDeCongestionUseCase } from "src/application/use-cases/modulo-recomendacion/actualizar-nivel-de-congestion.use-case";
import { UpdateCongestionDto } from "src/application/use-cases/modulo-recomendacion/dto/update-congestion.dto";

export class RecomendacionController {
    constructor(
        private readonly actualizarNivelDeCongestionUseCase: ActualizarNivelDeCongestionUseCase
    ) {}

    @Post('actualizar-congestion')
    actualizarCongestionHospital(@Body() dto: UpdateCongestionDto) {
        return this.actualizarNivelDeCongestionUseCase.ejecutar(dto);
    }
}