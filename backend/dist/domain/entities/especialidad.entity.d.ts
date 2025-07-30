import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Turno } from 'src/domain/entities/turno.entity';
export declare class Especialidad {
    idEspecialidad: number;
    nombreEspecialidad: string;
    descripcionEspecialidad: string;
    fechaHoraBajaEspecialidad: Date;
    turnos: Turno[];
    especialidadesMedico: EspecialidadMedico[];
    hospitalEspecialidades: HospitalEspecialidad[];
    getIdEspecialidad(): number;
    get getNombreEspecialidad(): string;
    set setNombreEspecialidad(nombreEspecialidad: string);
    get getDescripcionEspecialidad(): string;
    set setDescripcionEspecialidad(descripcionEspecialidad: string);
    get getFechaHoraBajaEspecialidad(): Date;
    set setFechaHoraBajaEspecialidad(fechaHoraBajaEspecialidad: Date);
    getEspecialidadesMedico(): EspecialidadMedico[];
    setEspecialidadesMedico(especialidadesMedico: EspecialidadMedico[]): void;
}
