import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(parseInt(id));
  }

  @Post('')
  postUser(@Body() newUser: User): Promise<User> {
    return this.usersService.postUser(newUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(parseInt(id));
  }

  @Put(':id') //Full update
  updateUser(
    @Param('id') id: string,
    @Body() updatedUser: User,
  ): Promise<User> {
    return this.usersService.updateUser(parseInt(id), updatedUser);
  }

  @Patch(':id') //Partial update
  patchUser(
    @Param('id') id: string,
    @Body() updatedUser: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateUser(parseInt(id), updatedUser);
  }
}
