import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { AbmTurnoEstadoUseCase } from '../abm/turnoEstado/abm-turno-estado.use-case';
import { Localidad } from 'src/domain/entities/localidad.entity';
import { LocalidadSolicitarTurnoDto } from './dto/localidad-solicitar-turno.dto';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { EspecialidadSolicitarTurnoDto } from './dto/especialdiad-solicitar-turno.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { HospitalSolicitarTurnoDto } from './dto/hospital-solicitar-turno.dto';
import { MedicoSolicitarTurnoDto } from './dto/medico-solicitar-turno.dto';
import { AgendasSolicitarTurnoDTO } from './dto/agendas-solicitar-turno.dto';
import { DiasSolicitarTurnoDTO } from './dto/dias-solicitar-turno.dto';
import { TurnosSolicitarTurnoDTO } from './dto/turnos-solicitar-turno.dto';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { ResumenSolicitarTurnoDTO } from './dto/resumen-solicitar-turno.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { AbmTurnoUseCase } from '../abm/turno/abm-turno.use-case';
import { CreateTurnoDto } from '../abm/turno/dto/create-turno.dto';
import { Turno } from 'src/domain/entities/turno.entity';
import { CreateTurnoEstadoDto } from '../abm/turnoEstado/dto/create-turnoEstado.dto';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';

