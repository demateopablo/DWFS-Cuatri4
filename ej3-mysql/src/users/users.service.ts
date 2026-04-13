import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    console.log('Obteniendo todos los usuarios...');
    const users: User[] = await this.usersRepository.find();
    console.log(
      users.length === 0
        ? `No se encontraron usuarios`
        : `Usuarios encontrados: ${users.length}`,
    );
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user: User | null = await this.usersRepository.findOneBy({ id });
    console.log(`Buscando usuario con id ${id}:`, user);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    console.log(`Eliminando usuario con ID ${id}...`);
    try {
      await this.usersRepository.delete(id);
      console.log(`Usuario con ID ${id} eliminado exitosamente`);
    } catch (error) {
      console.error(`Error removiendo al usuario con ID ${id}:`, error);
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async postUser(newUser: User): Promise<User> {
    console.log(`Creando nuevo usuario...`);
    try {
      const user = await this.usersRepository.save(newUser);
      console.log(`Usuario creado exitosamente:`);
      return user;
    } catch (error) {
      console.error(`Error creando usuario:`, error);
      if ((error as { code: string }).code === 'ER_DUP_ENTRY') {
        // Código de error específico de MySQL para entrada duplicada
        //el error as... es una forma de decirle a TypeScript que trate el error como un objeto que tiene una propiedad code de tipo string dentro
        throw new ConflictException('El usuario ya existe');
      }
      //Si no es duplicado →
      throw new BadRequestException('Datos inválidos');
    }
  }

  async updateUser(id: number, updatedUser: Partial<User>): Promise<User> {
    console.log(`Actualizando usuario con ID ${id}...`);
    const result = await this.usersRepository.update(id, updatedUser);
    const user = await this.usersRepository.findOneBy({ id });
    if (result.affected === 0 || !user) {
      //el .affected indica cuántas filas fueron afectadas por la operación de actualización
      //Si da cero, significa que no se encontró ningún usuario con ese ID para actualizar, lo que implica que el usuario no existe
      //el chequeo de !user es para evitar el error al retornar el usuario actualizado al final. Tambien podria suplirse con "return user!"
      throw new NotFoundException('Usuario no encontrado');
    }
    console.log(`Usuario actualizado`);
    return user;
  }
}
