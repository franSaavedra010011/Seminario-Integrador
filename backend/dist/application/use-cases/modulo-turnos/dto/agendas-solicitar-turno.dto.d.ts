import { DiasSolicitarTurnoDTO } from './dias-solicitar-turno.dto';
export declare class AgendasSolicitarTurnoDTO {
    idSemana: number;
    nroSemana: number;
    fechaDesde: Date;
    fechaHasta: Date;
    dias: DiasSolicitarTurnoDTO[];
}
