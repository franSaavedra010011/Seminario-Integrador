import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AgendaDia } from 'src/domain/entities/agenda-dia.entity';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { DiaSemanaEnum } from 'src/domain/enums/dia-semana.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';

@Injectable()
export class CrearAgendaSemanalUseCase {
    constructor(
        @InjectRepository(AgendaSemanal)
        private readonly agendaSemanalRepository: Repository<AgendaSemanal>,
        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,
    ) { }

    async ejecutar(idHospital: number) {
        const hospital = await this.hospitalRepository.findOne({
            where: { id: idHospital, fechaHoraBaja: IsNull() },
            relations: [
                'hospitalEspecialidades',
                'hospitalEspecialidades.hospitalEspecialidadMedico',
                'hospitalEspecialidades.hospitalEspecialidadMedico.agendaSemanales',
            ],
        });

        if (!hospital) {
            throw new BadRequestException(`No se encontró el hospital con id ${idHospital}`);
        }

        let heVigente;
        let hemVigente;
        for (const he of hospital.hospitalEspecialidades) {
            if (!he.fechaHasta || he.fechaHasta > new Date()) {
                heVigente = he;
            }
            for (const hem of he.hospitalEspecialidadMedico) {
                if (!hem.fechaHasta || hem.fechaHasta > new Date()) {
                    hemVigente = hem;
                }
                const nroSemanaActual = this.obtenerNumeroSemana(new Date());
                const agendaExistente = hem.agendaSemanales?.some(
                    (agenda) => agenda.nroSemana === nroSemanaActual
                );
            }
        }

        // Crear agenda solo para la semana actual
        const hoy = new Date();
        const nroSemanaActual = this.obtenerNumeroSemana(hoy);

        const agendaSemanal = new AgendaSemanal();
        agendaSemanal.fechaDesdeAgendaSemanal = this.getFechaInicioSemana(hoy);
        agendaSemanal.fechaHastaAgendaSemanal = this.getFechaFinSemana(hoy);
        agendaSemanal.nroSemana = nroSemanaActual;
        agendaSemanal.hospitalEspecialidadMedico = hemVigente;

        // 🧩 Crear los días de la semana
        const dias: AgendaDia[] = Object.values(DiaSemanaEnum).map((nombreDia) => {
            const dia = new AgendaDia();
            dia.nombreAgendaDia = nombreDia as DiaSemanaEnum;
            return dia;
        });

        agendaSemanal.agendasDia = dias;

        await this.agendaSemanalRepository.save(agendaSemanal);

        return {
            mensaje: '✅ Agenda creada correctamente para la semana actual.',
            nroSemana: nroSemanaActual,
            fechaDesde: agendaSemanal.fechaDesdeAgendaSemanal,
            fechaHasta: agendaSemanal.fechaHastaAgendaSemanal,
        };
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
