import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { Base } from './base.entity';
import { DiaSemanaEnum } from '../enums/dia-semana.enum';
export declare class AgendaDia extends Base {
    nombreAgendaDia: DiaSemanaEnum;
    agendaSemanal: AgendaSemanal;
    turnosAgendaDia: TurnoAgendaDia[];
}
