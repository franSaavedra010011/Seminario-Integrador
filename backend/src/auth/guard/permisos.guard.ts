import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISOS_KEY } from '../decorators/permisos.decorator';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermisos = this.reflector.getAllAndOverride<string[]>(PERMISOS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si el endpoint no define permisos, dejamos pasar
    if (!requiredPermisos || requiredPermisos.length === 0) {
      return true;
    }

    const { usuario } = context.switchToHttp().getRequest();

    // Si el usuario es admin → acceso total
    if (
      usuario.roles?.some((r: string) => r.toUpperCase() === 'ADMIN') ||
      usuario.rol?.toUpperCase() === 'ADMIN'
    ) {
      return true;
    }

    // Validar que tenga al menos uno de los permisos requeridos
    if (usuario.permisos && Array.isArray(usuario.permisos)) {
      const permisosUsuario = usuario.permisos.map((p: string) => p.toLowerCase());
      return requiredPermisos.some((perm) => permisosUsuario.includes(perm.toLowerCase()));
    }

    return false;
  }
}
