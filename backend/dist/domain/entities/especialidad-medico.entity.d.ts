import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
export declare class EspecialidadMedico {
    idEspecialidadMedico: number;
    fechaDesdeEspecialidadMedico: Date;
    fechaHastaEspecialidadMedico: Date;
    especialidad: Especialidad;
    medico: Medico;
    get getIdEspecialidadMedico(): number;
    get getFechaDesdeEspecialidadMedico(): Date;
    set setFechaDesdeEspecialidadMedico(fechaDesdeEspecialidadMedico: Date);
    get getFechaHastaEspecialidadMedico(): Date;
    set setFechaHastaEspecialidadMedico(fechaHastaEspecialidadMedico: Date);
    get getMedico(): Medico;
    setMedico(medico: Medico): void;
    setEspecialidad(especialidad: Especialidad): void;
}
