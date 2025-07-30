import { Permiso } from 'src/domain/entities/permiso.entity';
import { Rol } from 'src/domain/entities/rol.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolPermiso {
  @PrimaryGeneratedColumn()
  idRolPermiso: number;

  @Column()
  fechaDesdeRolPermiso: Date;

  @Column({ nullable: true })
  fechaHastaRolPermiso: Date;

  @ManyToOne(() => Permiso, (permiso) => permiso.rolesPermiso)
  permiso: Permiso;

  @ManyToOne(() => Rol, (rol) => rol.rolPermisos)
  rol: Rol;

  public get getIdRolPermiso() {
    return this.idRolPermiso;
  }

  public get getFechaDesdeRolPermiso() {
    return this.fechaDesdeRolPermiso;
  }

  public set setFechaDesdeRolPermiso(fecha: Date) {
    this.fechaDesdeRolPermiso = fecha;
  }

  public get getFechaHastaRolPermiso() {
    return this.fechaHastaRolPermiso;
  }

  public set setFechaHastaRolPermiso(fecha: Date) {
    this.fechaHastaRolPermiso = fecha;
  }

  public get getPermiso() {
    return this.permiso;
  }

  public set setPermiso(permiso: Permiso) {
    this.permiso = permiso;
  }
}
