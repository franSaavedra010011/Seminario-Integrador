import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { GenerarReportePacienteTurnos } from './dto/generar-reporte-paciente-turnos.dto';
import { GenerarReportePaciente } from './dto/generar-reporte-paciente.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';

@Injectable()
export class GenerarReportePacienteUseCase {
  private readonly logger = new Logger(GenerarReportePacienteUseCase.name);

  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) { }

  private formatearFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}-${mes}-${año}`;
  }

  async generarReportePaciente(idUsuario: number, fechaDesde: Date, fechaHasta: Date) {
    this.logger.log(`🏁 INICIO - Generando reporte para paciente ID: ${idUsuario}, período: ${this.formatearFecha(fechaDesde)} - ${this.formatearFecha(fechaHasta)}`);

    try {
      this.logger.log(`🔍 Buscando usuario con ID: ${idUsuario}`);

      const usuario = await this.genericRepository.buscarPorId(
        Usuario,
        idUsuario,
        [
          'paciente',
          'paciente.turnos',
          'paciente.turnos.especialidad',
          'paciente.turnos.estadoTurno',
          'paciente.turnos.turnosEstados',
          'paciente.turnos.medico',
        ]
      );

      if (!usuario) {
        this.logger.error(`❌ USUARIO NO ENCONTRADO - ID: ${idUsuario}`);
        throw new BadRequestException(
          `El usuario no existe o ya ha sido dado de baja`,
        );
      }

      const paciente = usuario.paciente;

      if (!paciente) {
        this.logger.error(`❌ PACIENTE NO ASOCIADO - Usuario ID: ${idUsuario}`);
        throw new BadRequestException(
          `El usuario no está asociado a ningún paciente`,
        );
      }

      this.logger.log(`✅ Paciente encontrado: ${paciente.nombrePaciente} ${paciente.apellidoPaciente}`);
      this.logger.log(`📊 Total de turnos del paciente: ${paciente.turnos?.length || 0}`);

      // Leer instancia/s de turnos relacionadas
      console.log('TURNOS DEL PACIENTE:', paciente.turnos);
      const turnos = paciente.turnos;

      const dtoTurnos: GenerarReportePacienteTurnos[] = [];
      let turnosAtendidos = 0;
      let turnosReservados = 0;
      let turnosAusentes = 0;
      let turnosEnPeriodo = 0;

      this.logger.log(`📅 Procesando turnos en el período: ${this.formatearFecha(fechaDesde)} - ${this.formatearFecha(fechaHasta)}`);

      for (const turno of turnos) {
        this.logger.log(`🔍 Evaluando turno - Fecha: ${this.formatearFecha(turno.fecha)}, FechaDesde: ${this.formatearFecha(fechaDesde)}, FechaHasta: ${this.formatearFecha(fechaHasta)}`);
        this.logger.log(`🔍 Comparación - fechaDesde <= turno.fecha: ${fechaDesde <= turno.fecha}, fechaHasta >= turno.fecha: ${fechaHasta >= turno.fecha}`);

        if (fechaDesde <= turno.fecha && fechaHasta >= turno.fecha) {

          turnosEnPeriodo++;

          this.logger.debug(`🎯 Turno en período - Fecha: ${this.formatearFecha(turno.fecha)}, Estado: ${turno.estadoTurno.nombre}, Especialidad: ${turno.especialidad.nombre}`);

          const dtoTurno: GenerarReportePacienteTurnos = {
            nombreEspecialidad: turno.especialidad.nombre,
            nombreEstado: turno.estadoTurno.nombre,
            nombreMedico: turno.medico.nombreMedico,
            apellidoMedico: turno.medico.apellidoMedico,
          };

          if (turno.estadoTurno.nombre === EstadoTurnoEnum.ATENDIDO) {
            turnosAtendidos = turnosAtendidos + 1;
            this.logger.log(`✅ Turno ATENDIDO - Dr. ${turno.medico.nombreMedico} ${turno.medico.apellidoMedico}, ${turno.especialidad.nombre}`);
          } else if (turno.estadoTurno.nombre === EstadoTurnoEnum.RESERVADO) {
            turnosReservados = turnosReservados + 1;
            this.logger.log(`📅 Turno RESERVADO - Dr. ${turno.medico.nombreMedico} ${turno.medico.apellidoMedico}, ${turno.especialidad.nombre}`);
          } else if (turno.estadoTurno.nombre === EstadoTurnoEnum.AUSENTE) {
            turnosAusentes = turnosAusentes + 1;
            this.logger.log(`❌ Turno AUSENTE - Dr. ${turno.medico.nombreMedico} ${turno.medico.apellidoMedico}, ${turno.especialidad.nombre}`);
          }

          dtoTurnos.push(dtoTurno);

        }
      }

      this.logger.log(`📈 RESUMEN DE TURNOS EN PERÍODO:`);
      this.logger.log(`   📊 Total en período: ${turnosEnPeriodo}`);
      this.logger.log(`   ✅ Atendidos: ${turnosAtendidos}`);
      this.logger.log(`   📅 Reservados: ${turnosReservados}`);
      this.logger.log(`   ❌ Ausentes: ${turnosAusentes}`);

      const dtoPaciente: GenerarReportePaciente = {
        turnosAtendidos: turnosAtendidos,
        turnosAusentes: turnosAusentes,
        turnosReservados: turnosReservados,
        turnos: dtoTurnos,
      };

      this.logger.log(`🎉 ÉXITO - Reporte generado correctamente para usuario ID: ${idUsuario}`);
      this.logger.log(`🎉 ÉXITO - Reporte generado correctamente para paciente ID: ${paciente.id}`);
      return dtoPaciente;

    } catch (error) {
      this.logger.error(`💥 ERROR al generar reporte para usuario ID: ${idUsuario}`, error.stack);
      throw error;
    }
  }
}
