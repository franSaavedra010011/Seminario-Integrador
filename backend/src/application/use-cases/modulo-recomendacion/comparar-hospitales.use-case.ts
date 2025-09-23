import { BadRequestException, Injectable } from '@nestjs/common';
import { CompararHospitalesDto } from './dto/comparar-hospitales.dto';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { NivelCongestionEnum } from 'src/domain/enums/nivel-congestion.enum';
import { HospitalComparadoDto } from './dto/hospital-comparado.dto';

@Injectable()
export class CompararHospitalesUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService
  ) { }

  async ejecutar(dto: CompararHospitalesDto) {
    if (dto.idHospitales.length !== 2) {
      throw new BadRequestException(
        'Se deben proporcionar exactamente dos IDs de hospitales para comparar.'
      );
    }

    const hospitalesComparados: HospitalComparadoDto[] = [];

    for (const id of dto.idHospitales) {
      const hospitales = await this.genericRepository.buscar(
        Hospital,
        'hosp',
        [
          { atributo: 'id', operacion: '=', valor: id },
          { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
        ],
        [
          'localidad',
          'hospitalEspecialidades',
          'hospitalEspecialidades.especialidad',
          'congestionesActual',
          'congestionesHistorico',
        ]
      );

      if (!hospitales.length) {
        throw new BadRequestException(
          `Hospital con ID ${id} no encontrado o no vigente.`
        );
      }

      const hospital = hospitales[0];

      const especialidades =
        hospital.hospitalEspecialidades
          ?.filter(
            (he) => !he.fechaHasta && he.especialidad?.fechaHoraBaja == null
          )
          .map((he) => he.especialidad.nombre) ?? [];

      const actual = hospital.congestionesActual?.find(
        (ca) => ca.fechaHoraBaja == null
      );
      const historico = hospital.congestionesHistorico?.find(
        (ch) => ch.fechaHoraBaja == null
      );

      const turnosHoy =
        (actual?.turnosAsistidos ?? 0) + (actual?.turnosNoAsistidos ?? 0);

      const porcentajeCongestion = historico?.turnosMaximoDia
        ? Math.min(
          100,
          Math.round((turnosHoy * 100) / historico.turnosMaximoDia)
        )
        : 100;

      let nivelDeCongestion: NivelCongestionEnum;

      if (porcentajeCongestion > 60) {
        nivelDeCongestion = NivelCongestionEnum.ALTA;
      } else if (porcentajeCongestion > 30) {
        nivelDeCongestion = NivelCongestionEnum.MEDIA;
      } else {
        nivelDeCongestion = NivelCongestionEnum.BAJA;
      }

      hospitalesComparados.push({
        id: hospital.id,
        nombre: hospital.nombre,
        direccion: hospital.direccion,
        telefono: hospital.telefono,
        especialidades,
        nivelDeCongestion,
        porcentajeCongestion,
      });
    }

    return hospitalesComparados;
  }
}
