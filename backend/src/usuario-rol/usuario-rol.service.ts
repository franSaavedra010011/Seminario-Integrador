import { Injectable } from '@nestjs/common';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto';
import { UpdateUsuarioRolDto } from './dto/update-usuario-rol.dto';
import { UsuarioRol } from './entities/usuario-rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRolService {
  constructor(
    @InjectRepository(UsuarioRol)
    private usuarioRolRepository: Repository<UsuarioRol>, //con esto nos comunicamos con la base, guardamos, actualizamos, eliminamos, etc.
  ) {}
  async create(createUsuarioRolDto: CreateUsuarioRolDto): Promise<UsuarioRol> {
    const usuarioRol = this.usuarioRolRepository.create(createUsuarioRolDto);
    return this.usuarioRolRepository.save(usuarioRol);
  }

  findAll() {
    return `This action returns all usuarioRol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioRol`;
  }

  update(id: number, updateUsuarioRolDto: UpdateUsuarioRolDto) {
    return `This action updates a #${id} usuarioRol`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioRol`;
  }
}
