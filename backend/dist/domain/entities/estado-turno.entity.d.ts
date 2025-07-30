import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';
import { Turno } from 'src/turno/entities/turno.entity';
export declare class EstadoTurno {
    idEstadoTurno: number;
    nombreEstadoTurno: string;
    fechaHoraBajaEstadoTurno: Date;
    turno: Turno;
    turnosEstados: TurnoEstado[];
    get getIdEstadoTurno(): number;
    get getNombreEstadoTurno(): string;
    set setNombreEstadoTurno(nombreEstadoTurno: string);
    get getFechaHoraBajaEstadoTurno(): Date;
    set setFechaHoraBajaEstadoTurno(fechaHoraBajaEstadoTurno: Date);
}
