import { CreateHistoriaMedicaDto } from './dto/create-historia-medica.dto';
import { UpdateHistoriaMedicaDto } from './dto/update-historia-medica.dto';
export declare class HistoriaMedicaService {
    create(createHistoriaMedicaDto: CreateHistoriaMedicaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateHistoriaMedicaDto: UpdateHistoriaMedicaDto): string;
    remove(id: number): string;
}
