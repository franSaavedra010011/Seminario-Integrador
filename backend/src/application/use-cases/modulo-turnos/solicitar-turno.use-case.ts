import { BadRequestException, Injectable } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { EstadoTurnoEnum } from 'src/domain/enums/estado-turno.enum';
import { AbmTurnoUseCase } from '../abm/turno/abm-turno.use-case';
import { Turno } from 'src/domain/entities/turno.entity';
import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { AgendaDia } from 'src/domain/entities/agenda-dia.entity';
import { Localidad } from 'src/domain/entities/localidad.entity';
import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';
import { AgendaSemanaProxima, EspecialidadResumen, HorarioAgenda, HospitalResumen, LocalidadResumen, MedicoResumen, TurnoResumen } from './dto/solicitar-turno.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';

@Injectable()
export class SolicitarTurnoUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) { }

  async validacionDatosPaciente(idPaciente: number): Promise<Paciente> {

    if (!idPaciente || idPaciente <= 0) {
      throw new BadRequestException(`El ID del Paciente es inválido`);
    }

    const paciente = await this.genericRepository.buscarPorId(
      Paciente,
      idPaciente,
      []
    )

    if (!paciente) {
      throw new BadRequestException(`El Paciente con ID ${idPaciente} no existe`);
    }

    return paciente;
  }

  async mostrarLocalidadesYEspecialidades(): Promise<{ localidades: LocalidadResumen[]; especialidades: EspecialidadResumen[] }> {
    const localidades = await this.genericRepository.buscar(
      Localidad,
      "localidad",
      [{ atributo: "fechaHoraBaja", operacion: "isNull", valor: null }],
      []
    );

    if (!localidades || localidades.length === 0) {
      throw new BadRequestException(`No hay localidades disponibles`);
    }

    const localidadesResumen: LocalidadResumen[] = localidades.map(localidad => ({
      idLocalidad: localidad.id,
      nombreLocalidad: localidad.nombre,
    }))

    const especialidades = await this.genericRepository.buscar(
      Especialidad,
      "especialidad",
      [{ atributo: "fechaHoraBaja", operacion: "isNull", valor: null }],
      []
    );

    if (!especialidades || especialidades.length === 0) {
      throw new BadRequestException(`No hay especialidades disponibles`);
    }

    const especialidadesResumen: EspecialidadResumen[] = especialidades.map(especialidad => ({
      idEspecialidad: especialidad.id,
      nombreEspecialidad: especialidad.nombre,
    }))

    return {
      localidades: localidadesResumen,
      especialidades: especialidadesResumen
    };

  }

  async listarHospitalesConRequisitosSolicitados(idLocalidad: number, idEspecialidad: number): Promise<{ hospitales: HospitalResumen[] }> {
    if (!idLocalidad || idLocalidad <= 0) {
      throw new BadRequestException(`El ID de la Localidad es inválido`);
    }

    if (!idEspecialidad || idEspecialidad <= 0) {
      throw new BadRequestException(`El ID de la Especialidad es inválido`);
    }

    const localidad = await this.genericRepository.buscarPorId(
      Localidad,
      idLocalidad,
      []
    );

    if (!localidad) {
      throw new BadRequestException(`La Localidad con ID ${idLocalidad} no existe`);
    }

    const hospital = await this.genericRepository.buscar(
      Hospital,
      "hospital",
      [{ atributo: "fechaHoraBaja", operacion: "isNull", valor: null },
      { atributo: "localidad.id", operacion: "=", valor: idLocalidad },
      ],
      [
        'hospitalEspecialidades',
        'hospitalEspecialidades.especialidad',
      ]
    )

    let hospitalesResumen: HospitalResumen[] = [];

    for (const hosp of hospital) {
      for (const he of hosp.hospitalEspecialidades) {
        if (!he.especialidad.fechaHoraBaja && he.especialidad.id === idEspecialidad) {
          const hospitalResumen: HospitalResumen = {
            idHospital: hosp.id,
            idHospitalEspecialidad: he.id,
            nombreHospital: hosp.nombre,
            direccionHospital: hosp.direccion,
            emailHospital: hosp.email,
          };
          hospitalesResumen.push(hospitalResumen);
        }
      }
    }

    return { hospitales: hospitalesResumen };

  }

  async listarMedicosRelacionadosConHospitalYEspecialidad(idHospital: number, idHospitalEspecialidad: number): Promise<{ medicos: MedicoResumen[] }> {
    if (!idHospital || idHospital <= 0) {
      throw new BadRequestException(`El ID del Hospital es inválido`);
    }

    if (!idHospitalEspecialidad || idHospitalEspecialidad <= 0) {
      throw new BadRequestException(`El ID de la Relación Hospital-Especialidad es inválido`);
    }

    const hospital = await this.genericRepository.buscarPorId(
      Hospital,
      idHospital,
      [
        'hospitalEspecialidades',
        'hospitalEspecialidades.especialidad',
        'hospitalEspecialidades.hospitalEspecialidadMedico',
        'hospitalEspecialidades.hospitalEspecialidadMedico.medico',
      ]
    );

    if (!hospital) {
      throw new BadRequestException(`El Hospital con ID ${idHospital} no existe`);
    }

    let medicosResumen: MedicoResumen[] = [];

    for (const he of hospital.hospitalEspecialidades) {
      if (he.id === idHospitalEspecialidad && !he.fechaHoraBaja) {
        for (const hem of he.hospitalEspecialidadMedico) {
          if (hem.medico && !hem.fechaHoraBaja && !hem.fechaHasta) {
            const medicoResumen: MedicoResumen = {
              idMedico: hem.medico.id,
              idHEM: hem.id,
              idEspecialidad: he.especialidad.id,
              nombreMedico: hem.medico.nombreMedico,
              apellidoMedico: hem.medico.apellidoMedico,
              dniMedico: hem.medico.dniMedico,
              matriculaMedico: hem.medico.matriculaMedico,
              nombreEspecialidad: he.especialidad.nombre,
            };
            medicosResumen.push(medicoResumen);
          }
        }
      }
    }

    if (medicosResumen.length === 0) {
      throw new BadRequestException(`No hay médicos disponibles para la especialidad seleccionada en este hospital`);
    }

    return { medicos: medicosResumen };
  }

  async seleccionarAgendaSemanaProxima(idMedico: number, idHEM: number): Promise<AgendaSemanaProxima> {
    console.log(`Seleccionando agenda para la próxima semana del médico ID ${idMedico} y HEM ID ${idHEM}`);
    if (!idMedico || idMedico <= 0) {
      throw new BadRequestException(`El ID del Médico es inválido`);
    }

    if (!idHEM || idHEM <= 0) {
      throw new BadRequestException(`El ID de la Relación Hospital-Especialidad-Médico es inválido`);
    }

    const hem = await this.genericRepository.buscarPorId(
      HospitalEspecialidadMedico,
      idHEM,
      [
        "agendaSemanales",
        "medico",
      ]
    )
    console.log(`HEM encontrado: ${hem.id}`);

    if (!hem) {
      throw new BadRequestException(`La relación entre el Médico y el Hospital no existe o está inactiva`);
    }

    console.log(`Buscando agenda semanal para la próxima semana...`);
    let agendaSemanaProxima: AgendaSemanaProxima | null = null;
    const nroSemanaActual = this.obtenerNumeroSemana(new Date());
    const nroSemanaProxima = nroSemanaActual + 1;

    console.log(`Número de semana actual: ${nroSemanaActual}, próxima semana: ${nroSemanaProxima}`);
    for (const agenda of hem.agendaSemanales) {
      if (agenda.nroSemana === nroSemanaProxima && !agenda.fechaHoraBaja) {
        agendaSemanaProxima = {
          idAgendaSemanal: agenda.id,
          fechaDesdeAgendaSemanal: agenda.fechaDesdeAgendaSemanal,
          fechaHastaAgendaSemanal: agenda.fechaHastaAgendaSemanal,
          nroSemana: agenda.nroSemana,
        };
      }
    }

    if (!agendaSemanaProxima) {
      throw new BadRequestException(`No hay agenda disponible para la próxima semana`);
    }

    return agendaSemanaProxima;
  }

  async listarHorariosDisponiblesAgenda(idAgendaSemanal: number): Promise<{ horarios: HorarioAgenda[] }> {
    console.log(`Listando horarios disponibles para la agenda semanal ID ${idAgendaSemanal}`);
    if (!idAgendaSemanal || idAgendaSemanal <= 0) {
      throw new BadRequestException(`El ID de la Agenda Semanal es inválido`);
    }

    console.log(`Buscando agenda semanal con ID ${idAgendaSemanal}`);
    const agendaSemanal = await this.genericRepository.buscarPorId(
      AgendaSemanal,
      idAgendaSemanal,
      [
        'agendasDia',
        'agendasDia.turnosAgendaDia',
      ]
    );

    let horarios: HorarioAgenda[] = [];

    console.log(`Procesando días de la agenda semanal ID ${idAgendaSemanal}`);
    for (const agendaDia of agendaSemanal.agendasDia) {
      if (!agendaDia.fechaHoraBaja) {
        for (const turnoAgendaDia of agendaDia.turnosAgendaDia) {
          if (turnoAgendaDia.disponible && !turnoAgendaDia.fechaHoraBaja) {
            const horario: HorarioAgenda = {
              idTurnoAgendaDia: turnoAgendaDia.id,
              idAgendaDia: agendaDia.id,
              disponible: turnoAgendaDia.disponible,
              fechaHoraAgendaDia: agendaDia.fechaAgendaDia,
              horaDesdeTurnoAgendaDia: turnoAgendaDia.horaDesde,
              horaHastaTurnoAgendaDia: turnoAgendaDia.horaHasta,
            };
            horarios.push(horario);
          }
        }
      }
    }

    if (horarios.length === 0) {
      throw new BadRequestException(`No hay horarios disponibles en la agenda seleccionada`);
    }

    return { horarios };
  }

  async generarReservaTurno(idTurnoAgendaDia: number, idHospital: number, idMedico: number, idUsuario: number, observaciones?: string): Promise<Turno> {
    // Controlar consistencia de los datos
    if (!idTurnoAgendaDia || idTurnoAgendaDia <= 0) {
      throw new BadRequestException(`El ID del Turno de la Agenda del Día es inválido`);
    }

    if (!idHospital || idHospital <= 0) {
      throw new BadRequestException(`El ID del Hospital es inválido`);
    }

    if (!idMedico || idMedico <= 0) {
      throw new BadRequestException(`El ID del Médico es inválido`);
    }

    if (observaciones && observaciones.length > 500) {
      throw new BadRequestException(`Las observaciones no pueden exceder los 500 caracteres`);
    }

    console.log('Validaciones de datos de entrada completada')

    // Buscar instancia de TurnoAgendaDia
    // Leer instancia de TurnoAgendaDia
    const turnoAgendaDia = await this.genericRepository.buscarPorId(
      TurnoAgendaDia,
      idTurnoAgendaDia,
      ['turno']
    );

    console.log(`turnoAgendaDia: ${turnoAgendaDia}`)

    // COMPROBAR QUE (TurnoAgendaDia no tenga instancia de Turno relacionada && disponible == true)
    if (!turnoAgendaDia || !turnoAgendaDia.disponible || turnoAgendaDia.fechaHoraBaja) {
      throw new BadRequestException(`El Turno de la Agenda del Día no está disponible para reserva`);
    }

    if (turnoAgendaDia.turno) {
      throw new BadRequestException(`Este slot de agenda ya tiene un turno reservado`);
    }

    console.log('Validaciones de turnoAgendaDia completada')

    const hospital = await this.genericRepository.buscarPorId(
      Hospital,
      idHospital,
      []
    );

    console.log(`hospital: ${hospital}`)

    if (!hospital) {
      throw new BadRequestException(`El Hospital con ID ${idHospital} no existe`);
    }

    console.log('Validaciones de hospital completada')

    const medico = await this.genericRepository.buscarPorId(
      Medico,
      idMedico,
      []
    );

    console.log(`medico: ${medico}`)

    if (!medico) {
      throw new BadRequestException(`El Médico con ID ${idMedico} no existe`);
    }

    console.log('Validaciones de medico completada')

    const hospitalEspecialidadMedico = await this.genericRepository.buscar(
      HospitalEspecialidadMedico,
      "hem",
      [
        { atributo: "medico.id", operacion: "=", valor: idMedico },
        { atributo: "fechaHoraBaja", operacion: "isNull", valor: null }
      ],
      [
        'hospitalEspecialidad',
        'hospitalEspecialidad.especialidad',
        'hospitalEspecialidad.hospital'
      ]
    );

    console.log(`HEM: ${hospitalEspecialidadMedico}`)

    if (!hospitalEspecialidadMedico || hospitalEspecialidadMedico.length === 0) {
      throw new BadRequestException(`No se encontró la relación entre el médico y ningún hospital`);
    }

    console.log('Validaciones de HEM completada')

    const hemParaHospital = hospitalEspecialidadMedico.find(hem =>
      hem.hospitalEspecialidad.hospital.id === idHospital
    );

    if (!hemParaHospital) {
      throw new BadRequestException(`No se encontró la relación entre el médico y el hospital especificado`);
    }

    const especialidad = hemParaHospital.hospitalEspecialidad.especialidad;

    console.log('Buscando AgendaDia...')
    // Primero buscamos el TurnoAgendaDia específico con su AgendaDia
    const turnoAgendaDiaEncontrado = await this.genericRepository.buscarPorId(
      TurnoAgendaDia,
      idTurnoAgendaDia,
      ['agendaDia']
    );

    if (!turnoAgendaDiaEncontrado || turnoAgendaDiaEncontrado.fechaHoraBaja) {
      throw new BadRequestException(`El Turno de la Agenda del Día con ID ${idTurnoAgendaDia} no existe o está dado de baja`);
    }

    const agendaDia = turnoAgendaDiaEncontrado.agendaDia;
    console.log('AgendaDia encontrada')
    console.log(`fechaAgendaDia: ${agendaDia.fechaAgendaDia}`)

    if (!agendaDia || agendaDia.fechaHoraBaja) {
      throw new BadRequestException(`No se encontró el día de la agenda asociado al turno seleccionado`);
    }

    const estadoTurno = await this.genericRepository.buscar(
      EstadoTurno,
      "estadoTurno",
      [
        { atributo: "nombre", operacion: "=", valor: EstadoTurnoEnum.RESERVADO },
        { atributo: "fechaHoraBaja", operacion: "isNull", valor: null }
      ],
      []
    );

    if (!estadoTurno || estadoTurno.length === 0) {
      throw new BadRequestException(`No se encontró el estado de turno 'RESERVADO'`);
    }

    const usuario = await this.genericRepository.buscarPorId(
      Usuario,
      idUsuario,
      [
        'paciente',
      ]
    );

    if (!usuario) {
      throw new BadRequestException(`El Paciente con ID ${idUsuario} no existe`);
    }

    const paciente = usuario.paciente;

    if (!paciente) {
      throw new BadRequestException(`El Usuario con ID ${idUsuario} no está asociado a ningún Paciente`);
    }

    const nuevoTurnoEstado = new TurnoEstado();
    nuevoTurnoEstado.estadoTurno = estadoTurno[0];
    nuevoTurnoEstado.fechaDesde = new Date();
    nuevoTurnoEstado.fechaHasta = null;

    const nuevoTurno = new Turno();
    nuevoTurno.fecha = agendaDia.fechaAgendaDia;
    nuevoTurno.hora = turnoAgendaDiaEncontrado.horaDesde;
    nuevoTurno.presentismo = false;
    nuevoTurno.observaciones = observaciones ? observaciones : "";
    nuevoTurno.estadoTurno = estadoTurno[0];
    nuevoTurno.turnosEstados = [nuevoTurnoEstado];
    nuevoTurno.hospital = hospital;
    nuevoTurno.paciente = paciente
    nuevoTurno.medico = medico;
    nuevoTurno.especialidad = especialidad;

    // Guardar el nuevo turno en la base de datos
    const turnoGuardado = await this.genericRepository.guardarCambios(Turno, nuevoTurno);

    // Actualizar el turno agenda día
    turnoAgendaDiaEncontrado.disponible = false;
    turnoAgendaDiaEncontrado.turno = turnoGuardado;
    await this.genericRepository.guardarCambios(TurnoAgendaDia, turnoAgendaDiaEncontrado);

    return turnoGuardado;
  }

  async generarResumenTurno(idTurno: number): Promise<TurnoResumen> {
    if (!idTurno || idTurno <= 0) {
      throw new BadRequestException(`El ID del Turno es inválido`);
    }

    const turno = await this.genericRepository.buscarPorId(
      Turno,
      idTurno,
      [
        'hospital',
        'medico',
        'especialidad',
      ]
    );

    if (!turno) {
      throw new BadRequestException(`El turno con ID ${idTurno} no existe`);
    }

    const turnoResumen: TurnoResumen = {
      idHospital: turno.hospital.id,
      nombreHospital: turno.hospital.nombre,
      direccionHospital: turno.hospital.direccion,
      emailHospital: turno.hospital.email,
      telHospital: turno.hospital.telefono,
      idMedico: turno.medico.id,
      nombreMedico: turno.medico.nombreMedico,
      apellidoMedico: turno.medico.apellidoMedico,
      matriculaMedico: turno.medico.matriculaMedico,
      idTurno: turno.id,
      fechaTurno: turno.fecha,
      horaTurno: turno.hora,
      observacionesTurno: turno.observaciones,
      idEspecialidad: turno.especialidad.id,
      nombreEspecialidad: turno.especialidad.nombre,
    }

    return turnoResumen;
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
export { EspecialidadResumen, LocalidadResumen };

