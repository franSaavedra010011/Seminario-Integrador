import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
export declare class LocalidadService {
    create(createLocalidadDto: CreateLocalidadDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLocalidadDto: UpdateLocalidadDto): string;
    remove(id: number): string;
}
