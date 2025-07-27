import { EspecialidadService } from './especialidad.service';
export declare class EspecialidadController {
    private readonly especialidadService;
    constructor(especialidadService: EspecialidadService);
    buscarEspecialidades(body: {
        idHospital: number;
    }): Promise<import("./dtos/buscarEspecialidades.dto").BuscarEspecialidadesDTO[]>;
}
