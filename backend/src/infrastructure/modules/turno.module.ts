import { AbmEstadoTurnoUseCase } from 'src/application/use-cases/abm/estado-turno/abm-estado-turno.use-case';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TurnoController } from "../controllers/turno.controller";
import { SolicitarTurnoUseCase } from "src/application/use-cases/modulo-turnos/solicitar-turno.use-case";
import { SharedModule } from "src/infrastructure/modules/shared.module"; // 👈 IMPORTANTE
import { Turno } from "src/domain/entities/turno.entity";
import { Hospital } from "src/domain/entities/hospital.entity";
import { AgendaSemanal } from "src/domain/entities/agenda-semanal.entity";
import { Especialidad } from "src/domain/entities/especialidad.entity";
import { EstadoTurno } from "src/domain/entities/estado-turno.entity";
import { Medico } from "src/domain/entities/medico.entity";
import { Paciente } from "src/domain/entities/paciente.entity";
import { TurnoAgendaDia } from "src/domain/entities/turno-agenda-dia.entity";
import { Usuario } from "src/domain/entities/usuario.entity";
import { AbmModule } from "./abm.module";
import { AbmTurnoEstadoUseCase } from 'src/application/use-cases/abm/turnoEstado/abm-turno-estado.use-case';
import { CrearAgendaSemanalUseCase } from 'src/application/use-cases/modulo-turnos/crear-agenda-semanal.use-case';
import { VerificarAgendaVigenteUseCase } from 'src/application/use-cases/modulo-turnos/verificar-agenda-vigente.use-case';
import { RegistrarAsistenciaDePacienteUseCase } from 'src/application/use-cases/modulo-turnos/registrar-asistencia-de-paciente.use-case';
import { RespuestasEstructuradasService } from 'src/shared/services/respuestas-estructuradas.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Turno,
        Especialidad,
        Hospital,
        TurnoAgendaDia,
        Medico,
        Usuario,
        EstadoTurno,
        Paciente,
        AgendaSemanal,
    ]), SharedModule, AbmModule],
    controllers: [TurnoController],
    providers: [
        SolicitarTurnoUseCase,
        CrearAgendaSemanalUseCase,
        VerificarAgendaVigenteUseCase,
        RegistrarAsistenciaDePacienteUseCase
    ],
    exports: [
        SolicitarTurnoUseCase,
        CrearAgendaSemanalUseCase,
        VerificarAgendaVigenteUseCase,
        RegistrarAsistenciaDePacienteUseCase
    ],
})
export class TurnoModule { }
