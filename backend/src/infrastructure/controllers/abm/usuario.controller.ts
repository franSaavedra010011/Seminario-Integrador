import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { CreateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/update-usuario.dto';


@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly abmUsuarioUseCase: AbmUsuarioUseCase,
    ) { }

    @Post('alta')
    async alta(@Body() dto: CreateUsuarioDto) {
        return await this.abmUsuarioUseCase.crear(dto);
    }

    @Put('modificar/:idUsuario')
    async modificar(
        @Param('idUsuario') idUsuario: number,
        @Body() dto: UpdateUsuarioDto,
    ) {
        return await this.abmUsuarioUseCase.modificar(idUsuario, dto);
    }
}
