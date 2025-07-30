import { Rol } from 'src/domain/entities/rol.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioRol {
  @PrimaryGeneratedColumn()
  idUsuarioRol: number;

  @Column()
  fechaDesdeUsuarioRol: Date;

  @Column({ nullable: true })
  fechaHastaUsuarioRol: Date;

  @ManyToOne(() => Rol, (rol) => rol.usuarioRoles)
  rol: Rol;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioRoles)
  usuario: Usuario;

  public get getIdUsuarioRol(): number {
    return this.idUsuarioRol;
  }

  public get getFechaDesdeUsuarioRol(): Date {
    return this.fechaDesdeUsuarioRol;
  }

  public set setFechaDesdeUsuarioRol(value: Date) {
    this.fechaDesdeUsuarioRol = value;
  }

  public get getFechaHastaUsuarioRol(): Date {
    return this.fechaHastaUsuarioRol;
  }

  public set setFechaHastaUsuarioRol(value: Date) {
    this.fechaHastaUsuarioRol = value;
  }

  public get getRol(): Rol {
    return this.rol;
  }

  public setRol(value: Rol): void {
    this.rol = value;
  }
}
