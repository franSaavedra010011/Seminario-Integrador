import { Rol } from 'src/rol/entities/rol.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
export declare class UsuarioRol {
    idUsuarioRol: number;
    fechaDesdeUsuarioRol: Date;
    fechaHastaUsuarioRol: Date;
    rol: Rol;
    usuario: Usuario;
    get getIdUsuarioRol(): number;
    get getFechaDesdeUsuarioRol(): Date;
    set setFechaDesdeUsuarioRol(value: Date);
    get getFechaHastaUsuarioRol(): Date;
    set setFechaHastaUsuarioRol(value: Date);
    get getRol(): Rol;
    setRol(value: Rol): void;
}
