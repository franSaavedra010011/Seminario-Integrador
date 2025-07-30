import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
export declare class HospitalEspecialidadMedico {
    idHospitalEspecialidadMedico: number;
    fechaDesdeHospitalEspecialidadMedico: Date;
    fechaHastaHospitalEspecialidadMedico: Date;
    hospitalEspecialidad: HospitalEspecialidad;
    medico: Medico;
    agendaSemanales: AgendaSemanal[];
    get getIdHospitalEspecialidadMedico(): number;
    get getFechaDesdeHospitalEspecialidadMedico(): Date;
    set setFechaDesdeHospitalEspecialidadMedico(fechaDesde: Date);
    get getFechaHastaHospitalEspecialidadMedico(): Date;
    set setFechaHastaHospitalEspecialidadMedico(fechaHasta: Date);
    get getMedico(): Medico;
    setMedico(medico: Medico): void;
    get getAgendaSemanales(): AgendaSemanal[];
    set setAgendaSemanales(agendaSemanales: AgendaSemanal[]);
}
