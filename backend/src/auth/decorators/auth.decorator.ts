import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorator';

// Ahora acepta strings (y opcionalmente enum para compatibilidad)
export function Auth(...roles: string[]) {
  return applyDecorators(
    UseGuards(AuthGuard, RolesGuard),

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    roles.length ? Roles(...roles.map(String)) : (target, key?, desc?) => desc!, // si no pasás roles, solo requiere estar logueado
  );
}
