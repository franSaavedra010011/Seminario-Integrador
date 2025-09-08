import { Base } from './base.entity';
import { AgendaDia } from './agenda-dia.entity';
import { HospitalEspecialidadMedico } from './hospital-especialidad-medico.entity';
export declare class AgendaSemanal extends Base {
    fechaDesdeAgendaSemanal: Date;
    fechaHastaAgendaSemanal: Date;
    nroSemana: number;
    hospitalEspecialidadMedico: HospitalEspecialidadMedico;
    agendasDia: AgendaDia[];
}
