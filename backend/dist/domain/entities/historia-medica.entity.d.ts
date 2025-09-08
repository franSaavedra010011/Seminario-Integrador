import { Medico } from 'src/domain/entities/medico.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Base } from './base.entity';
export declare class HistoriaMedica extends Base {
    fecha: Date;
    observaciones: string;
    turno: Turno;
    medico: Medico;
}
