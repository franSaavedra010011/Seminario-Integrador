import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Base } from './base.entity';
export declare class TurnoEstado extends Base {
    fechaDesde: Date;
    fechaHasta: Date;
    turno: Turno;
    estadoTurno: EstadoTurno;
}
