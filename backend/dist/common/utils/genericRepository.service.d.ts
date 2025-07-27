import { DataSource, ObjectLiteral, EntityTarget } from 'typeorm';
import { DTOCriterio } from './dtoCriterio.dto';
export declare class GenericRepositoryService {
    private dataSource;
    constructor(dataSource: DataSource);
    buscar<T extends ObjectLiteral>(entidad: EntityTarget<T>, alias: string, criterios: DTOCriterio[], relaciones?: string[]): Promise<T[]>;
}
