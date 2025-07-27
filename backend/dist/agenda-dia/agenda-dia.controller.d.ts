import { AgendaDiaService } from './agenda-dia.service';
import { CreateAgendaDiaDto } from './dto/create-agenda-dia.dto';
import { UpdateAgendaDiaDto } from './dto/update-agenda-dia.dto';
export declare class AgendaDiaController {
    private readonly agendaDiaService;
    constructor(agendaDiaService: AgendaDiaService);
    create(createAgendaDiaDto: CreateAgendaDiaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAgendaDiaDto: UpdateAgendaDiaDto): string;
    remove(id: string): string;
}
