import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Repository } from 'typeorm';
import { Turno } from 'src/domain/entities/turno.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { AbmTurnoEstadoUseCase } from '../abm/turnoEstado/abm-turno-estado.use-case';
import { CreateTurnoEstadoDto } from '../abm/turnoEstado/dto/create-turnoEstado.dto';
import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';

@Injectable()
export class RegistrarAsistenciaDePacienteUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
    @InjectRepository(EstadoTurno)
    private estadoTurnoRepository: Repository<EstadoTurno>,
    private readonly abmTurnoEstadoUseCase: AbmTurnoEstadoUseCase,
  ) { }
  async registrarAsistenciaDePaciente(idTurno: Number) {
    const turno = await this.turnoRepository
      .createQueryBuilder('turno') //hacerlo con usuario
      .leftJoinAndSelect('turno.estadoTurno', 'et')
      .leftJoinAndSelect('turno.turnosEstados', 'te')
      .where('turno.id = :id AND turno.fechaHoraBaja IS NULL', {
        id: idTurno,
      })
      .getOne();
    if (!turno) {
      throw new BadRequestException(
        `El turno con id ${idTurno} no existe o ha sido dado de baja`,
      );
    }
    const estadoDelTurno = turno.estadoTurno;
    if (estadoDelTurno.nombre !== EstadoTurnoEnum.RESERVADO) {
      throw new BadRequestException(
        `El turno con id ${idTurno} se encuentra: ${estadoDelTurno.nombre}`,
      );
    }
    const estadoAsignar = await this.estadoTurnoRepository
      .createQueryBuilder('estadoTurno') //hacerlo con usuario
      .where(
        'estadoTurno.nombre = :nombre AND estadoTurno.fechaHoraBaja IS NULL',
        {
          nombre: EstadoTurnoEnum.ATENDIDO,
        },
      )
      .getOne();
    if (!estadoAsignar) {
      throw new BadRequestException(
        `No ha sido posible registrar la asistencia`,
      );
    }
    const dtoCreate: CreateTurnoEstadoDto = {
      estadoTurno: estadoAsignar,
      turno: turno,
    };
    const turnoEstadoCreado: TurnoEstado =
      await this.abmTurnoEstadoUseCase.crear(dtoCreate);
    console.log(turnoEstadoCreado);
    turno.turnosEstados.push(turnoEstadoCreado);
    turno.estadoTurno = estadoAsignar;
    turno.presentismo = true;
    this.turnoRepository.save(turno);
  }
}
