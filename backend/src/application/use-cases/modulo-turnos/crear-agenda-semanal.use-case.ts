import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { AgendaDia } from 'src/domain/entities/agenda-dia.entity';
import { DiaSemanaEnum } from 'src/domain/enums/dia-semana.enum';
import { HorarioTurnoEnum } from 'src/domain/enums/horario-turno.enum';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';

@Injectable()
export class CrearAgendaSemanalUseCase {
    private readonly logger = new Logger(CrearAgendaSemanalUseCase.name);

    constructor(
        @InjectRepository(AgendaSemanal)
        private readonly agendaSemanalRepository: Repository<AgendaSemanal>,
        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,
    ) { }

    async ejecutar(idHospital: number, idHem: number) {
        const startTime = Date.now();
        this.logger.log(`🚀 Iniciando creación de agenda semanal para hospital ID: ${idHospital}, HEM ID: ${idHem}`);

        try {
            // === 1. Verificar hospital existente ===
            const hospital = await this.hospitalRepository.findOne({
                where: { id: idHospital, fechaHoraBaja: IsNull() },
            });

            if (!hospital) {
                throw new BadRequestException(`No se encontró el hospital con ID ${idHospital}`);
            }

            // === 2. Buscar la relación HEM (hospital-especialidad-médico) ===
            const hem = await this.hospitalRepository.manager.findOne(HospitalEspecialidadMedico, {
                where: { id: idHem, fechaHasta: IsNull() },
                relations: [
                    'hospitalEspecialidad',
                    'hospitalEspecialidad.hospital',
                    'medico',
                    'agendaSemanales',
                ],
            });

            if (!hem) {
                throw new BadRequestException(`No se encontró la relación HEM con ID ${idHem}`);
            }

            if (hem.hospitalEspecialidad.hospital.id !== idHospital) {
                throw new BadRequestException(`El HEM ${idHem} no pertenece al hospital ${idHospital}`);
            }

            // === 3. Calcular semana actual ===
            const hoy = new Date();
            const nroSemana = this.obtenerNumeroSemana(hoy) + 1;
            const fechaDesde = this.getFechaInicioSemana(hoy);
            const fechaHasta = this.getFechaFinSemana(hoy);

            // === 4. Validar si ya existe agenda para esta semana ===
            const yaExiste = hem.agendaSemanales?.some(a => a.nroSemana === nroSemana);

            if (yaExiste) {
                this.logger.warn(`⚠️ Ya existe una agenda para la semana ${nroSemana} (HEM ID: ${idHem})`);
                return { mensaje: `Ya existe una agenda para la semana ${nroSemana} para este médico.` };
            }

            // === 5. Crear nueva agenda semanal ===
            const nuevaAgenda = this.agendaSemanalRepository.create({
                fechaDesdeAgendaSemanal: fechaDesde,
                fechaHastaAgendaSemanal: fechaHasta,
                nroSemana,
                hospitalEspecialidadMedico: hem,
                agendasDia: Object.values(DiaSemanaEnum).map(nombre => {
                    const dia = new AgendaDia();
                    dia.nombreAgendaDia = nombre as DiaSemanaEnum;
                    dia.fechaAgendaDia = new Date(fechaDesde);
                    // Ajustar la fecha al día correcto de la semana
                    const diaNumero = Object.values(DiaSemanaEnum).indexOf(nombre) + 1; // Lunes=1, Domingo=7
                    dia.fechaAgendaDia.setDate(fechaDesde.getDate() + (diaNumero - 1));

                    // Crear los turnos para este día
                    dia.turnosAgendaDia = Object.values(HorarioTurnoEnum).map(horario => {
                        const [horaDesde, horaHasta] = horario.split(' - ');
                        const turno = new TurnoAgendaDia();
                        turno.horaDesde = horaDesde;
                        turno.horaHasta = horaHasta;
                        turno.disponible = true;
                        return turno;
                    });

                    return dia;
                }),
            });

            await this.agendaSemanalRepository.save(nuevaAgenda);


            await this.agendaSemanalRepository.save(nuevaAgenda);

            this.logger.log(`✅ Agenda semanal creada exitosamente para el HEM ID: ${idHem} (Semana ${nroSemana}, Agenda ID: ${nuevaAgenda.id})`);

            return {
                mensaje: `✅ Agenda creada exitosamente para la semana ${nroSemana}.`,
                nroSemana,
                fechaDesde,
                fechaHasta,
                idHem,
            };
        } catch (error) {
            this.logger.error(`💥 Error ejecutando caso de uso CrearAgendaSemanal: ${error.message}`);
            this.logger.debug(error.stack);
            throw error;
        } finally {
            const duration = Date.now() - startTime;
            this.logger.log(`⏱️ Caso de uso finalizado en ${duration}ms`);
        }
    }

    private obtenerNumeroSemana(fecha: Date): number {
        // Copia la fecha para no mutar la original
        const d = new Date(
            Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()),
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

    private getFechaInicioSemana(fecha: Date): Date {
        // Calcular el lunes de la semana siguiente
        const proximoLunes = new Date(fecha);
        const diasHastaLunes = (7 - fecha.getDay() + 1) % 7 || 7;
        proximoLunes.setDate(fecha.getDate() + diasHastaLunes);
        proximoLunes.setHours(0, 0, 0, 0);
        return proximoLunes;
    }

    private getFechaFinSemana(fecha: Date): Date {
        const inicio = this.getFechaInicioSemana(fecha);
        const fin = new Date(inicio);
        fin.setDate(inicio.getDate() + 6);
        fin.setHours(23, 59, 59, 999);
        return fin;
    }
}
