import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { CreateEstadoTurnoDto } from './dto/create-estado-turno.dto';
import { UpdateEstadoTurnoDto } from './dto/update-estado-turno.dto';

@Injectable()
export class AbmEstadoTurnoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  // Crear EstadoTurno
  async crear(dto: CreateEstadoTurnoDto): Promise<EstadoTurno> {
    // Validar duplicados por nombre
    const duplicados = await this.genericRepository.buscar(
      EstadoTurno,
      'estado',
      [{ atributo: 'nombre', operacion: '=', valor: dto.nombre }],
    );

    if (duplicados.some(e => e.nombre.trim().toLowerCase() === dto.nombre.trim().toLowerCase())) {
      throw new BadRequestException(`El estado de turno "${dto.nombre}" ya existe`);
    }

    const estado = new EstadoTurno();
    estado.nombre = dto.nombre.trim();

    return await this.genericRepository.guardarCambios(EstadoTurno, estado);
  }

  // Actualizar EstadoTurno
  async actualizar(id: number, dto: UpdateEstadoTurnoDto): Promise<EstadoTurno> {
    const encontrados = await this.genericRepository.buscar(
      EstadoTurno,
      'estado',
      [{ atributo: 'id', operacion: '=', valor: id }],
    );

    if (!encontrados.length || encontrados[0].fechaHoraBaja) {
      throw new NotFoundException(`EstadoTurno con ID ${id} no encontrado`);
    }

    const estado = encontrados[0];

    // Validar duplicados si cambia el nombre
    if (dto.nombre && dto.nombre.trim().toLowerCase() !== estado.nombre.trim().toLowerCase()) {
      const duplicados = await this.genericRepository.buscar(
        EstadoTurno,
        'estado',
        [{ atributo: 'nombre', operacion: '=', valor: dto.nombre }],
      );

      if (duplicados.some(e => e.id !== estado.id &&
        e.nombre.trim().toLowerCase() === dto.nombre!.trim().toLowerCase())) {
        throw new BadRequestException(`El estado de turno "${dto.nombre}" ya existe`);
      }

      estado.nombre = dto.nombre.trim();
    }

    return await this.genericRepository.guardarCambios(EstadoTurno, estado);
  }

  // Baja lógica
  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(EstadoTurno, id);
  }
}
