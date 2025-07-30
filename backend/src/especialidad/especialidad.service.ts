import { Injectable } from '@nestjs/common';
import { DTOCriterio } from 'src/common/utils/dtoCriterio.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { BuscarEspecialidadesDTO } from './dtos/buscarEspecialidades.dto';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Especialidad } from '../domain/entities/especialidad.entity';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';

@Injectable()
export class EspecialidadService {
  constructor(private readonly genericRepository: GenericRepositoryService) {}
  async buscarEspecialidades(idHospitalSeleccionado: number) {
    console.log('idHospitalSeleccionado: ', idHospitalSeleccionado);
    const criterios: DTOCriterio = {
      atributo: 'idHospital',
      operacion: '=',
      valor: idHospitalSeleccionado,
    };
    const hospitales: Hospital[] = await this.genericRepository.buscar(
      Hospital,
      'hospital',
      [criterios],
      ['hospitalEspecialidades', 'hospitalEspecialidades.especialidad'],
    );
    console.log('Estos son los hospitales que trae ', hospitales);
    const hospitalSeleccionado: Hospital = hospitales[0];
    const epscialidadesDTO: BuscarEspecialidadesDTO[] = [];
    const intermedias: HospitalEspecialidad[] =
      hospitalSeleccionado.getHospitalEspecialidades();
    for (const intermedia of intermedias) {
      console.log('Estamos en el buscarEspecialidades');
      const fechaBajaIntermedia = intermedia.fechaHastaHospitalEspecialidad;

      if (fechaBajaIntermedia === null) {
        const especialidad: Especialidad = intermedia.getEspecialidad();
        const especialidadDTO: BuscarEspecialidadesDTO = {
          idEspecialidad: especialidad.getIdEspecialidad(),
          nombreEspecialidad: especialidad.getNombreEspecialidad,
        };
        epscialidadesDTO.push(especialidadDTO);
      }
    }
    return epscialidadesDTO;
  }
}
