import { CongestionActual } from 'src/domain/entities/congestion-actual.entity';
import { CongestionHistorico } from 'src/domain/entities/congestion-historico.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { RegistrarCongestionHistoricaDto } from './dto/registrar-congestion-historica.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class RegistrarCongestionHistoricaUseCase {
  constructor(private readonly genericRepository: GenericRepositoryService) {}

  async ejecutar(
    dto: RegistrarCongestionHistoricaDto
  ): Promise<CongestionHistorico> {
    try {
      const congestionActual = await this.genericRepository.buscar(
        CongestionActual,
        'ca',
        [
          { atributo: 'id', operacion: '=', valor: dto.idCongestionActual },
          { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
        ],
        ['hospital']
      );

      if (!congestionActual.length) {
        throw new Error(
          `No se encontró la congestión actual con ID ${dto.idCongestionActual}`
        );
      }

      if (
        !congestionActual[0].hospital ||
        congestionActual[0].hospital.id !== dto.idHospital
      ) {
        throw new Error(
          `La congestión actual con ID ${dto.idCongestionActual} no pertenece al hospital con ID ${dto.idHospital}`
        );
      }

      const actual = congestionActual[0];

      const congestionHistorica = new CongestionHistorico();
      congestionHistorica.fecha = actual.fecha;
      congestionHistorica.horaActualizacion = actual.horaActualizacion;
      congestionHistorica.turnosCancelados = actual.turnosCancelados;
      congestionHistorica.turnosNoAsistidos = actual.turnosNoAsistidos;
      congestionHistorica.turnosAsistidos = actual.turnosAsistidos;
      congestionHistorica.turnosMaximoDia =
        actual.turnosAsistidos +
        actual.turnosNoAsistidos +
        actual.turnosCancelados;
      congestionHistorica.hospital = actual.hospital;

      return await this.genericRepository.guardarCambios(
        CongestionHistorico,
        congestionHistorica
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
