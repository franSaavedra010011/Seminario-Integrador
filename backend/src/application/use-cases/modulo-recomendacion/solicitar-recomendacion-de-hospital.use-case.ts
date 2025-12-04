import { Injectable } from "@nestjs/common";
import { Hospital } from "src/domain/entities/hospital.entity";
import { GenericRepositoryService } from "src/shared/services/genericRepository.service";
import { criterioRecomendacion, SolicitarRecomendacionDto } from "./dto/solicitar-recomendacion.dto";
import { Usuario } from "src/domain/entities/usuario.entity";
import { NivelCongestionEnum } from "src/domain/enums/nivel-congestion.enum";
import { HospitalRecomendadoDto } from "./dto/hospital-recomendado.dto";

@Injectable()
export class SolicitarRecomendacionDeHospitalUseCase {
    constructor(
        private readonly genericRepository: GenericRepositoryService
    ) { }

    async ejecutar(dto: SolicitarRecomendacionDto): Promise<HospitalRecomendadoDto[]> {
        const usuarios = await this.genericRepository.buscar(
            Usuario,
            'usuario',
            [
                { atributo: 'id', operacion: '=', valor: dto.idUsuario },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ],
        );

        if (!usuarios.length) {
            throw new Error(`No se encontró el usuario con ID ${dto.idUsuario}`);
        }

        if (dto.criterioRecomendacion === criterioRecomendacion.CERCANIA) {
            return await this.recomendarPorCercania(dto);
        } else if (dto.criterioRecomendacion === criterioRecomendacion.CONGESTION) {
            return await this.recomendarPorCongestion(dto);
        } else {
            throw new Error('Criterio de recomendación inválido');
        }
    }

    async recomendarPorCercania(dto: SolicitarRecomendacionDto): Promise<HospitalRecomendadoDto[]> {
        const usuario = await this.genericRepository.buscar(
            Usuario,
            'usuario',
            [
                { atributo: 'id', operacion: '=', valor: dto.idUsuario },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ],
            ['paciente', 'paciente.localidad']
        );

        const hospitales = await this.genericRepository.buscar(
            Hospital,
            'hospital',
            [
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ],
            ['localidad', 'congestionesActual']
        );

        const hospitalesOk = hospitales.filter(hospital =>
            hospital.localidad?.id === usuario[0].paciente?.localidad?.id
        );

        return hospitalesOk.map(hospital => {
            const ultima = hospital.congestionesActual
                ?.filter(ca => !ca.fechaHoraBaja)
                ?.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];

            return {
                id: hospital.id,
                nombre: hospital.nombre,
                direccion: hospital.direccion,
                email: hospital.email,
                telefono: hospital.telefono,
                localidad: hospital.localidad ? { nombre: hospital.localidad.nombre } : undefined,
                nivelCongestion: ultima?.nivelCongestion,
                fechaActualizacionCongestion: ultima?.fecha?.toISOString() ?? undefined
            };
        });
    }

    async recomendarPorCongestion(dto: SolicitarRecomendacionDto): Promise<HospitalRecomendadoDto[]> {
        console.log('Iniciando recomendación por congestión...');
        const hospitales = await this.genericRepository.buscar(
            Hospital,
            'hospital',
            [
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ],
            ['congestionesActual', 'localidad']
        );

        // DEBUG temporal para ver qué datos estás recibiendo
        console.log('HOSPITALES Y CONGESTIONES');
        for (const h of hospitales) {
            console.log(`Hospital: ${h.nombre}`);
            h.congestionesActual?.forEach(c => {
                console.log(` - Nivel: ${c.nivelCongestion}, Baja: ${c.fechaHoraBaja}, Fecha: ${c.fecha}`);
            });
        }

        console.log('Filtrando hospitales con congestión BAJA...');
        const hospitalesFiltrados = hospitales.filter(hospital => {
            const ultimaCongestion = hospital.congestionesActual
                ?.filter(c => !c.fechaHoraBaja)
                ?.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];

            return ultimaCongestion?.nivelCongestion === NivelCongestionEnum.BAJA;
        });

        console.log(`Se encontraron ${hospitalesFiltrados.length} hospitales con congestión BAJA.`);
        return hospitalesFiltrados.map(hospital => {
            const ultima = hospital.congestionesActual
                ?.filter(ca => !ca.fechaHoraBaja)
                ?.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];

            console.log(`Hospital recomendado: ${hospital.nombre} con nivel de congestión ${ultima?.nivelCongestion}`);
            return {
                id: hospital.id,
                nombre: hospital.nombre,
                direccion: hospital.direccion,
                email: hospital.email,
                telefono: hospital.telefono,
                localidad: hospital.localidad ? { nombre: hospital.localidad.nombre } : undefined,
                nivelCongestion: ultima?.nivelCongestion,
                fechaActualizacionCongestion: ultima?.fecha?.toISOString() ?? undefined
            };
        });
    }

}
