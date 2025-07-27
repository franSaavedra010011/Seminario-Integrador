import { Module } from '@nestjs/common';
import { CongestionActualService } from './congestion-actual.service';
import { CongestionActualController } from './congestion-actual.controller';

@Module({
  controllers: [CongestionActualController],
  providers: [CongestionActualService],
})
export class CongestionActualModule {}
