import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { PermisosGuard } from '../guard/permisos.guard';
import { Roles } from './roles.decorator';
import { Permisos } from './permisos.decorator';

export function Auth(roles: string[] = [], permisos: string[] = []) {
  return applyDecorators(
    UseGuards(AuthGuard, RolesGuard, PermisosGuard),
    roles.length ? Roles(...roles.map(String)) : (target, key?, desc?) => desc!,
    permisos.length ? Permisos(...permisos.map(String)) : (target, key?, desc?) => desc!,
  );
}
