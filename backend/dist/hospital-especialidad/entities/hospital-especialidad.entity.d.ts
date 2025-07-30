import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { HospitalEspecialidadMedico } from 'src/hospital-especialidad-medico/entities/hospital-especialidad-medico.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
export declare class HospitalEspecialidad {
    idHospitalEspecialidad: number;
    fechaDesdeHospitalEspecialidad: Date;
    fechaHastaHospitalEspecialidad: Date;
    hospital: Hospital;
    especialidad: Especialidad;
    hospitalEspecialidadMedico: HospitalEspecialidadMedico[];
    get getIdHospitalEspecialidad(): number;
    get getFechaDesdeHospitalEspecialidad(): Date;
    set setFechaDesdeHospitalEspecialidad(fechaDesdeHospitalEspecialidad: Date);
    get getFechaHastaHospitalEspecialidad(): Date;
    set setFechaHastaHospitalEspecialidad(fechaHastaHospitalEspecialidad: Date);
    getHospitalEspecialidadMedico(): HospitalEspecialidadMedico[];
    setHospitalEspecialidadMedico(hospitalEspecialidadMedico: HospitalEspecialidadMedico[]): void;
    getEspecialidad(): Especialidad;
    set setEspecialidad(especialidad: Especialidad);
}
