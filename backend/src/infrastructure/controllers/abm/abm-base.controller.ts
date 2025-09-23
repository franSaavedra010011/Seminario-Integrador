import { Body, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';

export abstract class AbmBaseController<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly useCase: {
      crear(dto: CreateDto): Promise<T>;
      actualizar(id: number, dto: UpdateDto): Promise<T>;
      eliminar?(id: number): Promise<void>;
    },
    protected readonly genericRepositoryService: GenericRepositoryService,
    private readonly entity: new () => T,
  ) {}

  @Post('alta')
  async alta(@Body() dto: CreateDto) {
    return this.useCase.crear(dto);
  }

  @Put('modificar/:id')
  async modificar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDto,
  ) {
    return this.useCase.actualizar(id, dto);
  }

  @Delete('baja/:id')
  async baja(@Param('id', ParseIntPipe) id: number) {
    if (this.useCase.eliminar) {
      return this.useCase.eliminar(id);
    } else {
      return this.genericRepositoryService.eliminar(this.entity, id);
    }
  }
}
