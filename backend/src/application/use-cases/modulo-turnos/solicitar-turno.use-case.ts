import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Repository } from 'typeorm';
import { AbmTurnoEstadoUseCase } from '../abm/turnoEstado/abm-turno-estado.use-case';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { AbmTurnoUseCase } from '../abm/turno/abm-turno.use-case';
import { CreateTurnoDto } from '../abm/turno/dto/create-turno.dto';
import { Turno } from 'src/domain/entities/turno.entity';
import { CreateTurnoEstadoDto } from '../abm/turnoEstado/dto/create-turnoEstado.dto';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { ResumenHospitalDto } from './dto/resumen-hospital.dto';
import { ResumenMedicoDto } from './dto/resumen-medico.dto';
import { AgendaMedicoCompletoDto, SemanaAgendaDto, DiaAgendaDto, TurnoDisponibilidadDto } from './dto/resumen-agenda.dto';
import { ReservaTurnoDto } from './dto/reserva-turno.dto';
import { AgendaDia } from 'src/domain/entities/agenda-dia.entity';
@Injectable()
export class SolicitarTurnoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    private readonly abmTurnoUseCase: AbmTurnoUseCase,
  ) { }

  async solicitarTurnoHospitales(idEspecialidad: number, idLocalidad: number): Promise<ResumenHospitalDto[]> {

    const hospitales = await this.genericRepository.buscar(
      Hospital,
      "hospital",
      [
        { atributo: "fechaHoraBaja", operacion: "isNull", valor: null },
        { atributo: "localidad.id", operacion: "=", valor: idLocalidad },
      ],
      [
        "localidad",
        "congestionesActual",
        "hospitalEspecialidades",
        "hospitalEspecialidades.especialidad",
      ]
    );

    if (!hospitales || hospitales.length === 0) {
      throw new BadRequestException(`No hay hospitales disponibles`);
    }

    const hospitalesFiltradosPorEspecialidad = hospitales.filter((hospital) => {
      return hospital.hospitalEspecialidades.some(he => he.especialidad.id === idEspecialidad);
    });

    const listaHospitales: ResumenHospitalDto[] = [];

    for (const hospital of hospitalesFiltradosPorEspecialidad) {
      let resumenHospital = new ResumenHospitalDto();
      resumenHospital.idHospital = hospital.id;
      resumenHospital.nombreHospital = hospital.nombre;
      resumenHospital.localidadHospital = hospital.localidad.nombre;
      resumenHospital.direccionHospital = hospital.direccion;
      resumenHospital.emailHospital = hospital.email;
      resumenHospital.telefonoHospital = hospital.telefono;

      let nivelCongestionActual = "Desconocido";
      for (const congestionActual of hospital.congestionesActual) {
        if (congestionActual.fechaHoraBaja === null) {
          nivelCongestionActual = congestionActual.nivelCongestion;
          break;
        }
      }
      resumenHospital.nivelCongestionActual = nivelCongestionActual;
      listaHospitales.push(resumenHospital);
    }

    return listaHospitales;
  }

  async solicitarTurnoMedicos(idEspecialidad: number, idHospital: number): Promise<ResumenMedicoDto[]> {
    const hospital = await this.genericRepository.buscarPorId(
      Hospital,
      idHospital,
      [
        "hospitalEspecialidades",
        "hospitalEspecialidades.especialidad",
        "hospitalEspecialidades.hospitalEspecialidadMedico",
        "hospitalEspecialidades.hospitalEspecialidadMedico.medico",
      ]
    )

    if (!hospital) {
      throw new BadRequestException(`El Hospital con ID ${idHospital} no existe`);
    }

    const medicosFiltradosPorEspecialidad = hospital.hospitalEspecialidades
      .filter(he =>
        he.especialidad?.id === idEspecialidad &&
        he.fechaHoraBaja === null &&
        he.fechaHasta === null
      )
      .flatMap(he =>
        he.hospitalEspecialidadMedico
          ?.filter(hem => hem.fechaHasta === null && hem.fechaHoraBaja === null && hem.medico)
          ?.map(hem => hem.medico)
          ?.filter(medico => medico != null)
      ) ?? [];

    const listaMedicos: ResumenMedicoDto[] = [];

    for (const medico of medicosFiltradosPorEspecialidad) {
      if (medico?.id) { // Validación adicional
        let resumenMedico = new ResumenMedicoDto();
        resumenMedico.idMedico = medico.id;
        resumenMedico.nombreMedico = medico.nombreMedico;
        resumenMedico.apellidoMedico = medico.apellidoMedico;
        resumenMedico.matriculaMedico = medico.matriculaMedico;
        listaMedicos.push(resumenMedico);
      }
    }

    return listaMedicos;
  }

  async solicitarTurnoAgendas(idMedico: number, idHospital: number): Promise<AgendaMedicoCompletoDto> {

    // Definir constantes relativas a fechas
    const fechaActual = new Date();
    const nroSemanaActual = this.getWeekNumber(fechaActual);

    // Primera consulta: Hospital con especialidades y médicos (sin agendas)
    const hospital = await this.genericRepository.buscarPorId(
      Hospital,
      idHospital,
      [
        "hospitalEspecialidades",
        "hospitalEspecialidades.especialidad",
        "hospitalEspecialidades.hospitalEspecialidadMedico",
        "hospitalEspecialidades.hospitalEspecialidadMedico.medico",
      ]
    );

    if (!hospital) {
      throw new BadRequestException(`El Hospital con ID ${idHospital} no existe`);
    }

    let medicoEncontrado: Medico | null = null;
    let hospitalData: Hospital | null = null;
    let especialidadData: Especialidad | null = null;
    const semanasDisponibles: SemanaAgendaDto[] = [];

    // Buscar el médico y obtener los datos del hospital
    for (const he of hospital.hospitalEspecialidades) {
      if (he.fechaHoraBaja === null && he.fechaHasta === null) {
        for (const hem of he.hospitalEspecialidadMedico) {
          if (hem.medico.id === idMedico && hem.fechaHasta === null && hem.fechaHoraBaja === null) {
            medicoEncontrado = hem.medico;
            hospitalData = hospital;
            especialidadData = he.especialidad;

            // Segunda consulta: Obtener agendas del médico específico
            const relacionMedicoHospital = await this.genericRepository.buscar(
              HospitalEspecialidadMedico,
              'hem',
              [
                { atributo: 'id', operacion: '=', valor: hem.id },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
              ],
              [
                'agendaSemanales',
                'agendaSemanales.agendasDia',
                'agendaSemanales.agendasDia.turnosAgendaDia'
              ]
            );

            if (relacionMedicoHospital.length > 0) {
              const agendaActual = relacionMedicoHospital[0].agendaSemanales.filter(agenda =>
                agenda.fechaHoraBaja === null && agenda.nroSemana === nroSemanaActual
              );

              for (const agenda of agendaActual) {
                const diasDeLaSemana: DiaAgendaDto[] = [];

                for (const agendaDia of agenda.agendasDia) {
                  const turnos: TurnoDisponibilidadDto[] = [];

                  for (const turnoAgendaDia of agendaDia.turnosAgendaDia) {
                    // Solo incluir turnos disponibles
                    if (turnoAgendaDia.disponible && turnoAgendaDia.fechaHoraBaja === null) {
                      const turno: TurnoDisponibilidadDto = {
                        idTurnoAgendaDia: turnoAgendaDia.id,
                        horaDesde: turnoAgendaDia.horaDesde,
                        horaHasta: turnoAgendaDia.horaHasta,
                        disponible: turnoAgendaDia.disponible,
                        fechaHoraBaja: turnoAgendaDia.fechaHoraBaja
                      };
                      turnos.push(turno);
                    }
                  }

                  const diaDto: DiaAgendaDto = {
                    idAgendaDia: agendaDia.id,
                    nombreDia: agendaDia.nombreAgendaDia,
                    fechaHoraBajaDia: agendaDia.fechaHoraBaja,
                    turnos: turnos
                  };
                  diasDeLaSemana.push(diaDto);
                }

                const semanaDto: SemanaAgendaDto = {
                  idAgendaSemanal: agenda.id,
                  fechaInicioSemana: agenda.fechaDesdeAgendaSemanal,
                  fechaFinSemana: agenda.fechaHastaAgendaSemanal,
                  numeroSemana: agenda.nroSemana,
                  fechaHoraBajaSemana: agenda.fechaHoraBaja,
                  diasDeLaSemana: diasDeLaSemana
                };
                semanasDisponibles.push(semanaDto);
              }
            }
          }
        }
      }
    }

    if (!medicoEncontrado || !hospitalData || !especialidadData) {
      throw new BadRequestException(`No se encontró el médico con ID ${idMedico} en el hospital especificado`);
    }

    const agendaCompleta: AgendaMedicoCompletoDto = {
      idMedico: medicoEncontrado.id,
      nombreMedico: medicoEncontrado.nombreMedico,
      apellidoMedico: medicoEncontrado.apellidoMedico,
      matriculaMedico: medicoEncontrado.matriculaMedico,
      idHospital: hospitalData.id,
      nombreHospital: hospitalData.nombre,
      idEspecialidad: especialidadData.id,
      nombreEspecialidad: especialidadData.nombre,
      semanaActual: semanasDisponibles
    };

    return agendaCompleta;
  }

  async solicitarTurnoFinalizar(dto: ReservaTurnoDto): Promise<Turno> {
    const [agenda, hospital, especialidad, medico, usuario, agendaDia, turnoAgendaDia] = await Promise.all([
      this.genericRepository.buscarPorId(AgendaSemanal, dto.idAgendaSemanal, ['agendasDia', 'agendasDia.turnosAgendaDia']),
      this.genericRepository.buscarPorId(Hospital, dto.idHospital, []),
      this.genericRepository.buscarPorId(Especialidad, dto.idEspecialidad, []),
      this.genericRepository.buscarPorId(Medico, dto.idMedico, []),
      this.genericRepository.buscarPorId(Usuario, dto.idUsuario, ['paciente']),
      this.genericRepository.buscarPorId(AgendaDia, dto.idAgendaDia, []),
      this.genericRepository.buscarPorId(TurnoAgendaDia, dto.idTurnoAgendaDia, [])
    ]);

    if (!agenda || !hospital || !especialidad || !medico || !usuario || !agendaDia || !turnoAgendaDia) {
      throw new BadRequestException(`La seleccion ha fallado, vuelva a intentarlo`);
    }

    const estadoTurnoReservado = await this.genericRepository.buscar(
      EstadoTurno,
      "estadoTurno",
      [
        { atributo: "nombre", operacion: "=", valor: EstadoTurnoEnum.RESERVADO },
        { atributo: "fechaHoraBaja", operacion: "isNull", valor: null }
      ],
      []
    );

    const turnoReservaDetalle = new CreateTurnoDto();
    turnoReservaDetalle.fechaTurno = agendaDia.fechaAgendaDia;
    turnoReservaDetalle.horaTurno = turnoAgendaDia.horaDesde;
    turnoReservaDetalle.estadoTurno = estadoTurnoReservado[0];
    turnoReservaDetalle.especialidad = especialidad;
    turnoReservaDetalle.hospital = hospital;
    turnoReservaDetalle.medico = medico;

    const turnoReserva = this.abmTurnoUseCase.crear(turnoReservaDetalle);

    return turnoReserva;
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
