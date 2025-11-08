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
            const nroSemana = this.obtenerNumeroSemana(hoy);
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
        const primera = new Date(fecha.getFullYear(), 0, 1);
        const diff = (fecha.getTime() - primera.getTime()) / (1000 * 60 * 60 * 24);
        return Math.ceil((diff + primera.getDay() + 1) / 7);
    }

    private getFechaInicioSemana(fecha: Date): Date {
        const diaSemana = fecha.getDay() || 7; // 1 = lunes, 7 = domingo
        const inicio = new Date(fecha);
        inicio.setDate(fecha.getDate() - (diaSemana - 1));
        inicio.setHours(0, 0, 0, 0);
        return inicio;
    }

    private getFechaFinSemana(fecha: Date): Date {
        const inicio = this.getFechaInicioSemana(fecha);
        const fin = new Date(inicio);
        fin.setDate(inicio.getDate() + 6);
        fin.setHours(23, 59, 59, 999);
        return fin;
    }
}
