import { AgendaSemanalService } from './agenda-semanal.service';
import { CreateAgendaSemanalDto } from './dto/create-agenda-semanal.dto';
import { UpdateAgendaSemanalDto } from './dto/update-agenda-semanal.dto';
export declare class AgendaSemanalController {
    private readonly agendaSemanalService;
    constructor(agendaSemanalService: AgendaSemanalService);
    create(createAgendaSemanalDto: CreateAgendaSemanalDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAgendaSemanalDto: UpdateAgendaSemanalDto): string;
    remove(id: string): string;
}
