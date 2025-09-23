import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
// Acepta roles dinámicos (strings). Si querés, también podés aceptar number (idRol).
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
