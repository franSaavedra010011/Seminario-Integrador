import { Hospital } from 'src/hospital/entities/hospital.entity';
export declare class Localidad {
    idLocalidad: number;
    nombreLocalidad: string;
    fechaHoraBajaLocalidad: Date;
    hospitales: Hospital[];
    get getIdLocalidad(): number;
    get getNombreLocalidad(): string;
    set setNombreLocalidad(nombreLocalidad: string);
    get getFechaHoraBajaLocalidad(): Date;
    set setFechaHoraBajaLocalidad(fechaHoraBaja: Date);
}
