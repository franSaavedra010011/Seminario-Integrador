import { AgendaDia } from 'src/agenda-dia/entities/agenda-dia.entity';
import { Turno } from 'src/turno/entities/turno.entity';
export declare class TurnoAgendaDia {
    idTurnoAgendaDia: number;
    disponibleTurnoAgendaDia: boolean;
    horaDesdeTurnoAgendaDia: string;
    horaHastaTurnoAgendaDia: string;
    fechaHoraBajaTurnoAgendaDia: Date;
    agendaDia: AgendaDia;
    turno: Turno;
    get getIdTurnoAgendaDia(): number;
    get getDisponibleTurnoAgendaDia(): boolean;
    set setDisponibleTurnoAgendaDia(value: boolean);
    get getHoraDesdeTurnoAgendaDia(): string;
    set setHoraDesdeTurnoAgendaDia(value: string);
    get getHoraHastaTurnoAgendaDia(): string;
    set setHoraHastaTurnoAgendaDia(value: string);
    get getFechaHoraBajaTurnoAgendaDia(): Date;
    set setFechaHoraBajaTurnoAgendaDia(value: Date);
    get getTurno(): Turno;
    set setTurno(value: Turno);
}
