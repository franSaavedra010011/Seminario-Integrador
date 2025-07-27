import { Rol } from 'src/rol/entities/rol.entity';

export class CreateUsuarioRolDto {
  fechaDesdeUsuarioRol: Date;
  fechaHastaUsuarioRol?: Date;
  rol: Rol;
}
