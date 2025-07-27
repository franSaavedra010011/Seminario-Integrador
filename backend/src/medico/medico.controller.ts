import { Controller, Get } from '@nestjs/common';
import { MedicoService } from './medico.service';

//@Auth(Role.ADMIN)
//con esto obligo a que solo lo pueda realizar el admin,
//pero luego lo vemos bien, tal vez hay algun metodo que lo pueda traer el medico
@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  /*@Post('crear-ejemplo')
  crearEjemplo() {
    return this.medicoService.crearEjemplo();
  }*/

  @Get()
  obtenerTodos() {
    return this.medicoService.findAll(); // este método lo definimos abajo
  }
}
