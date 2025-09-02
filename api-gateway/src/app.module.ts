import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RpcClientService } from './common/services/rpc-client.service';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../proto/user.proto'),
          url: '0.0.0.0:5001', // User microservice gRPC port
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../../proto/auth.proto'),
          url: '0.0.0.0:5002', // Auth microservice gRPC port
        },
      },
    ]),
  ],
  controllers: [UserController, AuthController],
  providers: [RpcClientService],
})
export class AppModule {}
