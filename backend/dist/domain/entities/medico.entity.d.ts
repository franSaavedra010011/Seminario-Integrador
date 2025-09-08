import { Base } from './base.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HistoriaMedica } from 'src/domain/entities/historia-medica.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
export declare class Medico extends Base {
    nombreMedico: string;
    apellidoMedico: string;
    dniMedico: string;
    telMedico: string;
    matriculaMedico: string;
    tiempoConsulta: number;
    turnos: Turno[];
    usuario: Usuario;
    especialidadesMedico: EspecialidadMedico[];
    historiasMedica: HistoriaMedica[];
    hospitalEspecialidadMedico: HospitalEspecialidadMedico[];
}
