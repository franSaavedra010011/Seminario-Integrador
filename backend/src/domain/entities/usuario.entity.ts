import { Base } from 'src/domain/entities/base.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { PersonalHospital } from 'src/domain/entities/personal-hospital.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Usuario extends Base {
  @Column({ unique: true, nullable: false })
  usernameUsuario: string;

  @Column({ unique: true, nullable: false })
  emailUsuario: string;

  @Column({ nullable: false })
  passwordUsuario: string;

  @OneToOne(() => Paciente, (paciente) => paciente.usuario, { nullable: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'id' })
  paciente: Paciente;

  @OneToOne(() => Medico, (medico) => medico.usuario, { nullable: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idMedico', referencedColumnName: 'id' })
  medico: Medico;

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.usuario)
  @JoinColumn({ name: 'idUsuario', referencedColumnName: 'id' })
  usuarioRoles: UsuarioRol[];

  @OneToMany(() => PersonalHospital, (personalHospital) => personalHospital.usuario, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPersonalHospital', referencedColumnName: 'id' })
  personalHospital: PersonalHospital[];
}
