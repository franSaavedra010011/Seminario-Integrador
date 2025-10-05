import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Localidad } from 'src/domain/entities/localidad.entity';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';

@Injectable()
export class AbmHospitalUseCase {
  constructor(
    private readonly genericRepository: GenericRepositoryService,
  ) { }

  // Crear Hospital
  async crear(dto: CreateHospitalDto): Promise<Hospital> {

    /*
      Buscar instancia de Hospital existente:
        - Con nombre igual al proporcionado (case insensitive, trim)
        - Con fechaHoraBaja igual a null (Hospital vigente)
    */
    const duplicados = await this.genericRepository.buscar(
      Hospital,
      'hosp',
      [
        { atributo: 'nombre', operacion: '=', valor: dto.nombreHospital },
        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
      ],
    );

    // Comprobar si existe un hospital con el mismo nombre
    if (duplicados.some(h => h.nombre.trim().toLowerCase() === dto.nombreHospital.trim().toLowerCase())) {
      // CA N°1: ya existe un hospital con el mismo nombre
      throw new BadRequestException(`El hospital "${dto.nombreHospital}" ya existe`);
    }

    const localidad = await this.genericRepository.buscar(
      Localidad,
      'loc',
      [
        { atributo: 'id', operacion: '=', valor: dto.idLocalidad },
        { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
      ],
    );

    if (!localidad.length) {
      throw new BadRequestException(`La localidad con ID ${dto.idLocalidad} no existe`);
    }

    /*
      Crear instancia de Hospital:
        - Con nombre igual al ingresado
        - Con direccion igual al ingresado (o null si no se ingreso)
        - Con email igual al ingresado (o null si no se ingreso)
        - Con telefono igual al ingresado (o null si no se ingreso)
    */
    const hospital = new Hospital();
    hospital.nombre = dto.nombreHospital.trim();
    hospital.direccion = dto.direccionHospital.trim();
    hospital.email = dto.emailHospital?.trim() ?? '';
    hospital.telefono = dto.telHospital?.trim() ?? '';
    hospital.localidad = localidad[0];

    const hospitalGuardado = await this.genericRepository.guardarCambios(Hospital, hospital);

    if (dto.idEspecialidades && dto.idEspecialidades.length > 0) {
      for (const idEspecialidad of dto.idEspecialidades) {
        const especialidad = await this.genericRepository.buscar(
          Especialidad,
          'esp',
          [
            { atributo: 'id', operacion: '=', valor: idEspecialidad },
            { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
          ]
        );

        if (!especialidad.length) {
          throw new BadRequestException(`La especialidad con ID ${idEspecialidad} no existe`);
        }

        const he = new HospitalEspecialidad();
        he.hospital = hospital;
        he.especialidad = especialidad[0];
        he.fechaDesde = new Date();

        await this.genericRepository.guardarCambios(HospitalEspecialidad, he);
      }
    }

    return await this.genericRepository.guardarCambios(Hospital, hospital);
  }

  // Actualizar Hospital
  async actualizar(id: number, dto: UpdateHospitalDto): Promise<Hospital> {
    const encontrados = await this.genericRepository.buscar(
      Hospital,
      'hosp',
      [{ atributo: 'id', operacion: '=', valor: id }],
      [
        'localidad',
        'hospitalEspecialidades',
        'hospitalEspecialidades.especialidad',
      ]
    );

    if (!encontrados.length || encontrados[0].fechaHoraBaja) {
      throw new NotFoundException(`Hospital con ID ${id} no encontrado`);
    }

    const hospital = encontrados[0];

    // Si cambia el nombre, validar duplicados
    if (dto.nombreHospital && dto.nombreHospital.trim().toLowerCase() !== hospital.nombre.trim().toLowerCase()) {
      const duplicados = await this.genericRepository.buscar(
        Hospital,
        'hosp',
        [{ atributo: 'nombre', operacion: '=', valor: dto.nombreHospital }],
      );

      if (duplicados.some(h => h.id !== hospital.id &&
        h.nombre.trim().toLowerCase() === dto.nombreHospital!.trim().toLowerCase())) {
        throw new BadRequestException(`El hospital "${dto.nombreHospital}" ya existe`);
      }

      hospital.nombre = dto.nombreHospital.trim();
    }

    if (dto.direccionHospital !== undefined) {
      hospital.direccion = dto.direccionHospital?.trim() ?? null;
    }

    if (dto.emailHospital !== undefined) {
      hospital.email = dto.emailHospital?.trim() ?? null;
    }

    if (dto.telHospital !== undefined) {
      hospital.telefono = dto.telHospital?.trim() ?? null;
    }

    if (dto.idEspecialidadesAEliminar?.length) {
      console.log('✔ Se eliminará especialidad', dto.idEspecialidadesAEliminar);
      await this.eliminarEspecialidades(hospital, dto.idEspecialidadesAEliminar);
    }

    if (dto.idEspecialidadesAAgregar?.length) {
      console.log('✔ Se agregará especialidad', dto.idEspecialidadesAAgregar);
      await this.asociarEspecialidades(hospital, dto.idEspecialidadesAAgregar);
    }

    await this.genericRepository.guardarCambios(Hospital, hospital);

    return (
      await this.genericRepository.buscar(
        Hospital,
        'hosp',
        [{ atributo: 'id', operacion: '=', valor: hospital.id }],
        [
          'localidad',
          'hospitalEspecialidades',
          'hospitalEspecialidades.especialidad'
        ]
      )
    )[0];

  }

  private async asociarEspecialidades(hospital: Hospital, ids: number[]) {
    for (const id of ids) {
      const especialidad = await this.genericRepository.buscar(
        Especialidad,
        'esp',
        [
          { atributo: 'id', operacion: '=', valor: id },
          { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null },
        ]
      );

      if (!especialidad.length) {
        throw new BadRequestException(`La especialidad con ID ${id} no existe`);
      }

      const yaExiste = hospital.hospitalEspecialidades?.filter(he =>
        he.especialidad?.id === id && !he.fechaHasta
      ) ?? [];

      if (!yaExiste.length) {
        const nueva = new HospitalEspecialidad();
        nueva.hospital = hospital;
        nueva.especialidad = especialidad[0];
        nueva.fechaDesde = new Date();
        hospital.hospitalEspecialidades = hospital.hospitalEspecialidades ?? [];
        hospital.hospitalEspecialidades.push(nueva);
        console.log(`➡ Agregando nueva especialidad ID ${id} al hospital ID ${hospital.id} el contenido de hospital.hospitalEspecialidades es:`, hospital.hospitalEspecialidades);

        await this.genericRepository.guardarCambios(HospitalEspecialidad, nueva);
      }
    }
  }

  private async eliminarEspecialidades(hospital: Hospital, ids: number[]) {
    console.log(`➡ Eliminando especialidades del hospital ID ${hospital.id}:`, ids);

    for (const id of ids) {
      console.log(`\n🔍 Buscando relaciones activas con especialidad ID ${id}...`);

      const relaciones = hospital.hospitalEspecialidades?.filter(he =>
        he.especialidad?.id === id && !he.fechaHasta && !he.fechaHoraBaja
      ) ?? [];

      console.log(`   → Relaciones encontradas: ${relaciones.length}`);

      for (const r of relaciones) {
        console.log(`   🛑 Dando de baja relación ID ${r.id} (especialidad ID ${r.especialidad.id})`);

        r.fechaHasta = new Date();
        r.fechaHoraBaja = new Date();

        // Actualizar relación en memoria dentro del array del hospital
        const index = hospital.hospitalEspecialidades?.findIndex(he => he.id === r.id);
        if (index !== undefined && index >= 0 && hospital.hospitalEspecialidades) {
          hospital.hospitalEspecialidades[index] = r;
          console.log(`   ✅ Actualizada en memoria en posición ${index}`);
        } else {
          console.warn(`   ⚠️ No se encontró en hospital.hospitalEspecialidades la relación con ID ${r.id}`);
        }

        await this.genericRepository.guardarCambios(HospitalEspecialidad, r);
        console.log(`   💾 Relación ID ${r.id} guardada con fechaHasta y fechaHoraBaja`);
      }
    }

    console.log(`✅ Finalizó eliminación de especialidades`);
  }




  // Baja lógica
  async eliminar(id: number): Promise<void> {
    await this.genericRepository.eliminar(Hospital, id);
  }
}
