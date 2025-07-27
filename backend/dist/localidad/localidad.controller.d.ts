import { LocalidadService } from './localidad.service';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
export declare class LocalidadController {
    private readonly localidadService;
    constructor(localidadService: LocalidadService);
    create(createLocalidadDto: CreateLocalidadDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLocalidadDto: UpdateLocalidadDto): string;
    remove(id: string): string;
}
