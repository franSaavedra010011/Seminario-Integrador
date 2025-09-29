import { Body, Controller, Post } from '@nestjs/common';
import { ActualizarNivelDeCongestionUseCase } from 'src/application/use-cases/modulo-recomendacion/actualizar-nivel-de-congestion.use-case';
import { CompararHospitalesUseCase } from 'src/application/use-cases/modulo-recomendacion/comparar-hospitales.use-case';
import { ConsultarCongestionDeHospitalUseCase } from 'src/application/use-cases/modulo-recomendacion/consultar-congestion-de-hospital.use-case';
import { ConsultarDetalleDelHospitalUseCase } from 'src/application/use-cases/modulo-recomendacion/consultar-detalle-del-hospital.use-case';
import { CompararHospitalesDto } from 'src/application/use-cases/modulo-recomendacion/dto/comparar-hospitales.dto';
import { ConsultarCongestionHospitalDto } from 'src/application/use-cases/modulo-recomendacion/dto/consultar-congestion-hospital.dto';
import { DetalleHospitalDto } from 'src/application/use-cases/modulo-recomendacion/dto/detalle-hospital.dto';
import { RegistrarCongestionHistoricaDto } from 'src/application/use-cases/modulo-recomendacion/dto/registrar-congestion-historica.dto';
import { UpdateCongestionDto } from 'src/application/use-cases/modulo-recomendacion/dto/update-congestion.dto';
import { RegistrarCongestionHistoricaUseCase } from 'src/application/use-cases/modulo-recomendacion/registrar-congestion-historica.use-case';
import { SolicitarRecomendacionDeHospitalUseCase } from 'src/application/use-cases/modulo-recomendacion/solicitar-recomendacion-de-hospital.use-case';
import { SolicitarRecomendacionDto } from 'src/application/use-cases/modulo-recomendacion/dto/solicitar-recomendacion.dto';


@Controller('recomendacion')
export class RecomendacionController {
  constructor(
    private readonly actualizarNivelDeCongestionUseCase: ActualizarNivelDeCongestionUseCase,
    private readonly compararHospitalesUseCase: CompararHospitalesUseCase,
    private readonly registrarCongestionHistoricaUseCase: RegistrarCongestionHistoricaUseCase,
    private readonly consultarCongestionDeHospitalUseCase: ConsultarCongestionDeHospitalUseCase,
    private readonly consultarDetalleDelHospitalUseCase: ConsultarDetalleDelHospitalUseCase,
    private readonly solicitarRecomendacionDeHospitalUseCase: SolicitarRecomendacionDeHospitalUseCase,
  ) { }

  @Post('actualizar-congestion')
  actualizarCongestionHospital(@Body() dto: UpdateCongestionDto) {
    return this.actualizarNivelDeCongestionUseCase.ejecutar(dto);
  }

  @Post('comparar-hospitales')
  compararHospitales(@Body() dto: CompararHospitalesDto) {
    return this.compararHospitalesUseCase.ejecutar(dto);
  }

  @Post('solicitar-recomendacion')
  solicitarRecomendacion(@Body() dto: SolicitarRecomendacionDto) {
    return this.solicitarRecomendacionDeHospitalUseCase.ejecutar(dto);
  }

  @Post('registrar-congestion-historica')
  registrarCongestionHistorica(@Body() dto: RegistrarCongestionHistoricaDto) {
    return this.registrarCongestionHistoricaUseCase.ejecutar(dto);
  }

  @Post('consultar-congestion-de-hospital')
  consultarCongestionDeHospital(@Body() dto: ConsultarCongestionHospitalDto) {
    return this.consultarCongestionDeHospitalUseCase.ejecutar(dto);
  }

  @Post('consultar-detalle-del-hospital')
  consultarDetalleDelHospital(@Body() dto: DetalleHospitalDto) {
    return this.consultarDetalleDelHospitalUseCase.ejecutar(dto);
  }
}
