import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { AuthService } from 'src/auth/auth.service';
import { RolEnum } from 'src/domain/enums/rol.enum';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Localidad } from 'src/domain/entities/localidad.entity';
import { Rol } from 'src/domain/entities/rol.entity';

@Injectable()
export class AbmPacienteUseCase {
  constructor(
    @InjectRepository(Paciente)
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  async crear(dto: CreatePacienteDto): Promise<Paciente> {
    // Buscar la localidad existente
    const localidades = await this.genericRepository.buscar(
      Localidad,
      'localidad',
      [{ atributo: 'id', operacion: '=', valor: dto.idLocalidad }]
    );

    if (!localidades.length) {
      throw new BadRequestException('La localidad proporcionada no existe');
    }

    // Crear el paciente y asociar localidad
    const paciente = new Paciente();
    Object.assign(paciente, dto);
    paciente.localidad = localidades[0];

    return await this.genericRepository.guardarCambios(Paciente, paciente);
  }


  async actualizar(id: number, dto: UpdatePacienteDto): Promise<Paciente> {
    const pacientes = await this.genericRepository.buscar(Paciente, 'paciente', [
      { atributo: 'id', operacion: '=', valor: id },
    ]);

    if (!pacientes.length) {
      throw new BadRequestException('Paciente no encontrado');
    }

    const paciente = pacientes[0];
    Object.assign(paciente, dto);

    // Si se quiere actualizar la localidad
    if (dto.idLocalidad) {
      const localidades = await this.genericRepository.buscar(
        Localidad,
        'localidad',
        [{ atributo: 'id', operacion: '=', valor: dto.idLocalidad }]
      );

      if (!localidades.length) {
        throw new BadRequestException('La localidad proporcionada no existe');
      }

      paciente.localidad = localidades[0];
    }

    return await this.genericRepository.guardarCambios(Paciente, paciente);
  }

  async eliminar(id: number) {
    return this.genericRepository.eliminar(Paciente, id);
  }
}
