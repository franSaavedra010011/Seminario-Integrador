import { Repository } from 'typeorm';
import { Paciente } from '../domain/entities/paciente.entity';
import { PacienteDto } from './dto/createPaciente.dto';
import { UpdatePacienteDto } from './dto/updatePaciente.dto';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class PacienteService {
    private pacienteRepository;
    private readonly authService;
    constructor(pacienteRepository: Repository<Paciente>, authService: AuthService);
    create(pacienteDto: PacienteDto, usuarioDto: CreateUsuarioDto): Promise<Paciente>;
    createAdmin(pacienteDto: PacienteDto): void;
    update(id: number, updatePacienteDto: UpdatePacienteDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
