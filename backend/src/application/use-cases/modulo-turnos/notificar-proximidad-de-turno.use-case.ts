import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { ConsultarTurnosActivosDTO } from './dto/consultar-turnos-activos.dto';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { Turno } from 'src/domain/entities/turno.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { CreatePacienteNotificacionDto } from '../abm/pacienteNotificacion/dto/create-pacienteNotificacion.dto';
import { AbmPacienteNotificacionUseCase } from '../abm/pacienteNotificacion/abm-pacienteNotificacion.use-case';

@Injectable()
export class NotificarProximidadDeTurnoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
    private readonly abmPacienteNotificacionUseCase: AbmPacienteNotificacionUseCase,
  ) {}
  async notificarProximidadDeTurno() {
    const fechaProximaAviso = new Date();
    fechaProximaAviso.setDate(fechaProximaAviso.getDate() + 1); // 1 dia de anticipacion
    const turnos = await this.turnoRepository
      .createQueryBuilder('turno') //hacerlo con usuario
      .where('turno.fechaHoraBaja IS NULL')
      .getMany();
    for (const turno of turnos) {
      console.log(fechaProximaAviso.getDate());
      console.log(turno.fecha.getDate());
      console.log(turno.fecha.getDate() === fechaProximaAviso.getDate());
      if (turno.fecha.getDate() === fechaProximaAviso.getDate()) {
        const pacientes = await this.pacienteRepository
          .createQueryBuilder('paciente') //hacerlo con usuario
          .leftJoinAndSelect('paciente.turnos', 'turno')
          .leftJoinAndSelect('paciente.pacienteNotificaciones', 'notificacion')
          .where('paciente.fechaHoraBaja IS NULL')
          .getMany();
        for (const paciente of pacientes) {
          const turnosDePaciente = paciente.turnos;
          for (const turnoDePaciente of turnosDePaciente) {
            if (turnoDePaciente.id === turno.id) {
              const dtoCrearNotificacion: CreatePacienteNotificacionDto = {
                observaciones: `Recuerde que su turno es mañana.`,
                paciente: paciente,
                turno: turno,
              };
              this.abmPacienteNotificacionUseCase.crear(dtoCrearNotificacion);
            }
          }
        }
      } else {
        throw new BadRequestException(`No hay ningun turno proximo`);
      }
    }
  }
}
