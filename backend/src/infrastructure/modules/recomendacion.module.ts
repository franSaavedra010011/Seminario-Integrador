import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades relacionadas con recomendación
import { Hospital } from 'src/domain/entities/hospital.entity';
import { CongestionActual } from 'src/domain/entities/congestion-actual.entity';
import { CongestionHistorico } from 'src/domain/entities/congestion-historico.entity';

// Casos de uso
import { ActualizarNivelDeCongestionUseCase } from 'src/application/use-cases/modulo-recomendacion/actualizar-nivel-de-congestion.use-case';
// Servicios compartidos
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { RecomendacionController } from '../controllers/recomendacion.controller';
import { CompararHospitalesUseCase } from 'src/application/use-cases/modulo-recomendacion/comparar-hospitales.use-case';
import { SharedModule } from 'src/infrastructure/modules/shared.module';
import { RegistrarCongestionHistoricaUseCase } from 'src/application/use-cases/modulo-recomendacion/registrar-congestion-historica.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hospital,
      CongestionActual,
      CongestionHistorico,
    ]),
    SharedModule,
  ],
  controllers: [
    RecomendacionController,
  ],
  providers: [
    ActualizarNivelDeCongestionUseCase,
    CompararHospitalesUseCase,
    RegistrarCongestionHistoricaUseCase
  ],
  exports: [
    ActualizarNivelDeCongestionUseCase,
    CompararHospitalesUseCase,
    RegistrarCongestionHistoricaUseCase
  ],
})
export class RecomendacionModule {}
