import { Injectable } from "@nestjs/common";
import { Hospital } from "src/domain/entities/hospital.entity";
import { GenericRepositoryService } from "src/shared/services/genericRepository.service";
import { SolicitarRecomendacionDto, TipoRecomendacion } from "./dto/solicitar-recomendacion.dto";
import { Usuario } from "src/domain/entities/usuario.entity";

@Injectable()
export class SolicitarRecomendacionDeHospitalUseCase {
    constructor(
        private readonly genericRepository: GenericRepositoryService
    ) { }

    async ejecutar(dto: SolicitarRecomendacionDto): Promise<Hospital[]> {
        // Buscar el usuario con relaciones necesarias
        const [usuario] = await this.genericRepository.buscar(
            Usuario,
            'usuario',
            [
                { atributo: 'id', operacion: '=', valor: dto.idUsuario },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ],
            [
                'paciente',
                'paciente.turnos',
                'paciente.turnos.hospital',
                'paciente.localidad'
            ]
        );

        if (!usuario || !usuario.paciente) {
            throw new Error(`No se encontró el usuario con ID ${dto.idUsuario}`);
        }

        const { paciente } = usuario;

        // Recomendación por cercanía
        if (dto.opcion === TipoRecomendacion.CERCANIA) {
            try {
                return await this.genericRepository.buscar(
                    Hospital,
                    'hospital',
                    [
                        { atributo: 'localidad', operacion: 'relacion', valor: paciente.localidad.id },
                        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
                    ]
                );
            } catch {
                throw new Error(`No se encontraron hospitales en la localidad del paciente`);
            }
        }

        // Recomendación por menor congestión
        if (dto.opcion === TipoRecomendacion.CONGESTION) {
            try {
                const hospitales = await this.genericRepository.buscar(
                    Hospital,
                    'hospital',
                    [
                        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
                    ],
                    ['congestionesActual']
                );

                const ordenados = hospitales.sort((a, b) => {
                    const ca = a.congestionesActual?.[0];
                    const cb = b.congestionesActual?.[0];
                    const totalA = ca ? ca.turnosAsistidos + ca.turnosNoAsistidos + ca.turnosCancelados : Infinity;
                    const totalB = cb ? cb.turnosAsistidos + cb.turnosNoAsistidos + cb.turnosCancelados : Infinity;
                    return totalA - totalB;
                });

                return ordenados.slice(0, 3); // top 3 con menor congestión
            } catch {
                throw new Error(`No se encontraron hospitales con datos de congestión`);
            }
        }

        // Recomendación por último hospital visitado
        if (dto.opcion === TipoRecomendacion.VISITADO) {
            try {
                const turnos = paciente.turnos ?? [];
                if (!turnos.length) {
                    throw new Error('El paciente no tiene turnos registrados');
                }

                const ultimoTurno = turnos
                    .filter(t => t.hospital)
                    .sort((a, b) => {
                        const fechaA = new Date(`${a.fecha}T${a.hora}`);
                        const fechaB = new Date(`${b.fecha}T${b.hora}`);
                        return fechaB.getTime() - fechaA.getTime();
                    })[0];

                const [hospital] = await this.genericRepository.buscar(
                    Hospital,
                    'hospital',
                    [
                        { atributo: 'id', operacion: '=', valor: ultimoTurno.hospital.id },
                        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
                    ]
                );

                return hospital ? [hospital] : [];
            } catch {
                throw new Error(`No se pudo obtener el hospital visitado recientemente`);
            }
        }

        throw new Error('Opción de recomendación inválida');
    }
}
