import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Permiso } from 'src/domain/entities/permiso.entity';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

@Injectable()
export class AbmPermisoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  // Crear Permiso
  async crear(dto: CreatePermisoDto): Promise<Permiso> {
    const duplicados = await this.genericRepository.buscar(
      Permiso,
      'permiso',
      [{ atributo: 'rutaPermiso', operacion: '=', valor: dto.rutaPermiso }],
    );

    if (duplicados.some(p => p.rutaPermiso.trim().toLowerCase() === dto.rutaPermiso.trim().toLowerCase())) {
      throw new BadRequestException(`El permiso con ruta "${dto.rutaPermiso}" ya existe`);
    }

    const permiso = new Permiso();
    permiso.rutaPermiso = dto.rutaPermiso.trim();

    return await this.genericRepository.guardarCambios(Permiso, permiso);
  }

  // Actualizar Permiso
  async actualizar(id: number, dto: UpdatePermisoDto): Promise<Permiso> {
    const encontrados = await this.genericRepository.buscar(
      Permiso,
      'permiso',
      [{ atributo: 'id', operacion: '=', valor: id }],
    );

    if (!encontrados.length || encontrados[0].fechaHoraBaja) {
      throw new NotFoundException(`Permiso con ID ${id} no encontrado`);
    }

    const permiso = encontrados[0];

    if (dto.rutaPermiso && dto.rutaPermiso.trim().toLowerCase() !== permiso.rutaPermiso.trim().toLowerCase()) {
      const duplicados = await this.genericRepository.buscar(
        Permiso,
        'permiso',
        [{ atributo: 'rutaPermiso', operacion: '=', valor: dto.rutaPermiso }],
      );

      if (duplicados.some(p => p.id !== permiso.id &&
        p.rutaPermiso.trim().toLowerCase() === dto.rutaPermiso!.trim().toLowerCase())) {
        throw new BadRequestException(`El permiso con ruta "${dto.rutaPermiso}" ya existe`);
      }

      permiso.rutaPermiso = dto.rutaPermiso.trim();
    }

    return await this.genericRepository.guardarCambios(Permiso, permiso);
  }

  // Baja lógica
  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(Permiso, id);
  }
}
