import { Hospital } from 'src/domain/entities/hospital.entity';
import { Base } from './base.entity';
import { NivelCongestionEnum } from '../enums/nivel-congestion.enum';
export declare class CongestionActual extends Base {
    fecha: Date;
    horaActualizacion: number;
    nivelCongestion: NivelCongestionEnum;
    turnosCancelados: number;
    turnosNoAsistidos: number;
    turnosAsistidos: number;
    turnosEnProceso: number;
    hospital: Hospital;
}
