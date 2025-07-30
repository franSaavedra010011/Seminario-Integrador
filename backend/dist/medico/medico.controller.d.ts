import { MedicoService } from './medico.service';
export declare class MedicoController {
    private readonly medicoService;
    constructor(medicoService: MedicoService);
    obtenerTodos(): Promise<import("../domain/entities/medico.entity").Medico[]>;
}
