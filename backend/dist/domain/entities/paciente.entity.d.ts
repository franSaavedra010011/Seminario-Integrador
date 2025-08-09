import { Base } from './base.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { PacienteNotificacion } from 'src/domain/entities/paciente-notificacion.entity';
import { Localidad } from './localidad.entity';
export declare class Paciente extends Base {
    nombrePaciente: string;
    apellidoPaciente: string;
    edadPaciente: number;
    fechaNacimientoPaciente: Date;
    celularPaciente: string;
    correoPaciente: string;
    grupoSanguineoPaciente: string;
    turnos: Turno[];
    usuario: Usuario;
    pacienteNotificaciones: PacienteNotificacion[];
    localidad: Localidad;
}
