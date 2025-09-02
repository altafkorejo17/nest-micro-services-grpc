import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RpcClientService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientGrpc,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientGrpc,
  ) {}

  async sendCommand<T>(method: string, data: any): Promise<T> {
    try {
      const service = this.client.getService<any>('UserService');
      return await firstValueFrom(service[method](data));
    } catch (err) {
      throw new HttpException(
        err?.message || 'Microservice error',
        err?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendAuthCommand<T>(method: string, data: any): Promise<T> {
    try {
      const service = this.authClient.getService<any>('AuthService');
      return await firstValueFrom(service[method](data));
    } catch (err) {
      throw new HttpException(
        err?.message || 'Auth microservice error',
        err?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
