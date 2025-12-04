import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { CreateTurnoEstadoDto } from './dto/create-turnoEstado.dto';

@Injectable()
export class AbmTurnoEstadoUseCase {
  constructor(private readonly genericRepository: GenericRepositoryService) { }

  // Crear Especialidad
  async crear(dto: CreateTurnoEstadoDto): Promise<TurnoEstado> {
    const turnoEstado = new TurnoEstado();
    turnoEstado.fechaDesde = new Date();
    turnoEstado.estadoTurno = dto.estadoTurno;
    turnoEstado.turno = dto.turno;

    return await this.genericRepository.guardarCambios(
      TurnoEstado,
      turnoEstado,
    );
  }

  // Actualizar Especialidad
  /*async actualizar(id: number, dto: UpdateEspecialidadDto): Promise<Especialidad> {
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
  }*/

  // Baja lógica
  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(TurnoEstado, id);
  }
}
