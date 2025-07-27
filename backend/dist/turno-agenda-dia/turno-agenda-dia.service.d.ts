import { CreateTurnoAgendaDiaDto } from './dto/create-turno-agenda-dia.dto';
import { UpdateTurnoAgendaDiaDto } from './dto/update-turno-agenda-dia.dto';
export declare class TurnoAgendaDiaService {
    create(createTurnoAgendaDiaDto: CreateTurnoAgendaDiaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTurnoAgendaDiaDto: UpdateTurnoAgendaDiaDto): string;
    remove(id: number): string;
}
