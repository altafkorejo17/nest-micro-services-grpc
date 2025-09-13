import { Controller, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto } from 'dtos/create-user.dto';
import { UpdateUserDto } from 'dtos/update-user.dto';
import { DeleteUserDto } from 'dtos/delete-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'createUser')
  async createUser(data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @GrpcMethod('UserService', 'listUsers')
  async listUsers() {
    return this.userService.listUsers();
  }

  @GrpcMethod('UserService', 'updateUser')
  async updateUser(data: UpdateUserDto) {
    return this.userService.updateUser(data.id, data);
  }

  // @GrpcMethod('UserService', 'deleteUser')
  // async deleteUser(data: DeleteUserDto) {
  //   return this.userService.deleteUser(data.id);
  // }

  @GrpcMethod('UserService', 'DeleteUser')
  async deleteUser(data: DeleteUserDto) {
    return this.userService.deleteUser(data.id);
  }
}
