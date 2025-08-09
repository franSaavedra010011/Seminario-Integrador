import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from 'src/domain/entities/rol.entity';
import { Permiso } from 'src/domain/entities/permiso.entity';
import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AbmRolUseCase {
  constructor(
    @InjectRepository(RolPermiso)
    private readonly rolPermisoRepo: Repository<RolPermiso>,
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  async crear(dto: CreateRolDto): Promise<Rol> {
    const permisos: Permiso[] = [];

    for (const idPermiso of dto.idPermisos) {
      const encontrados = await this.genericRepository.buscar(Permiso, 'permiso', [
        { atributo: 'id', operacion: '=', valor: idPermiso },
      ]);

      if (!encontrados.length) {
        throw new BadRequestException(`Permiso con ID ${idPermiso} no existe`);
      }

      permisos.push(encontrados[0]);
    }

    const nuevoRol = new Rol();
    nuevoRol.nombre = dto.nombreRol;

    const rolGuardado = await this.genericRepository.guardarCambios(Rol, nuevoRol);

    for (const permiso of permisos) {
      const relacion = new RolPermiso();
      relacion.rol = rolGuardado;
      relacion.permiso = permiso;
      relacion.fechaDesde = new Date();

      await this.genericRepository.guardarCambios(RolPermiso, relacion);
    }

    return rolGuardado;
  }

  async actualizar(id: number, dto: UpdateRolDto): Promise<Rol> {
    const roles = await this.genericRepository.buscar(Rol, 'rol', [
      { atributo: 'id', operacion: '=', valor: id },
    ]);

    if (!roles.length || roles[0].fechaHoraBaja) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    const rol = roles[0];

    if (dto.nombreRol) {
      rol.nombre = dto.nombreRol;
    }

    const rolActualizado = await this.genericRepository.guardarCambios(Rol, rol);

    if (dto.idPermisos?.length) {
      const relaciones = await this.genericRepository.buscar(
        RolPermiso,
        'rolPermiso',
        [{ atributo: 'rol', operacion: 'relacion', valor: rol.id }]
      );

      for (const rel of relaciones) {
        await this.genericRepository.eliminar(RolPermiso, rel.id);
        rel.fechaHasta = new Date();
        await this.genericRepository.guardarCambios(RolPermiso, rel);
      }

      for (const idPermiso of dto.idPermisos) {
        const permisos = await this.genericRepository.buscar(Permiso, 'permiso', [
          { atributo: 'id', operacion: '=', valor: idPermiso },
        ]);

        if (!permisos.length) {
          throw new BadRequestException(`Permiso con ID ${idPermiso} no existe`);
        }

        const nuevaRelacion = new RolPermiso();
        nuevaRelacion.rol = rolActualizado;
        nuevaRelacion.permiso = permisos[0];
        nuevaRelacion.fechaDesde = new Date();

        await this.genericRepository.guardarCambios(RolPermiso, nuevaRelacion);
      }
    }

    return rolActualizado;
  }

  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(Rol, id);
  }
}
