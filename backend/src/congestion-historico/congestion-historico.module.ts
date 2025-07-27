import { Module } from '@nestjs/common';
import { CongestionHistoricoService } from './congestion-historico.service';
import { CongestionHistoricoController } from './congestion-historico.controller';

@Module({
  controllers: [CongestionHistoricoController],
  providers: [CongestionHistoricoService],
})
export class CongestionHistoricoModule {}
