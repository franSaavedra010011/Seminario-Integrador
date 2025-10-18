import { PersonalHospital } from './../../../../domain/entities/personal-hospital.entity';
import { CreateMedicoDto } from 'src/application/use-cases/abm/medico/dto/create-medico.dto';
import { AbmMedicoUseCase } from 'src/application/use-cases/abm/medico/abm-medico.use-case';
import { AbmPacienteUseCase } from 'src/application/use-cases/abm/paciente/abm-paciente.use-case';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
import * as bcryptjs from 'bcryptjs';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { Repository } from 'typeorm';
import { Rol } from 'src/domain/entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePacienteDto } from '../paciente/dto/create-paciente.dto';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';
import { PacienteNotificacion } from 'src/domain/entities/paciente-notificacion.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';

@Injectable()
export class AbmUsuarioUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
    @InjectRepository(UsuarioRol)
    private readonly usuarioRolRepo: Repository<UsuarioRol>,
    private readonly AbmPacienteUseCase: AbmPacienteUseCase,
    private readonly AbmMedicoUseCase: AbmMedicoUseCase
  ) { }

  async crear(dto: CreateUsuarioDto): Promise<Usuario> {
    // Iniciar CU

    const { datosPaciente, datosMedico } = dto;
    /*
      Buscar instancia de usuario existente:
        - Con email igual al proporcionado
        - Con fechaHoraBaja igual a null (Usuario vigente)
    */
    const existente = await this.genericRepository.buscar(Usuario, 'usuario', [
      { atributo: 'emailUsuario', operacion: '=', valor: dto.emailUsuario },
      { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
    ]);

    // Comprobar que no existe ya un usuario con el email proporcionado
    if (existente.length > 0) {
      // CA N°1: ya existe un usuario con ese email
      throw new BadRequestException('Usuario ya existente');
    }

    // Leer passwordUsuario y generar su hash
    const passwordHash = await bcryptjs.hash(dto.passwordUsuario, 10);

    /*
      Crear instancia de Usuario:
        - Con username igual al ingresado
        - Con email igual al ingresado
        - Con password igual al hash generado
    */
    const usuario = new Usuario();
    usuario.usernameUsuario = dto.usernameUsuario;
    usuario.emailUsuario = dto.emailUsuario;
    usuario.passwordUsuario = passwordHash;

    /*
      TODO: Implementar relacion con PersonalHospital y Hospital
    */

    // Guardar cambios
    const usuarioGuardado = await this.genericRepository.guardarCambios(
      Usuario,
      usuario
    );

    const rolesVinculados: Rol[] = [];
    for (const idRol of dto.idRoles) {
      const roles = await this.genericRepository.buscar(Rol, 'rol', [
        { atributo: 'id', operacion: '=', valor: idRol },
        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
      ]);

      if (!roles.length) {
        throw new BadRequestException(`Rol con ID ${idRol} no existe`);
      }

      const rol = roles[0];
      rolesVinculados.push(rol);

      const usuarioRol = new UsuarioRol();
      usuarioRol.usuario = usuarioGuardado;
      usuarioRol.rol = rol;
      usuarioRol.fechaDesde = new Date();
      usuarioRol.rolActivo = true;

      await this.genericRepository.guardarCambios(UsuarioRol, usuarioRol);
    }

    const tieneRolPaciente = rolesVinculados.some(
      (r) => r.nombre.toUpperCase() === 'PACIENTE'
    );
    if (tieneRolPaciente) {
      if (!datosPaciente) {
        throw new BadRequestException('Faltan datos del paciente');
      }
      const pacienteCreado = await this.AbmPacienteUseCase.crear(
        datosPaciente,
        usuarioGuardado
      );
      usuarioGuardado.paciente = pacienteCreado;
      await this.genericRepository.guardarCambios(Usuario, usuarioGuardado);
    }

    const tieneRolMedico = rolesVinculados.some(
      (r) => r.nombre.toUpperCase() === 'MEDICO'
    );
    if (tieneRolMedico) {
      if (!datosMedico) {
        throw new BadRequestException('Faltan datos del médico');
      }
      const medicoCreado = await this.AbmMedicoUseCase.crear(
        datosMedico,
        usuarioGuardado
      );
      usuarioGuardado.medico = medicoCreado;
      await this.genericRepository.guardarCambios(Usuario, usuarioGuardado);
    }

    const esPersonalHospital = rolesVinculados.some(
      (r) => r.nombre.toUpperCase() === 'ADMINHOSPITAL' || r.nombre.toUpperCase() === 'RECEPCIONISTA'
    );

    if (esPersonalHospital) {
      const personalHospital = new PersonalHospital();
      personalHospital.fechaDesde = new Date();
      personalHospital.usuario = usuarioGuardado;
      const hospitalRelacionado = await this.genericRepository.buscar(Hospital, 'hospital', [
        { atributo: 'id', operacion: '=', valor: dto.idHospital },
      ]);
      personalHospital.hospital = hospitalRelacionado[0];
      await this.genericRepository.guardarCambios(PersonalHospital, personalHospital);
    }

    const usuarioConRelaciones = await this.genericRepository.buscar(Usuario, 'u', [
      { atributo: 'id', operacion: '=', valor: usuarioGuardado.id },
    ], ['paciente', 'medico', 'usuarioRoles', 'usuarioRoles.rol']);

    return usuarioConRelaciones[0];
  }

  async actualizar(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarios = await this.genericRepository.buscar(Usuario, 'usuario', [
      { atributo: 'id', operacion: '=', valor: id },
    ]);

    if (!usuarios.length) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const usuario = usuarios[0];

    // Si se quiere actualizar la contraseña
    if (dto.passwordUsuario) {
      dto.passwordUsuario = await bcryptjs.hash(dto.passwordUsuario, 10);
    }

    Object.assign(usuario, dto);

    const usuarioActualizado = await this.genericRepository.guardarCambios(
      Usuario,
      usuario
    );

    // Agregar roles
    if (dto.idRolesAAgregar?.length) {
      for (const idRol of dto.idRolesAAgregar) {
        const roles = await this.genericRepository.buscar(Rol, 'rol', [
          { atributo: 'id', operacion: '=', valor: idRol },
        ]);

        if (!roles.length) {
          throw new BadRequestException(`Rol con ID ${idRol} no existe`);
        }

        // Buscar si ya tiene ese rol asignado
        const existente = await this.genericRepository.buscar(
          UsuarioRol,
          'usuarioRol',
          [
            { atributo: 'usuario', operacion: 'relacion', valor: usuario.id },
            { atributo: 'rol', operacion: 'relacion', valor: idRol },
          ]
        );

        if (!existente.length) {
          const usuarioRol = new UsuarioRol();
          usuarioRol.usuario = usuarioActualizado;
          usuarioRol.rol = roles[0];
          usuarioRol.fechaDesde = new Date();

          await this.genericRepository.guardarCambios(UsuarioRol, usuarioRol);
        }
      }
    }

    // Eliminar roles
    if (dto.idRolesAEliminar?.length) {
      for (const idRol of dto.idRolesAEliminar) {
        const relaciones = await this.genericRepository.buscar(
          UsuarioRol,
          'usuarioRol',
          [
            { atributo: 'usuario', operacion: 'relacion', valor: usuario.id },
            { atributo: 'rol', operacion: 'relacion', valor: idRol },
          ]
        );

        for (const rel of relaciones) {
          await this.genericRepository.eliminar(UsuarioRol, rel.id);
          rel.fechaHasta = new Date();
          await this.genericRepository.guardarCambios(UsuarioRol, rel);
        }
      }
    }

    return usuarioActualizado;
  }

  async eliminar(id: number): Promise<void> {
    const usuario = await this.genericRepository.buscarPorId(Usuario, id);

    if (!usuario || usuario.fechaHoraBaja) {
      throw new NotFoundException('Usuario no encontrado o ya dado de baja');
    }

    const fechaActual = new Date();
    usuario.fechaHoraBaja = fechaActual;

    // Buscar y dar de baja los roles del usuario
    const roles = await this.genericRepository.buscar(UsuarioRol, 'ur', [
      { atributo: 'usuario', operacion: '=', valor: usuario.id },
    ]);
    for (const rol of roles) {
      rol.fechaHasta = fechaActual;
      await this.genericRepository.guardarCambios(UsuarioRol, rol);
    }

    // Si es paciente, dar de baja entidad Paciente y sus datos relacionados
    const paciente = await this.genericRepository.buscar(Paciente, 'pac', [
      { atributo: 'usuario', operacion: '=', valor: usuario.id },
    ]);
    if (paciente) {
      const pacienteEncontrado = paciente[0];
      pacienteEncontrado.fechaHoraBaja = fechaActual;
      await this.genericRepository.guardarCambios(Paciente, pacienteEncontrado);

      // Turnos del paciente
      const turnos = await this.genericRepository.buscar(Turno, 'tur', [
        { atributo: 'paciente', operacion: '=', valor: paciente },
      ]);
      for (const turno of turnos) {
        turno.fechaHoraBaja = fechaActual;
        await this.genericRepository.guardarCambios(Turno, turno);

        // TurnoEstado relacionado
        const estados = await this.genericRepository.buscar(TurnoEstado, 'te', [
          { atributo: 'turno', operacion: '=', valor: turno.id },
          { atributo: 'fechaHasta', operacion: 'isNull', valor: null },
        ]);
        for (const estado of estados) {
          estado.fechaHasta = fechaActual;
          await this.genericRepository.guardarCambios(TurnoEstado, estado);
        }

        // Notificaciones
        const notificaciones = await this.genericRepository.buscar(
          PacienteNotificacion,
          'pn',
          [{ atributo: 'turno', operacion: '=', valor: turno.id }]
        );
        for (const noti of notificaciones) {
          noti.fechaHoraBaja = fechaActual;
          await this.genericRepository.guardarCambios(PacienteNotificacion, noti);
        }
      }
    }

    // Si es médico, aplicar baja similar
    const medico = await this.genericRepository.buscar(Medico, 'med', [
      { atributo: 'usuario', operacion: '=', valor: usuario.id },
    ]);
    if (medico) {
      const medicoEncontrado = medico[0];
      medicoEncontrado.fechaHoraBaja = fechaActual;
      await this.genericRepository.guardarCambios(Medico, medicoEncontrado);

      // Turnos como médico
      const turnosMedico = await this.genericRepository.buscar(Turno, 't', [
        { atributo: 'medico', operacion: '=', valor: medicoEncontrado },
      ]);
      for (const turno of turnosMedico) {
        turno.fechaHoraBaja = fechaActual;
        await this.genericRepository.guardarCambios(Turno, turno);

        const estados = await this.genericRepository.buscar(TurnoEstado, 'te', [
          { atributo: 'turno', operacion: '=', valor: turno.id },
          { atributo: 'fechaHasta', operacion: 'isNull', valor: null },
        ]);
        for (const estado of estados) {
          estado.fechaHasta = fechaActual;
          await this.genericRepository.guardarCambios(TurnoEstado, estado);
        }
      }
    }

    // Finalmente, dar de baja al usuario
    await this.genericRepository.guardarCambios(Usuario, usuario);
  }
}
