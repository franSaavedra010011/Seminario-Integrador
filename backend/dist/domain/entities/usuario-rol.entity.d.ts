import { Rol } from 'src/domain/entities/rol.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { Base } from './base.entity';
export declare class UsuarioRol extends Base {
    fechaDesde: Date;
    fechaHasta: Date;
    rolActivo: boolean;
    rol: Rol;
    usuario: Usuario;
}
