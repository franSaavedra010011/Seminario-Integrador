"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const typeorm_2 = require("typeorm");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
const rol_entity_1 = require("../rol/entities/rol.entity");
const usuario_rol_service_1 = require("../usuario-rol/usuario-rol.service");
const usuario_rol_entity_1 = require("../usuario-rol/entities/usuario-rol.entity");
const rol_enum_1 = require("../common/enums/rol.enum");
const medico_service_1 = require("../medico/medico.service");
const bcryptjs = require("bcryptjs");
let UsuariosService = class UsuariosService {
    usuarioRepository;
    usuarioRolRepository;
    genericRepositoryService;
    usuarioRolService;
    medicoService;
    constructor(usuarioRepository, usuarioRolRepository, genericRepositoryService, usuarioRolService, medicoService) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioRolRepository = usuarioRolRepository;
        this.genericRepositoryService = genericRepositoryService;
        this.usuarioRolService = usuarioRolService;
        this.medicoService = medicoService;
    }
    async create(createUsuarioDto) {
        const roles = await this.genericRepositoryService.buscar(rol_entity_1.Rol, 'rol', [
            {
                atributo: 'nombreRol',
                operacion: '=',
                valor: createUsuarioDto.rol,
            },
        ]);
        if (!roles.length) {
            throw new common_1.BadRequestException('Rol no encontrado');
        }
        const rolEncontrado = roles[0];
        const usuarioRol = await this.usuarioRolService.create({
            fechaDesdeUsuarioRol: new Date(),
            rol: rolEncontrado,
        });
        const nuevoUsuario = this.usuarioRepository.create({
            usernameUsuario: createUsuarioDto.usernameUsuario,
            emailUsuario: createUsuarioDto.emailUsuario,
            passwordUsuario: createUsuarioDto.passwordUsuario,
            usuarioRoles: [usuarioRol],
        });
        return this.usuarioRepository.save(nuevoUsuario);
    }
    async createAdmin(createUsuarioDto) {
        console.log('ESTOY DENTRO DEL CREAR ADMIN');
        const roles = await this.genericRepositoryService.buscar(rol_entity_1.Rol, 'rol', [
            {
                atributo: 'nombreRol',
                operacion: '=',
                valor: createUsuarioDto.rol,
            },
        ]);
        if (!roles.length) {
            throw new common_1.BadRequestException('Rol no encontrado');
        }
        const rolEncontrado = roles[0];
        const rolMedico = rol_enum_1.Role.MEDICO;
        let medicoNuevo;
        const passwordPlano = createUsuarioDto.passwordUsuario;
        if (!passwordPlano || passwordPlano.length < 6) {
            throw new common_1.BadRequestException('La contraseña debe tener al menos 6 caracteres');
        }
        if (createUsuarioDto.rol === rolMedico) {
            const medicoDTO = {
                nombreMedico: createUsuarioDto.nombre,
                apellidoMedico: createUsuarioDto.apellido,
                dniMedico: createUsuarioDto.dni,
                telefonoMedico: createUsuarioDto.telefono,
                matriculaMedico: createUsuarioDto.matricula,
                tiempoConsultaMedico: createUsuarioDto.tiempoConsulta,
                idHospital: createUsuarioDto.hospitalId,
                especialidades: createUsuarioDto.especialidades,
            };
            medicoNuevo = await this.medicoService.create(medicoDTO);
        }
        const passwordHasheado = await bcryptjs.hash(passwordPlano, 10);
        const nuevoUsuario = this.usuarioRepository.create({
            usernameUsuario: createUsuarioDto.usernameUsuario,
            emailUsuario: createUsuarioDto.emailUsuario,
            passwordUsuario: passwordHasheado,
            medicos: medicoNuevo,
        });
        const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);
        const usuarioRol = new usuario_rol_entity_1.UsuarioRol();
        usuarioRol.fechaDesdeUsuarioRol = new Date();
        usuarioRol.rol = rolEncontrado;
        usuarioRol.usuario = usuarioGuardado;
        await this.usuarioRolRepository.save(usuarioRol);
        return this.usuarioRepository.findOne({
            where: { idUsuario: usuarioGuardado.idUsuario },
            relations: ['usuarioRoles', 'usuarioRoles.rol', 'medicos'],
        });
    }
    findOneByEmailWithPassword(emailUsuario) {
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
    findOneByEmail(emailUsuario) {
        return this.usuarioRepository.findOneBy({ emailUsuario });
    }
    findAll() {
        return this.usuarioRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} usuario`;
    }
    remove(id) {
        return `This action removes a #${id} usuario`;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_rol_entity_1.UsuarioRol)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        genericRepository_service_1.GenericRepositoryService,
        usuario_rol_service_1.UsuarioRolService,
        medico_service_1.MedicoService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map