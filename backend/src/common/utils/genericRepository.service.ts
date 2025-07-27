import {
  DataSource,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
  EntityTarget,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DTOCriterio } from './dtoCriterio.dto';

@Injectable()
export class GenericRepositoryService {
  constructor(private dataSource: DataSource) {}

  async buscar<T extends ObjectLiteral>(
    entidad: EntityTarget<T>,
    alias: string,
    criterios: DTOCriterio[],
    relaciones: string[] = [],
  ): Promise<T[]> {
    const repository: Repository<T> = this.dataSource.getRepository(entidad);
    let query: SelectQueryBuilder<T> = repository.createQueryBuilder(alias);

    // Agregar relaciones anidadas
    for (const relacion of relaciones) {
      const path = relacion.split('.');
      let currentAlias = alias;
      let joinPath = '';
      for (let i = 0; i < path.length; i++) {
        const prop = path[i];
        const newAlias = `${currentAlias}_${prop}`;

        // Evita hacer join duplicado
        if (!query.expressionMap.aliases.some((a) => a.name === newAlias)) {
          joinPath = `${currentAlias}.${prop}`;
          query = query.leftJoinAndSelect(joinPath, newAlias);
        }

        currentAlias = newAlias;
      }
    }

    // Agregar criterios
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
}
