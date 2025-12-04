import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Turno } from 'src/domain/entities/turno.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { CreateTurnoDto } from './dto/create-turno.dto';

@Injectable()
export class AbmTurnoUseCase {
  constructor(private readonly genericRepository: GenericRepositoryService) { }

  // Crear Especialidad
  async crear(dto: CreateTurnoDto): Promise<Turno> {
    const turno = new Turno();
    turno.fecha = dto.fechaTurno;
    turno.hora = dto.horaTurno;
    turno.estadoTurno = dto.estadoTurno;
    turno.especialidad = dto.especialidad;
    turno.hospital = dto.hospital;
    turno.medico = dto.medico;
    turno.observaciones = '';
    turno.presentismo = false;
    return await this.genericRepository.guardarCambios(Turno, turno);
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
    await this.genericRepository.eliminar(Turno, id);
  }
}
