import { HistoriaMedicaService } from './historia-medica.service';
import { CreateHistoriaMedicaDto } from './dto/create-historia-medica.dto';
import { UpdateHistoriaMedicaDto } from './dto/update-historia-medica.dto';
export declare class HistoriaMedicaController {
    private readonly historiaMedicaService;
    constructor(historiaMedicaService: HistoriaMedicaService);
    create(createHistoriaMedicaDto: CreateHistoriaMedicaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateHistoriaMedicaDto: UpdateHistoriaMedicaDto): string;
    remove(id: string): string;
}
