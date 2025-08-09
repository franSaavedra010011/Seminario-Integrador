import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Injectable()
export class AbmHospitalUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  // Crear Hospital
  async crear(dto: CreateHospitalDto): Promise<Hospital> {
    // Validar duplicados por nombre (case-insensitive con ILIKE)
    const duplicados = await this.genericRepository.buscar(
      Hospital,
      'hosp',
      [{ atributo: 'nombreHospital', operacion: '=', valor: dto.nombreHospital }],
    );

    if (duplicados.some(h => h.nombre.trim().toLowerCase() === dto.nombreHospital.trim().toLowerCase())) {
      throw new BadRequestException(`El hospital "${dto.nombreHospital}" ya existe`);
    }

    const hospital = new Hospital();
    hospital.nombre = dto.nombreHospital.trim();
    hospital.direccion = dto.direccionHospital.trim();
    hospital.email = dto.emailHospital?.trim() ?? '';
    hospital.telefono = dto.telHospital?.trim() ?? '';

    return await this.genericRepository.guardarCambios(Hospital, hospital);
  }

  // Actualizar Hospital
  async actualizar(id: number, dto: UpdateHospitalDto): Promise<Hospital> {
    const encontrados = await this.genericRepository.buscar(
      Hospital,
      'hosp',
      [{ atributo: 'id', operacion: '=', valor: id }],
    );

    if (!encontrados.length || encontrados[0].fechaHoraBaja) {
      throw new NotFoundException(`Hospital con ID ${id} no encontrado`);
    }

    const hospital = encontrados[0];

    // Si cambia el nombre, validar duplicados
    if (dto.nombreHospital && dto.nombreHospital.trim().toLowerCase() !== hospital.nombre.trim().toLowerCase()) {
      const duplicados = await this.genericRepository.buscar(
        Hospital,
        'hosp',
        [{ atributo: 'nombreHospital', operacion: '=', valor: dto.nombreHospital }],
      );

      if (duplicados.some(h => h.id !== hospital.id &&
        h.nombre.trim().toLowerCase() === dto.nombreHospital!.trim().toLowerCase())) {
        throw new BadRequestException(`El hospital "${dto.nombreHospital}" ya existe`);
      }

      hospital.nombre = dto.nombreHospital.trim();
    }

    if (dto.direccionHospital !== undefined) {
      hospital.direccion = dto.direccionHospital?.trim() ?? null;
    }

    if (dto.emailHospital !== undefined) {
      hospital.email = dto.emailHospital?.trim() ?? null;
    }

    if (dto.telHospital !== undefined) {
      hospital.telefono = dto.telHospital?.trim() ?? null;
    }

    return await this.genericRepository.guardarCambios(Hospital, hospital);
  }

  // Baja lógica
  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(Hospital, id);
  }
}
