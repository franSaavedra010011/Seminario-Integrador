"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const paciente_module_1 = require("./paciente/paciente.module");
const turno_module_1 = require("./turno/turno.module");
const medico_module_1 = require("./medico/medico.module");
const hospital_module_1 = require("./hospital/hospital.module");
const especialidad_module_1 = require("./especialidad/especialidad.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const auth_module_1 = require("./auth/auth.module");
const historia_medica_module_1 = require("./historia-medica/historia-medica.module");
const localidad_module_1 = require("./localidad/localidad.module");
const agenda_semanal_module_1 = require("./agenda-semanal/agenda-semanal.module");
const agenda_dia_module_1 = require("./agenda-dia/agenda-dia.module");
const turno_agenda_dia_module_1 = require("./turno-agenda-dia/turno-agenda-dia.module");
const estado_turno_module_1 = require("./estado-turno/estado-turno.module");
const turno_estado_module_1 = require("./turno-estado/turno-estado.module");
const hospital_especialidad_module_1 = require("./hospital-especialidad/hospital-especialidad.module");
const especialidad_medico_module_1 = require("./especialidad-medico/especialidad-medico.module");
const congestion_actual_module_1 = require("./congestion-actual/congestion-actual.module");
const congestion_historico_module_1 = require("./congestion-historico/congestion-historico.module");
const hospital_especialidad_medico_module_1 = require("./hospital-especialidad-medico/hospital-especialidad-medico.module");
const paciente_notificacion_module_1 = require("./paciente-notificacion/paciente-notificacion.module");
const personal_hospital_module_1 = require("./personal-hospital/personal-hospital.module");
const usuario_rol_module_1 = require("./usuario-rol/usuario-rol.module");
const rol_module_1 = require("./rol/rol.module");
const rol_permiso_module_1 = require("./rol-permiso/rol-permiso.module");
const permiso_module_1 = require("./permiso/permiso.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '1234',
                database: 'turnos_db',
                entities: [__dirname + '/**/*.entity.{ts,js}'],
                synchronize: true,
            }),
            paciente_module_1.PacienteModule,
            turno_module_1.TurnoModule,
            medico_module_1.MedicoModule,
            hospital_module_1.HospitalModule,
            especialidad_module_1.EspecialidadModule,
            usuarios_module_1.UsuariosModule,
            auth_module_1.AuthModule,
            historia_medica_module_1.HistoriaMedicaModule,
            localidad_module_1.LocalidadModule,
            agenda_semanal_module_1.AgendaSemanalModule,
            agenda_dia_module_1.AgendaDiaModule,
            turno_agenda_dia_module_1.TurnoAgendaDiaModule,
            estado_turno_module_1.EstadoTurnoModule,
            turno_estado_module_1.TurnoEstadoModule,
            hospital_especialidad_module_1.HospitalEspecialidadModule,
            especialidad_medico_module_1.EspecialidadMedicoModule,
            congestion_actual_module_1.CongestionActualModule,
            congestion_historico_module_1.CongestionHistoricoModule,
            hospital_especialidad_medico_module_1.HospitalEspecialidadMedicoModule,
            paciente_notificacion_module_1.PacienteNotificacionModule,
            personal_hospital_module_1.PersonalHospitalModule,
            usuario_rol_module_1.UsuarioRolModule,
            rol_module_1.RolModule,
            rol_permiso_module_1.RolPermisoModule,
            permiso_module_1.PermisoModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map