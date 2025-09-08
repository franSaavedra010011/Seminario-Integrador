import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Medico } from 'src/domain/entities/medico.entity';
export declare class CreateTurnoDto {
    estadoTurno: EstadoTurno;
    hospital: Hospital;
    especialidad: Especialidad;
    medico: Medico;
    fechaTurno: Date;
    horaTurno: string;
    descripcion: string | null;
}
