import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Base } from './base.entity';
export declare class HospitalEspecialidadMedico extends Base {
    fechaDesde: Date;
    fechaHasta: Date;
    hospitalEspecialidad: HospitalEspecialidad;
    medico: Medico;
    agendaSemanales: AgendaSemanal[];
}
