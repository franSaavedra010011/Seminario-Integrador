import { CreateAgendaDiaDto } from './dto/create-agenda-dia.dto';
import { UpdateAgendaDiaDto } from './dto/update-agenda-dia.dto';
export declare class AgendaDiaService {
    create(createAgendaDiaDto: CreateAgendaDiaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAgendaDiaDto: UpdateAgendaDiaDto): string;
    remove(id: number): string;
}
