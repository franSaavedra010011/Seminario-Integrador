import { TurnoAgendaDiaService } from './turno-agenda-dia.service';
import { CreateTurnoAgendaDiaDto } from './dto/create-turno-agenda-dia.dto';
import { UpdateTurnoAgendaDiaDto } from './dto/update-turno-agenda-dia.dto';
export declare class TurnoAgendaDiaController {
    private readonly turnoAgendaDiaService;
    constructor(turnoAgendaDiaService: TurnoAgendaDiaService);
    create(createTurnoAgendaDiaDto: CreateTurnoAgendaDiaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTurnoAgendaDiaDto: UpdateTurnoAgendaDiaDto): string;
    remove(id: string): string;
}
