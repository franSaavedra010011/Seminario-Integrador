import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
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

  async register(registerDto: RegisterDTO): Promise<Usuario> {
    // Verificar si el usuario ya existe
    const existente = await this.genericRepository.buscar(Usuario, 'usuario', [
      { atributo: 'emailUsuario', operacion: '=', valor: registerDto.emailUsuario },
    ]);

    if (existente.length > 0) {
      throw new BadRequestException('Usuario ya existente');
    }

    // Convertir nombres de roles a IDs
    const idRoles: number[] = [];

    for (const nombreRol of registerDto.roles) {
      const rolesEncontrados = await this.genericRepository.buscar(
        Rol,
        'rol',
        [
          { atributo: 'nombre', operacion: '=', valor: nombreRol.trim() },
          { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null } // opcional, si querés solo activos
        ]
      );

      if (!rolesEncontrados.length) {
        throw new BadRequestException(`El rol "${nombreRol}" no existe`);
      }

      idRoles.push(rolesEncontrados[0].id);
    }

    // Mapear a CreateUsuarioDto
    const createUsuarioDto: CreateUsuarioDto = {
      usernameUsuario: registerDto.usernameUsuario,
      emailUsuario: registerDto.emailUsuario,
      passwordUsuario: registerDto.passwordUsuario,
      idRoles
    };

    return await this.abmUsuarioUseCase.crear(createUsuarioDto);
  }


  async login({ email, password }: LoginDTO) {
    const usuarios = await this.genericRepository.buscar(
      Usuario,
      'usuario',
      [{ atributo: 'emailUsuario', operacion: '=', valor: email }],
      ['usuarioRoles', 'usuarioRoles.rol', 'usuarioRoles.rol.rolPermisos', 'usuarioRoles.rol.rolPermisos.permiso']
    );

    if (!usuarios.length) {
      throw new UnauthorizedException('El email ingresado no coincide con ningún email registrado');
    }

    const usuario = usuarios[0];

    const usuarioConPassword = await this.genericRepository.buscar(
      Usuario,
      'usuario',
      [{ atributo: 'id', operacion: '=', valor: usuario.id }],
    );

    if (!usuarioConPassword.length) {
      throw new UnauthorizedException('No se pudo recuperar la contraseña');
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      usuarioConPassword[0].passwordUsuario,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña ingresada es incorrecta');
    }

    const roles = (usuario.usuarioRoles || []).map(ur => ({
      idRol: ur.rol.id,
      nombreRol: ur.rol.nombre,
      permisos: (ur.rol.rolPermisos || [])
        .filter(rp => !rp.fechaHasta)
        .map(rp => rp.permiso.rutaPermiso.trim().toLowerCase())
    }));

    // Caso: solo un rol → generar token directamente
    if (roles.length === 1) {
      const rol = roles[0];
      const payload = {
        sub: usuario.id,
        email: usuario.emailUsuario,
        rol: rol.nombreRol,
        permisos: rol.permisos
      };

      const token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

      return {
        token,
        rolSeleccionado: rol.nombreRol,
        permisos: rol.permisos
      };
    }

    // Caso: varios roles → retornar lista para selección en el front
    return {
      usuarioId: usuario.id,
      email: usuario.emailUsuario,
      roles: roles.map(r => ({ idRol: r.idRol, nombreRol: r.nombreRol }))
    };
  }

  async seleccionarRol(usuarioId: number, idRol: number) {
  // Traer usuario con roles y permisos
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

  // Verificar que el rol elegido pertenece al usuario
  const usuarioRolSeleccionado = usuario.usuarioRoles.find(ur => ur.rol.id === idRol);
  if (!usuarioRolSeleccionado) {
    throw new UnauthorizedException('El rol seleccionado no pertenece al usuario');
  }

  // Actualizar el rolActivo (si querés persistirlo en BD)
  for (const ur of usuario.usuarioRoles) {
    ur.rolActivo = ur.rol.id === idRol;
    await this.genericRepository.guardarCambios(ur.constructor, ur); 
  }

  // Obtener permisos del rol activo
  const permisos = usuarioRolSeleccionado.rol.rolPermisos
    .filter(rp => !rp.fechaHasta)
    .map(rp => rp.permiso.rutaPermiso.trim().toLowerCase());

  // Generar token con rol y permisos
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
