import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    usernameUsuario,
    emailUsuario,
    passwordUsuario,
    rol,
  }: RegisterDTO) {

    const usuario = await this.usuariosService.findOneByEmail(emailUsuario);

    if (usuario) {
      throw new BadRequestException('Usuario ya existente');
    }

    return await this.usuariosService.create({
      usernameUsuario,
      emailUsuario,
      passwordUsuario: await bcryptjs.hash(passwordUsuario, 10),
      rol,
    });
  }

  async login({ email, password }: LoginDTO) {
  
    const usuario = await this.usuariosService.findOneByEmailWithPassword(email);

    if (!usuario) {
      throw new UnauthorizedException(
        'El email ingresado no coincide con ningun email registrado',
      );
    
    }
    const isPasswordValid = await bcryptjs.compare(
      password,
      usuario.passwordUsuario,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña ingresada es incorrecta');
    }

    const usuarioRoles: UsuarioRol[] = usuario.getUsuarioRoles();

    let rol: string = '';

    for (const usuarioRol of usuarioRoles) {
      const fechaBaja = usuarioRol.fechaHastaUsuarioRol;
      if (fechaBaja === null) {
        rol = usuarioRol.getRol.getNombreRol;
      }
    }

    const payload = {
      username: usuario.usernameUsuario,
      email: usuario.emailUsuario,
      sub: usuario.idUsuario,
      role: rol,
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

    return await this.usuariosService.findOneByEmailWithPassword(email);
  }
}
