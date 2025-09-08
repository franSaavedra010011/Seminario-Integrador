import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Base } from './base.entity';
export declare class EspecialidadMedico extends Base {
    fechaDesde: Date;
    fechaHasta: Date;
    especialidad: Especialidad;
    medico: Medico;
}
