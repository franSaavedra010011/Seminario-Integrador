import { PartialType } from '@nestjs/mapped-types';
import { CreatePacienteNotificacionDto } from './create-paciente-notificacion.dto';

export class UpdatePacienteNotificacionDto extends PartialType(CreatePacienteNotificacionDto) {}
