import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { Turno } from 'src/domain/entities/turno.entity';

export class CreatePacienteNotificacionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  observaciones: string;

  paciente: Paciente;

  turno: Turno;
}
