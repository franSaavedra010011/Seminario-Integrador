import { Injectable } from '@nestjs/common';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { Hospital } from '../domain/entities/hospital.entity';
import { BuscarHospitalesDTO } from './dtos/buscarHospitales.dto';

@Injectable()
export class HospitalService {
  constructor(private genericRepository: GenericRepositoryService) {}
  async buscarHospitales() {
    const hospitales: Hospital[] = await this.genericRepository.buscar(
      Hospital,
      'hospital',
      [],
    );
    const hospitalesDTO: BuscarHospitalesDTO[] = [];
    for (const hospital of hospitales) {
      const fechaBajaHospital = hospital.fechaHoraBajaHospital;
      if (fechaBajaHospital === null) {
        const hospitalDTO: BuscarHospitalesDTO = {
          nombreHospital: hospital.nombreHospital,
          idHospital: hospital.getIdHospital,
        };
        hospitalesDTO.push(hospitalDTO);
      }
    }
    console.log(hospitalesDTO);
    return hospitalesDTO;
  }
}
