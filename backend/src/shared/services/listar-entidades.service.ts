import { Hospital } from "src/domain/entities/hospital.entity";
import { GenericRepositoryService } from "./genericRepository.service";
import { Medico } from "src/domain/entities/medico.entity";
import { Paciente } from "src/domain/entities/paciente.entity";
import { Rol } from "src/domain/entities/rol.entity";
import { Usuario } from "src/domain/entities/usuario.entity";

export class ListarEntidadesService {
    constructor(
        private readonly genericRepository: GenericRepositoryService,
    ) {}

    async listarHospitales() {
        return await this.genericRepository.buscar(
            Hospital, 
            'hosp', 
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
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
}