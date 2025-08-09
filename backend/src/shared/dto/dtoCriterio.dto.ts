export type Operacion =
  | '='
  | '<'
  | '>'
  | '<='
  | '>='
  | '<>'
  | 'like'
  | 'isNull'
  | 'isNotNull'
  | 'relacion';

export class DTOCriterio {
  atributo: string;
  operacion: Operacion;
  valor: any;
}
