import { CreatePacienteNotificacionDto } from './dto/create-paciente-notificacion.dto';
import { UpdatePacienteNotificacionDto } from './dto/update-paciente-notificacion.dto';
export declare class PacienteNotificacionService {
    create(createPacienteNotificacionDto: CreatePacienteNotificacionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePacienteNotificacionDto: UpdatePacienteNotificacionDto): string;
    remove(id: number): string;
}
