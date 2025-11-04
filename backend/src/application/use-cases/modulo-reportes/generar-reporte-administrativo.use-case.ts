import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { CongestionHistorico } from 'src/domain/entities/congestion-historico.entity';
import { GenerarReporteAdministrativo2doPasoCantidades } from './dto/generar-reporte-administrativo-2dopaso-cantidades.dto';
import { GenerarReporteAdministrativo2doPasoMensajeCantidades } from './dto/generar-reporte-administrativo-2dopaso-mensaje-cantidades.dto';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { GenerarReporteAdministrativoConteoEspecialidad } from './dto/generar-reporte-administrativo-conteo-especialidad.dto';
import { GenerarReporteAdministrativo } from './dto/Generar-reporte-administrativo.dto';
import { CongestionActual } from 'src/domain/entities/congestion-actual.entity';

@Injectable()
export class GenerarReporteAdministrativoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(EstadoTurno)
    private estadoTurnoRepository: Repository<EstadoTurno>,
  ) {}
  async generarReporteAdministrativoHospital(idHospital: number) {
    const hospital = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();

    if (!hospital) {
      throw new BadRequestException(
        `El hospital no existe o ya ha sido dado de baja`,
      );
    }
    const e =
      'Por favor ingrese las fechas necesarias, para establecer el período requerido';
    return hospital.id, e;
  }
  async generarReporteAdministrativo(
    idHospital: Number,
    fechaDesde: Date,
    fechaHasta: Date,
  ) {
    const hospital = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .leftJoinAndSelect('hospital.congestionesActual', 'ca')
      .leftJoinAndSelect('hospital.congestionesHistorico', 'ch')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();

    if (!hospital) {
      throw new BadRequestException(
        `El hospital no existe o ya ha sido dado de baja`,
      );
    }
    const congestionesActuales: CongestionActual[] =
      hospital.congestionesActual;
    const congestionesHistoricas: CongestionHistorico[] =
      hospital.congestionesHistorico;

    let congestionHistoricaComparar: CongestionHistorico;
    let porcentajeAcumuladoPeriodo = 0; // Acumula las métricas diarias del periodo
    let contadorRegistros = 0;

    const listaCantidadesDTO: GenerarReporteAdministrativo2doPasoCantidades[] =
      [];

    // 1. OBTENER EL REGISTRO HISTÓRICO DE REFERENCIA
    for (const congestionHistorica of congestionesHistoricas) {
      if (congestionHistorica.fechaHoraBaja === null) {
        congestionHistoricaComparar = congestionHistorica;
      }
    }

    if (!congestionHistoricaComparar!) {
      // Manejo de error si no hay histórico
      throw new BadRequestException(
        `No se encontró el registro histórico de congestión de referencia.`,
      );
    }

    // CÁLCULO DE LA MÉTRICA HISTÓRICA (M_H)
    const asistidosHistoricos = congestionHistoricaComparar.turnosAsistidos;
    const totalHistoricos =
      asistidosHistoricos +
      congestionHistoricaComparar.turnosCancelados +
      congestionHistoricaComparar.turnosNoAsistidos;

    const METRICA_HISTORICA =
      totalHistoricos > 0 ? asistidosHistoricos / totalHistoricos : 0;

    // 2. ITERAR SOBRE LAS CONGESTIONES ACTUALES PARA CALCULAR LA MÉTRICA DEL PERÍODO (M_P)
    for (const congestionActual of congestionesActuales) {
      if (
        fechaDesde <= congestionActual.fecha &&
        fechaHasta >= congestionActual.fecha
      ) {
        const turnosCanceladosCA = congestionActual.turnosCancelados;
        const turnosNoAsistidosCA = congestionActual.turnosNoAsistidos;
        const turnosAsistidosCA = congestionActual.turnosAsistidos;
        const turnosEnProcesoCA = congestionActual.turnosEnProceso;
        const fechaCA = congestionActual.fechaHoraCreacion;

        // CÁLCULO DE LA MÉTRICA DEL DÍA (M_P_Día): Turnos Asistidos / Total Turnos
        const asistidosDia = turnosAsistidosCA;
        const totalTurnosDia =
          turnosCanceladosCA +
          turnosNoAsistidosCA +
          turnosAsistidosCA +
          turnosEnProcesoCA;

        let metricaDiaria = 0;

        if (totalTurnosDia > 0) {
          metricaDiaria = asistidosDia / totalTurnosDia;
        }

        // Acumulación para el promedio final
        porcentajeAcumuladoPeriodo += metricaDiaria;
        contadorRegistros += 1;

        // Llenado del DTO
        const dtoCantidades: GenerarReporteAdministrativo2doPasoCantidades = {
          turnosCanceladosCA: turnosCanceladosCA,
          turnosNoAsistidosCA: turnosNoAsistidosCA,
          turnosAsistidosCA: turnosAsistidosCA,
          turnosEnProceso: turnosEnProcesoCA,
          fechaCongestion: fechaCA,
        };
        listaCantidadesDTO.push(dtoCantidades);
      }
    }

    // CÁLCULO DEL PROMEDIO FINAL RELATIVO (PorcentajeProm)
    const metricaPromedioPeriodo =
      contadorRegistros > 0
        ? porcentajeAcumuladoPeriodo / contadorRegistros
        : 0;

    let porcentajeProm = 0;
    if (METRICA_HISTORICA > 0) {
      // El porcentaje relativo: (M_P / M_H) * 100
      porcentajeProm = (metricaPromedioPeriodo / METRICA_HISTORICA) * 100;
    } else if (metricaPromedioPeriodo > 0) {
      // Caso donde el histórico es cero, pero el periodo actual tiene asistencia
      porcentajeProm = 100;
    }

    let mensaje;
    if (porcentajeProm > 115) {
      // Rendimiento 15% mejor que la historia
      mensaje =
        'El rendimiento promedio de asistencia en el periodo es ALTO (notablemente mejor que el histórico).';
    } else if (porcentajeProm < 85) {
      // Rendimiento 15% peor que la historia
      mensaje =
        'El rendimiento promedio de asistencia en el periodo es BAJO (significativamente peor que el histórico).';
    } else {
      mensaje =
        'El rendimiento promedio de asistencia en el periodo es MEDIO (cercano al rendimiento histórico).';
    }

    const dtoMensajeCantidades: GenerarReporteAdministrativo2doPasoMensajeCantidades =
      {
        mensaje: mensaje,
        dtoCantidades: listaCantidadesDTO,
      };

    const estadoTurnoBuscado = await this.estadoTurnoRepository
      .createQueryBuilder('estadoTurno')
      .where(
        'estadoTurno.nombre = :nombre AND estadoTurno.fechaHoraBaja IS NULL',
        {
          nombre: EstadoTurnoEnum.ATENDIDO,
        },
      )
      .getOne();
    if (!estadoTurnoBuscado) {
      throw new BadRequestException(
        `El estado del turno no existe o ya ha sido dado de baja`,
      );
    }
    const turnosBuscados = await this.turnoRepository
      .createQueryBuilder('turno')
      .leftJoinAndSelect('turno.especialidad', 'esp')
      .where(
        'turno.estadoTurno = :idEstadoTurno AND turno.hospital = :idHospital AND turno.fechaHoraBaja IS NULL',
      )
      .andWhere('turno.fecha BETWEEN :fd AND :fh')
      .setParameters({
        idEstadoTurno: estadoTurnoBuscado.id,
        idHospital: hospital.id,
        fd: fechaDesde,
        fh: fechaHasta,
      })
      .getMany();
    console.log(turnosBuscados);
    const listaConteoEspecialidad: GenerarReporteAdministrativoConteoEspecialidad[] =
      [];
    const listaEspecialidadesTurno: String[] = [];
    for (const turno of turnosBuscados) {
      const especialidadRelacionada = turno.especialidad;
      const especialidadNombre = especialidadRelacionada.nombre;
      if (!listaEspecialidadesTurno.includes(especialidadNombre)) {
        listaEspecialidadesTurno.push(especialidadNombre);
      }
    }
    for (const especialidadNombre of listaEspecialidadesTurno) {
      let cantidadTurnos: number = 0;
      for (const turno of turnosBuscados) {
        if (turno.especialidad.nombre === especialidadNombre) {
          cantidadTurnos++;
        }
      }
      const conteoEspecialidad: GenerarReporteAdministrativoConteoEspecialidad =
        {
          nombreEspecialidad: especialidadNombre,
          cantidad: cantidadTurnos,
        };
      listaConteoEspecialidad.push(conteoEspecialidad);
    }
    //DTO QUE UNA AMBOS
    const dtoFinal: GenerarReporteAdministrativo = {
      cantidadCongestion: dtoMensajeCantidades,
      cantidadEspecialidad: listaConteoEspecialidad,
    };
    //Sigue logica del otro paso
    return dtoFinal; //DTO CON TODO;
  }
}