@Injectable()
export class SolicitarTurnoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Especialidad)
    private especialidadRepository: Repository<Especialidad>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(TurnoAgendaDia)
    private turnoAgendaDiaRepository: Repository<TurnoAgendaDia>,
    @InjectRepository(Medico)
    private medicoDiaRepository: Repository<Medico>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(EstadoTurno)
    private estadoTurnoRepository: Repository<EstadoTurno>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
    @InjectRepository(AgendaSemanal)
    private agendaSemanalRepository: Repository<AgendaSemanal>,
    private readonly abmTurnoEstadoUseCase: AbmTurnoEstadoUseCase,
    private readonly abmTurnoUseCase: AbmTurnoUseCase,
  ) {}
  async solicitarTurnoEspecialidades() {
    const especialidades = await this.especialidadRepository
      .createQueryBuilder('especialidad') //hacerlo con usuario
      .where('especialidad.fechaHoraBaja IS NULL')
      .getMany();
    if (!especialidades) {
      throw new BadRequestException(`No hay especialidades disponibles`);
    }
    const listaEspecialidadesDTO: EspecialidadSolicitarTurnoDto[] = [];
    for (const especialidad of especialidades) {
      const especialidadDTO: EspecialidadSolicitarTurnoDto = {
        idEspecialidad: especialidad.id,
        nombreEspecialidad: especialidad.nombre,
      };
      listaEspecialidadesDTO.push(especialidadDTO);
    }
    return listaEspecialidadesDTO;
  }
  async solicitarTurnoLocalidades(idEspecialidad: number) {
    const hospitales = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
      .leftJoinAndSelect('he.especialidad', 'esp')
      .leftJoinAndSelect('hospital.localidad', 'loc')
      .where('hospital.fechaHoraBaja IS NULL')
      .getMany();
    if (!hospitales) {
      throw new BadRequestException(`No hay hospitales disponibles`);
    }
    const listaLocalidadesDTO: LocalidadSolicitarTurnoDto[] = [];
    for (const hospital of hospitales) {
      const hospitalEspecialidades = hospital.hospitalEspecialidades;
      for (const hospitalEspecialidad of hospitalEspecialidades) {
        const especialdiad = hospitalEspecialidad.especialidad;
        if (
          especialdiad.id === idEspecialidad &&
          hospitalEspecialidad.fechaHoraBaja === null
        ) {
          const localidad = hospital.localidad;
          const localidadDTO: LocalidadSolicitarTurnoDto = {
            idLocalidad: localidad.id,
            nombreLocalidad: localidad.nombre,
          };
          listaLocalidadesDTO.push(localidadDTO);
        }
      }
    }
    return listaLocalidadesDTO;
  }
  async solicitarTurnoHospitales(idEspecialidad: number, idLocalidad: number) {
    const hospitales = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
      .leftJoinAndSelect('he.especialidad', 'esp')
      .leftJoinAndSelect('hospital.localidad', 'loc')
      .leftJoinAndSelect('hospital.congestionesActual', 'con')
      .where('hospital.fechaHoraBaja IS NULL')
      .getMany();
    if (!hospitales) {
      throw new BadRequestException(`No hay hospitales disponibles`);
    }
    const listaHospitalesDTO: HospitalSolicitarTurnoDto[] = [];
    for (const hospital of hospitales) {
      const localidad = hospital.localidad;
      if (localidad.id === idLocalidad) {
        const hospitalEspecialidades = hospital.hospitalEspecialidades;
        for (const hospitalEspecialidad of hospitalEspecialidades) {
          const especialdiad = hospitalEspecialidad.especialidad;
          if (
            especialdiad.id === idEspecialidad &&
            hospitalEspecialidad.fechaHoraBaja === null &&
            hospitalEspecialidad.fechaHasta === null
          ) {
            const congestionesActuales = hospital.congestionesActual;
            let congestionActualGuardar;
            if (congestionesActuales) {
              for (const congestionActual of congestionesActuales) {
                if (congestionActual.fechaHoraBaja === null) {
                  congestionActualGuardar = congestionActual.nivelCongestion;
                }
              }
              const hospitalDTO: HospitalSolicitarTurnoDto = {
                idHospital: hospital.id,
                nombreHospital: hospital.nombre,
                direccionHospital: hospital.direccion,
                nivelCongestion: congestionActualGuardar,
              };
              listaHospitalesDTO.push(hospitalDTO);
            }
          }
        }
      }
    }
    return listaHospitalesDTO;
  }
  async solicitarTurnoMedicos(idEspecialidad: number, idHospital: number) {
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
      throw new BadRequestException(`No hay hospital disponible`);
    }
    const listaMedicosDTO: MedicoSolicitarTurnoDto[] = [];
    const hospitalEspecialidades = hospital.hospitalEspecialidades;
    for (const hospitalEspecialidad of hospitalEspecialidades) {
      const especialdiad = hospitalEspecialidad.especialidad;
      if (
        especialdiad.id === idEspecialidad &&
        hospitalEspecialidad.fechaHoraBaja === null &&
        hospitalEspecialidad.fechaHasta === null
      ) {
        const hospitalEspecialidadMedicos =
          hospitalEspecialidad.hospitalEspecialidadMedico;
        for (const hospitalEspecialidadMedico of hospitalEspecialidadMedicos) {
          if (
            hospitalEspecialidadMedico.fechaHoraBaja === null &&
            hospitalEspecialidadMedico.fechaHasta === null
          ) {
            const medicoEncontrado = hospitalEspecialidadMedico.medico;
            const medicoDTO: MedicoSolicitarTurnoDto = {
              idMedico: medicoEncontrado.id,
              nombreMedico: medicoEncontrado.nombreMedico,
              apellidoMedico: medicoEncontrado.apellidoMedico,
            };
            listaMedicosDTO.push(medicoDTO);
          }
        }
      }
    }
    return listaMedicosDTO;
  }
  async solicitarTurnoAgendas(idMedico: number, idHospital: number) {
    const fechaActual = new Date();
    const nroSemanaActual = this.getWeekNumber(fechaActual);
    const hospital = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
      .leftJoinAndSelect('he.hospitalEspecialidadMedico', 'hem')
      .leftJoinAndSelect('hem.medico', 'med')
      .leftJoinAndSelect('hem.agendaSemanales', 'as')
      .leftJoinAndSelect('as.agendasDia', 'ad')
      .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();
    if (!hospital) {
      throw new BadRequestException(`No hay hospital disponible`);
    }
    const hospitalEspecialidades = hospital.hospitalEspecialidades;
    const ListaDeAgendasDTO: AgendasSolicitarTurnoDTO[] = [];
    for (const hospitalEspecialidad of hospitalEspecialidades) {
      if (
        hospitalEspecialidad.fechaHoraBaja === null &&
        hospitalEspecialidad.fechaHasta === null
      ) {
        const hospitalEspecialidadMedicos =
          hospitalEspecialidad.hospitalEspecialidadMedico;
        console.log(hospitalEspecialidadMedicos);
        for (const hospitalEspecialidadMedico of hospitalEspecialidadMedicos) {
          if (
            hospitalEspecialidadMedico.fechaHoraBaja === null &&
            hospitalEspecialidadMedico.fechaHasta === null
          ) {
            const medicoEncontrado = hospitalEspecialidadMedico.medico;
            if (medicoEncontrado.id === idMedico) {
              const agendasSemanales =
                hospitalEspecialidadMedico.agendaSemanales;
              for (const agendaSemanal of agendasSemanales) {
                if (
                  (agendaSemanal.nroSemana === nroSemanaActual ||
                    agendaSemanal.nroSemana === nroSemanaActual + 1 ||
                    agendaSemanal.nroSemana === nroSemanaActual + 2 ||
                    agendaSemanal.nroSemana === nroSemanaActual + 3) &&
                  agendaSemanal.fechaHoraBaja === null
                ) {
                  const agendaDias = agendaSemanal.agendasDia;
                  const ListaAgendaDia: DiasSolicitarTurnoDTO[] = [];
                  for (const agendaDia of agendaDias) {
                    let fechaBajaAgendaDiaDTO;
                    if (agendaDia.fechaHoraBaja !== null) {
                      fechaBajaAgendaDiaDTO = agendaDia.fechaHoraBaja!;
                    } else {
                      fechaBajaAgendaDiaDTO = null;
                    }
                    const turnosAgendaDia = agendaDia.turnosAgendaDia;
                    const ListaTurnosDTO: TurnosSolicitarTurnoDTO[] = [];
                    for (const turnoAgendaDia of turnosAgendaDia) {
                      const turnoDTO: TurnosSolicitarTurnoDTO = {
                        disponible: turnoAgendaDia.disponible,
                        horaDesde: turnoAgendaDia.horaDesde,
                        horaHasta: turnoAgendaDia.horaHasta,
                        fechaBaja: turnoAgendaDia.fechaHoraBaja!,
                        idTurno: turnoAgendaDia.id,
                      };
                      ListaTurnosDTO.push(turnoDTO);
                    }
                    const agendaDiaDTO: DiasSolicitarTurnoDTO = {
                      idDia: agendaDia.id,
                      nombreDia: agendaDia.nombreAgendaDia,
                      fechaHoraBajaAgendaDia: fechaBajaAgendaDiaDTO,
                      turnos: ListaTurnosDTO,
                    };
                    ListaAgendaDia.push(agendaDiaDTO);
                  }
                  const agendaSemanalDTO: AgendasSolicitarTurnoDTO = {
                    idSemana: agendaSemanal.id,
                    nroSemana: agendaSemanal.nroSemana,
                    fechaDesde: agendaSemanal.fechaDesdeAgendaSemanal,
                    fechaHasta: agendaSemanal.fechaHastaAgendaSemanal,
                    dias: ListaAgendaDia,
                  };
                  ListaDeAgendasDTO.push(agendaSemanalDTO);
                }
              }
            }
          }
        }
      }
    }
    return ListaDeAgendasDTO;
  }
  async solicitarTurnoResumen(
    idMedico: number,
    idHospital: number,
    idAgendaSemanal: number,
    idAgendaDia: number,
    idTurnoAgendaDia: number,
    idEspecialidad: number,
    emailUsuario: string,
  ) {
    const agendaSemanal = await this.agendaSemanalRepository
      .createQueryBuilder('agendaSemanal')
      .leftJoinAndSelect('agendaSemanal.agendasDia', 'ad')
      .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
      .where('agendaSemanal.id = :id AND agendaSemanal.fechaHoraBaja IS NULL', {
        id: idAgendaSemanal,
      })
      .getOne();
    const hospital = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();
    const especialidad = await this.especialidadRepository
      .createQueryBuilder('especialidad')
      .where('especialidad.id = :id AND especialidad.fechaHoraBaja IS NULL', {
        id: idEspecialidad,
      })
      .getOne();
    const medico = await this.medicoDiaRepository
      .createQueryBuilder('medico')
      .where('medico.id = :id AND medico.fechaHoraBaja IS NULL', {
        id: idMedico,
      })
      .getOne();
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.paciente', 'pac')
      .where(
        'usuario.emailUsuario = :email AND usuario.fechaHoraBaja IS NULL',
        {
          email: emailUsuario,
        },
      )
      .getOne();
    if (!agendaSemanal || !hospital || !especialidad || !medico || !usuario) {
      throw new BadRequestException(
        `La seleccion ha fallado, vuelva a intentarlo`,
      );
    }
    let resumenDTO: ResumenSolicitarTurnoDTO;
    const agendasDias = agendaSemanal.agendasDia;
    for (const agendaDia of agendasDias) {
      if (agendaDia.id === idAgendaDia) {
        const turnos = agendaDia.turnosAgendaDia;
        for (const turnoAgendaSeleccionado of turnos) {
          if (
            turnoAgendaSeleccionado.disponible === true &&
            turnoAgendaSeleccionado.id === idTurnoAgendaDia
          ) {
            turnoAgendaSeleccionado.disponible = false;
            this.turnoAgendaDiaRepository.save(turnoAgendaSeleccionado);
            resumenDTO = {
              nombreEspecialidad: especialidad.nombre,
              nombreHospital: hospital.nombre,
              nombreMedico: medico.nombreMedico,
              apellidoMedico: medico.apellidoMedico,
              fechaTurno: this.obtenerFechaDesdeDia(
                agendaSemanal.fechaDesdeAgendaSemanal,
                agendaDia.nombreAgendaDia,
              ),
              fechaHoraActual: new Date(),
              nombrePaciente: usuario.paciente.nombrePaciente,
              apellidoPaciente: usuario.paciente.apellidoPaciente,
            };
          } else {
            throw new BadRequestException(
              `El turno seleccionado no esta disponible`,
            );
          }
        }
      }
    }
    console.log(resumenDTO!);
    return resumenDTO!;
  }
  async solicitarTurnoFinalizar(
    idMedico: number,
    idHospital: number,
    idAgendaSemanal: number,
    idAgendaDia: number,
    idTurnoAgendaDia: number,
    idEspecialidad: number,
    emailUsuario: string,
  ) {
    const agendaSemanal = await this.agendaSemanalRepository
      .createQueryBuilder('agendaSemanal')
      .leftJoinAndSelect('agendaSemanal.agendasDia', 'ad')
      .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
      .where('agendaSemanal.id = :id AND agendaSemanal.fechaHoraBaja IS NULL', {
        id: idAgendaSemanal,
      })
      .getOne();
    const hospitalAsignar = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();
    const especialidadAsignar = await this.especialidadRepository
      .createQueryBuilder('especialidad')
      .where('especialidad.id = :id AND especialidad.fechaHoraBaja IS NULL', {
        id: idEspecialidad,
      })
      .getOne();
    const medicoAsignar = await this.medicoDiaRepository
      .createQueryBuilder('medico')
      .where('medico.id = :id AND medico.fechaHoraBaja IS NULL', {
        id: idMedico,
      })
      .getOne();
    const estadoAsignar = await this.estadoTurnoRepository
      .createQueryBuilder('estadoTurno')
      .where(
        'estadoTurno.nombre = :nombre AND estadoTurno.fechaHoraBaja IS NULL',
        {
          nombre: EstadoTurnoEnum.RESERVADO,
        },
      )
      .getOne();
    const usuarioAsignar = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.paciente', 'pac')
      .leftJoinAndSelect('pac.turnos', 'tur')
      .where(
        'usuario.emailUsuario = :email AND usuario.fechaHoraBaja IS NULL',
        {
          email: emailUsuario,
        },
      )
      .getOne();
    if (
      !agendaSemanal ||
      !hospitalAsignar ||
      !especialidadAsignar ||
      !medicoAsignar ||
      !usuarioAsignar
    ) {
      throw new BadRequestException(
        `La seleccion ha fallado, vuelva a intentarlo`,
      );
    }
    const agendasDias = agendaSemanal.agendasDia;
    for (const agendaDia of agendasDias) {
      if (agendaDia.id === idAgendaDia) {
        const turnos = agendaDia.turnosAgendaDia;
        for (const turnoAgendaSeleccionado of turnos) {
          if (
            turnoAgendaSeleccionado.disponible === false &&
            turnoAgendaSeleccionado.id === idTurnoAgendaDia
          ) {
            console.log('entre');
            const dtoTurno: CreateTurnoDto = {
              fechaTurno: this.obtenerFechaDesdeDia(
                agendaSemanal.fechaDesdeAgendaSemanal,
                agendaDia.nombreAgendaDia,
              ),
              horaTurno: turnoAgendaSeleccionado.horaDesde,
              estadoTurno: estadoAsignar!,
              especialidad: especialidadAsignar!,
              hospital: hospitalAsignar!,
              medico: medicoAsignar!,
              descripcion: '',
            };
            const turnoCreado: Turno =
              await this.abmTurnoUseCase.crear(dtoTurno);
            const turnoEstadoDTO: CreateTurnoEstadoDto = {
              estadoTurno: estadoAsignar!,
              turno: turnoCreado,
            };
            this.abmTurnoEstadoUseCase.crear(turnoEstadoDTO);
            const paciente = usuarioAsignar.paciente;
            console.log(paciente.turnos);
            paciente.turnos.push(turnoCreado);
            this.pacienteRepository.save(paciente);
          } else {
            throw new BadRequestException(`Hubo un problema`);
          }
        }
      }
    }
  }
  //Algoritmo para calcular numero de Semana
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
  //calcular la fecha del turno
  private obtenerFechaDesdeDia(fechaDesde: Date, nombreDia: string): Date {
    // Normalizo nombres de días
    const dias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];

    // Índice del día deseado
    const diaDeseado = dias.indexOf(nombreDia.toLowerCase());
    if (diaDeseado === -1) throw new Error('Día inválido');

    // Clonamos fecha para no mutar el original
    const fecha = new Date(fechaDesde);

    // Calcular inicio de semana (lunes como base)
    const diaSemana = fecha.getDay(); // 0=domingo, 1=lunes...
    const diff = diaSemana === 0 ? -6 : 1 - diaSemana; // mover al lunes de esa semana
    fecha.setDate(fecha.getDate() + diff);

    // Ahora sumamos hasta llegar al día deseado
    const resultado = new Date(fecha);
    const desplazamiento = diaDeseado === 0 ? 6 : diaDeseado - 1; // ajustar domingo al final
    resultado.setDate(fecha.getDate() + desplazamiento);

    return resultado;
  }
}
