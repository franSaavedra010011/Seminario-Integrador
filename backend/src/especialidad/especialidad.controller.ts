import { Body, Controller, Post } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';

@Controller('especialidad')
export class EspecialidadController {
  constructor(private readonly especialidadService: EspecialidadService) {}
  @Post('buscarEspecialidades')
  buscarEspecialidades(@Body() body: { idHospital: number }) {
    return this.especialidadService.buscarEspecialidades(body.idHospital);
  }
}
