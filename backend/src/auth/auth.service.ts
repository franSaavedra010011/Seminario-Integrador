import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from 'src/temp/usuarios/usuarios.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { Rol } from 'src/domain/entities/rol.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly abmUsuarioUseCase: AbmUsuarioUseCase,
    private readonly jwtService: JwtService,
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  async register(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existente = await this.genericRepository.buscar(Usuario, 'usuario', [
      { atributo: 'emailUsuario', operacion: '=', valor: createUsuarioDto.emailUsuario },
    ]);

    if (existente.length > 0) {
      throw new BadRequestException('Usuario ya existente');
    }

    const idRoles: number[] = [];

    for (const rolId of createUsuarioDto.idRoles) {
      const rolesEncontrados = await this.genericRepository.buscar(
        Rol,
        'rol',
        [{ atributo: 'id', operacion: '=', valor: rolId }]
      );

      if (!rolesEncontrados.length) {
        throw new BadRequestException(`El rol no existe`);
      }

      idRoles.push(rolesEncontrados[0].id);
    }

    return await this.abmUsuarioUseCase.crear(createUsuarioDto);
  }

  async login({ email, password }: LoginDTO) {
    const usuarios = await this.genericRepository.buscar(
      Usuario,
      'usuario',
      [{ atributo: 'emailUsuario', operacion: '=', valor: email }],
      ['usuarioRoles', 'usuarioRoles.rol']
    );

    if (!usuarios.length) {
      throw new UnauthorizedException(
        'El email ingresado no coincide con ningún email registrado',
      );
    }

    const usuario = usuarios[0];

    // Recuperar contraseña (ya que en relaciones está excluida con select: false)
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

    let rolActivo: string = '';

    for (const usuarioRol of usuario.usuarioRoles || []) {
      if (!usuarioRol.fechaHasta) {
        rolActivo = usuarioRol.rol.nombre;
        break;
      }
    }

    const payload = {
      username: usuario.usernameUsuario,
      email: usuario.emailUsuario,
      sub: usuario.id,
      role: rolActivo,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    return {
      token,
      email,
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    if (role !== 'admin') {
      throw new UnauthorizedException(
        'No tiene las credenciales para acceder a esta ruta',
      );
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
