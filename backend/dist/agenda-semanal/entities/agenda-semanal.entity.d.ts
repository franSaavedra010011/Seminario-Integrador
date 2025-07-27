import { AgendaDia } from 'src/agenda-dia/entities/agenda-dia.entity';
import { HospitalEspecialidadMedico } from 'src/hospital-especialidad-medico/entities/hospital-especialidad-medico.entity';
export declare class AgendaSemanal {
    idAgendaSemanal: number;
    fechaDesdeAgendaSemanal: Date;
    fechaHastaAgendaSemanal: Date;
    fechaHoraBajaAgendaSemanal: Date;
    nroSemana: number;
    hospitalEspecialidadMedico: HospitalEspecialidadMedico;
    agendasDia: AgendaDia[];
    get getIdAgendaSemanal(): number;
    get getFechaDesdeAgendaSemanal(): Date;
    set setFechaDesdeAgendaSemanal(fechaDesdeAgendaSemanal: Date);
    get getFechaHastaAgendaSemanal(): Date;
    set setFechaHastaAgendaSemanal(fechaHastaAgendaSemanal: Date);
    get getFechaHoraBajaAgendaSemanal(): Date;
    set setFechaHoraBajaAgendaSemanal(fechaHoraBajaAgendaSemanal: Date);
    get getNroSemana(): number;
    set setNroSemana(nroSemana: number);
    get getAgendasDia(): AgendaDia[];
    set setAgendasDia(agendasDia: AgendaDia[]);
}
