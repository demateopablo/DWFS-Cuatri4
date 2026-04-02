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
import { AppService } from './app.service';
import type { User } from './interfaces/User.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  getHello(): User[] {
    return this.appService.getUsers();
  }

  @Get('/users/:id')
  getUser(@Param('id') id: string): User {
    return this.appService.getUser(parseInt(id));
  }

  @Post('/users')
  postUser(@Body() newUser: User): string {
    return this.appService.postUser(newUser);
  }

  @Delete('/users/:id')
  deleteUser(@Param('id') id: string): string {
    return this.appService.deleteUser(parseInt(id));
  }

  @Put('/users/:id')
  updateUser(@Param('id') id: string, @Body() updatedUser: User): string {
    return this.appService.updateUser(parseInt(id), updatedUser);
  }

  @Patch('/users/:id')
  patchUser(
    @Param('id') id: string,
    @Body() updatedUser: Partial<User>,
  ): string {
    return this.appService.updateUser(parseInt(id), updatedUser);
  }
}
