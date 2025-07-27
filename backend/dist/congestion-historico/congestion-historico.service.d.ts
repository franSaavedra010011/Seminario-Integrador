import { CreateCongestionHistoricoDto } from './dto/create-congestion-historico.dto';
import { UpdateCongestionHistoricoDto } from './dto/update-congestion-historico.dto';
export declare class CongestionHistoricoService {
    create(createCongestionHistoricoDto: CreateCongestionHistoricoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCongestionHistoricoDto: UpdateCongestionHistoricoDto): string;
    remove(id: number): string;
}
