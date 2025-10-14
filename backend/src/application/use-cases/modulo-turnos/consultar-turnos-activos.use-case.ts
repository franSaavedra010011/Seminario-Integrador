import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Repository } from 'typeorm';
import { ConsultarTurnosActivosDTO } from './dto/consultar-turnos-activos.dto';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';

@Injectable()
export class ConsultarTurnosActivosUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) { }
  async consultarTurnosActivos(mailPaciente: string) {
    const paciente = await this.pacienteRepository
      .createQueryBuilder('paciente') //hacerlo con usuario
      .leftJoinAndSelect('paciente.turnos', 'turno')
      .leftJoinAndSelect('turno.estadoTurno', 'estadoTurno')
      .leftJoinAndSelect('turno.hospital', 'hospital')
      .leftJoinAndSelect('turno.medico', 'medico')
      .leftJoinAndSelect('turno.especialidad', 'especialidad')
      .where(
        'paciente.correoPaciente = :mail AND paciente.fechaHoraBaja IS NULL',
        {
          mail: mailPaciente,
        },
      )
      .getOne();
    console.log(paciente);
    if (!paciente) {
      throw new BadRequestException(
        `El paciente con email: "${mailPaciente}" no existe o ya ha sido dado de baja`,
      );
    }
    const turnos = paciente.turnos;
    const dtoLista: ConsultarTurnosActivosDTO[] = [];
    for (const turno of turnos) {
      if (turno.estadoTurno.nombre === EstadoTurnoEnum.RESERVADO) {
        const dto: ConsultarTurnosActivosDTO = {
          hora: turno.hora,
          fecha: turno.fecha,
          nombreMedico: turno.medico.nombreMedico,
          apellidoMedico: turno.medico.apellidoMedico,
          nombreEspecialidad: turno.especialidad.nombre,
          nombreHospital: turno.hospital.nombre,
        };
        dtoLista.push(dto);
      }
    }
    return dtoLista;
  }
}
