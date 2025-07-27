import { PacienteNotificacionService } from './paciente-notificacion.service';
import { CreatePacienteNotificacionDto } from './dto/create-paciente-notificacion.dto';
import { UpdatePacienteNotificacionDto } from './dto/update-paciente-notificacion.dto';
export declare class PacienteNotificacionController {
    private readonly pacienteNotificacionService;
    constructor(pacienteNotificacionService: PacienteNotificacionService);
    create(createPacienteNotificacionDto: CreatePacienteNotificacionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePacienteNotificacionDto: UpdatePacienteNotificacionDto): string;
    remove(id: string): string;
}
