export type Operacion = '=' | '<' | '>' | '<=' | '>=' | '<>' | 'like' | 'isNull' | 'isNotNull' | 'relacion';
export declare class DTOCriterio {
    atributo: string;
    operacion: Operacion;
    valor: any;
}
