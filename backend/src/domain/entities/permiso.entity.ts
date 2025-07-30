import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permiso {
  @PrimaryGeneratedColumn()
  idPermiso: number;

  @Column()
  rutaPermiso: string;

  @Column({ nullable: true })
  fechaHoraBajaPermiso: Date;

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.permiso)
  rolesPermiso: RolPermiso[];

  public get getIdPermiso() {
    return this.idPermiso;
  }

  public get getRutaPermiso() {
    return this.rutaPermiso;
  }

  public set setRutaPermiso(ruta: string) {
    this.rutaPermiso = ruta;
  }

  public get getFechaHoraBajaPermiso() {
    return this.fechaHoraBajaPermiso;
  }

  public set setFechaHoraBajaPermiso(fecha: Date) {
    this.fechaHoraBajaPermiso = fecha;
  }
}
