import { NivelCongestionEnum } from 'src/domain/enums/nivel-congestion.enum';

export interface HospitalComparadoDto {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  especialidades: string[];
  nivelDeCongestion: NivelCongestionEnum;
  porcentajeCongestion: number;
}
