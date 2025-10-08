import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { ConsultarTurnosHistorialDTO } from './dto/consultar-turnos-historial.dto';

@Injectable()
export class ConsultarHistorialDeTurnosUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}
  async consultarHistorialTurnos(mailUsuario: string) {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.paciente', 'pac')
      .leftJoinAndSelect('pac.turnos', 'turn')
      .leftJoinAndSelect('turn.medico', 'med')
      .leftJoinAndSelect('turn.hospital', 'hosp')
      .leftJoinAndSelect('turn.especialidad', 'esp')
      .where('usuario.emailUsuario = :id AND usuario.fechaHoraBaja IS NULL', {
        id: mailUsuario,
      })
      .getOne();

    if (!usuario) {
      throw new BadRequestException(
        `El usuario no existe o ya ha sido dado de baja`,
      );
    }
    const listaTurnosDTO: ConsultarTurnosHistorialDTO[] = [];
    const paciente = usuario.paciente;
    const turnosPaciente = paciente.turnos;
    for (const turnoPaciente of turnosPaciente) {
      const dtoTurno: ConsultarTurnosHistorialDTO = {
        fechaTurno: turnoPaciente.fecha,
        fechaBajaTurno: turnoPaciente.fechaHoraBaja!,
        presentismo: turnoPaciente.presentismo,
        observaciones: turnoPaciente.observaciones,
        nombreHospital: turnoPaciente.hospital.nombre,
        nombreEspecialidad: turnoPaciente.especialidad.nombre,
        nombreMedico: turnoPaciente.medico.nombreMedico,
        apellidoMedico: turnoPaciente.medico.apellidoMedico,
      };
      listaTurnosDTO.push(dtoTurno);
    }
    if (!listaTurnosDTO || listaTurnosDTO.length === 0) {
      throw new BadRequestException(`No tiene turnos previos`);
    }
    return listaTurnosDTO;
  }
}
