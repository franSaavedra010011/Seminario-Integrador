import { CongestionActual } from 'src/domain/entities/congestion-actual.entity';
import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { UpdateCongestionDto } from './dto/update-congestion.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { NotFoundException } from '@nestjs/common';
export class ActualizarNivelDeCongestionUseCase {
    constructor(
        private readonly updateCongestionDto: UpdateCongestionDto,
        private readonly genericRepository: GenericRepositoryService,
    ) {}

    async ejecutar(dto: UpdateCongestionDto): Promise<CongestionActual> {
        // Buscar instancia de Hospital existente con el ID proporcionado
        const hospitales = await this.genericRepository.buscar(
            Hospital,
            'hosp',
            [{ atributo: 'id', operacion: '=', valor: dto.hospitalId }],
        );

        // Comprobar si trajo algun hospital
        if (!hospitales.length) {
            throw new NotFoundException(`Hospital con ID ${dto.hospitalId} no encontrado`);
        }

        // Leer el hospital
        const hospital = hospitales[0];

        // Crear registro de CongestionActual
        const registro = new CongestionActual();
        registro.fecha = new Date();
        registro.horaActualizacion = new Date().getHours();
        registro.nivelCongestion = dto.nivelCongestion;
        registro.turnosCancelados = dto.turnosCancelados;
        registro.turnosNoAsistidos = dto.turnosNoAsistidos;
        registro.turnosAsistidos = dto.turnosAsistidos;
        registro.turnosEnProceso = dto.turnosEnProceso;
        registro.hospital = hospital;

        // Guardar cambios de la congestion actual
        return await this.genericRepository.guardarCambios(CongestionActual, registro);
    }
}