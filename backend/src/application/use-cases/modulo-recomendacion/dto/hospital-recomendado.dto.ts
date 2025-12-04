import { NivelCongestionEnum } from 'src/domain/enums/nivel-congestion.enum';

export class HospitalRecomendadoDto {
    id: number;
    nombre: string;
    direccion: string;
    email: string;
    telefono: string;
    localidad?: { nombre: string };
    nivelCongestion?: NivelCongestionEnum;
    fechaActualizacionCongestion?: string;
}
