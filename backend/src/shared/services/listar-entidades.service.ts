import { Hospital } from "src/domain/entities/hospital.entity";
import { GenericRepositoryService } from "./genericRepository.service";
import { Medico } from "src/domain/entities/medico.entity";
import { Paciente } from "src/domain/entities/paciente.entity";
import { Rol } from "src/domain/entities/rol.entity";
import { Usuario } from "src/domain/entities/usuario.entity";
import { Especialidad } from "src/domain/entities/especialidad.entity";
import { Injectable } from "@nestjs/common";
import { Repository, IsNull } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Localidad } from "src/domain/entities/localidad.entity";

@Injectable()
export class ListarEntidadesService {

    constructor(
        private readonly genericRepository: GenericRepositoryService,
        @InjectRepository(Hospital)
        private readonly hospitalRepo: Repository<Hospital>,
    ) { }

    async listarEspecialidades() {
        return await this.genericRepository.buscar(
            Especialidad,
            'espe',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }

    async listarHospitales(
        opcion: 'simple' | 'localidad' | 'completo' = 'simple'
    ): Promise<Hospital[]> {
        const relacionesBase: string[] = [];
        switch (opcion) {
            case 'localidad':
                relacionesBase.push('localidad');
                break;

            case 'completo':
                relacionesBase.push(
                    'localidad',
                    'hospitalEspecialidades',
                    'hospitalEspecialidades.especialidad',
                    'hospitalEspecialidades.hospitalEspecialidadMedico',
                    'hospitalEspecialidades.hospitalEspecialidadMedico.medico',
                    'congestionesActual',
                    'congestionesHistorico',
                    'personalHospital',
                    'turnos',
                )
                break;

            case 'simple':
            default:
                break;
        }

        return await this.hospitalRepo.find({
            where: { fechaHoraBaja: IsNull() },
            relations: relacionesBase,
            order: { nombre: 'ASC' },
        });
    }



    async listarPacientes() {
        return await this.genericRepository.buscar(
            Paciente,
            'paci',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }

    async listarMedicos() {
        return await this.genericRepository.buscar(
            Medico,
            'medi',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }

    async listarUsuarios() {
        return await this.genericRepository.buscar(
            Usuario,
            'usua',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }

    async listarRoles() {
        return await this.genericRepository.buscar(
            Rol,
            'rol',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }

    async listarLocalidades() {
        return await this.genericRepository.buscar(
            Localidad,
            'loc',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }
}