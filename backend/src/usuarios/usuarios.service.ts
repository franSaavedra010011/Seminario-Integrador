import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { Rol } from 'src/rol/entities/rol.entity';
import { UsuarioRolService } from 'src/usuario-rol/usuario-rol.service';
import { UsuarioRol } from 'src/usuario-rol/entities/usuario-rol.entity';
import { Role } from 'src/common/enums/rol.enum';
import { MedicoService } from 'src/medico/medico.service';
import { MedicoDTO } from 'src/medico/entities/dtos/CreateMedico.dto';
import { Medico } from 'src/medico/entities/medico.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(UsuarioRol)
    private readonly usuarioRolRepository: Repository<UsuarioRol>,

    private readonly genericRepositoryService: GenericRepositoryService,
    private readonly usuarioRolService: UsuarioRolService,
    private readonly medicoService: MedicoService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    //Busco el Rol
    const roles: Rol[] = await this.genericRepositoryService.buscar(
      Rol,
      'rol',
      [
        {
          atributo: 'nombreRol',
          operacion: '=',
          valor: createUsuarioDto.rol,
        },
      ],
    );
    if (!roles.length) {
      throw new BadRequestException('Rol no encontrado');
    }
    const rolEncontrado: Rol = roles[0];
    //Creo la instancia usuarioRol con la relacion a Rol
    const usuarioRol: UsuarioRol = await this.usuarioRolService.create({
      fechaDesdeUsuarioRol: new Date(),
      rol: rolEncontrado,
    });

    //Creo el nuevo usuario con la relacion a UsuarioRol
    const nuevoUsuario = this.usuarioRepository.create({
      usernameUsuario: createUsuarioDto.usernameUsuario,
      emailUsuario: createUsuarioDto.emailUsuario,
      passwordUsuario: createUsuarioDto.passwordUsuario,
      usuarioRoles: [usuarioRol],
    });
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async createAdmin(createUsuarioDto: CreateUsuarioDto) {
    console.log('ESTOY DENTRO DEL CREAR ADMIN');

    // 1. Buscar el rol solicitado
    const roles: Rol[] = await this.genericRepositoryService.buscar(
      Rol,
      'rol',
      [
        {
          atributo: 'nombreRol',
          operacion: '=',
          valor: createUsuarioDto.rol,
        },
      ],
    );

    if (!roles.length) {
      throw new BadRequestException('Rol no encontrado');
    }

    const rolEncontrado: Rol = roles[0];
    const rolMedico: string = Role.MEDICO;
    let medicoNuevo: Medico;

    const passwordPlano = createUsuarioDto.passwordUsuario;
    if (!passwordPlano || passwordPlano.length < 6) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 6 caracteres',
      );
    }

    // 2. Crear médico si corresponde
    if (createUsuarioDto.rol === rolMedico) {
      const medicoDTO: MedicoDTO = {
        nombreMedico: createUsuarioDto.nombre!,
        apellidoMedico: createUsuarioDto.apellido!,
        dniMedico: createUsuarioDto.dni!,
        telefonoMedico: createUsuarioDto.telefono!,
        matriculaMedico: createUsuarioDto.matricula!,
        tiempoConsultaMedico: createUsuarioDto.tiempoConsulta!,
        idHospital: createUsuarioDto.hospitalId!,
        especialidades: createUsuarioDto.especialidades!,
      };

      medicoNuevo = await this.medicoService.create(medicoDTO);
    }

    // 3. Crear el usuario sin usuarioRoles aún

    const passwordHasheado = await bcryptjs.hash(passwordPlano, 10);

    const nuevoUsuario = this.usuarioRepository.create({
      usernameUsuario: createUsuarioDto.usernameUsuario,
      emailUsuario: createUsuarioDto.emailUsuario,
      passwordUsuario: passwordHasheado,
      medicos: medicoNuevo!,
    });

    const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);

    // 4. Crear la relación usuario-rol (UsuarioRol)
    const usuarioRol = new UsuarioRol();
    usuarioRol.fechaDesdeUsuarioRol = new Date();
    usuarioRol.rol = rolEncontrado;
    usuarioRol.usuario = usuarioGuardado;

    await this.usuarioRolRepository.save(usuarioRol); // Asegurate de tener `usuarioRolRepository` inyectado

    // 5. (Opcional) retornar el usuario con sus relaciones cargadas si lo necesitás
    return this.usuarioRepository.findOne({
      where: { idUsuario: usuarioGuardado.idUsuario },
      relations: ['usuarioRoles', 'usuarioRoles.rol', 'medicos'],
    });
  }

  findOneByEmailWithPassword(emailUsuario: string) {
    return this.usuarioRepository.findOne({
      where: { emailUsuario },
      relations: ['usuarioRoles', 'usuarioRoles.rol'],
      select: [
        'idUsuario',
        'usernameUsuario',
        'emailUsuario',
        'passwordUsuario',
        'usuarioRoles',
      ],
    });
  }

  findOneByEmail(emailUsuario: string) {
    return this.usuarioRepository.findOneBy({ emailUsuario });
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  /*update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
