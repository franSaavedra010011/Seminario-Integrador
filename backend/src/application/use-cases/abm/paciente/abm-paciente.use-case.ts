import { BadRequestException, Injectable } from '@nestjs/common';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Localidad } from 'src/domain/entities/localidad.entity';

@Injectable()
export class AbmPacienteUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  async crear(dto: CreatePacienteDto, usuario: Usuario): Promise<Paciente> {

    /*
      Buscar instancia de localidad existente:
        - Con id igual al proporcionado
        - Con fechaHoraBaja igual a null (Localidad vigente)
    */
    const localidades = await this.genericRepository.buscar(
      Localidad,
      'localidad',
      [
        { atributo: 'id', operacion: '=', valor: dto.idLocalidad },
        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
      ]
    );

    // Comprobar que existe la localidad proporcionada
    if (!localidades.length) {
      // CA N°1: no existe la localidad proporcionada
      throw new BadRequestException('La localidad proporcionada no existe');
    }

    /*
      Crear instancia de Paciente:
        - Con nombre igual al ingresado
        - Con apellido igual al ingresado
        - Con dni igual al ingresado
        - Con fechaNacimiento igual al ingresado
        - Con celular igual al ingresado
        - Con correo igual al ingresado
        - Con grupoSanguineo igual al ingresado
        - Con localidad igual a la localidad encontrada
    */
    const paciente = new Paciente();
    paciente.nombrePaciente = dto.nombrePaciente;
    paciente.apellidoPaciente = dto.apellidoPaciente;
    paciente.edadPaciente = dto.edadPaciente;
    paciente.dniPaciente = dto.dniPaciente;
    paciente.fechaNacimientoPaciente = new Date(dto.fechaNacimientoPaciente);
    paciente.celularPaciente = dto.celularPaciente;
    paciente.correoPaciente = dto.correoPaciente;
    paciente.grupoSanguineoPaciente = dto.grupoSanguineoPaciente;
    paciente.localidad = localidades[0];
    paciente.usuario = usuario;

    // Guardar cambios
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
