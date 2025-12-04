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
import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';

@Injectable()
export class CancelarTurnoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) { }

  async ejecutar(idTurno: number) {
    if (!idTurno || idTurno <= 0) {
      throw new BadRequestException(
        `El id del turno es obligatorio y debe ser mayor a 0.`,
      );
    }

    const turno = await this.genericRepository.buscarPorId(
      Turno,
      idTurno,
      [
        'turnosEstados',
        'estadoTurno',
      ]
    )

    if (!turno || turno.fechaHoraBaja) {
      throw new BadRequestException(
        `El turno con id: "${idTurno}" No existe o ya ha sido dado de baja`,
      );
    }

    if (!(turno.estadoTurno.nombre === EstadoTurnoEnum.RESERVADO) && turno.presentismo === false) {
      throw new BadRequestException(
        `El turno con id: "${idTurno}" no se puede cancelar porque su estado es: "${turno.estadoTurno.nombre}"`,
      );
    }

    turno.fechaHoraBaja = new Date();

    const estadoTurno = await this.genericRepository.buscar(
      EstadoTurno,
      'estadoTurno',
      [
        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
        { atributo: 'nombre', operacion: '=', valor: EstadoTurnoEnum.CANCELADO },
      ],
      []
    )

    if (turno && turno.turnosEstados) {
      for (const turnoEstado of turno.turnosEstados) {
        const fechaHoraBaja = turnoEstado.fechaHoraBaja;
        const fechaHastaTE = turnoEstado.fechaHasta;
        console.log(`TurnoEstado ID: ${turnoEstado.id}, fechaHoraBaja: ${fechaHoraBaja}, fechaHastaTE: ${fechaHastaTE}`);
      }

      const turnoEstadoVigente = turno.turnosEstados.find(te =>
        !te.fechaHoraBaja && !te.fechaHasta
      );

      if (turnoEstadoVigente) {
        console.log(`TurnoEstado vigente encontrado: ID ${turnoEstadoVigente.id}`);
        turnoEstadoVigente.fechaHoraBaja = new Date();
        turnoEstadoVigente.fechaHasta = new Date();
      } else {
        console.log('No se encontró un TurnoEstado vigente');
      }
    }

    const turnoEstadoNuevo = new TurnoEstado();
    turnoEstadoNuevo.fechaDesde = new Date();
    turnoEstadoNuevo.turno = turno;
    turnoEstadoNuevo.estadoTurno = estadoTurno[0];

    turno.estadoTurno = estadoTurno[0];
    turno.turnosEstados.push(turnoEstadoNuevo);

    const turnoAgendaDia = await this.genericRepository.buscar(
      TurnoAgendaDia,
      'turnoAgendaDia',
      [
        { atributo: 'turno.id', operacion: '=', valor: idTurno },
        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
      ],
      []
    )

    if (!turnoAgendaDia || turnoAgendaDia.length === 0) {
      throw new BadRequestException(
        `No se encontró la relación Turno-AgendaDia para el turno con id: "${idTurno}"`,
      );
    }

    turnoAgendaDia[0].turno = null;
    turnoAgendaDia[0].disponible = true;

    await this.genericRepository.guardarCambios(TurnoAgendaDia, turnoAgendaDia[0])
    await this.genericRepository.guardarCambios(TurnoEstado, turnoEstadoNuevo);
    await this.genericRepository.guardarCambios(Turno, turno);
  }

}
