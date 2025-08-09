import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { usuario } = context.switchToHttp().getRequest();

    // Si el usuario es admin (rol único) o tiene admin entre sus roles → acceso total
    if (
      usuario.rol?.toUpperCase() === 'ADMIN' ||
      usuario.roles?.some((r: string) => r.toUpperCase() === 'ADMIN')
    ) {
      return true;
    }

    // Si el usuario tiene un solo rol en payload
    if (usuario.rol) {
      return requiredRoles.some(
        (rol: string) => usuario.rol.toUpperCase() === rol.toUpperCase()
      );
    }

    // Si el usuario tiene varios roles en payload
    if (usuario.roles) {
      return requiredRoles.some((rol: string) =>
        usuario.roles.map((r: string) => r.toUpperCase()).includes(rol.toUpperCase())
      );
    }

    return false;
  }
}
