import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from '../domain/entities/medico.entity';
import { Repository } from 'typeorm';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { MedicoDTO } from './entities/dtos/CreateMedico.dto';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private medicoRepo: Repository<Medico>,
    @InjectRepository(Hospital)
    private hospitalRepo: Repository<Hospital>,
    @InjectRepository(Especialidad)
    private especialidadRepo: Repository<Especialidad>,
    @InjectRepository(EspecialidadMedico)
    private especialidadMedicoRepo: Repository<EspecialidadMedico>,
    @InjectRepository(HospitalEspecialidad)
    private hospitalEspecialidadRepo: Repository<HospitalEspecialidad>,
    @InjectRepository(HospitalEspecialidadMedico)
    private hospitalEspecialidadMedicoRepo: Repository<HospitalEspecialidadMedico>,
    private readonly genericRepositoryService: GenericRepositoryService,
  ) {}

  async create(dtoMedico: MedicoDTO) {
    // Creo el médico nuevo sin relaciones todavía
    const medicoNuevo = this.medicoRepo.create({
      nombreMedico: dtoMedico.nombreMedico,
      apellidoMedico: dtoMedico.apellidoMedico,
      dniMedico: dtoMedico.dniMedico,
      telMedico: dtoMedico.telefonoMedico,
      matriculaMedico: dtoMedico.matriculaMedico,
      tiempoConsulta: dtoMedico.tiempoConsultaMedico,
    });

    // Guardo primero para obtener ID
    await this.medicoRepo.save(medicoNuevo);

    // Traigo hospitales relacionados (normalmente debería ser 1, pero es un array)
    const hospitales: Hospital[] = await this.genericRepositoryService.buscar(
      Hospital,
      'hospital',
      [
        {
          atributo: 'idHospital',
          operacion: '=',
          valor: dtoMedico.idHospital,
        },
      ],
      [
        'hospitalEspecialidades',
        'hospitalEspecialidades.especialidad',
        'hospitalEspecialidades.hospitalEspecialidadMedico',
      ],
    );

    for (const hospital of hospitales) {
      const hospitalEspecialidades: HospitalEspecialidad[] =
        hospital.getHospitalEspecialidades();
      for (const hospitalEspecialidad of hospitalEspecialidades) {
        const especialidad: Especialidad =
          hospitalEspecialidad.getEspecialidad();

        const idEspecialidad: number = especialidad.getIdEspecialidad();

        // Comparo con las especialidades enviadas en el DTO
        for (const idEspecialidadSeleccionada of dtoMedico.especialidades) {
          if (idEspecialidad === idEspecialidadSeleccionada) {
            //creo la intermedia
            const hospitalEspecialidadMedicoNuevo: HospitalEspecialidadMedico =
              this.hospitalEspecialidadMedicoRepo.create({
                fechaDesdeHospitalEspecialidadMedico: new Date(),
              });

            //Le seteo el medico
            hospitalEspecialidadMedicoNuevo.setMedico(medicoNuevo);

            //La guardo
            await this.hospitalEspecialidadMedicoRepo.save(
              hospitalEspecialidadMedicoNuevo,
            );

            const hospitalEspecialidadModificar: HospitalEspecialidadMedico[] =
              hospitalEspecialidad.getHospitalEspecialidadMedico();
            console.log('ACAAAAAAAAAA', hospitalEspecialidadModificar);
            hospitalEspecialidadModificar.push(hospitalEspecialidadMedicoNuevo);

            hospitalEspecialidad.setHospitalEspecialidadMedico(
              hospitalEspecialidadModificar,
            );
            await this.hospitalEspecialidadRepo.save(hospitalEspecialidad);
            // Creo la relación especialidadMedico con fechas, médico y especialidad
            const especialidadMedicoNuevo = this.especialidadMedicoRepo.create({
              fechaDesdeEspecialidadMedico: new Date(),
            });

            especialidadMedicoNuevo.setMedico(medicoNuevo);
            especialidadMedicoNuevo.setEspecialidad(especialidad); // <--- Asigno la especialidad!

            await this.especialidadMedicoRepo.save(especialidadMedicoNuevo);

            // Actualizo la colección en la especialidad
            const especialidadesMedico: EspecialidadMedico[] =
              especialidad.getEspecialidadesMedico() || [];
            especialidadesMedico.push(especialidadMedicoNuevo);
            especialidad.setEspecialidadesMedico(especialidadesMedico);
          }
        }
      }
    }

    // Devuelvo el médico con todas sus relaciones creadas
    return medicoNuevo;
  }

  async findAll() {
    return this.medicoRepo.find({
      relations: ['hospital', 'especialidad'],
    });
  }
}
