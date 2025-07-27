import { CongestionActualService } from './congestion-actual.service';
import { CreateCongestionActualDto } from './dto/create-congestion-actual.dto';
import { UpdateCongestionActualDto } from './dto/update-congestion-actual.dto';
export declare class CongestionActualController {
    private readonly congestionActualService;
    constructor(congestionActualService: CongestionActualService);
    create(createCongestionActualDto: CreateCongestionActualDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCongestionActualDto: UpdateCongestionActualDto): string;
    remove(id: string): string;
}
