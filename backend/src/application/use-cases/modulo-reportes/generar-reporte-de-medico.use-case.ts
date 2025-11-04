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

@Injectable()
export class GenerarReporteMedicoUseCase {
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
  async generarReporteMedico(
    idMedico: number,
    fechaDesde: Date,
    fechaHasta: Date,
  ) {
    const medico = await this.medicoRepository
      .createQueryBuilder('medico')
      .where('medico.id = :id AND medico.fechaHoraBaja IS NULL', {
        id: idMedico,
      })
      .getOne();
    if (!medico) {
      throw new BadRequestException(
        `El medico no existe o ya ha sido dado de baja`,
      );
    }

    const turnosBuscados = await this.turnoRepository
      .createQueryBuilder('turno')
      .leftJoinAndSelect('turno.estadoTurno', 'est')
      .where('turno.medico = :idMedico AND turno.fechaHoraBaja IS NULL')
      .andWhere('turno.fecha BETWEEN :fd AND :fh')
      .setParameters({
        idMedico: medico.id,
        fd: fechaDesde,
        fh: fechaHasta,
      })
      .getMany();
    let turnosAtendidos = 0;
    let turnosCancelados = 0;
    let turnosAusentes = 0;
    for (const turno of turnosBuscados) {
      if (turno.estadoTurno.nombre === EstadoTurnoEnum.ATENDIDO) {
        turnosAtendidos = turnosAtendidos + 1;
      } else if (turno.estadoTurno.nombre === EstadoTurnoEnum.CANCELADO) {
        turnosCancelados = turnosCancelados + 1;
      } else if (turno.estadoTurno.nombre === EstadoTurnoEnum.AUSENTE) {
        turnosAusentes = turnosAusentes + 1;
      }
    }

    const hospitalesBuscados = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
      .leftJoinAndSelect('he.hospitalEspecialidadMedico', 'hem')
      .leftJoinAndSelect('hem.medico', 'm')
      .where('hospital.fechaHoraBaja IS NULL')
      .getMany();
    let hospitalesUnicos: Hospital[] = [];
    for (const hospital of hospitalesBuscados) {
      const hospitalEspecialidades = hospital.hospitalEspecialidades;
      for (const hospitalEspecialidad of hospitalEspecialidades) {
        const hospitalEspecialidadMedicos =
          hospitalEspecialidad.hospitalEspecialidadMedico;
        for (const hospitalEspecialidadMedico of hospitalEspecialidadMedicos) {
          if (hospitalEspecialidadMedico.medico.id === idMedico) {
            if (!hospitalesUnicos.includes(hospital)) {
              hospitalesUnicos.push(hospital);
            }
          }
        }
      }
    }
    let dtoHospitales: GenerarReporteMedicoHospital[] = [];
    for (const hospitalUnico of hospitalesUnicos) {
      const dtoHospital: GenerarReporteMedicoHospital = {
        nombreHospital: hospitalUnico.nombre,
        direccionHospital: hospitalUnico.direccion,
        emailHospital: hospitalUnico.email,
        telHospital: hospitalUnico.telefono,
      };
      dtoHospitales.push(dtoHospital);
    }
    const pacientes = await this.pacienteRepository
      .createQueryBuilder('paciente')
      .leftJoinAndSelect('paciente.turnos', 'tu')
      .leftJoinAndSelect('tu.estadoTurno', 'et')
      .leftJoinAndSelect('tu.medico', 'm')
      .leftJoinAndSelect('tu.especialidad', 'esp')
      .where('paciente.fechaHoraBaja IS NULL')
      .getMany();
    let dtoPacientes: GenerarReporteMedicoPacientes[] = [];
    for (const paciente of pacientes) {
      const turnos = paciente.turnos;
      for (const turno of turnos) {
        if (
          fechaDesde <= turno.fecha &&
          fechaHasta >= turno.fecha &&
          turno.estadoTurno.nombre === EstadoTurnoEnum.ATENDIDO &&
          turno.medico.id === idMedico
        ) {
          const dtoPaciente: GenerarReporteMedicoPacientes = {
            nombreEspecialidad: turno.especialidad.nombre,
            nombrePaciente: paciente.nombrePaciente,
            apellidoPaciente: paciente.apellidoPaciente,
            fechaTurno: turno.fecha,
          };
          dtoPacientes.push(dtoPaciente);
        }
      }
    }
    let dtoTurnos: GenerarReporteMedico = {
      turnosAtendidos: turnosAtendidos,
      turnosAusentes: turnosAusentes,
      turnosCancelados: turnosCancelados,
      hospitales: dtoHospitales,
      pacientes: dtoPacientes,
    };
    return dtoTurnos;
  }
}
