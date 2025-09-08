import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalHospital } from 'src/domain/entities/personal-hospital.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { HospitalesNotificarCancelacionDTO } from './dto/hospitales-notificar-cancelacion.dto';
import { EspecialidadesNotificarCancelacionDTO } from './dto/especialidades-notificar-cancelacion.dto';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { MedicosNotificarCancelacionDTO } from './dto/medicos-notificar-cancelacion.dto';
import { AgendasNotificarCancelacionDTO } from './dto/agendas-notificar-cancelacion.dto';
import { TurnosNotificarCancelacionDTO } from './dto/turnos-notificar-cancelacion.dto';
import { DiasNotificarCancelacionDTO } from './dto/dias-notificar-cancelacion.dto';
import { AgendaDia } from 'src/domain/entities/agenda-dia.entity';
import { DiaAgendaCancelacionDTO } from './dto/dia-agenda-cancelacion.dto';
import { AbmAgendaSemanalUseCase } from '../abm/agendaSemanal/abm-agendaSemanal.use-case';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { AbmAgendaDiaUseCase } from '../abm/agendaDia/abm-agendaDia.use-case';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { AbmTurnoUseCase } from '../abm/turno/abm-turno.use-case';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { AbmPacienteNotificacionUseCase } from '../abm/pacienteNotificacion/abm-pacienteNotificacion.use-case';
import { CreatePacienteNotificacionDto } from '../abm/pacienteNotificacion/dto/create-pacienteNotificacion.dto';
import { AbmTurnoAgendaDiaUseCase } from '../abm/turno-agenda-dia/abm-turno-agenda-dia.use-case';

