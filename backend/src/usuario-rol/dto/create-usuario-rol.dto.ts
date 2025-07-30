import { Rol } from 'src/domain/entities/rol.entity';

export class CreateUsuarioRolDto {
  fechaDesdeUsuarioRol: Date;
  fechaHastaUsuarioRol?: Date;
  rol: Rol;
}
