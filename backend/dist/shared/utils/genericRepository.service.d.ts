import { DataSource, ObjectLiteral, EntityTarget } from 'typeorm';
import { DTOCriterio } from '../../shared/dto/dtoCriterio.dto';
export declare class GenericRepositoryService {
    private dataSource;
    constructor(dataSource: DataSource);
    buscar<T extends ObjectLiteral>(entidad: EntityTarget<T>, alias: string, criterios: DTOCriterio[], relaciones?: string[]): Promise<T[]>;
    buscarPorId<T extends ObjectLiteral>(entidad: EntityTarget<T>, id: number, relaciones?: string[]): Promise<T>;
    guardarCambios<T extends ObjectLiteral>(entidad: EntityTarget<T>, objeto: T): Promise<T>;
    eliminar<T extends ObjectLiteral>(entidad: EntityTarget<T>, id: number): Promise<void>;
}
