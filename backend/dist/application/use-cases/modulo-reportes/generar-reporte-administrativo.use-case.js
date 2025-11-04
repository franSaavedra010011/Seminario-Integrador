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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerarReporteAdministrativoUseCase = void 0;
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const hospital_entity_1 = require("../../../domain/entities/hospital.entity");
const turno_entity_1 = require("../../../domain/entities/turno.entity");
const estado_turno_entity_1 = require("../../../domain/entities/estado-turno.entity");
const estado_turno_enum_1 = require("../../../domain/enums/estado-turno.enum");
let GenerarReporteAdministrativoUseCase = class GenerarReporteAdministrativoUseCase {
    genericRepository;
    turnoRepository;
    hospitalRepository;
    estadoTurnoRepository;
    constructor(genericRepository, turnoRepository, hospitalRepository, estadoTurnoRepository) {
        this.genericRepository = genericRepository;
        this.turnoRepository = turnoRepository;
        this.hospitalRepository = hospitalRepository;
        this.estadoTurnoRepository = estadoTurnoRepository;
    }
    async generarReporteAdministrativoHospital(idHospital) {
        const hospital = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        if (!hospital) {
            throw new common_1.BadRequestException(`El hospital no existe o ya ha sido dado de baja`);
        }
        const e = 'Por favor ingrese las fechas necesarias, para establecer el período requerido';
        return hospital.id, e;
    }
    async generarReporteAdministrativo(idHospital, fechaDesde, fechaHasta) {
        const hospital = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .leftJoinAndSelect('hospital.congestionesActual', 'ca')
            .leftJoinAndSelect('hospital.congestionesHistorico', 'ch')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        if (!hospital) {
            throw new common_1.BadRequestException(`El hospital no existe o ya ha sido dado de baja`);
        }
        const congestionesActuales = hospital.congestionesActual;
        const congestionesHistoricas = hospital.congestionesHistorico;
        let congestionHistoricaComparar;
        let porcentajeAcumuladoPeriodo = 0;
        let contadorRegistros = 0;
        const listaCantidadesDTO = [];
        for (const congestionHistorica of congestionesHistoricas) {
            if (congestionHistorica.fechaHoraBaja === null) {
                congestionHistoricaComparar = congestionHistorica;
            }
        }
        if (!congestionHistoricaComparar) {
            throw new common_1.BadRequestException(`No se encontró el registro histórico de congestión de referencia.`);
        }
        const asistidosHistoricos = congestionHistoricaComparar.turnosAsistidos;
        const totalHistoricos = asistidosHistoricos +
            congestionHistoricaComparar.turnosCancelados +
            congestionHistoricaComparar.turnosNoAsistidos;
        const METRICA_HISTORICA = totalHistoricos > 0 ? asistidosHistoricos / totalHistoricos : 0;
        for (const congestionActual of congestionesActuales) {
            if (fechaDesde <= congestionActual.fecha &&
                fechaHasta >= congestionActual.fecha) {
                const turnosCanceladosCA = congestionActual.turnosCancelados;
                const turnosNoAsistidosCA = congestionActual.turnosNoAsistidos;
                const turnosAsistidosCA = congestionActual.turnosAsistidos;
                const turnosEnProcesoCA = congestionActual.turnosEnProceso;
                const fechaCA = congestionActual.fechaHoraCreacion;
                const asistidosDia = turnosAsistidosCA;
                const totalTurnosDia = turnosCanceladosCA +
                    turnosNoAsistidosCA +
                    turnosAsistidosCA +
                    turnosEnProcesoCA;
                let metricaDiaria = 0;
                if (totalTurnosDia > 0) {
                    metricaDiaria = asistidosDia / totalTurnosDia;
                }
                porcentajeAcumuladoPeriodo += metricaDiaria;
                contadorRegistros += 1;
                const dtoCantidades = {
                    turnosCanceladosCA: turnosCanceladosCA,
                    turnosNoAsistidosCA: turnosNoAsistidosCA,
                    turnosAsistidosCA: turnosAsistidosCA,
                    turnosEnProceso: turnosEnProcesoCA,
                    fechaCongestion: fechaCA,
                };
                listaCantidadesDTO.push(dtoCantidades);
            }
        }
        const metricaPromedioPeriodo = contadorRegistros > 0
            ? porcentajeAcumuladoPeriodo / contadorRegistros
            : 0;
        let porcentajeProm = 0;
        if (METRICA_HISTORICA > 0) {
            porcentajeProm = (metricaPromedioPeriodo / METRICA_HISTORICA) * 100;
        }
        else if (metricaPromedioPeriodo > 0) {
            porcentajeProm = 100;
        }
        let mensaje;
        if (porcentajeProm > 115) {
            mensaje =
                'El rendimiento promedio de asistencia en el periodo es ALTO (notablemente mejor que el histórico).';
        }
        else if (porcentajeProm < 85) {
            mensaje =
                'El rendimiento promedio de asistencia en el periodo es BAJO (significativamente peor que el histórico).';
        }
        else {
            mensaje =
                'El rendimiento promedio de asistencia en el periodo es MEDIO (cercano al rendimiento histórico).';
        }
        const dtoMensajeCantidades = {
            mensaje: mensaje,
            dtoCantidades: listaCantidadesDTO,
        };
        const estadoTurnoBuscado = await this.estadoTurnoRepository
            .createQueryBuilder('estadoTurno')
            .where('estadoTurno.nombre = :nombre AND estadoTurno.fechaHoraBaja IS NULL', {
            nombre: estado_turno_enum_1.EstadoTurnoEnum.ATENDIDO,
        })
            .getOne();
        if (!estadoTurnoBuscado) {
            throw new common_1.BadRequestException(`El estado del turno no existe o ya ha sido dado de baja`);
        }
        const turnosBuscados = await this.turnoRepository
            .createQueryBuilder('turno')
            .leftJoinAndSelect('turno.especialidad', 'esp')
            .where('turno.estadoTurno = :idEstadoTurno AND turno.hospital = :idHospital AND turno.fechaHoraBaja IS NULL')
            .andWhere('turno.fecha BETWEEN :fd AND :fh')
            .setParameters({
            idEstadoTurno: estadoTurnoBuscado.id,
            idHospital: hospital.id,
            fd: fechaDesde,
            fh: fechaHasta,
        })
            .getMany();
        console.log(turnosBuscados);
        const listaConteoEspecialidad = [];
        const listaEspecialidadesTurno = [];
        for (const turno of turnosBuscados) {
            const especialidadRelacionada = turno.especialidad;
            const especialidadNombre = especialidadRelacionada.nombre;
            if (!listaEspecialidadesTurno.includes(especialidadNombre)) {
                listaEspecialidadesTurno.push(especialidadNombre);
            }
        }
        for (const especialidadNombre of listaEspecialidadesTurno) {
            let cantidadTurnos = 0;
            for (const turno of turnosBuscados) {
                if (turno.especialidad.nombre === especialidadNombre) {
                    cantidadTurnos++;
                }
            }
            const conteoEspecialidad = {
                nombreEspecialidad: especialidadNombre,
                cantidad: cantidadTurnos,
            };
            listaConteoEspecialidad.push(conteoEspecialidad);
        }
        const dtoFinal = {
            cantidadCongestion: dtoMensajeCantidades,
            cantidadEspecialidad: listaConteoEspecialidad,
        };
        return dtoFinal;
    }
};
exports.GenerarReporteAdministrativoUseCase = GenerarReporteAdministrativoUseCase;
exports.GenerarReporteAdministrativoUseCase = GenerarReporteAdministrativoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(turno_entity_1.Turno)),
    __param(2, (0, typeorm_2.InjectRepository)(hospital_entity_1.Hospital)),
    __param(3, (0, typeorm_2.InjectRepository)(estado_turno_entity_1.EstadoTurno)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], GenerarReporteAdministrativoUseCase);
//# sourceMappingURL=generar-reporte-administrativo.use-case.js.map