import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
export declare class AgendaDia {
    idAgendaDia: number;
    nombreAgendaDia: string;
    fechaHoraBajaAgendaDia: Date;
    agendaSemanal: AgendaSemanal;
    turnosAgendaDia: TurnoAgendaDia[];
    get getIdAgendaDia(): number;
    get getNombreAgendaDia(): string;
    set setNombreAgendaDia(nombreAgendaDia: string);
    get getFechaHoraBajaAgendaDia(): Date;
    set setFechaHoraBajaAgendaDia(fechaHoraBajaAgendaDia: Date);
    get getTurnosAgendaDia(): TurnoAgendaDia[];
    set setTurnosAgendaDia(turnosAgendaDia: TurnoAgendaDia[]);
}
