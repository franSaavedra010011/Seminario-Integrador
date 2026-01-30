import { Turno } from 'src/domain/entities/turno.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';

@Injectable()
export class CancelarTurnoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) { }

  async ejecutar(idTurno: number) {
    // Validación de entrada
    if (!idTurno || idTurno <= 0) {
      throw new BadRequestException(
        `El id del turno es obligatorio y debe ser mayor a 0.`,
      );
    }

    // 1. Buscar el turno con sus relaciones
    const turno = await this.genericRepository.buscarPorId(
      Turno,
      idTurno,
      [
        'turnosEstados',
        'estadoTurno',
      ]
    );

    // Validar existencia del turno
    if (!turno || turno.fechaHoraBaja) {
      throw new BadRequestException(
        `El turno con id: "${idTurno}" no existe o ya ha sido dado de baja`,
      );
    }

    // Validar estado del turno (solo se pueden cancelar turnos RESERVADOS)
    if (turno.estadoTurno.nombre !== EstadoTurnoEnum.RESERVADO || turno.presentismo === true) {
      throw new BadRequestException(
        `El turno con id: "${idTurno}" no se puede cancelar porque su estado es: "${turno.estadoTurno.nombre}" o ya fue atendido`,
      );
    }

    // 2. PRIMERO: Liberar el slot en TurnoAgendaDia ANTES de dar de baja el turno
    const turnoAgendaDia = await this.genericRepository.buscar(
      TurnoAgendaDia,
      'turnoAgendaDia',
      [
        { atributo: 'turno.id', operacion: '=', valor: idTurno },
        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
      ],
      ['turno']
    );

    if (!turnoAgendaDia || turnoAgendaDia.length === 0) {
      throw new BadRequestException(
        `No se encontró la relación Turno-AgendaDia para el turno con id: "${idTurno}"`,
      );
    }

    // ✅ IMPORTANTE: Liberar el slot ANTES de dar de baja el turno
    // Mantener la referencia para historial pero marcarlo como disponible
    turnoAgendaDia[0].disponible = true;
    // NO establecer turno en null - mantener referencia histórica
    await this.genericRepository.guardarCambios(TurnoAgendaDia, turnoAgendaDia[0]);

    console.log(`✅ Slot liberado: TurnoAgendaDia ID ${turnoAgendaDia[0].id} ahora está disponible`);

    // 3. Buscar estado CANCELADO
    const estadoCancelado = await this.genericRepository.buscar(
      EstadoTurno,
      'estadoTurno',
      [
        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
        { atributo: 'nombre', operacion: '=', valor: EstadoTurnoEnum.CANCELADO },
      ],
      []
    );

    if (!estadoCancelado || estadoCancelado.length === 0) {
      throw new BadRequestException(
        `No se encontró el estado "CANCELADO" en la base de datos`,
      );
    }

    // 4. Actualizar el TurnoEstado vigente (cerrar el estado actual)
    if (turno.turnosEstados && turno.turnosEstados.length > 0) {
      for (const turnoEstado of turno.turnosEstados) {
        console.log(`TurnoEstado ID: ${turnoEstado.id}, fechaHoraBaja: ${turnoEstado.fechaHoraBaja}, fechaHasta: ${turnoEstado.fechaHasta}`);
      }

      // Buscar el TurnoEstado vigente (sin fechaHoraBaja y sin fechaHasta)
      const turnoEstadoVigente = turno.turnosEstados.find(te =>
        !te.fechaHoraBaja && !te.fechaHasta
      );

      if (turnoEstadoVigente) {
        console.log(`✅ TurnoEstado vigente encontrado: ID ${turnoEstadoVigente.id} - Cerrando...`);
        turnoEstadoVigente.fechaHasta = new Date();
        await this.genericRepository.guardarCambios(TurnoEstado, turnoEstadoVigente);
      } else {
        console.log('⚠️ No se encontró un TurnoEstado vigente');
      }
    }

    // 5. Crear nuevo TurnoEstado con estado CANCELADO
    const turnoEstadoNuevo = new TurnoEstado();
    turnoEstadoNuevo.fechaDesde = new Date();
    turnoEstadoNuevo.turno = turno;
    turnoEstadoNuevo.estadoTurno = estadoCancelado[0];

    await this.genericRepository.guardarCambios(TurnoEstado, turnoEstadoNuevo);
    console.log(`✅ Nuevo TurnoEstado CANCELADO creado: ID ${turnoEstadoNuevo.id}`);

    // 6. Actualizar el turno principal
    turno.estadoTurno = estadoCancelado[0];
    turno.fechaHoraBaja = new Date();
    turno.turnosEstados.push(turnoEstadoNuevo);

    await this.genericRepository.guardarCambios(Turno, turno);
    console.log(`✅ Turno ID ${idTurno} cancelado exitosamente`);

    return {
      message: 'Turno cancelado correctamente',
      idTurno: turno.id,
      fechaCancelacion: turno.fechaHoraBaja,
      slotLiberado: true
    };
  }
}