@Injectable()
export class NotificarCancelacionDeTurnoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(AgendaSemanal)
    private agendaSemanalRepository: Repository<AgendaSemanal>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
    @InjectRepository(AgendaDia)
    private agendaDiaRepository: Repository<AgendaDia>,
    private readonly abmAgendaSemanalUseCase: AbmAgendaSemanalUseCase,
    private readonly abmAgendaDiaUseCase: AbmAgendaDiaUseCase,
    private readonly abmTurnoUseCase: AbmTurnoUseCase,
    private readonly abmPacienteNotificacionUseCase: AbmPacienteNotificacionUseCase,
    private readonly abmTurnoAgendaDiaUseCase: AbmTurnoAgendaDiaUseCase,
  ) {}
  async notificacionMuestraDeHospitales(mailUsuario: string) {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.personalHospital', 'personal')
      .leftJoinAndSelect('personal.hospital', 'hospital')
      .where('usuario.emailUsuario = :mail AND usuario.fechaHoraBaja IS NULL', {
        mail: mailUsuario,
      })
      .getOne();
    console.log(usuario);
    if (!usuario) {
      throw new BadRequestException(
        `El paciente con email: "${mailUsuario}" no existe o ya ha sido dado de baja`,
      );
    }
    const personal: PersonalHospital[] = usuario.personalHospital;
    const ListaHospitales: HospitalesNotificarCancelacionDTO[] = [];
    for (const persona of personal) {
      if (persona.fechaHoraBaja === null) {
        const dtoHospital: HospitalesNotificarCancelacionDTO = {
          id: persona.hospital.id,
          nombreHospital: persona.hospital.nombre,
        }; //Esta la logica, pero no se como manejar la ida y vuelta de datos.
        ListaHospitales.push(dtoHospital);
      }
    }
    return ListaHospitales;
  }
  async notificacionMuestraDeEspecialidades(idHospital: number) {
    const hospital = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
      .leftJoinAndSelect('he.especialidad', 'esp')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();
    if (!hospital) {
      throw new BadRequestException(
        `El hospital con id: "${idHospital}" no existe o ya ha sido dado de baja`,
      );
    }
    const hospitalEspecialidades: HospitalEspecialidad[] =
      hospital.hospitalEspecialidades;
    const ListaEspecialidades: EspecialidadesNotificarCancelacionDTO[] = [];
    for (const hospitalEspecialidad of hospitalEspecialidades) {
      if (hospitalEspecialidad.fechaHoraBaja === null) {
        const dtoEspecialidad: EspecialidadesNotificarCancelacionDTO = {
          id: hospitalEspecialidad.especialidad.id,
          nombreEspecialidad: hospitalEspecialidad.especialidad.nombre,
        }; //Esta la logica, pero no se como manejar la ida y vuelta de datos.
        ListaEspecialidades.push(dtoEspecialidad);
      }
    }
    return ListaEspecialidades;
  }
  async notificacionMuestraDeMedicos(
    idEspecialidad: number,
    idHospital: number,
  ) {
    const hospital = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
      .leftJoinAndSelect('he.especialidad', 'esp')
      .leftJoinAndSelect('he.hospitalEspecialidadMedico', 'hem')
      .leftJoinAndSelect('hem.medico', 'med')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();
    if (!hospital) {
      throw new BadRequestException(
        `El especialidad con id: "${idEspecialidad}" no existe o ya ha sido dado de baja`,
      );
    }
    const hospitalEspecialidades: HospitalEspecialidad[] =
      hospital.hospitalEspecialidades;
    const ListaMedicos: MedicosNotificarCancelacionDTO[] = [];
    for (const hospitalEspecialidad of hospitalEspecialidades) {
      if (hospitalEspecialidad.fechaHoraBaja === null) {
        const especialidadComparar = hospitalEspecialidad.especialidad.id;
        if (especialidadComparar === idEspecialidad) {
          const hospitalEspecialidadMedicos: HospitalEspecialidadMedico[] =
            hospitalEspecialidad.hospitalEspecialidadMedico;
          for (const hospitalEspecialidadMedico of hospitalEspecialidadMedicos) {
            const medicoDto: MedicosNotificarCancelacionDTO = {
              id: hospitalEspecialidadMedico.medico.id,
              nombreMedico: hospitalEspecialidadMedico.medico.nombreMedico,
              apellidoMedico: hospitalEspecialidadMedico.medico.apellidoMedico,
            };
            ListaMedicos.push(medicoDto);
          }
        }
      }
    }
    return ListaMedicos;
  }
  async notificacionMuestraDeAgenda(
    idMedico: number,
    idEspecialidad: number,
    idHospital: number,
  ) {
    console.log(`entre: ${idHospital} ${idEspecialidad} ${idMedico}`);
    const fechaActual: Date = new Date();
    const nroSemanaActual = this.getWeekNumber(fechaActual);
    console.log(
      `entre: ${nroSemanaActual} ${nroSemanaActual + 1} ${nroSemanaActual + 2}`,
    );
    const hospital = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
      .leftJoinAndSelect('he.especialidad', 'esp')
      .leftJoinAndSelect('he.hospitalEspecialidadMedico', 'hem')
      .leftJoinAndSelect('hem.medico', 'med')
      .leftJoinAndSelect('hem.agendaSemanales', 'as')
      .leftJoinAndSelect('as.agendasDia', 'ad')
      .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
      .leftJoinAndSelect('tad.turno', 'turno')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();
    if (!hospital) {
      throw new BadRequestException(
        `El especialidad con id: "${idEspecialidad}" no existe o ya ha sido dado de baja`,
      );
    }
    const hospitalEspecialidades: HospitalEspecialidad[] =
      hospital.hospitalEspecialidades;
    const ListaAgendaDTO: AgendasNotificarCancelacionDTO[] = [];
    for (const hospitalEspecialidad of hospitalEspecialidades) {
      if (hospitalEspecialidad.fechaHoraBaja === null) {
        const especialidadComparar = hospitalEspecialidad.especialidad.id;
        if (especialidadComparar === idEspecialidad) {
          const hospitalEspecialidadMedicos: HospitalEspecialidadMedico[] =
            hospitalEspecialidad.hospitalEspecialidadMedico;
          for (const hospitalEspecialidadMedico of hospitalEspecialidadMedicos) {
            const medico = hospitalEspecialidadMedico.medico;
            if (medico.id === idMedico) {
              const agendasSemanales =
                hospitalEspecialidadMedico.agendaSemanales;
              for (const agendaSemanal of agendasSemanales) {
                //Tomo la semana actual y las 3 siguientes
                if (
                  (agendaSemanal.nroSemana === nroSemanaActual ||
                    agendaSemanal.nroSemana === nroSemanaActual + 1 ||
                    agendaSemanal.nroSemana === nroSemanaActual + 2 ||
                    agendaSemanal.nroSemana === nroSemanaActual + 3) &&
                  agendaSemanal.fechaHoraBaja === null
                ) {
                  const ListaDiaDTO: DiasNotificarCancelacionDTO[] = [];
                  const agendaDias: AgendaDia[] = agendaSemanal.agendasDia;
                  for (const agendaDia of agendaDias) {
                    const ListaTurnoDTO: TurnosNotificarCancelacionDTO[] = [];
                    const turnosAgendaDia = agendaDia.turnosAgendaDia;
                    for (const turnoAgendaDia of turnosAgendaDia) {
                      const turnoDTO: TurnosNotificarCancelacionDTO = {
                        idTurno: turnoAgendaDia.id,
                        disponible: turnoAgendaDia.disponible,
                        horaDesde: turnoAgendaDia.horaDesde,
                        horaHasta: turnoAgendaDia.horaHasta,
                      };
                      ListaTurnoDTO.push(turnoDTO);
                    }
                    const diaDTO: DiasNotificarCancelacionDTO = {
                      nombreDia: agendaDia.nombreAgendaDia,
                      idAgendaDia: agendaDia.id,
                      fechaHoraBajaAgendaDia: agendaDia.fechaHoraBaja ?? null,
                      turnos: ListaTurnoDTO,
                    };
                    ListaDiaDTO.push(diaDTO);
                  }
                  const agendaDTO: AgendasNotificarCancelacionDTO = {
                    nroSemana: agendaSemanal.nroSemana,
                    dias: ListaDiaDTO,
                    fechaDesde: agendaSemanal.fechaDesdeAgendaSemanal,
                    fechaHasta: agendaSemanal.fechaHastaAgendaSemanal,
                  };
                  ListaAgendaDTO.push(agendaDTO);
                }
              }
            }
          }
        }
      }
    }
    return ListaAgendaDTO;
  }

  async notificacionCancelacionDeTurnos(
    dtoCancelacion: DiaAgendaCancelacionDTO,
  ) {
    console.log(`entre: ${dtoCancelacion}`);
    if (
      dtoCancelacion.idAgendaSemana.length > 0 &&
      dtoCancelacion.idAgendaDia.length === 0
    ) {
      for (const idAgenda of dtoCancelacion.idAgendaDia) {
        const agenda = await this.agendaSemanalRepository
          .createQueryBuilder('agendaSemanal')
          .leftJoinAndSelect('agendaSemanal.agendasDia', 'ad')
          .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
          .leftJoinAndSelect('tad.turno', 'turno')
          .where('agenda.id = :id AND agenda.fechaHoraBaja IS NULL', {
            id: idAgenda,
          })
          .getOne();
        this.abmAgendaSemanalUseCase.eliminar(agenda!.id);
        const agendaDias: AgendaDia[] = agenda!.agendasDia;
        for (const agendaDia of agendaDias) {
          this.abmAgendaDiaUseCase.eliminar(agendaDia.id);
          const turnosAgendaDia: TurnoAgendaDia[] = agendaDia.turnosAgendaDia;
          for (const turnoAgendaDia of turnosAgendaDia) {
            this.abmTurnoAgendaDiaUseCase.eliminar(turnoAgendaDia.id);
            if (turnoAgendaDia.disponible === true) {
              const turnoRelacionado: Turno = turnoAgendaDia.turno!;
              this.abmTurnoUseCase.eliminar(turnoRelacionado.id);
              const pacientes = await this.pacienteRepository
                .createQueryBuilder('paciente')
                .leftJoinAndSelect('paciente.turnos', 't')
                .leftJoinAndSelect('paciente.pacienteNotificaciones', 'pn')
                .where('paciente.fechaHoraBaja IS NULL')
                .getMany();
              for (const paciente of pacientes) {
                const turnosDePaciente = paciente.turnos;
                for (const turnoDePaciente of turnosDePaciente) {
                  if (turnoDePaciente.id === turnoRelacionado.id) {
                    const dtoCrearNotificacion: CreatePacienteNotificacionDto =
                      {
                        observaciones: `Su turno para el dia ${turnoRelacionado.fecha} ha sido cancelado.`,
                        paciente: paciente,
                        turno: turnoRelacionado,
                      };
                    this.abmPacienteNotificacionUseCase.crear(
                      dtoCrearNotificacion,
                    );
                  }
                }
              }
            }
          }
        }
      }
    } else {
      for (const idAgendaDia of dtoCancelacion.idAgendaDia) {
        const agendaDias = await this.agendaDiaRepository
          .createQueryBuilder('agendaDia')
          .leftJoinAndSelect('agendaDia.turnosAgendaDia', 'tad')
          .leftJoinAndSelect('tad.turno', 'turno')
          .where('agendaDia.id = :id AND agendaDia.fechaHoraBaja IS NULL', {
            id: idAgendaDia,
          })
          .getMany();
        for (const agendaDia of agendaDias) {
          this.abmAgendaDiaUseCase.eliminar(agendaDia.id);
          const turnosAgendaDia: TurnoAgendaDia[] = agendaDia.turnosAgendaDia;
          for (const turnoAgendaDia of turnosAgendaDia) {
            this.abmTurnoAgendaDiaUseCase.eliminar(turnoAgendaDia.id);
            if (turnoAgendaDia.disponible === true) {
              const turnoRelacionado: Turno = turnoAgendaDia.turno!;
              this.abmTurnoUseCase.eliminar(turnoRelacionado.id);
              const pacientes = await this.pacienteRepository
                .createQueryBuilder('paciente')
                .leftJoinAndSelect('paciente.turnos', 't')
                .leftJoinAndSelect('paciente.pacienteNotificaciones', 'pn')
                .where('paciente.fechaHoraBaja IS NULL')
                .getMany();
              for (const paciente of pacientes) {
                const turnosDePaciente = paciente.turnos;
                for (const turnoDePaciente of turnosDePaciente) {
                  if (turnoDePaciente.id === turnoRelacionado.id) {
                    const dtoCrearNotificacion: CreatePacienteNotificacionDto =
                      {
                        observaciones: `Su turno para el dia ${turnoRelacionado.fecha} ha sido cancelado.`,
                        paciente: paciente,
                        turno: turnoRelacionado,
                      };
                    this.abmPacienteNotificacionUseCase.crear(
                      dtoCrearNotificacion,
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  //Calculador numero de semana
  private getWeekNumber(date: Date): number {
    // Copia la fecha para no mutar la original
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );

    // Mueve al jueves de la semana actual (ISO: la semana empieza el lunes y contiene al jueves)
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);

    // Calcula la diferencia con el primer día del año
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(
      ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
    );

    return weekNo;
  }
}
