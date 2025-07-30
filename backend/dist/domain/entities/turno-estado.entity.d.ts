import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { Turno } from 'src/turno/entities/turno.entity';
export declare class TurnoEstado {
    idTurnoEstado: number;
    fechaDesdeTurnoEstado: Date;
    fechaHastaTurnoEstado: Date;
    turno: Turno;
    estadoTurno: EstadoTurno;
    get getIdTurnoEstado(): number;
    get getFechaDesdeTurnoEstado(): Date;
    set setFechaDesdeTurnoEstado(value: Date);
    get getFechaHastaTurnoEstado(): Date;
    set setFechaHastaTurnoEstado(value: Date);
    get getEstadoTurno(): EstadoTurno;
    set setEstadoTurno(value: EstadoTurno);
}
