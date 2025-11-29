import { Hospital } from 'src/domain/entities/hospital.entity';
import { Medico } from 'src/domain/entities/medico.entity';

export interface LocalidadResumen {
    idLocalidad: number;
    nombreLocalidad: string;
}

export interface EspecialidadResumen {
    idEspecialidad: number;
    nombreEspecialidad: string;
}

export interface HospitalResumen {
    idHospital: number;
    idHospitalEspecialidad: number;
    nombreHospital: string;
    direccionHospital: string;
    emailHospital: string;
}

export interface MedicoResumen {
    idMedico: number;
    idHEM: number;
    idEspecialidad: number;
    nombreMedico: string;
    apellidoMedico: string;
    dniMedico: string;
    matriculaMedico: string;
    nombreEspecialidad: string;
}

export interface AgendaSemanaProxima {
    idAgendaSemanal: number;
    fechaDesdeAgendaSemanal: Date;
    fechaHastaAgendaSemanal: Date;
    nroSemana: number;
}

export interface HorarioAgenda {
    idTurnoAgendaDia: number;
    idAgendaDia: number;
    disponible: boolean;
    fechaHoraAgendaDia: Date;
    horaDesdeTurnoAgendaDia: string;
    horaHastaTurnoAgendaDia: string;
}

export interface TurnoResumen {
    idHospital: number;
    nombreHospital: string;
    direccionHospital: string;
    emailHospital: string;
    telHospital: string;
    idMedico: number;
    nombreMedico: string;
    apellidoMedico: string;
    matriculaMedico: string;
    idTurno: number;
    fechaTurno: Date;
    horaTurno: string;
    observacionesTurno: string;
    idEspecialidad: number;
    nombreEspecialidad: string;
}
