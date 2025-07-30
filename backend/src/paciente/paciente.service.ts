import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../domain/entities/paciente.entity';
import { PacienteDto } from './dto/createPaciente.dto';
import { UpdatePacienteDto } from './dto/updatePaciente.dto';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/common/enums/rol.enum';
import { Usuario } from 'src/domain/entities/usuario.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>, //con esto nos comunicamos con la base, guardamos, actualizamos, eliminamos, etc.
    private readonly authService: AuthService,
  ) {}

  async create(pacienteDto: PacienteDto, usuarioDto: CreateUsuarioDto) {
    usuarioDto.rol = Role.PACIENTE;
    // Crear usuario usando AuthService para validar y hashear contraseña
    const usuario: Usuario = await this.authService.register({
      ...usuarioDto,
      rol: usuarioDto.rol as Role, // 👈 conversión segura si el string coincide
    });

    // Crear el paciente con relación al usuario
    const paciente = this.pacienteRepository.create(pacienteDto);
    usuario.setPacientes(paciente);
    return this.pacienteRepository.save(paciente);
  }

  createAdmin(pacienteDto: PacienteDto) {
    return;
  }
  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.pacienteRepository.findOneBy({ id });
    if (!paciente) {
      throw new BadRequestException(
        'El paciente que quiere actualizar no se encuentra',
      );
    }
    return this.pacienteRepository.update(id, updatePacienteDto);
  }

  async remove(id: number) {
    return await this.pacienteRepository.softDelete(id);
  }

  /*async prueba(id: number) {
    const paciente = await this.pacienteRepository.findOne({
      where: { id },
      relations: ['usuario'], // 👈 esto carga el usuario relacionado
    });
    return paciente?.getUsuario.usernameUsuario;
  }*/
}
