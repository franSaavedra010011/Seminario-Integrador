import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { BuscarRolesDTO } from './dto/buscarRoles.dto';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class RolService {
  constructor(private genericRepository: GenericRepositoryService) {}
  create(createRolDto: CreateRolDto) {
    return 'This action adds a new rol';
  }

  async buscarRoles() {
    const roles: Rol[] = await this.genericRepository.buscar(Rol, 'rol', []);
    const rolesDTO: BuscarRolesDTO[] = [];
    for (const rol of roles) {
      console.log('Estamos en el buscar');
      console.log(rol.nombreRol);
      const fechaBajaRol = rol.fechaHoraBajaRol;

      if (fechaBajaRol === null) {
        const rolDTO: BuscarRolesDTO = {
          nombreRol: rol.nombreRol,
          idRol: rol.getIdRol,
        };
        rolesDTO.push(rolDTO);
      }
    }
    console.log(rolesDTO);
    return rolesDTO;
  }

  findAll() {
    return `This action returns all rol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
