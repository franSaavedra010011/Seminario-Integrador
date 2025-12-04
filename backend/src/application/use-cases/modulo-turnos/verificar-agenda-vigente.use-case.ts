import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';

@Injectable()
export class VerificarAgendaVigenteUseCase {
    constructor(
        private readonly genericRepository: GenericRepositoryService,
    ) { }

    async ejecutar(idHEM: number): Promise<{ vigente: boolean }> {
        console.log(`Iniciando verificación de agenda vigente para HospitalEspecialidadMedico ID: ${idHEM}`);
        const fechaActual = new Date();

        // Calcular el número de la semana siguiente
        const nroSemanaActual = this.obtenerNumeroSemana(fechaActual);
        const nroSemanaProxima = nroSemanaActual + 1;

        // Buscar el HospitalEspecialidadMedico con sus agendas semanales activas
        const hem = await this.genericRepository.buscarPorId(
            HospitalEspecialidadMedico,
            idHEM,
            ['agendaSemanales']
        );

        if (!hem) {
            throw new NotFoundException(`No se encontró el HospitalEspecialidadMedico con id ${idHEM}`);
        }

        // Si no tiene agendas, no hay ninguna vigente
        if (hem.agendaSemanales.length === 0) {
            return { vigente: false };
        }

        // Verificamos si existe agenda para la semana siguiente
        const vigente = hem.agendaSemanales.some((agenda) => {
            if (agenda.fechaHoraBaja) return false;
            return agenda.nroSemana === nroSemanaProxima;
        });

        if (!vigente) {
            return { vigente: false };
        }

        console.log(`Verificación de agenda vigente para HospitalEspecialidadMedico ID ${idHEM} (semana ${nroSemanaProxima}): ${vigente}`);

        return { vigente };
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

}
