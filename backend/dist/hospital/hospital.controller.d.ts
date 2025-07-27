import { HospitalService } from './hospital.service';
export declare class HospitalController {
    private readonly hospitalService;
    constructor(hospitalService: HospitalService);
    buscarHospitales(): Promise<import("./dtos/buscarHospitales.dto").BuscarHospitalesDTO[]>;
}
