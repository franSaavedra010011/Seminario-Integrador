import { TurnosNotificarCancelacionDTO } from './turnos-notificar-cancelacion.dto';
export declare class DiasSolicitarTurnoDTO {
    nombreDia: string;
    idDia: number;
    fechaHoraBajaAgendaDia: Date | null;
    turnos: TurnosNotificarCancelacionDTO[];
}
