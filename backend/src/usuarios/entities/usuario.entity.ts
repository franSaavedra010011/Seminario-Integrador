import { Paciente } from 'src/paciente/entities/paciente.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Medico } from 'src/medico/entities/medico.entity';
import { UsuarioRol } from 'src/usuario-rol/entities/usuario-rol.entity';
import { PersonalHospital } from 'src/personal-hospital/entities/personal-hospital.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ unique: true, nullable: false })
  usernameUsuario: string;

  @Column({ unique: true, nullable: false })
  emailUsuario: string;

  @Column({ nullable: false, select: false })
  passwordUsuario: string;

  /*@Column()
  @DeleteDateColumn()
  deleteAt: Date;
*/

  @Column({ nullable: true })
  fechaHoraBajaUsuario: Date;

  @OneToOne(() => Paciente, (paciente) => paciente.usuario)
  pacientes: Paciente;

  @OneToOne(() => Medico, (medico) => medico.usuario)
  medicos: Medico;

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.usuario)
  usuarioRoles: UsuarioRol[];

  @OneToMany(
    () => PersonalHospital,
    (personalHospital) => personalHospital.usuario,
  )
  personalHospital: PersonalHospital[];

  public getIdUsuario(): number {
    return this.idUsuario;
  }

  public setUsernameUsuario(value: string): void {
    this.usernameUsuario = value;
  }

  public getUsernameUsuario(): string {
    return this.usernameUsuario;
  }

  public setEmailUsuario(value: string): void {
    this.emailUsuario = value;
  }

  public getEmailUsuario(): string {
    return this.emailUsuario;
  }

  public setPasswordUsuario(value: string): void {
    this.passwordUsuario = value;
  }

  public getPasswordUsuario(): string {
    return this.passwordUsuario;
  }

  public setFechaHoraBajaUsuario(value: Date): void {
    this.fechaHoraBajaUsuario = value;
  }

  public getFechaHoraBajaUsuario(): Date {
    return this.fechaHoraBajaUsuario;
  }

  public setPacientes(paciente: Paciente): void {
    this.pacientes = paciente;
  }

  public getPacientes(): Paciente {
    return this.pacientes;
  }

  public setMedicos(medico: Medico): void {
    this.medicos = medico;
  }

  public getMedicos(): Medico {
    return this.medicos;
  }

  public setUsuarioRoles(usuarioRoles: UsuarioRol[]): void {
    this.usuarioRoles = usuarioRoles;
  }

  public getUsuarioRoles(): UsuarioRol[] {
    return this.usuarioRoles;
  }

  public setPersonalHospital(personal: PersonalHospital[]): void {
    this.personalHospital = personal;
  }

  public getPersonalHospital(): PersonalHospital[] {
    return this.personalHospital;
  }
}
