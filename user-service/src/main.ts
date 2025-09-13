import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );
  await app.listen();
  console.log('User Service (gRPC) listening on port 5001');
}
bootstrap();
