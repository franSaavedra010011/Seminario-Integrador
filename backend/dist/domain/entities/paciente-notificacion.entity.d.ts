import { Paciente } from 'src/domain/entities/paciente.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Base } from './base.entity';
export declare class PacienteNotificacion extends Base {
    observacionPacienteNotificacion: string;
    paciente: Paciente;
    turno: Turno;
}
