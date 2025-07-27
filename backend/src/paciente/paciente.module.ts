import { Module } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { Paciente } from './entities/paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from 'src/turno/entities/turno.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthService } from 'src/auth/auth.service';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';

@Module({
  providers: [PacienteService, AuthService, GenericRepositoryService],
  controllers: [PacienteController],
  imports: [
    TypeOrmModule.forFeature([Paciente, Turno, Usuario]),
    UsuariosModule,
  ],
  exports: [TypeOrmModule],
})
export class PacienteModule {}
