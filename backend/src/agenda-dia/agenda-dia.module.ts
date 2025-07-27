import { Module } from '@nestjs/common';
import { AgendaDiaService } from './agenda-dia.service';
import { AgendaDiaController } from './agenda-dia.controller';

@Module({
  controllers: [AgendaDiaController],
  providers: [AgendaDiaService],
})
export class AgendaDiaModule {}
