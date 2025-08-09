import {
  DataSource,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
  EntityTarget,
} from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DTOCriterio } from '../../shared/dto/dtoCriterio.dto';

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

  async buscarPorId<T extends ObjectLiteral>(
    entidad: EntityTarget<T>,
    id: number,
    relaciones: string[] = [],
  ): Promise<T> {
    const resultados = await this.buscar(
      entidad,
      'entity',
      [{ atributo: 'id', operacion: '=', valor: id }],
      relaciones,
    );

    if (!resultados.length) {
      throw new NotFoundException('Entidad no encontrada');
    }

    return resultados[0];
  }

  async guardarCambios<T extends ObjectLiteral>(
    entidad: EntityTarget<T>,
    objeto: T,
  ): Promise<T> {
    const repository: Repository<T> = this.dataSource.getRepository(entidad);
    return await repository.save(objeto);
  }

  async eliminar<T extends ObjectLiteral>(
    entidad: EntityTarget<T>,
    id: number,
  ): Promise<void> {
    const repository: Repository<T> = this.dataSource.getRepository(entidad);
    const objeto = await repository.findOneBy({ id } as any);

    if (!objeto) {
      throw new Error('Entidad no encontrada');
    }

    (objeto as any).fechaHoraBaja = new Date();
    await repository.save(objeto);
  }

  


}
