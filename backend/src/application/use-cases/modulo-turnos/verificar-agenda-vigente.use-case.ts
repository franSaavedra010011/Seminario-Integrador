import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';

@Injectable()
export class VerificarAgendaVigenteUseCase {
    constructor(
        private readonly genericRepository: GenericRepositoryService,
    ) { }

    async ejecutar(idHem: number): Promise<{ vigente: boolean }> {
        const fechaActual = new Date();

        // Buscar el HospitalEspecialidadMedico con sus agendas semanales activas
        const hem = await this.genericRepository.buscar(
            'HospitalEspecialidadMedico',
            'hem',
            [
                { atributo: 'id', operacion: '=', valor: idHem },
                { atributo: 'fechaHasta', operacion: 'isNull', valor: null },
            ],
            ['agendaSemanales']
        );

        if (!hem || hem.length === 0) {
            throw new NotFoundException(`No se encontró el HospitalEspecialidadMedico con id ${idHem}`);
        }

        const agendas: AgendaSemanal[] = hem[0].agendaSemanales || [];

        // Si no tiene agendas, no hay ninguna vigente
        if (agendas.length === 0) {
            return { vigente: false };
        }

        // Verificamos si alguna agenda está vigente
        const vigente = agendas.some((agenda) => {
            if (agenda.fechaHoraBaja) return false;

            const desde = new Date(agenda.fechaDesdeAgendaSemanal);
            const hasta = new Date(agenda.fechaHastaAgendaSemanal);

            // Agenda vigente si está dentro del rango actual
            return fechaActual >= desde && fechaActual <= hasta;
        });

        console.log(`Verificación de agenda vigente para HospitalEspecialidadMedico ID ${idHem}: ${vigente}`);

        return { vigente };
    }

}
