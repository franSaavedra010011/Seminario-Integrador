import { CreateEstadoTurnoDto } from './dto/create-estado-turno.dto';
import { UpdateEstadoTurnoDto } from './dto/update-estado-turno.dto';
export declare class EstadoTurnoService {
    create(createEstadoTurnoDto: CreateEstadoTurnoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEstadoTurnoDto: UpdateEstadoTurnoDto): string;
    remove(id: number): string;
}
