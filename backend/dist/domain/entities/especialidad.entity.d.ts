import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Base } from './base.entity';
export declare class Especialidad extends Base {
    nombre: string;
    descripcion: string;
    turnos: Turno[];
    especialidadesMedico: EspecialidadMedico[];
    hospitalEspecialidades: HospitalEspecialidad[];
}
