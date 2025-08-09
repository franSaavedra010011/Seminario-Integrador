import { AgendaDia } from 'src/domain/entities/agenda-dia.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Base } from './base.entity';
export declare class TurnoAgendaDia extends Base {
    disponible: boolean;
    horaDesde: string;
    horaHasta: string;
    agendaDia: AgendaDia;
    turno: Turno;
}
