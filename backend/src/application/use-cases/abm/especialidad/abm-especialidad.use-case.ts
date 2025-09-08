import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Injectable()
export class AbmEspecialidadUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  // Crear Especialidad
  async crear(dto: CreateEspecialidadDto): Promise<Especialidad> {
    const duplicados = await this.genericRepository.buscar(
      Especialidad,
      'esp',
      [{ atributo: 'nombre', operacion: '=', valor: dto.nombre }],
    );

    // Si hay alguna con el mismo nombre exacto (o muy parecido), rechazamos
    if (duplicados.some(e => e.nombre.trim().toLowerCase() === dto.nombre.trim().toLowerCase())) {
      throw new BadRequestException(`La especialidad "${dto.nombre}" ya existe`);
    }

    const especialidad = new Especialidad();
    especialidad.nombre = dto.nombre.trim();
    especialidad.descripcion = dto.descripcion?.trim() ?? null;

    return await this.genericRepository.guardarCambios(Especialidad, especialidad);
  }

  // Actualizar Especialidad
  async actualizar(id: number, dto: UpdateEspecialidadDto): Promise<Especialidad> {
    const encontrados = await this.genericRepository.buscar(
      Especialidad,
      'esp',
      [{ atributo: 'id', operacion: '=', valor: id }],
    );

    if (!encontrados.length || encontrados[0].fechaHoraBaja) {
      throw new NotFoundException(`Especialidad con ID ${id} no encontrada`);
    }

    const especialidad = encontrados[0];

    // Si cambia el nombre, validamos duplicados
    if (dto.nombre && dto.nombre.trim().toLowerCase() !== especialidad.nombre.trim().toLowerCase()) {
      const duplicados = await this.genericRepository.buscar(
        Especialidad,
        'esp',
        [{ atributo: 'nombre', operacion: '=', valor: dto.nombre }],
      );

      if (duplicados.some(e => e.id !== especialidad.id &&
        e.nombre.trim().toLowerCase() === dto.nombre!.trim().toLowerCase())) {
        throw new BadRequestException(`La especialidad "${dto.nombre}" ya existe`);
      }
      especialidad.nombre = dto.nombre.trim();
    }

    if (dto.descripcion !== undefined) {
      especialidad.descripcion = dto.descripcion?.trim() ?? null;
    }

    return await this.genericRepository.guardarCambios(Especialidad, especialidad);
  }

  // Baja lógica
  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(Especialidad, id);
  }

}