import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { ConsultarTurnosHistorialDTO } from './dto/consultar-turnos-historial.dto';
import { ConsultarPorcentajePacientesDTO } from './dto/consultar-porcentaje-pacientes.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Turno } from 'src/domain/entities/turno.entity';

@Injectable()
export class ConsultarPorcentajeDeAsistenciaDePacientesUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
  ) {}
  async consultarPorcentajeAsistenciaPacientesHospitales(mailUsuario: string) {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.medico', 'med')
      .leftJoinAndSelect('usuario.personalHospital', 'ph')
      .leftJoinAndSelect('ph.hospital', 'hosp')
      .where('usuario.emailUsuario = :id AND usuario.fechaHoraBaja IS NULL', {
        id: mailUsuario,
      })
      .getOne();

    if (!usuario) {
      throw new BadRequestException(
        `El usuario no existe o ya ha sido dado de baja`,
      );
    }
    const medico = usuario.medico;
    if (!medico) {
      throw new BadRequestException(`El usuario no corresponde a un medico`);
    }
    const personalHospitales = usuario.personalHospital;

    const listaHospitalesDTO: ConsultarPorcentajePacientesDTO[] = [];
    for (const personal of personalHospitales) {
      const hospital = personal.hospital;
      if (hospital.fechaHoraBaja === null) {
        const dtoHospital: ConsultarPorcentajePacientesDTO = {
          nombreHospital: hospital.nombre,
          idHospital: hospital.id,
        };
        listaHospitalesDTO.push(dtoHospital);
      }
    }
    if (!listaHospitalesDTO || listaHospitalesDTO.length === 0) {
      throw new BadRequestException(`No trabaja en ningun hospital`);
    }
    return listaHospitalesDTO;
  }
  async consultarPorcentajeAsistenciaPacientes(idHospital: Number) {
    const hospital = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
        id: idHospital,
      })
      .getOne();

    if (!hospital) {
      throw new BadRequestException(
        `El hospital no existe o ya ha sido dado de baja`,
      );
    }
    const fechaActual = new Date();
    const fechaSolo = fechaActual.toISOString().split('T')[0];
    const hora = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${hora}:${minutos}`;
    const turnos = await this.turnoRepository
      .createQueryBuilder('turno')
      .where(
        'turno.hospital = :hospitalbuscado AND turno.fechaHoraBaja IS NULL AND turno.fecha = :fechaActual AND CAST(turno.hora AS time) <= CAST(:horaActual AS time)',
        {
          hospitalbuscado: hospital.id,
          fechaActual: fechaSolo,
          horaActual: horaFormateada,
        },
      )
      .getMany();
    if (!turnos) {
      throw new BadRequestException(`No se encontro el turno`);
    }
    let cantTurno = 0;
    let turnoAsistido = 0;
    for (const turno of turnos) {
      cantTurno = cantTurno + 1;
      if (turno.presentismo === true) {
        turnoAsistido = turnoAsistido + 1;
      }
    }
    const porcentaje = (turnoAsistido * 100) / cantTurno;
    return porcentaje;
  }
}
