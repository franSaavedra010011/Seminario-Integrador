import { Body, Controller, Post } from '@nestjs/common';
import { ActualizarNivelDeCongestionUseCase } from 'src/application/use-cases/modulo-recomendacion/actualizar-nivel-de-congestion.use-case';
import { CompararHospitalesUseCase } from 'src/application/use-cases/modulo-recomendacion/comparar-hospitales.use-case';
import { CompararHospitalesDto } from 'src/application/use-cases/modulo-recomendacion/dto/comparar-hospitales.dto';
import { RegistrarCongestionHistoricaDto } from 'src/application/use-cases/modulo-recomendacion/dto/registrar-congestion-historica.dto';
import { UpdateCongestionDto } from 'src/application/use-cases/modulo-recomendacion/dto/update-congestion.dto';
import { RegistrarCongestionHistoricaUseCase } from 'src/application/use-cases/modulo-recomendacion/registrar-congestion-historica.use-case';

@Controller('recomendacion')
export class RecomendacionController {
  constructor(
    private readonly actualizarNivelDeCongestionUseCase: ActualizarNivelDeCongestionUseCase,
    private readonly compararHospitalesUseCase: CompararHospitalesUseCase,
    private readonly registrarCongestionHistoricaUseCase: RegistrarCongestionHistoricaUseCase,
  ) {}

  @Post('actualizar-congestion')
  actualizarCongestionHospital(@Body() dto: UpdateCongestionDto) {
    return this.actualizarNivelDeCongestionUseCase.ejecutar(dto);
  }

  @Post('comparar-hospitales')
  compararHospitales(@Body() dto: CompararHospitalesDto) {
    return this.compararHospitalesUseCase.ejecutar(dto);
  }

  @Post('registrar-congestion-historica')
  registrarCongestionHistorica(@Body() dto: RegistrarCongestionHistoricaDto) {
    return this.registrarCongestionHistoricaUseCase.ejecutar(dto);
  }
}
