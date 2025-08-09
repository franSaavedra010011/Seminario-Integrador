import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../domain/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass,
    ]);
    if (!role) {
      return true;
    }
    const { usuario } = context.switchToHttp().getRequest();
    if (usuario.role === Role.ADMIN) {
      // con esto hago que el administrador, pueda hacer lo que quiera
      return true;
    }
    return role === usuario.role;
  }
}
