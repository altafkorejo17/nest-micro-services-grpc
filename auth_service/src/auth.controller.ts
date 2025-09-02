import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'LoginUser')
  async loginUser(data: LoginUserDto) {
    return this.authService.loginUser(data.email, data.password);
  }
}
