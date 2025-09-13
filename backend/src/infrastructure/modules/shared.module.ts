import { Module } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { ListarEntidadesService } from 'src/shared/services/listar-entidades.service';
import { ListarEntidadesController } from 'src/infrastructure/controllers/shared/listar-entidades.controller';

@Module({
  providers: [GenericRepositoryService, ListarEntidadesService],
  controllers: [ListarEntidadesController],
  exports: [GenericRepositoryService, ListarEntidadesService],
})
export class SharedModule {}
