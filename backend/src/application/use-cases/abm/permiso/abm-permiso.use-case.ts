import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
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
      [{ atributo: 'codigo', operacion: '=', valor: dto.codigo }],
    );

    if (duplicados.some(p => p.codigo.trim().toLowerCase() === dto.codigo.trim().toLowerCase())) {
      throw new BadRequestException(`El permiso con código "${dto.codigo}" ya existe`);
    }

    const permiso = new Permiso();
    permiso.codigo = dto.codigo.trim();
    permiso.descripcion = dto.descripcion.trim();
    permiso.categoria = dto.categoria?.trim() || "";

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

    if (dto.codigo && dto.codigo.trim().toLowerCase() !== permiso.codigo.trim().toLowerCase()) {
      const duplicados = await this.genericRepository.buscar(
        Permiso,
        'permiso',
        [{ atributo: 'codigo', operacion: '=', valor: dto.codigo }],
      );

      if (duplicados.some(p => p.id !== permiso.id &&
        p.codigo.trim().toLowerCase() === dto.codigo!.trim().toLowerCase())) {
        throw new BadRequestException(`El permiso con código "${dto.codigo}" ya existe`);
      }

      permiso.codigo = dto.codigo.trim();
    }

    if (dto.descripcion) {
      permiso.descripcion = dto.descripcion.trim();
    }

    if (dto.categoria !== undefined) {
      permiso.categoria = dto.categoria?.trim() || "";
    }

    return await this.genericRepository.guardarCambios(Permiso, permiso);
  }

  // Baja lógica
  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(Permiso, id);
  }
}
