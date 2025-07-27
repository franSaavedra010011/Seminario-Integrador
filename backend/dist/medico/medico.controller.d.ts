import { MedicoService } from './medico.service';
export declare class MedicoController {
    private readonly medicoService;
    constructor(medicoService: MedicoService);
    obtenerTodos(): Promise<import("./entities/medico.entity").Medico[]>;
}
