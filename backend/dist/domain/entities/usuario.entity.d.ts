import { Base } from 'src/domain/entities/base.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { PersonalHospital } from 'src/domain/entities/personal-hospital.entity';
export declare class Usuario extends Base {
    usernameUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    paciente: Paciente;
    medico: Medico;
    usuarioRoles: UsuarioRol[];
    personalHospital: PersonalHospital[];
}
