import { Hospital } from 'src/domain/entities/hospital.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
export declare class PersonalHospital {
    idPersonalHospital: number;
    fechaDesdePersonalHospital: Date;
    fechaHastaPersonalHospital: Date;
    hospital: Hospital;
    usuario: Usuario;
    get getIdPersonalHospital(): number;
    get getFechaDesdePersonalHospital(): Date;
    set setFechaDesdePersonalHospital(fecha: Date);
    get getFechaHastaPersonalHospital(): Date;
    set setFechaHastaPersonalHospital(fecha: Date);
    get getHospital(): Hospital;
    set setHospital(hospital: Hospital);
}
