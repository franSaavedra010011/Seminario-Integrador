import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { Rol } from 'src/domain/entities/rol.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/create-usuario.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly abmUsuarioUseCase: AbmUsuarioUseCase,
    private readonly jwtService: JwtService,
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  /*
    CU N°1: Registrar
    Actor: Usuario
    Parámetros de entrada:
      RegisterDTO:
      - username
      - email
      - password
      - roles (array de strings)
  */
  async register(registerDto: RegisterDTO): Promise<Usuario> {

    /*
      Buscar instancia de usuario existente:
        - Con email igual al proporcionado
    */
    const existente = await this.genericRepository.buscar(Usuario, 'usuario', [
      { atributo: 'emailUsuario', operacion: '=', valor: registerDto.emailUsuario },
    ]);

    // Comprobar que no existe ya un usuario con el email proporcionado
    if (existente.length > 0) {
      // CA N°1: ya existe un usuario con ese email
      throw new BadRequestException('Usuario ya existente');
    }

    // Nota: array para almacenar los id de los roles encontrados
    const idRoles: number[] = [];

    // Por cada nombre de rol proporcionado
    for (const nombreRol of registerDto.roles) {
      /*
        Buscar instancia de rol existente:
          - Con nombre igual al proporcionado
          - Con fechaHoraBaja igual a null (Rol vigente)
      */
      const rolesEncontrados = await this.genericRepository.buscar(
        Rol,
        'rol',
        [
          { atributo: 'nombre', operacion: '=', valor: nombreRol.trim().toUpperCase() },
          { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
        ]
      );

      // Comprobar que existe al menos un rol con el nombre proporcionado
      if (!rolesEncontrados.length) {
        // CA N°2: no existe rol con ese nombre
        throw new BadRequestException(`El rol "${nombreRol}" no existe`);
      }

      // Leer id del rol encontrado
      idRoles.push(rolesEncontrados[0].id);
    }

    /*
      Crear instancia de CreateUsuarioDto:
        - Con username proporcionado
        - Con email proporcionado
        - Con password proporcionado
        - Con idRoles (array de id de roles encontrados)
    */ 
    const createUsuarioDto: CreateUsuarioDto = {
      usernameUsuario: registerDto.usernameUsuario,
      emailUsuario: registerDto.emailUsuario,
      passwordUsuario: registerDto.passwordUsuario,
      idRoles
    };

    // Ir a CU: ABM Usuario (opcion "Alta")
    return await this.abmUsuarioUseCase.crear(createUsuarioDto);
  }

  /*
    CU N°2: Iniciar sesión
    Actor: Usuario
    Parámetros de entrada:
      - email
      - password
  */
  async login({ email, password }: LoginDTO) {

    // Buscar instancia de usuario existente con el email proporcionado
    const usuarios = await this.genericRepository.buscar(
      Usuario,
      'usuario',
      [{ atributo: 'emailUsuario', operacion: '=', valor: email }],
      ['usuarioRoles', 'usuarioRoles.rol', 'usuarioRoles.rol.rolPermisos', 'usuarioRoles.rol.rolPermisos.permiso']
    );

    // Comprobar que existe al menos un usuario con el email proporcionado
    if (!usuarios.length) {
      // CA N°1: no existe usuario con ese email
      throw new UnauthorizedException('El email ingresado no coincide con ningún usuario registrado');
    }

    // Leer instancia de usuario encontrada
    const usuario = usuarios[0];

    /*
      Buscar instancia de usuario existente:
        - Con id igual al de la instancia de usuario encontrada
    */
    const usuarioConPassword = await this.genericRepository.buscar(
      Usuario,
      'usuario',
      [{ atributo: 'id', operacion: '=', valor: usuario.id }],
    );

    // Comprobar que existe al menos un usuario con el id proporcionado
    if (!usuarioConPassword.length) {
      // CA N°2: no existe usuario con ese id
      throw new UnauthorizedException('No se pudo recuperar la contraseña');
    }

    // Comprobar que la contraseña proporcionada coincide con la almacenada
    const isPasswordValid = await bcryptjs.compare(
      password,
      usuarioConPassword[0].passwordUsuario,
    );

    // Comprobar que la contraseña es válida
    if (!isPasswordValid) {
      // CA N°3: la contraseña no coincide
      throw new UnauthorizedException('La contraseña ingresada es incorrecta');
    }

    // Leer instancia/s de rol asociada/s al usuario
    /*
      Por cada relacion ur (UsuarioRol):
        - Leer idRol
        - Leer nombreRol
        - Leer permiso/s
          - Por cada relacion rp (RolPermiso):
            - Comprobar que fechaHasta es null (Permiso vigente)
            - Leer codigo (en minúsculas y sin espacios al inicio o final)
    */
    const roles = (usuario.usuarioRoles || []).map(ur => ({
      idRol: ur.rol.id,
      nombreRol: ur.rol.nombre,
      permisos: (ur.rol.rolPermisos || [])
        .filter(rp => !rp.fechaHasta)
        .map(rp => rp.permiso.codigo.trim().toLowerCase())
    }));

    // Comprobar que el usuario tiene un solo rol asignado
    if (roles.length === 1) {
      // Leer rol
      const rol = roles[0];
      
      /*
        Crear instancia de payload:
          - Con id de usuario
          - Con email de usuario
          - Con nombre de rol
          - Con permiso/s (en minúsculas y sin espacios al inicio o final)            
      */ 
      const payload = {
        sub: usuario.id,
        email: usuario.emailUsuario,
        rol: rol.nombreRol,
        permisos: rol.permisos
      };
      
      /*
        Crear instancia de token JWT:
          - Relacionada a la instancia de payload creada
          - Con expiración de 15 minutos
      */
      const token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

      /*
        Parametros de salida:
          - token JWT
          - nombre de rol
          - permiso/s (en minúsculas y sin espacios al inicio o final)
      */
      return {
        token,
        rolSeleccionado: rol.nombreRol,
        permisos: rol.permisos
      };
    }

    // CA N°4: el usuario tiene más de un rol asignado
    /*
      Parametros de salida:
        - id de usuario
        - email de usuario
        - roles (id y nombre de cada rol asignado al usuario)
    */
    return {
      usuarioId: usuario.id,
      email: usuario.emailUsuario,
      roles: roles.map(r => ({ idRol: r.idRol, nombreRol: r.nombreRol }))
    };
  }

  async seleccionarRol(usuarioId: number, idRol: number) {
    const usuarios = await this.genericRepository.buscar(
      Usuario,
      'usuario',
      [{ atributo: 'id', operacion: '=', valor: usuarioId }],
      ['usuarioRoles', 'usuarioRoles.rol', 'usuarioRoles.rol.rolPermisos', 'usuarioRoles.rol.rolPermisos.permiso']
    );

    if (!usuarios.length) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const usuario = usuarios[0];

    const usuarioRolSeleccionado = usuario.usuarioRoles.find(ur => ur.rol.id === idRol);
    if (!usuarioRolSeleccionado) {
      throw new UnauthorizedException('El rol seleccionado no pertenece al usuario');
    }

    // Actualizar rol activo (si querés persistirlo)
    for (const ur of usuario.usuarioRoles) {
      ur.rolActivo = ur.rol.id === idRol;
      await this.genericRepository.guardarCambios(ur.constructor, ur);
    }

    const permisos = usuarioRolSeleccionado.rol.rolPermisos
      .filter(rp => !rp.fechaHasta)
      .map(rp => rp.permiso.codigo.trim().toLowerCase()); // cambio a 'codigo'

    const payload = {
      sub: usuario.id,
      email: usuario.emailUsuario,
      rol: usuarioRolSeleccionado.rol.nombre,
      permisos
    };

    const token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

    return {
      token,
      rolSeleccionado: usuarioRolSeleccionado.rol.nombre,
      permisos
    };
  }

  async profile({ email, rol, roles }: { email: string; rol?: string; roles?: string[] }) {
    const role = rol || (roles?.length ? roles[0] : undefined);

    if (role !== 'ADMIN') {
      throw new UnauthorizedException('No tiene las credenciales para acceder a esta ruta');
    }

    const usuarios = await this.genericRepository.buscar(
      Usuario,
      'usuario',
      [{ atributo: 'emailUsuario', operacion: '=', valor: email }],
      ['usuarioRoles', 'usuarioRoles.rol']
    );

    if (!usuarios.length) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return usuarios[0];
  }
}
