import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/User.interface';

@Injectable()
export class AppService {
  private users: User[] = [
    { id: 1, name: 'Gustavo', age: 42, email: 'gustavo@gmail.com' },
    { id: 2, name: 'Pablo', age: 50, email: 'pablo@gmail.com' },
  ];

  getUsers(): User[] {
    console.log('Usuarios:', this.users);
    return this.users;
  }

  getUser(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }
    console.log('Usuario encontrado:', user);
    return user;
  }

  postUser(newUser: User): string {
    const { id, name, age, email } = newUser;

    if (
      id === undefined ||
      !name?.trim() ||
      age === undefined ||
      !email?.trim()
    ) {
      throw new BadRequestException('Faltan campos requeridos');
    }

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException(
        'El id debe ser un número entero mayor a 0',
      );
    }

    if (!Number.isInteger(age) || age <= 0) {
      throw new BadRequestException(
        'La edad debe ser un número entero mayor a 0',
      );
    }

    const emailNormalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailNormalized)) {
      throw new BadRequestException('El email no es válido');
    }

    const userIndex = this.userIndex(id);
    if (userIndex !== -1) {
      throw new BadRequestException('El id de usuario ya existe');
    }

    const emailExists = this.users.some(
      (user) => user.email.toLowerCase() === emailNormalized,
    );
    if (emailExists) {
      throw new BadRequestException('El email ya está registrado');
    }

    const userToCreate: User = {
      id,
      name: name.trim(),
      age,
      email: emailNormalized,
    };

    this.users.push(userToCreate);
    console.log('Nuevo usuario creado satisfactoriamente:', userToCreate);
    return 'Usuario creado con éxito';
  }

  deleteUser(id: number): string {
    const userIndex = this.userIndex(id);
    if (userIndex !== -1) {
      //TODO: falta refactorizar para no repetir esta validacion en varios metodos
      this.users.splice(userIndex, 1);
      console.log('Usuario eliminado');
    } else {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }
    return 'Usuario eliminado con éxito';
  }

  updateUser(id: number, updatedUser: Partial<User>): string {
    const userIndex = this.userIndex(id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
      console.log('Usuario actualizado');
    } else {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }
    return 'Usuario actualizado con éxito';
  }

  userIndex(id: number): number {
    return this.users.findIndex((user) => user.id === id);
  }
}
