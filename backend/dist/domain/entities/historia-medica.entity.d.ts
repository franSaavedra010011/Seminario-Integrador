import { Medico } from 'src/domain/entities/medico.entity';
import { Turno } from 'src/turno/entities/turno.entity';
export declare class HistoriaMedica {
    idHistoriaMedica: number;
    fechaHistoriaMedica: Date;
    observacionesHistoriaMedica: string;
    fechaHoraBajaHistoriaMedica: Date;
    turno: Turno;
    medico: Medico;
    get getIdHistoriaMedica(): number;
    get getFechaHistoriaMedica(): Date;
    set setFechaHistoriaMedica(fechaHistoriaMedica: Date);
    get getObservacionesHistoriaMedica(): string;
    set setObservacionesHistoriaMedica(observacionesHistoriaMedica: string);
    get getFechaHoraBajaHistoriaMedica(): Date;
    set setFechaHoraBajaHistoriaMedica(fechaHoraBajaHistoriaMedica: Date);
    get getMedico(): Medico;
    set setMedico(value: Medico);
}
