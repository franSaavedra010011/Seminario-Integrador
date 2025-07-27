import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Medico } from 'src/medico/entities/medico.entity';

@Module({
  providers: [TurnoService],
  controllers: [TurnoController],
  imports: [TypeOrmModule.forFeature([Turno, Paciente, Medico])],
  exports: [TypeOrmModule],
})
export class TurnoModule {}
