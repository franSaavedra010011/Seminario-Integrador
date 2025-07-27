import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRolService } from './usuario-rol.service';
import { UsuarioRol } from './entities/usuario-rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRol])], // ✅ IMPORTANTE
  providers: [UsuarioRolService],
  exports: [UsuarioRolService], // para que otros módulos puedan usarlo
})
export class UsuarioRolModule {}
