import { PacienteService } from './paciente.service';
import { PacienteDto } from './dto/createPaciente.dto';
import { UpdatePacienteDto } from './dto/updatePaciente.dto';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
export declare class PacienteController {
    private readonly pacienteService;
    constructor(pacienteService: PacienteService);
    crearPaciente(body: {
        pacienteDto: PacienteDto;
        usuarioDto: CreateUsuarioDto;
    }): Promise<import("./entities/paciente.entity").Paciente>;
    update(id: number, updatePacienteDto: UpdatePacienteDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
