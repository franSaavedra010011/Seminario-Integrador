import { CreateAgendaSemanalDto } from './dto/create-agenda-semanal.dto';
import { UpdateAgendaSemanalDto } from './dto/update-agenda-semanal.dto';
export declare class AgendaSemanalService {
    create(createAgendaSemanalDto: CreateAgendaSemanalDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAgendaSemanalDto: UpdateAgendaSemanalDto): string;
    remove(id: number): string;
}
