import { Hospital } from 'src/domain/entities/hospital.entity';
import { DetalleHospitalDto } from './dto/detalle-hospital.dto';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { DetalleHospitalResultadoDto } from './dto/detalle-hospital.resultado';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsultarDetalleDelHospitalUseCase {
    constructor(
        private readonly genericRepository: GenericRepositoryService
    ) { }

    async ejecutar(dto: DetalleHospitalDto): Promise<DetalleHospitalResultadoDto> {
        const hospitales = await this.genericRepository.buscar(
            Hospital,
            'hos',
            [
                { atributo: 'id', operacion: '=', valor: dto.idHospital },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ],
            [
                'localidad',
                'congestionesActual'
            ]
        );

        if (!hospitales.length) {
            throw new Error(`No se encontró el hospital con ID ${dto.idHospital}`);
        }

        const hospital = hospitales[0];

        const congestionesActual = hospital.congestionesActual?.filter((c: any) => !c.fechaHoraBajaCongestionActual);
        const nivelDeCongestion = congestionesActual?.[0]?.nivelCongestion ?? undefined;
        const detalleHospital = new DetalleHospitalResultadoDto();

        detalleHospital.nombreHospital = hospital.nombre;
        detalleHospital.direccionHospital = hospital.direccion;
        detalleHospital.emailHospital = hospital.email;
        detalleHospital.telHospital = hospital.telefono;
        detalleHospital.nombreLocalidad = hospital.localidad?.nombre;
        detalleHospital.nivelDeCongestion = nivelDeCongestion;

        return detalleHospital;
    }
}
