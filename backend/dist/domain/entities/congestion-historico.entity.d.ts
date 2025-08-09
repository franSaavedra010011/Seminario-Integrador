import { Hospital } from 'src/domain/entities/hospital.entity';
import { Base } from './base.entity';
export declare class CongestionHistorico extends Base {
    fecha: Date;
    horaActualizacion: number;
    turnosCancelados: number;
    turnosNoAsistidos: number;
    turnosAsistidos: number;
    turnosMaximoDia: number;
    hospital: Hospital;
}
