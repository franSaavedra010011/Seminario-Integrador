import { BadRequestException, Injectable } from '@nestjs/common';
import { Turno } from 'src/domain/entities/turno.entity';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { ConsultarDetalleDelTurnoDTO } from './dto/consultar-detalle-turno.dto';

@Injectable()
export class ConsultarDetalleDelTurnoUseCase {
  constructor(private readonly genericRepository: GenericRepositoryService) {}
  async consultarDetalleTurno(idTurnoSeleccionado: number) {
    const turnosSeleccionados = await this.genericRepository.buscar(
      Turno,
      'turno',
      [
        {
          atributo: 'id',
          operacion: '=',
          valor: idTurnoSeleccionado,
        },
        {
          atributo: 'fechaHoraBaja',
          operacion: 'isNull',
          valor: '',
        },
      ],
    );
    if (!turnosSeleccionados.length) {
      throw new BadRequestException(
        `El turno con id: "${idTurnoSeleccionado}" No existe o ya ha sido dado de baja`,
      );
    }
    const turnoSeleccionado = turnosSeleccionados[0];
    const dto: ConsultarDetalleDelTurnoDTO = {
      descripcion: turnoSeleccionado.observaciones,
      fecha: turnoSeleccionado.fecha,
      hora: turnoSeleccionado.hora,
    };
    return dto;
  }
}
