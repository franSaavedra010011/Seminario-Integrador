// src/application/use-cases/modulo-recomendacion/consultar-congestion-de-hospital.use-case.ts
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { ConsultarCongestionHospitalDto } from './dto/consultar-congestion-hospital.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { NivelCongestionEnum } from 'src/domain/enums/nivel-congestion.enum';

@Injectable()
export class ConsultarCongestionDeHospitalUseCase {
    constructor(
        private readonly genericRepository: GenericRepositoryService
    ) { }

    async ejecutar(dto: ConsultarCongestionHospitalDto) {
        const hospitales = await this.genericRepository.buscar(
            Hospital,
            'hosp',
            [
                { atributo: 'id', operacion: '=', valor: dto.idHospital },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
            ],
            ['congestionesActual', 'congestionesHistorico']
        );

        if (!hospitales.length) {
            throw new BadRequestException(`Hospital con ID ${dto.idHospital} no encontrado o no vigente.`);
        }

        const hospital = hospitales[0];
        const actual = hospital.congestionesActual?.find(c => c.fechaHoraBaja == null);
        const historico = hospital.congestionesHistorico?.find(h => h.fechaHoraBaja == null);

        const turnosHoy = (actual?.turnosAsistidos ?? 0) + (actual?.turnosNoAsistidos ?? 0);

        const porcentajeCongestion = historico?.turnosMaximoDia
            ? Math.min(100, Math.round((turnosHoy * 100) / historico.turnosMaximoDia))
            : 100;

        let nivel: NivelCongestionEnum = NivelCongestionEnum.BAJA;
        if (porcentajeCongestion > 60) nivel = NivelCongestionEnum.ALTA;
        else if (porcentajeCongestion > 30) nivel = NivelCongestionEnum.MEDIA;

        return {
            nombreHospital: hospital.nombre,
            porcentajeCongestion,
            nivelDeCongestion: nivel,
            horaActualizacion: actual?.horaActualizacion ?? null
        };
    }
}
