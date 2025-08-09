import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Base } from './base.entity';
export declare class HospitalEspecialidad extends Base {
    fechaDesde: Date;
    fechaHasta: Date;
    hospital: Hospital;
    especialidad: Especialidad;
    hospitalEspecialidadMedico: HospitalEspecialidadMedico[];
}
