import { Base } from './base.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
export declare class PersonalHospital extends Base {
    fechaDesde: Date;
    hospital: Hospital;
    usuario: Usuario;
}
