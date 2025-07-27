import { Hospital } from 'src/hospital/entities/hospital.entity';
export declare class CongestionHistorico {
    idCongestionHistorico: number;
    fechaCongestionHistorico: Date;
    horaActualizacionCongestionHistorico: number;
    turnosCanceladosCongestionHistorico: number;
    turnosNoAsistidosCongestionHistorico: number;
    turnosAsistidosCongestionHistorico: number;
    turnosMaximoDiaCongestionHistorico: number;
    fechaHoraBajaCongestionHistorico: Date;
    hospital: Hospital;
    get getIdCongestionHistorico(): number;
    get getFechaCongestionHistorico(): Date;
    set setFechaCongestionHistorico(fechaCongestionHistorico: Date);
    get getHoraActualizacionCongestionHistorico(): number;
    set setHoraActualizacionCongestionHistorico(horaActualizacionCongestionHistorico: number);
    get getTurnosCanceladosCongestionHistorico(): number;
    set setTurnosCanceladosCongestionHistorico(turnosCanceladosCongestionHistorico: number);
    get getTurnosNoAsistidosCongestionHistorico(): number;
    set setTurnosNoAsistidosCongestionHistorico(turnosNoAsistidosCongestionHistorico: number);
    get getTurnosAsistidosCongestionHistorico(): number;
    set setTurnosAsistidosCongestionHistorico(turnosAsistidosCongestionHistorico: number);
    get getTurnosMaximoDiaCongestionHistorico(): number;
    set setTurnosMaximoDiaCongestionHistorico(turnosMaximoDiaCongestionHistorico: number);
    get getFechaHoraBajaCongestionHistorico(): Date;
    set setFechaHoraBajaCongestionHistorico(fechaHoraBajaCongestionHistorico: Date);
}
