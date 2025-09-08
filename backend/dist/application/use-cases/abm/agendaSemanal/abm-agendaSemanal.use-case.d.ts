import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
export declare class AbmAgendaSemanalUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    eliminar(id: number): Promise<void>;
}
