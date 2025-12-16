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

    const addedAliases = new Map<string, number>();

    // Función para generar un alias único
    const getUniqueAlias = (base: string) => {
      const count = addedAliases.get(base) ?? 0;
      addedAliases.set(base, count + 1);
      return count === 0 ? base : `${base}_${count}`;
    };

    // Agregar relaciones anidadas
    for (const relacion of relaciones) {
      const path = relacion.split('.');
      let currentAlias = alias;

      for (const prop of path) {
        const joinPath = `${currentAlias}.${prop}`;
        const newAlias = getUniqueAlias(`${currentAlias}_${prop}`);
        query = query.leftJoinAndSelect(joinPath, newAlias);
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
          const relAlias = getUniqueAlias(`${alias}_${atributo}`);
          query = query
            .leftJoin(`${alias}.${atributo}`, relAlias)
            .andWhere(`${relAlias}.id = :valor`, { valor });
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
  ): Promise<T> {
    // <-- devolvemos el objeto actualizado
    const repository: Repository<T> = this.dataSource.getRepository(entidad);
    const objeto = await repository.findOneBy({ id } as any);

    if (!objeto) {
      throw new NotFoundException('Entidad no encontrada');
    }

    (objeto as any).fechaHoraBaja = new Date();
    return await repository.save(objeto); // <-- devolvemos el objeto
  }
}
