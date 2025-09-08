import { Hospital } from 'src/domain/entities/hospital.entity';
import { Base } from './base.entity';
export declare class Localidad extends Base {
    nombre: string;
    hospitales: Hospital[];
}
