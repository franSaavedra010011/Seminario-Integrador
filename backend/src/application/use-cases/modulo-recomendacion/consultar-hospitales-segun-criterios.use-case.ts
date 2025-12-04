import { Injectable } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { ConsultarHospitalesCriteriosDto, CriterioBusquedaHospital } from './dto/consultar-hospitales-criterios.dto';
import { ConsultarHospitalesCriteriosResultadoDto } from './dto/consultar-hospitales-criterios.resultado';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Turno } from 'src/domain/entities/turno.entity';

@Injectable()
export class ConsultarHospitalesSegunCriteriosUseCase {
    constructor(
        private readonly genericRepository: GenericRepositoryService,
    ) { }

    async ejecutar(dto: ConsultarHospitalesCriteriosDto): Promise<ConsultarHospitalesCriteriosResultadoDto[]> {

        // 1. Iniciar CU

        // 2. Ingresar datos del usuario (idUsuario)
        const idUsuario = dto.idUsuario;

        // 3. Validar datos del usuario

        /*
            Buscar instancia de usuario existente:
                - Con id igual al proporcionado
                - Con fechaHoraBaja igual a null (Usuario vigente)
        */
        const usuarios = await this.genericRepository.buscar(
            Usuario,
            'usr',
            [
                { atributo: 'id', operacion: '=', valor: idUsuario },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ],
        );

        // CA N°1: no se encontró el usuario o paciente
        if (!usuarios.length) {
            throw new Error(`No se encontró el usuario o paciente con ID ${dto.idUsuario}`);
        }

        console.log(`Usuario encontrado con id: ${idUsuario}`);

        // 4. Mostrar criterios para los filtros
        const filtroHospital = dto.criterio;

        console.log(`Criterio de búsqueda seleccionado: ${filtroHospital}`);

        if (filtroHospital === CriterioBusquedaHospital.UltimoVisitado) {
            return await this.filtroUltimoVisitado(dto);
        } else if (filtroHospital === CriterioBusquedaHospital.Especialidades) {
            return await this.filtroEspecialidades(dto);
        } else if (filtroHospital === CriterioBusquedaHospital.Medicos) {
            return await this.filtroMedicos(dto);
        } else {
            throw new Error('Criterio de búsqueda inválido');
        }

    }

    async filtroUltimoVisitado(dto: ConsultarHospitalesCriteriosDto): Promise<ConsultarHospitalesCriteriosResultadoDto[]> {
        const usuarios = await this.genericRepository.buscar(
            Usuario,
            'usr',
            [
                { atributo: 'id', operacion: '=', valor: dto.idUsuario },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ],
            ['paciente', 'paciente.turnos', 'paciente.turnos.hospital', 'paciente.turnos.hospital.localidad', 'paciente.turnos.hospital.congestionesActual']
        );

        if (!usuarios.length || !usuarios[0].paciente) {
            throw new Error(`No se encontró el usuario o paciente con ID ${dto.idUsuario}`);
        }

        const paciente = usuarios[0].paciente;
        const turnos = paciente.turnos || [];

        if (!turnos.length) {
            throw new Error(`El paciente no tiene turnos registrados`);
        }

        let ultimoTurno: Turno | null = null;
        const fechaActual = new Date();

        for (const turno of turnos) {
            const fechaTurno = new Date(turno.fecha);
            if (fechaTurno <= fechaActual) {

                if (!ultimoTurno || fechaTurno >= new Date(ultimoTurno.fecha)) {
                    ultimoTurno = turno;
                }
            }
        }

        if (!ultimoTurno) {
            throw new Error(`No se encontraron turnos pasados para el paciente`);
        }

        const hospitalOk = ultimoTurno.hospital;

        if (!hospitalOk) {
            throw new Error(`No se encontró hospital asociado al último turno`);
        }

        const resultados: ConsultarHospitalesCriteriosResultadoDto[] = [hospitalOk].map(hospital => {
            const resultado = new ConsultarHospitalesCriteriosResultadoDto();
            resultado.idHospital = hospital.id;
            resultado.direccionHospital = hospital.direccion;
            resultado.emailHospital = hospital.email;
            resultado.nombreHospital = hospital.nombre;
            resultado.nombreLocalidad = hospital.localidad?.nombre;
            resultado.telHospital = hospital.telefono;
            return resultado;
        });

        return resultados;
    }

    async filtroMedicos(dto: ConsultarHospitalesCriteriosDto): Promise<ConsultarHospitalesCriteriosResultadoDto[]> {
        const medicos = await this.genericRepository.buscar(
            Medico,
            'medicos',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
        );

        if (!medicos.length) {
            throw new Error('No se encontraron médicos');
        }

        const hospitales = await this.genericRepository.buscar(
            Hospital,
            'hospitales',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            ['hospitalEspecialidades', 'hospitalEspecialidades.hospitalEspecialidadMedico', 'hospitalEspecialidades.hospitalEspecialidadMedico.medico']
        );

        const hospitalesOk = hospitales.filter(hospital =>
            hospital.hospitalEspecialidades?.some(he =>
                he.hospitalEspecialidadMedico?.some(hem =>
                    hem.medico?.id === dto.idMedico
                )
            )
        );

        const resultados: ConsultarHospitalesCriteriosResultadoDto[] = hospitalesOk.map(hospital => {
            const resultado = new ConsultarHospitalesCriteriosResultadoDto();
            resultado.idHospital = hospital.id;
            resultado.direccionHospital = hospital.direccion;
            resultado.emailHospital = hospital.email;
            resultado.nombreHospital = hospital.nombre;
            resultado.nombreLocalidad = hospital.localidad?.nombre;
            resultado.telHospital = hospital.telefono;
            return resultado;
        });

        return resultados;
    }

    async filtroEspecialidades(dto: ConsultarHospitalesCriteriosDto): Promise<ConsultarHospitalesCriteriosResultadoDto[]> {
        const especialidades = await this.genericRepository.buscar(
            Especialidad,
            'especialidades',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
        );

        if (!especialidades.length) {
            throw new Error('No se encontraron especialidades');
        }

        const hospitales = await this.genericRepository.buscar(
            Hospital,
            'hospitales',
            [{ atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }],
            ['hospitalEspecialidades', 'hospitalEspecialidades.especialidad']
        );

        const hospitalesOk = hospitales.filter(hospital =>
            hospital.hospitalEspecialidades?.some(he =>
                he.especialidad?.id === dto.idEspecialidad && !he.fechaHasta && !he.especialidad?.fechaHoraBaja
            )
        );

        const resultados: ConsultarHospitalesCriteriosResultadoDto[] = hospitalesOk.map(hospital => {
            const resultado = new ConsultarHospitalesCriteriosResultadoDto();
            resultado.idHospital = hospital.id;
            resultado.direccionHospital = hospital.direccion;
            resultado.emailHospital = hospital.email;
            resultado.nombreHospital = hospital.nombre;
            resultado.nombreLocalidad = hospital.localidad?.nombre;
            resultado.telHospital = hospital.telefono;
            return resultado;
        });

        return resultados;
    }





}
