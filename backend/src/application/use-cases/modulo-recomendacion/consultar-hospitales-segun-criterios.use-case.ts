import { Injectable } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { ConsultarHospitalesCriteriosDto } from './dto/consultar-hospitales-criterios.dto';
import { ConsultarHospitalesCriteriosResultadoDto } from './dto/consultar-hospitales-criterios.resultado';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';

@Injectable()
export class ConsultarHospitalesSegunCriteriosUseCase {
    constructor(
        private readonly genericRepository: GenericRepositoryService,
    ) { }

    async ejecutar(dto: ConsultarHospitalesCriteriosDto): Promise<ConsultarHospitalesCriteriosResultadoDto[]> {
        const usuarios = await this.genericRepository.buscar(
            Usuario,
            'usr',
            [
                { atributo: 'id', operacion: '=', valor: dto.idUsuario },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ],
            ['paciente', 'paciente.localidad']
        );

        if (!usuarios.length || !usuarios[0].paciente) {
            throw new Error(`No se encontró el usuario o paciente con ID ${dto.idUsuario}`);
        }

        const paciente = usuarios[0].paciente;
        const localidadUsuario = paciente.localidad?.id;

        const filtrosHospital: any[] = [
            { atributo: 'fechaHoraBaja', operacion: 'isNull' },
            { atributo: 'localidad.id', operacion: '=', valor: dto.idLocalidad ?? localidadUsuario }
        ];

        const relaciones: string[] = [
            'localidad',
            'congestionesActual',
            'hospitalEspecialidades',
            'hospitalEspecialidades.especialidad',
            'hospitalEspecialidades.hospitalEspecialidadMedico',
            'hospitalEspecialidades.hospitalEspecialidadMedico.medico'
        ];

        const hospitales = await this.genericRepository.buscar(
            Hospital,
            'hos',
            filtrosHospital,
            relaciones
        );

        const hospitalesFiltrados = hospitales.filter((hos) => {
            const especialidadOk = !dto.idEspecialidad || hos.hospitalEspecialidades?.some(he =>
                he.especialidad?.id === dto.idEspecialidad
            );

            const medicoOk = !dto.idMedico || hos.hospitalEspecialidades?.some(he =>
                he.hospitalEspecialidadMedico?.some(hem =>
                    hem.medico?.id === dto.idMedico
                )
            );

            return especialidadOk && medicoOk;
        });

        const resultados: ConsultarHospitalesCriteriosResultadoDto[] = hospitalesFiltrados.map((hospital) => {
            const resultado = new ConsultarHospitalesCriteriosResultadoDto();
            resultado.idHospital = hospital.id;
            resultado.nombreHospital = hospital.nombre;
            resultado.direccionHospital = hospital.direccion;
            resultado.emailHospital = hospital.email;
            resultado.telHospital = hospital.telefono;
            resultado.nombreLocalidad = hospital.localidad?.nombre;

            const congestion = hospital.congestionesActual?.find((c: any) => !c.fechaHoraBajaCongestionActual);
            resultado.nivelDeCongestion = congestion?.nivelCongestion ?? undefined;

            return resultado;
        });

        return resultados;
    }
}
