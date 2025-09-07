import { Module } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';

@Module({
  providers: [GenericRepositoryService],
  exports: [GenericRepositoryService],
})
export class SharedModule {}
