import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @Column()
  nombreRol: string;

  @Column({ nullable: true })
  fechaHoraBajaRol: Date;

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.rol)
  usuarioRoles: UsuarioRol[];

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.rol)
  rolPermisos: RolPermiso[];

  public get getIdRol() {
    return this.idRol;
  }

  public get getNombreRol() {
    return this.nombreRol;
  }

  public set setNombreRol(nombre: string) {
    this.nombreRol = nombre;
  }

  public get getFechaHoraBajaRol() {
    return this.fechaHoraBajaRol;
  }

  public set setFechaHoraBajaRol(fecha: Date) {
    this.fechaHoraBajaRol = fecha;
  }

  public get getRolPermisos() {
    return this.rolPermisos;
  }

  public set setRolPermisos(rolPermisos: RolPermiso[]) {
    this.rolPermisos = rolPermisos;
  }
}
