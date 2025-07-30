import { Paciente } from 'src/domain/entities/paciente.entity';
import { Turno } from 'src/turno/entities/turno.entity';
export declare class PacienteNotificacion {
    idPacienteNotificacion: number;
    observacionPacienteNotificacion: string;
    fechaHoraBajaPacienteNotificacion: Date;
    paciente: Paciente;
    turno: Turno;
    get getIdPacienteNotificacion(): number;
    get getObservacionPacienteNotificacion(): string;
    set setObservacionPacienteNotificacion(observacion: string);
    get getFechaHoraBajaPacienteNotificacion(): Date;
    set setFechaHoraBajaPacienteNotificacion(fecha: Date);
    get getTurno(): Turno;
    set setTurno(turno: Turno);
}
