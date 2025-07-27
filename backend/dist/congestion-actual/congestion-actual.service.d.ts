import { CreateCongestionActualDto } from './dto/create-congestion-actual.dto';
import { UpdateCongestionActualDto } from './dto/update-congestion-actual.dto';
export declare class CongestionActualService {
    create(createCongestionActualDto: CreateCongestionActualDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCongestionActualDto: UpdateCongestionActualDto): string;
    remove(id: number): string;
}
