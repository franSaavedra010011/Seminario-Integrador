import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from 'src/domain/entities/medico.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { GenerarReporteMedico } from './dto/generar-reporte-medico.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { GenerarReporteMedicoHospital } from './dto/generar-reporte-medico-hospitales.dto';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { GenerarReporteMedicoPacientes } from './dto/generar-reporte-medico-pacientes.dto';
import { GenerarReportePacienteTurnos } from './dto/generar-reporte-paciente-turnos.dto';
import { GenerarReportePaciente } from './dto/generar-reporte-paciente.dto';

@Injectable()
export class GenerarReportePacienteUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}
  async generarReportePaciente(
    idPaciente: number,
    fechaDesde: Date,
    fechaHasta: Date,
  ) {
    const paciente = await this.pacienteRepository
      .createQueryBuilder('paciente')
      .leftJoinAndSelect('paciente.turnos', 'tu')
      .leftJoinAndSelect('tu.estadoTurno', 'et')
      .leftJoinAndSelect('tu.medico', 'm')
      .leftJoinAndSelect('tu.especialidad', 'esp')
      .where('paciente.id = :id AND paciente.fechaHoraBaja IS NULL', {
        id: idPaciente,
      })
      .getOne();
    if (!paciente) {
      throw new BadRequestException(
        `El paciente no existe o ya ha sido dado de baja`,
      );
    }
    const turnos = paciente.turnos;
    const dtoTurnos: GenerarReportePacienteTurnos[] = [];
    let turnosAtendidos = 0;
    let turnosReservados = 0;
    let turnosAusentes = 0;
    for (const turno of turnos) {
      if (fechaDesde <= turno.fecha && fechaHasta >= turno.fecha) {
        const dtoTurno: GenerarReportePacienteTurnos = {
          nombreEspecialidad: turno.especialidad.nombre,
          nombreEstado: turno.estadoTurno.nombre,
          nombreMedico: turno.medico.nombreMedico,
          apellidoMedico: turno.medico.apellidoMedico,
        };
        if (turno.estadoTurno.nombre === EstadoTurnoEnum.ATENDIDO) {
          turnosAtendidos = turnosAtendidos + 1;
        } else if (turno.estadoTurno.nombre === EstadoTurnoEnum.RESERVADO) {
          turnosReservados = turnosReservados + 1;
        } else if (turno.estadoTurno.nombre === EstadoTurnoEnum.AUSENTE) {
          turnosAusentes = turnosAusentes + 1;
        }
        dtoTurnos.push(dtoTurno);
      }
    }
    const dtoPaciente: GenerarReportePaciente = {
      turnosAtendidos: turnosAtendidos,
      turnosAusentes: turnosAusentes,
      turnosReservados: turnosReservados,
      turnos: dtoTurnos,
    };
    return dtoPaciente;
  }
}
