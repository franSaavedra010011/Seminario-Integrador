import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Turno } from 'src/domain/entities/turno.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { AbmTurnoEstadoUseCase } from '../abm/turnoEstado/abm-turno-estado.use-case';
import { CreateTurnoEstadoDto } from '../abm/turnoEstado/dto/create-turnoEstado.dto';
import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';
import { RespuestasEstructuradasService } from 'src/shared/services/respuestas-estructuradas.service';

@Injectable()
export class RegistrarAsistenciaDePacienteUseCase {

  constructor(
    private readonly genericRepository: GenericRepositoryService,
    private readonly respuestasEstructuradasService: RespuestasEstructuradasService,
    private readonly abmTurnoEstadoUseCase: AbmTurnoEstadoUseCase,
  ) { }

  async registrarAsistenciaDePaciente(idTurno: number) {
    console.log(`[RegistrarAsistencia] Iniciando registro de asistencia para turno ID: ${idTurno}`);

    const turno = await this.genericRepository.buscarPorId(
      Turno,
      idTurno,
      ['estadoTurno', 'turnosEstados'],
    )
    console.log(`[RegistrarAsistencia] Turno encontrado:`, turno ? `ID ${turno.id}` : 'NO ENCONTRADO');

    if (!turno) {
      console.error(`[RegistrarAsistencia] ERROR: El turno con id ${idTurno} no existe o ha sido dado de baja`);
      throw new BadRequestException(
        `El turno con id ${idTurno} no existe o ha sido dado de baja`,
      );
    }

    if (turno.estadoTurno.nombre !== EstadoTurnoEnum.RESERVADO) {
      console.error(`[RegistrarAsistencia] ERROR: El turno no está en estado RESERVADO, está: ${turno.estadoTurno.nombre}`);
      throw new BadRequestException(
        `El turno con id ${idTurno} se encuentra: ${turno.estadoTurno.nombre}`,
      );
    }

    console.log(`[RegistrarAsistencia] Buscando estado ATENDIDO en la base de datos...`);

    const estadoTurnoAsignar = await this.genericRepository.buscarPorId(
      EstadoTurno,
      2,
      [],
    )

    console.log(`[RegistrarAsistencia] Estado ATENDIDO encontrado:`, estadoTurnoAsignar ? `ID ${estadoTurnoAsignar.id}` : 'NO ENCONTRADO');

    if (!estadoTurnoAsignar) {
      console.error(`[RegistrarAsistencia] ERROR: No se encontró el estado ATENDIDO en la base de datos`);
      throw new BadRequestException(
        `No ha sido posible registrar la asistencia`,
      );
    }

    const dtoCreate: CreateTurnoEstadoDto = {
      estadoTurno: estadoTurnoAsignar,
      turno: turno,
    };

    console.log(`[RegistrarAsistencia] Creando registro de turnoEstado...`);
    const turnoEstadoCreado: TurnoEstado = await this.abmTurnoEstadoUseCase.crear(dtoCreate);
    console.log(`[RegistrarAsistencia] TurnoEstado creado con ID: ${turnoEstadoCreado.id}`);

    turno.turnosEstados.push(turnoEstadoCreado);
    turno.estadoTurno = estadoTurnoAsignar;
    turno.presentismo = true;

    console.log(`[RegistrarAsistencia] Guardando cambios en el turno...`);
    const turnoGuardado = await this.genericRepository.guardarCambios(
      Turno,
      turno,
    );
    console.log(`[RegistrarAsistencia] Turno guardado exitosamente. Presentismo: ${turnoGuardado.presentismo}`);

    // Construir respuesta sin referencias circulares
    const turnoResponse = {
      id: turnoGuardado.id,
      fecha: turnoGuardado.fecha,
      hora: turnoGuardado.hora,
      observaciones: turnoGuardado.observaciones,
      presentismo: turnoGuardado.presentismo,
      estadoTurno: {
        id: turnoGuardado.estadoTurno.id,
        nombre: turnoGuardado.estadoTurno.nombre,
      },
    };

    const response = this.respuestasEstructuradasService.respuestaExitosa(turnoResponse, 'Asistencia registrada con éxito');
    console.log(`[RegistrarAsistencia] ✅ Proceso completado exitosamente para turno ID: ${idTurno}`);
    return response;
  }
}
