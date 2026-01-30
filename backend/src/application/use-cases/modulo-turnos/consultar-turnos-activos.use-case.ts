import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Repository } from 'typeorm';
import { ConsultarTurnosActivosDTO } from './dto/consultar-turnos-activos.dto';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { Usuario } from 'src/domain/entities/usuario.entity';

@Injectable()
export class ConsultarTurnosActivosUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) { }

  async consultarTurnosActivos(idUsuario: number) {
    // Validación de entrada
    if (!idUsuario || idUsuario <= 0) {
      throw new BadRequestException(
        `El ID del usuario debe ser mayor a 0`,
      );
    }

    // Buscar usuario con todas las relaciones necesarias
    const usuario = await this.genericRepository.buscarPorId(
      Usuario,
      idUsuario,
      [
        'paciente',
        'paciente.turnos',
        'paciente.turnos.medico',
        'paciente.turnos.especialidad',
        'paciente.turnos.hospital',
        'paciente.turnos.estadoTurno'
      ],
    );

    if (!usuario) {
      throw new BadRequestException(
        `No se encontró el usuario con ID ${idUsuario}`,
      );
    }

    const paciente = usuario.paciente;

    if (!paciente) {
      throw new BadRequestException(
        `El usuario con ID ${idUsuario} no está asociado a un paciente`,
      );
    }

    const dtoLista: ConsultarTurnosActivosDTO[] = [];
    const turnos = paciente.turnos;

    if (!turnos || turnos.length === 0) {
      console.log(`ℹ️ El paciente ID ${paciente.id} no tiene turnos registrados`);
      return dtoLista;
    }

    for (const turno of turnos) {
      // ✅ CORRECCIÓN: Verificar que el turno esté RESERVADO Y NO esté dado de baja
      if (
        turno.estadoTurno.nombre === EstadoTurnoEnum.RESERVADO &&
        !turno.fechaHoraBaja &&
        !turno.presentismo
      ) {
        const dto: ConsultarTurnosActivosDTO = {
          idTurno: turno.id,
          hora: turno.hora,
          fecha: turno.fecha,
          nombreMedico: turno.medico.nombreMedico,
          apellidoMedico: turno.medico.apellidoMedico,
          nombreEspecialidad: turno.especialidad.nombre,
          nombreHospital: turno.hospital.nombre,
          observaciones: turno.observaciones || 'Sin observaciones',
        };
        dtoLista.push(dto);
      }
    }

    console.log(`✅ Se encontraron ${dtoLista.length} turnos activos para el paciente ID ${paciente.id}`);

    return dtoLista;
  }
}