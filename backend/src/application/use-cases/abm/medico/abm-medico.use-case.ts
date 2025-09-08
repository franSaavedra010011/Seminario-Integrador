import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { Medico } from 'src/domain/entities/medico.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';

@Injectable()
export class AbmMedicoUseCase {
  constructor(
    @InjectRepository(EspecialidadMedico)
    private readonly especialidadMedicoRepo: Repository<EspecialidadMedico>,
    @InjectRepository(HospitalEspecialidadMedico)
    private readonly hospitalEspecialidadMedicoRepo: Repository<HospitalEspecialidadMedico>,
    @InjectRepository(HospitalEspecialidad)
    private readonly hospitalEspecialidadRepo: Repository<HospitalEspecialidad>,
    private readonly genericRepository: GenericRepositoryService,
  ) {}

  async crear(dto: CreateMedicoDto): Promise<Medico> {
    // Crear instancia base
    const medico = new Medico();
    medico.nombreMedico = dto.nombreMedico;
    medico.apellidoMedico = dto.apellidoMedico;
    medico.dniMedico = dto.dniMedico;
    medico.telMedico = dto.telefonoMedico;
    medico.matriculaMedico = dto.matriculaMedico;
    medico.tiempoConsulta = dto.tiempoConsultaMedico;

    const medicoGuardado = await this.genericRepository.guardarCambios(Medico, medico);

    // Obtener hospital con sus especialidades y relaciones
    const hospitales: Hospital[] = await this.genericRepository.buscar(
      Hospital,
      'hospital',
      [{ atributo: 'id', operacion: '=', valor: dto.idHospital }],
      [
        'hospitalEspecialidades',
        'hospitalEspecialidades.especialidad',
        'hospitalEspecialidades.hospitalEspecialidadMedico',
      ]
    );

    for (const hospital of hospitales) {
      for (const hospitalEspecialidad of hospital.hospitalEspecialidades) {
        const especialidad = hospitalEspecialidad.especialidad;

        if (dto.especialidades.includes(especialidad.id)) {
          // Relación hospital-especialidad-médico
          const hem = this.hospitalEspecialidadMedicoRepo.create({
            fechaDesde: new Date(),
            medico: medicoGuardado,
          });
          await this.hospitalEspecialidadMedicoRepo.save(hem);

          // Actualizar lista
          hospitalEspecialidad.hospitalEspecialidadMedico = [
            ...(hospitalEspecialidad.hospitalEspecialidadMedico || []),
            hem,
          ];
          await this.hospitalEspecialidadRepo.save(hospitalEspecialidad);

          // Relación especialidad-médico
          const em = this.especialidadMedicoRepo.create({
            fechaDesde: new Date(),
            medico: medicoGuardado,
            especialidad: especialidad,
          });
          await this.especialidadMedicoRepo.save(em);

          // No guardamos `especialidad` porque no se requiere en tu diseño.
        }
      }
    }

    return medicoGuardado;
  }

  async actualizar(id: number, dto: Partial<Medico>): Promise<Medico> {
    const medicos = await this.genericRepository.buscar(Medico, 'medico', [
      { atributo: 'id', operacion: '=', valor: id },
    ]);

    if (!medicos.length) {
      throw new BadRequestException('Médico no encontrado');
    }

    const medico = medicos[0];
    Object.assign(medico, dto);

    return this.genericRepository.guardarCambios(Medico, medico);
  }

  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(Medico, id);
  }
}
