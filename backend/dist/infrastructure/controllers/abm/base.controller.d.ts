import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
export declare abstract class AbmBaseController<T, CreateDto, UpdateDto> {
    protected readonly useCase: {
        crear(dto: CreateDto): Promise<T>;
        actualizar(id: number, dto: UpdateDto): Promise<T>;
    };
    protected readonly genericRepositoryService: GenericRepositoryService;
    private readonly entity;
    constructor(useCase: {
        crear(dto: CreateDto): Promise<T>;
        actualizar(id: number, dto: UpdateDto): Promise<T>;
    }, genericRepositoryService: GenericRepositoryService, entity: new () => T);
    alta(dto: CreateDto): Promise<T>;
    modificar(id: number, dto: UpdateDto): Promise<T>;
    baja(id: number): Promise<import("typeorm").ObjectLiteral>;
}
