import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { RpcClientService } from './common/services/rpc-client.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly rpcClient: RpcClientService) {}

  @Post('create')
  async createUser(@Body() data: CreateUserDto) {
    return this.rpcClient.sendCommand('createUser', data);
  }

  @Get('list')
  async getUsers() {
    return this.rpcClient.sendCommand('listUsers', {});
  }

  @Put(':id/update')
  async updateUser(@Body() data: UpdateUserDto) {
    return this.rpcClient.sendCommand('updateUser', data);
  }

  @Delete(':id/delete')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.rpcClient.sendCommand('deleteUser', { id });
  }
}
