import { Hospital } from 'src/hospital/entities/hospital.entity';
export declare class CongestionActual {
    idCongestionActual: number;
    fechaCongestionActual: Date;
    horaActualizacionCongestionActual: number;
    turnosCanceladosCongestionActual: number;
    turnosNoAsistidosCongestionActual: number;
    turnosAsistidosCongestionActual: number;
    turnosEnProcesoCongestionActual: number;
    fechaHoraBajaCongestionActual: Date;
    hospital: Hospital;
    get getIdCongestionActual(): number;
    get getFechaCongestionActual(): Date;
    set setFechaCongestionActual(fechaCongestionActual: Date);
    get getHoraActualizacionCongestionActual(): number;
    set setHoraActualizacionCongestionActual(horaActualizacionCongestionActual: number);
    get getTurnosCanceladosCongestionActual(): number;
    set setTurnosCanceladosCongestionActual(turnosCanceladosCongestionActual: number);
    get getTurnosNoAsistidosCongestionActual(): number;
    set setTurnosNoAsistidosCongestionActual(turnosNoAsistidosCongestionActual: number);
    get getTurnosAsistidosCongestionActual(): number;
    set setTurnosAsistidosCongestionActual(turnosAsistidosCongestionActual: number);
    get getTurnosEnProcesoCongestionActual(): number;
    set setTurnosEnProcesoCongestionActual(turnosEnProcesoCongestionActual: number);
    get getFechaHoraBajaCongestionActual(): Date;
    set setFechaHoraBajaCongestionActual(fechaHoraBajaCongestionActual: Date);
}
