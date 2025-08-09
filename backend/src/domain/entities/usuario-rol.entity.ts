import { Rol } from 'src/domain/entities/rol.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class UsuarioRol extends Base{
  @Column()
  fechaDesde: Date;

  @Column({ nullable: true })
  fechaHasta: Date;

  @ManyToOne(() => Rol, (rol) => rol.usuarioRoles)
  rol: Rol;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioRoles)
  usuario: Usuario;
}
