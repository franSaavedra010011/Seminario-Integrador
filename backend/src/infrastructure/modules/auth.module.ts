import { Module } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constants/jwt.constants';
import { AbmModule } from './abm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { Rol } from 'src/domain/entities/rol.entity';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { SharedModule } from './shared.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    AbmModule,
    TypeOrmModule.forFeature([Usuario, Rol, UsuarioRol]),
    SharedModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
})
export class AuthModule {}
