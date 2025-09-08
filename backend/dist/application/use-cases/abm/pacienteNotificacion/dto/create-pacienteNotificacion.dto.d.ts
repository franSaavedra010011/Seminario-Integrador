import { Paciente } from 'src/domain/entities/paciente.entity';
import { Turno } from 'src/domain/entities/turno.entity';
export declare class CreatePacienteNotificacionDto {
    observaciones: string;
    paciente: Paciente;
    turno: Turno;
}
