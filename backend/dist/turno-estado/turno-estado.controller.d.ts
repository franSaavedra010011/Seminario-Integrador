import { TurnoEstadoService } from './turno-estado.service';
import { CreateTurnoEstadoDto } from './dto/create-turno-estado.dto';
import { UpdateTurnoEstadoDto } from './dto/update-turno-estado.dto';
export declare class TurnoEstadoController {
    private readonly turnoEstadoService;
    constructor(turnoEstadoService: TurnoEstadoService);
    create(createTurnoEstadoDto: CreateTurnoEstadoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTurnoEstadoDto: UpdateTurnoEstadoDto): string;
    remove(id: string): string;
}
