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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hospital,
      CongestionActual,
      CongestionHistorico,
    ]),
  ],
  providers: [
    GenericRepositoryService,
    ActualizarNivelDeCongestionUseCase,
  ],
  exports: [
    ActualizarNivelDeCongestionUseCase,
  ],
})
export class RecomendacionModule {}
