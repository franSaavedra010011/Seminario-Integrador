import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { ListarEntidadesService } from 'src/shared/services/listar-entidades.service';
import { ListarEntidadesController } from 'src/infrastructure/controllers/shared/listar-entidades.controller';

import { Hospital } from 'src/domain/entities/hospital.entity'; // ⬅ Asegurate que esta ruta sea correcta
import { RespuestasEstructuradasService } from 'src/shared/services/respuestas-estructuradas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hospital]),
  ],
  providers: [
    GenericRepositoryService,
    ListarEntidadesService,
    RespuestasEstructuradasService,
  ],
  controllers: [
    ListarEntidadesController,
  ],
  exports: [
    GenericRepositoryService,
    ListarEntidadesService,
    RespuestasEstructuradasService,
  ],
})
export class SharedModule { }
