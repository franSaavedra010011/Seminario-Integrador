import { Hospital } from "src/domain/entities/hospital.entity";
import { GenericRepositoryService } from "./genericRepository.service";
import { Medico } from "src/domain/entities/medico.entity";
import { Paciente } from "src/domain/entities/paciente.entity";
import { Rol } from "src/domain/entities/rol.entity";
import { Usuario } from "src/domain/entities/usuario.entity";
import { Especialidad } from "src/domain/entities/especialidad.entity";
import { Injectable } from "@nestjs/common";
import { Repository, IsNull } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Localidad } from "src/domain/entities/localidad.entity";
import { Turno } from "src/domain/entities/turno.entity";

@Injectable()
export class ListarEntidadesService {

    constructor(
        private readonly genericRepository: GenericRepositoryService,
        @InjectRepository(Hospital)
        private readonly hospitalRepo: Repository<Hospital>,
    ) { }

    async listarEspecialidades() {
        return await this.genericRepository.buscar(
            Especialidad,
            'espe',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }

    async listarEspecialidadesHospital(idHospital: number) {
        const hospital = await this.hospitalRepo.findOne({
            where: { id: idHospital, fechaHoraBaja: IsNull() },
            relations: [
                'hospitalEspecialidades',
                'hospitalEspecialidades.especialidad',
                'hospitalEspecialidades.hospitalEspecialidadMedico',
                'hospitalEspecialidades.hospitalEspecialidadMedico.medico',
                'hospitalEspecialidades.hospitalEspecialidadMedico.agendaSemanales',
            ],
        });

        if (!hospital) {
            throw new Error(`No se encontró el hospital con id ${idHospital}`)
        }

        const fechaActual = new Date();
        const nroSemanaActual = this.obtenerNumeroSemana(fechaActual);
        const nroSemanaProxima = nroSemanaActual + 1;

        return hospital.hospitalEspecialidades.map((he) => ({
            idHEM: he.id,
            nombreEspecialidad: he.especialidad.nombre,
            medicos: he.hospitalEspecialidadMedico.map((hem) => ({
                idHEM: hem.id,
                nombreMedico: `${hem.medico.nombreMedico} ${hem.medico.apellidoMedico}`,
                tieneAgendaVigente: hem.agendaSemanales?.some((agenda) => {
                    if (agenda.fechaHoraBaja) return false;
                    return agenda.nroSemana === nroSemanaProxima;
                }) || false,
            })),
        }));
    }

    private obtenerNumeroSemana(date: Date): number {
        // Copia la fecha para no mutar la original
        const d = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        );

        // Mueve al jueves de la semana actual (ISO: la semana empieza el lunes y contiene al jueves)
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);

        // Calcula la diferencia con el primer día del año
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil(
            ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
        );

        return weekNo;
    }

    async listarHospitales(
        opcion: 'simple' | 'localidad' | 'congestion' | 'especialidades' | 'completo' = 'simple',
        idHospital?: number
    ): Promise<Hospital[]> {
        const relacionesBase: string[] = [];

        switch (opcion) {
            case 'localidad':
                relacionesBase.push('localidad');
                break;
            case 'congestion':
                relacionesBase.push('congestionesActual', 'congestionesHistorico');
                break;
            case 'completo':
                relacionesBase.push(
                    'localidad',
                    'hospitalEspecialidades',
                    'hospitalEspecialidades.especialidad',
                    'hospitalEspecialidades.hospitalEspecialidadMedico',
                    'hospitalEspecialidades.hospitalEspecialidadMedico.medico',
                    'congestionesActual',
                    'congestionesHistorico',
                    'personalHospital',
                    'turnos',
                );
                break;
            case 'especialidades':
                relacionesBase.push(
                    'hospitalEspecialidades',
                    'hospitalEspecialidades.especialidad',
                );
                break;
            case 'simple':
            default:
                break;
        }

        const where = idHospital
            ? { id: idHospital, fechaHoraBaja: IsNull() }
            : { fechaHoraBaja: IsNull() };

        return await this.hospitalRepo.find({
            where,
            relations: relacionesBase,
            order: { nombre: 'ASC' },
        });
    }

    async listarTurnos() {
        return await this.genericRepository.buscar(
            Turno,
            'turno',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            ['paciente', 'medico', 'especialidad', 'hospital']
        )
    }

    async listarPacientes() {
        return await this.genericRepository.buscar(
            Paciente,
            'paci',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }

    async listarMedicos() {
        return await this.genericRepository.buscar(
            Medico,
            'medi',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }

    async listarUsuarios() {
        return await this.genericRepository.buscar(
            Usuario,
            'usua',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [
                'usuarioRoles.rol',
                'personalHospital.hospital',
            ],
        );
    }

    async listarRoles() {
        return await this.genericRepository.buscar(
            Rol,
            'rol',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }

    async listarLocalidades() {
        return await this.genericRepository.buscar(
            Localidad,
            'loc',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            [],
        );
    }
}