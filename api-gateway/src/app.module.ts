import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RpcClientService } from './common/services/rpc-client.service';
import { UserController } from './users/user.controller';
import { AuthController } from './users/auth.controller';
import { join } from 'path';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['user', 'auth'],
          protoPath: [
            join(__dirname, '../../proto/user.proto'),
            join(__dirname, '../../proto/auth.proto'),
          ],
          url: 'localhost:5001',
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'altafkorejo',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    RpcClientService,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [JwtAuthGuard],
})
export class AppModule {}
