import { CongestionHistoricoService } from './congestion-historico.service';
import { CreateCongestionHistoricoDto } from './dto/create-congestion-historico.dto';
import { UpdateCongestionHistoricoDto } from './dto/update-congestion-historico.dto';
export declare class CongestionHistoricoController {
    private readonly congestionHistoricoService;
    constructor(congestionHistoricoService: CongestionHistoricoService);
    create(createCongestionHistoricoDto: CreateCongestionHistoricoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCongestionHistoricoDto: UpdateCongestionHistoricoDto): string;
    remove(id: string): string;
}
