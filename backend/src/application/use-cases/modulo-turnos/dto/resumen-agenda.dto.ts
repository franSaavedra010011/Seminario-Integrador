import { AgendaSemanal } from './../../../../domain/entities/agenda-semanal.entity';

export class TurnoDisponibilidadDto {
    idTurnoAgendaDia: number;
    horaDesde: string;
    horaHasta: string;
    disponible: boolean;
    fechaHoraBaja?: Date | null;
}

export class DiaAgendaDto {
    idAgendaDia: number;
    nombreDia: string;
    fechaHoraBajaDia?: Date | null;
    turnos: TurnoDisponibilidadDto[];
}

export class SemanaAgendaDto {
    idAgendaSemanal: number;
    fechaInicioSemana: Date;
    fechaFinSemana: Date;
    numeroSemana: number;
    fechaHoraBajaSemana?: Date | null;
    diasDeLaSemana: DiaAgendaDto[];
}

export class AgendaMedicoCompletoDto {
    idMedico: number;
    nombreMedico: string;
    apellidoMedico: string;
    matriculaMedico: string;
    idHospital: number;
    nombreHospital: string;
    idEspecialidad: number;
    nombreEspecialidad: string;
    semanaActual: SemanaAgendaDto[];
}