import { CreateTurnoEstadoDto } from './dto/create-turno-estado.dto';
import { UpdateTurnoEstadoDto } from './dto/update-turno-estado.dto';
export declare class TurnoEstadoService {
    create(createTurnoEstadoDto: CreateTurnoEstadoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTurnoEstadoDto: UpdateTurnoEstadoDto): string;
    remove(id: number): string;
}
