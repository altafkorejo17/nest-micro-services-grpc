import { Body, Controller, Post } from '@nestjs/common';
import { RpcClientService } from '../common/services/rpc-client.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { Public } from '../guards/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly rpcClient: RpcClientService) {}

  @Public()
  @Post('login')
  async loginUser(@Body() data: LoginUserDto) {
    return this.rpcClient.sendAuthCommand('loginUser', data);
  }
}
