import { CongestionActual } from 'src/domain/entities/congestion-actual.entity';
import { CongestionHistorico } from 'src/domain/entities/congestion-historico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Localidad } from 'src/domain/entities/localidad.entity';
import { PersonalHospital } from 'src/domain/entities/personal-hospital.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Base } from './base.entity';
export declare class Hospital extends Base {
    nombre: string;
    direccion: string;
    email: string;
    telefono: string;
    hospitalEspecialidades: HospitalEspecialidad[];
    congestionesHistorico: CongestionHistorico[];
    congestionesActual: CongestionActual[];
    personalHospital: PersonalHospital[];
    turnos: Turno[];
    localidad: Localidad;
}
