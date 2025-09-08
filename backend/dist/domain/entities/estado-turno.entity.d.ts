import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Base } from './base.entity';
export declare class EstadoTurno extends Base {
    nombre: String;
    turnos: Turno[];
    turnosEstados: TurnoEstado[];
}
