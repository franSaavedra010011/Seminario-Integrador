import { Module } from '@nestjs/common';
import { GenericRepositoryService } from './genericRepository.service';

@Module({
  providers: [GenericRepositoryService],
  exports: [GenericRepositoryService],
})
export class CommonModule {}
