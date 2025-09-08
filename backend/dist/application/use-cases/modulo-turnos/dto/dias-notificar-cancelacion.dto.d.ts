import { TurnosNotificarCancelacionDTO } from './turnos-notificar-cancelacion.dto';
export declare class DiasNotificarCancelacionDTO {
    nombreDia: string;
    idAgendaDia: Number;
    fechaHoraBajaAgendaDia: Date | null;
    turnos: TurnosNotificarCancelacionDTO[];
}
