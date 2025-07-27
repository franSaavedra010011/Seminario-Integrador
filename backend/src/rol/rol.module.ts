import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';

@Module({
  controllers: [RolController],
  providers: [RolService, GenericRepositoryService],
})
export class RolModule {}
