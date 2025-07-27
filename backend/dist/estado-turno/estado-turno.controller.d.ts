import { EstadoTurnoService } from './estado-turno.service';
import { CreateEstadoTurnoDto } from './dto/create-estado-turno.dto';
import { UpdateEstadoTurnoDto } from './dto/update-estado-turno.dto';
export declare class EstadoTurnoController {
    private readonly estadoTurnoService;
    constructor(estadoTurnoService: EstadoTurnoService);
    create(createEstadoTurnoDto: CreateEstadoTurnoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEstadoTurnoDto: UpdateEstadoTurnoDto): string;
    remove(id: string): string;
}
