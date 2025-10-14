import { Turno } from 'src/domain/entities/turno.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { AgendaDia } from 'src/domain/entities/agenda-dia.entity';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { AbmTurnoUseCase } from '../abm/turno/abm-turno.use-case';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CancelarTurnoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    private readonly bajaLogica: AbmTurnoUseCase,
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
    @InjectRepository(TurnoAgendaDia)
    private turnoAgendaDiaRepository: Repository<TurnoAgendaDia>,
  ) { }
  async bajaTurno(idTurnoSeleccionado: number) {
    const estadoBajas = await this.genericRepository.buscar(
      EstadoTurno,
      'estadoTurno',
      [
        {
          atributo: 'nombre',
          operacion: '=',
          valor: EstadoTurnoEnum.CANCELADO,
        },
      ],
    );
    const turnoSeleccionado = await this.turnoRepository
      .createQueryBuilder('turno')
      .leftJoinAndSelect('turno.hospital', 'hospital')
      .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he') // hospitalEspecialidades
      .leftJoinAndSelect('he.hospitalEspecialidadMedico', 'hem') // hospitalEspecialidadMedico
      .leftJoinAndSelect('hem.agendaSemanales', 'agenda') // agendaSemanal
      .leftJoinAndSelect('agenda.agendasDia', 'agendasDia') // agendasDia
      .leftJoinAndSelect('agendasDia.turnosAgendaDia', 'turnosAgendaDia') // turnosAgendaDia
      .leftJoinAndSelect('turnosAgendaDia.turno', 'turnoDia')
      .leftJoinAndSelect('turno.estadoTurno', 'estadoTurno')
      .where('turno.id = :id AND turno.fechaHoraBaja IS NULL', {
        id: idTurnoSeleccionado,
      })
      .getOne();

    if (!turnoSeleccionado) {
      throw new BadRequestException(
        `El turno con id: "${idTurnoSeleccionado}" No existe o ya ha sido dado de baja`,
      );
    }
    const hospitalRelacionado: Hospital = turnoSeleccionado.hospital;
    const hospitalEspecialidadRelacionados: HospitalEspecialidad[] =
      hospitalRelacionado.hospitalEspecialidades;
    const nroSemanaCalculo = this.getWeekNumber(turnoSeleccionado.fecha);
    const dias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    const diaTurno = dias[turnoSeleccionado.fecha.getDay()];
    for (const hospitalEspecialidadRelacionado of hospitalEspecialidadRelacionados) {
      const fechaHoraBajaHospitalEspecialidadRelacionado =
        hospitalEspecialidadRelacionado.fechaHoraBaja;
      const fechaHoraHastaHospitalEspecialidadRelacionado =
        hospitalEspecialidadRelacionado.fechaHasta;
      if (
        fechaHoraBajaHospitalEspecialidadRelacionado === null &&
        fechaHoraHastaHospitalEspecialidadRelacionado === null
      ) {
        const hospitalEspecialidadMedicoRelacionados: HospitalEspecialidadMedico[] =
          hospitalEspecialidadRelacionado.hospitalEspecialidadMedico;
        for (const hospitalEspecialidadMedicoRelacionado of hospitalEspecialidadMedicoRelacionados) {
          const fechaHoraHastaHospitalEspecialidadMedicoRelacionado =
            hospitalEspecialidadMedicoRelacionado.fechaHasta;
          const fechaHoraBajaHospitalEspecialidadMedicoRelacionado =
            hospitalEspecialidadMedicoRelacionado.fechaHoraBaja;
          if (
            fechaHoraBajaHospitalEspecialidadMedicoRelacionado === null &&
            fechaHoraHastaHospitalEspecialidadMedicoRelacionado === null
          ) {
            const agendasSemanalesRelacionadas: AgendaSemanal[] =
              hospitalEspecialidadMedicoRelacionado.agendaSemanales;
            for (const agendaSemanalRelacionada of agendasSemanalesRelacionadas) {
              const nroSemana = agendaSemanalRelacionada.nroSemana;
              const fechaBajaAgendaSemanal =
                agendaSemanalRelacionada.fechaHoraBaja;
              if (
                nroSemana == nroSemanaCalculo &&
                fechaBajaAgendaSemanal === null
              ) {
                const agendaDias: AgendaDia[] =
                  agendaSemanalRelacionada.agendasDia;
                for (const agendaDia of agendaDias) {
                  const diaComparar =
                    agendaDia.nombreAgendaDia.toLocaleLowerCase();
                  if (diaComparar === diaTurno) {
                    const turnosAgendaDia: TurnoAgendaDia[] =
                      agendaDia.turnosAgendaDia;
                    for (const turnoAgendaDia of turnosAgendaDia) {
                      if (turnoAgendaDia.turno !== null) {
                        const idTurnoComparar = turnoAgendaDia.turno.id;
                        if (idTurnoSeleccionado === idTurnoComparar) {
                          turnoAgendaDia.disponible = false;
                          turnoAgendaDia.turno = null;
                          turnoSeleccionado.estadoTurno = estadoBajas[0];
                          await this.turnoAgendaDiaRepository.save(
                            turnoAgendaDia,
                          ); //guardo turno para que pueda ser usado
                          await this.turnoRepository.save(turnoSeleccionado); //para que guarde el estado
                          this.bajaLogica.eliminar(idTurnoSeleccionado);
                        } //le doy fechaBaja
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

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
