import { BadRequestException, Injectable } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
import * as bcryptjs from 'bcryptjs';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { Repository } from 'typeorm';
import { Rol } from 'src/domain/entities/rol.entity';

@Injectable()
export class AbmUsuarioUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    private readonly usuarioRolRepo: Repository<UsuarioRol>,
  ) {}

  async crear(dto: CreateUsuarioDto): Promise<Usuario> {
    const existente = await this.genericRepository.buscar(Usuario, 'usuario', [
      { atributo: 'emailUsuario', operacion: '=', valor: dto.emailUsuario },
    ]);

    if (existente.length > 0) {
      throw new BadRequestException('El email ya está registrado');
    }

    const passwordHasheado = await bcryptjs.hash(dto.passwordUsuario, 10);

    const usuario = new Usuario();
    usuario.usernameUsuario = dto.usernameUsuario;
    usuario.emailUsuario = dto.emailUsuario;
    usuario.passwordUsuario = passwordHasheado;

    const usuarioGuardado = await this.genericRepository.guardarCambios(Usuario, usuario);

    for (const idRol of dto.idRoles) {
      const roles = await this.genericRepository.buscar(Rol, 'rol', [
        { atributo: 'id', operacion: '=', valor: idRol },
      ]);

      if (!roles.length) {
        throw new BadRequestException(`Rol con ID ${idRol} no existe`);
      }

      const usuarioRol = this.usuarioRolRepo.create({
        usuario: usuarioGuardado,
        rol: roles[0],
        fechaDesde: new Date(),
      });

      await this.usuarioRolRepo.save(usuarioRol);
    }

    return usuarioGuardado;
  }

  async actualizar(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarios = await this.genericRepository.buscar(Usuario, 'usuario', [
      { atributo: 'id', operacion: '=', valor: id },
    ]);

    if (!usuarios.length) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const usuario = usuarios[0];

    // Si se quiere actualizar la contraseña
    if (dto.passwordUsuario) {
      dto.passwordUsuario = await bcryptjs.hash(dto.passwordUsuario, 10);
    }

    Object.assign(usuario, dto);

    const usuarioActualizado = await this.genericRepository.guardarCambios(
      Usuario,
      usuario,
    );

    // Agregar roles
    if (dto.idRolesAAgregar?.length) {
      for (const idRol of dto.idRolesAAgregar) {
        const roles = await this.genericRepository.buscar(Rol, 'rol', [
          { atributo: 'id', operacion: '=', valor: idRol },
        ]);

        if (!roles.length) {
          throw new BadRequestException(`Rol con ID ${idRol} no existe`);
        }

        // Buscar si ya tiene ese rol asignado
        const existente = await this.genericRepository.buscar(UsuarioRol, 'usuarioRol', [
          { atributo: 'usuario', operacion: 'relacion', valor: usuario.id },
          { atributo: 'rol', operacion: 'relacion', valor: idRol },
        ]);

        if (!existente.length) {
          const usuarioRol = new UsuarioRol();
          usuarioRol.usuario = usuarioActualizado;
          usuarioRol.rol = roles[0];
          usuarioRol.fechaDesde = new Date();

          await this.genericRepository.guardarCambios(UsuarioRol, usuarioRol);
        }
      }
    }


    // Eliminar roles
    if (dto.idRolesAEliminar?.length) {
      for (const idRol of dto.idRolesAEliminar) {
        const relaciones = await this.genericRepository.buscar(
          UsuarioRol,
          'usuarioRol',
          [
            { atributo: 'usuario', operacion: 'relacion', valor: usuario.id },
            { atributo: 'rol', operacion: 'relacion', valor: idRol },
          ],
        );

        for (const rel of relaciones) {
          await this.genericRepository.eliminar(UsuarioRol, rel.id);
          rel.fechaHasta = new Date();
          await this.genericRepository.guardarCambios(UsuarioRol, rel);
        }
      }
    }
    
    return usuarioActualizado;
  }


  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(Usuario, id);
  }
}
