import { Injectable } from "@nestjs/common";

@Injectable()
export class RespuestasEstructuradasService {
    constructor() { }

    async respuestaExitosa<T>(data: T, mensaje: string = 'Operación realizada con éxito') {
        return {
            success: true,
            message: mensaje,
            data: data,
        };
    }

    async respuestaError(mensaje: string, detalles?: any) {
        return {
            success: false,
            message: mensaje,
            details: detalles || null,
        };
    }

}