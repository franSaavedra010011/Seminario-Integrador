import { Base } from './base.entity';
import { Paciente } from './paciente.entity';
import { Medico } from './medico.entity';
import { EstadoTurno } from './estado-turno.entity';
import { TurnoEstado } from './turno-estado.entity';
import { Especialidad } from './especialidad.entity';
import { HistoriaMedica } from './historia-medica.entity';
import { TurnoAgendaDia } from './turno-agenda-dia.entity';
import { Hospital } from './hospital.entity';
import { PacienteNotificacion } from './paciente-notificacion.entity';
export declare class Turno extends Base {
    fecha: Date;
    hora: string;
    observaciones: string;
    presentismo: boolean;
    paciente: Paciente;
    medico: Medico;
    estadoTurno: EstadoTurno;
    turnosEstados: TurnoEstado[];
    especialidad: Especialidad;
    historiasMedica: HistoriaMedica[];
    turnoAgendaDia: TurnoAgendaDia;
    hospital: Hospital;
    pacienteNotificaciones: PacienteNotificacion[];
}
