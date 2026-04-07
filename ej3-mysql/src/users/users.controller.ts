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

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(parseInt(id));
  }

  @Post('/users')
  postUser(@Body() newUser: User): Promise<User> {
    return this.usersService.postUser(newUser);
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(parseInt(id));
  }

  @Put('/users/:id') //Full update
  updateUser(
    @Param('id') id: string,
    @Body() updatedUser: User,
  ): Promise<User> {
    return this.usersService.updateUser(parseInt(id), updatedUser);
  }

  @Patch('/users/:id') //Partial update
  patchUser(
    @Param('id') id: string,
    @Body() updatedUser: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateUser(parseInt(id), updatedUser);
  }
}
