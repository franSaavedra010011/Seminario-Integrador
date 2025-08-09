import { IsString, IsEmail, IsDateString, IsInt, Min } from 'class-validator';

export class CreatePacienteDto {
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

  @IsInt()
  @Min(1)
  idLocalidad: number;
}
