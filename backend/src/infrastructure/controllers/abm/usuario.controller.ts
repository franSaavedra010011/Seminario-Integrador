import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { CreateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/create-usuario.dto';


@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly abmUsuarioUseCase: AbmUsuarioUseCase,
    ) { }

    @Post('alta')
    async alta(@Body() dto: CreateUsuarioDto) {
        return await this.abmUsuarioUseCase.crear(dto);
    }
}
