"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepositoryService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let GenericRepositoryService = class GenericRepositoryService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async buscar(entidad, alias, criterios, relaciones = []) {
        const repository = this.dataSource.getRepository(entidad);
        let query = repository.createQueryBuilder(alias);
        for (const relacion of relaciones) {
            const path = relacion.split('.');
            let currentAlias = alias;
            let joinPath = '';
            for (let i = 0; i < path.length; i++) {
                const prop = path[i];
                const newAlias = `${currentAlias}_${prop}`;
                if (!query.expressionMap.aliases.some((a) => a.name === newAlias)) {
                    joinPath = `${currentAlias}.${prop}`;
                    query = query.leftJoinAndSelect(joinPath, newAlias);
                }
                currentAlias = newAlias;
            }
        }
        for (const criterio of criterios) {
            const { atributo, operacion, valor } = criterio;
            switch (operacion) {
                case '=':
                    query = query.andWhere(`${alias}.${atributo} = :valor`, { valor });
                    break;
                case '<':
                    query = query.andWhere(`${alias}.${atributo} < :valor`, { valor });
                    break;
                case '>':
                    query = query.andWhere(`${alias}.${atributo} > :valor`, { valor });
                    break;
                case '<=':
                    query = query.andWhere(`${alias}.${atributo} <= :valor`, { valor });
                    break;
                case '>=':
                    query = query.andWhere(`${alias}.${atributo} >= :valor`, { valor });
                    break;
                case '<>':
                    query = query.andWhere(`${alias}.${atributo} != :valor`, { valor });
                    break;
                case 'like':
                    query = query.andWhere(`${alias}.${atributo} ILIKE :valor`, {
                        valor: `%${valor}%`,
                    });
                    break;
                case 'isNull':
                    query = query.andWhere(`${alias}.${atributo} IS NULL`);
                    break;
                case 'isNotNull':
                    query = query.andWhere(`${alias}.${atributo} IS NOT NULL`);
                    break;
                case 'relacion':
                    query = query
                        .leftJoin(`${alias}.${atributo}`, 'relacion')
                        .andWhere(`relacion.id = :valor`, { valor });
                    break;
                default:
                    throw new Error(`Operación no soportada: ${operacion}`);
            }
        }
        return await query.getMany();
    }
};
exports.GenericRepositoryService = GenericRepositoryService;
exports.GenericRepositoryService = GenericRepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], GenericRepositoryService);
//# sourceMappingURL=genericRepository.service.js.map