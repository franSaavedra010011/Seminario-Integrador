import { IsString, IsEmail, IsDateString, IsInt } from 'class-validator';

export class PacienteDto {
  @IsString()
  nombrePaciente: string;

  @IsString()
  apellidoPaciente: string;

  @IsString()
  dniPaciente: string;

  @IsInt()
  edadPaciente: number;

  @IsDateString()
  fechaNacimientoPaciente: string;

  @IsString()
  celularPaciente: string;

  @IsEmail()
  correoPaciente: string;

  @IsString()
  grupoSanguineoPaciente: string;
}
