import { CongestionActual } from 'src/domain/entities/congestion-actual.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { UpdateCongestionDto } from './dto/update-congestion.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ActualizarNivelDeCongestionUseCase {
  constructor(private readonly genericRepository: GenericRepositoryService) { }

  async ejecutar(dto: UpdateCongestionDto): Promise<CongestionActual> {
    /*
            Buscar instancia de hospital existente:
                - Con id igual al proporcionado
                - Con fechaHoraBaja igual a null (Hospital vigente)
        */
    const hospital = await this.genericRepository.buscar(Hospital, 'hosp', [
      { atributo: 'id', operacion: '=', valor: dto.hospitalId },
      { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
    ]);

    // Comprobar que existe el hospital proporcionado
    if (!hospital.length) {
      // CA N°1: no existe el hospital proporcionado
      throw new NotFoundException(
        `Hospital con ID ${dto.hospitalId} no encontrado`
      );
    }

    /*
            Crear instancia de CongestionActual:
                - Con fecha igual a la fecha actual
                - Con horaActualizacion igual a la hora actual
                - Con nivelCongestion igual al ingresado
                - Con turnosCancelados igual al ingresado
                - Con turnosNoAsistidos igual al ingresado
                - Con turnosAsistidos igual al ingresado
                - Con turnosEnProceso igual al ingresado
                - Relacionado al hospital encontrado
        */
    const registro = new CongestionActual();
    registro.fecha = new Date();
    registro.horaActualizacion = new Date().getHours();
    registro.nivelCongestion = dto.nivelCongestion;
    registro.turnosCancelados = dto.turnosCancelados;
    registro.turnosNoAsistidos = dto.turnosNoAsistidos;
    registro.turnosAsistidos = dto.turnosAsistidos;
    registro.turnosEnProceso = dto.turnosEnProceso;
    registro.hospital = hospital[0];

    // Guardar cambios
    return await this.genericRepository.guardarCambios(
      CongestionActual,
      registro
    );
  }
}
