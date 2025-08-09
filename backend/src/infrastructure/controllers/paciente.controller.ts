import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteDto } from './dto/createPaciente.dto';
import { UpdatePacienteDto } from './dto/updatePaciente.dto';
import { CreateUsuarioDto } from 'src/temp/usuarios/dto/create-usuario.dto';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post('crear')
  crearPaciente(
    @Body() body: { pacienteDto: PacienteDto; usuarioDto: CreateUsuarioDto },
  ) {
    const { pacienteDto, usuarioDto } = body;
    return this.pacienteService.create(pacienteDto, usuarioDto);
  }

  /*@Get()
  findAll() {
    return this.pacienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pacienteService.findOne(id);
  }*/

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacienteService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pacienteService.remove(id);
  }

  /*@Get('prueba/:id')
  prueba(@Param('id') id: number) {
    return this.pacienteService.prueba(id);
  }*/
}
