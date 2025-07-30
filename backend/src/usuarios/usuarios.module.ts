import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../domain/entities/usuario.entity';
import { UsuarioRolModule } from 'src/usuario-rol/usuario-rol.module';
import { MedicoModule } from 'src/medico/medico.module';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { PacienteModule } from 'src/paciente/paciente.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, GenericRepositoryService],
  imports: [
    TypeOrmModule.forFeature([Usuario, UsuarioRol]), // <- IMPORTANTE
    // otros módulos necesarios, por ejemplo:
    forwardRef(() => UsuarioRolModule),
    forwardRef(() => MedicoModule),
    forwardRef(() => PacienteModule),
  ],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
