import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { RegisterDTO } from '../../auth/dto/register.dto';
import { LoginDTO } from '../../auth/dto/login.dto';
import { Request } from 'express';
import { Auth } from '../../auth/decorators/auth.decorator';

// Adaptar para soportar rol único o lista de roles
interface RequestWithUser extends Request {
  usuario: {
    email: string;
    rol?: string;     // cuando es único
    roles?: string[]; // cuando son varios
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('login')
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth('USER') // ahora recibe string en lugar de enum
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.usuario);
  }
}
