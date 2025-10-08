import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { AbmTurnoUseCase } from '../abm/turno/abm-turno.use-case';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { ConsultarTurnosAsignadosHospitalDTO } from './dto/consultar-cantidad-turnos-asignados-hospitales.dto';
import { Turno } from 'src/domain/entities/turno.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { ConsultarCantidadTurnosAsignadosTurnosDTO } from './dto/consultar-cantidad-turnos-asignados-turnos.dto';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { log } from 'console';

@Injectable()
export class ConsultarCantidadDeTurnosAsignadosUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    private readonly bajaLogica: AbmTurnoUseCase,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(TurnoAgendaDia)
    private turnoAgendaDiaRepository: Repository<TurnoAgendaDia>,
  ) {}
  async consultarTurnosAsignadosHospitales(mailUsuario: string) {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.personalHospital', 'ph')
      .leftJoinAndSelect('ph.hospital', 'h') // hospital
      .where('usuario.emailUsuario = :id AND usuario.fechaHoraBaja IS NULL', {
        id: mailUsuario,
      })
      .getOne();

    if (!usuario) {
      throw new BadRequestException(
        `El usuario no existe o ya ha sido dado de baja`,
      );
    }
    const listaHospitalDTO: ConsultarTurnosAsignadosHospitalDTO[] = [];
    const personalHospital = usuario.personalHospital;
    for (const persona of personalHospital) {
      if (persona.fechaHoraBaja === null) {
        const hospital = persona.hospital;
        if (hospital.fechaHoraBaja === null) {
          const dtoHospital: ConsultarTurnosAsignadosHospitalDTO = {
            idHospital: hospital.id,
            nombreHospital: hospital.nombre,
          };
          listaHospitalDTO.push(dtoHospital);
        }
      }
    }
    if (!listaHospitalDTO || listaHospitalDTO.length === 0) {
      throw new BadRequestException(`No esta asignado en ningun hospital`);
    }
    return listaHospitalDTO;
  }
  async consultarCantidadTurnosAsignados(
    idHospital: number,
    mailUsuario: string,
  ) {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.personalHospital', 'ph')
      .leftJoinAndSelect('ph.hospital', 'h')
      .leftJoinAndSelect('usuario.medico', 'm')
      .where('usuario.emailUsuario = :id AND usuario.fechaHoraBaja IS NULL', {
        id: mailUsuario,
      })
      .getOne();

    if (!usuario) {
      throw new BadRequestException(
        `El usuario no existe o ya ha sido dado de baja`,
      );
    }
    const hospitalSeleccionado = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();

    if (!usuario) {
      throw new BadRequestException(
        `El usuario no existe o ya ha sido dado de baja`,
      );
    }
    const medicoRegistrado = usuario.medico;
    const turnos = await this.turnoRepository
      .createQueryBuilder('turno')
      .leftJoinAndSelect('turno.especialidad', 'e')
      .leftJoinAndSelect('turno.medico', 'm')
      .leftJoinAndSelect('turno.hospital', 'h')
      .where(
        'turno.hospital = :hospital AND turno.medico = :medico AND turno.fechaHoraBaja IS NULL',
        {
          hospital: hospitalSeleccionado!.id,
          medico: medicoRegistrado.id,
        },
      )
      .getMany();
    const listaTurnoDTO: ConsultarCantidadTurnosAsignadosTurnosDTO[] = [];
    for (const turno of turnos) {
      const pacientes = await this.pacienteRepository
        .createQueryBuilder('paciente')
        .leftJoinAndSelect('paciente.turnos', 't')
        .where('paciente.fechaHoraBaja IS NULL')
        .getMany();
      for (const paciente of pacientes) {
        const turnosPaciente = paciente.turnos;
        if (turnosPaciente!) {
          for (const turnoPaciente of turnosPaciente) {
            if (turnoPaciente.id === turno.id) {
              const turnoDTO: ConsultarCantidadTurnosAsignadosTurnosDTO = {
                horaTurno: turno.hora,
                nombreEspecialidad: turno.especialidad.nombre,
                nombrePaciente: paciente!.nombrePaciente,
                apellidoPaciente: paciente!.apellidoPaciente,
              };
              listaTurnoDTO.push(turnoDTO);
            }
          }
        }
      }
    }
    if (!listaTurnoDTO || listaTurnoDTO.length === 0) {
      throw new BadRequestException(
        `No se encontraron turnos pendientes para hoy`,
      );
    }
    return listaTurnoDTO;
  }
}
