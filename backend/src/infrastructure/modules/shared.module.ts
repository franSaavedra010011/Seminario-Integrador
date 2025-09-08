import { Module } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';

@Module({
  providers: [GenericRepositoryService],
  exports: [GenericRepositoryService],
})
export class SharedModule {}
