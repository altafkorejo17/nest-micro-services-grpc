import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AuthService');
  // Calculate absolute path to proto file

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: join(__dirname, '../../proto/auth.proto'),
        url: '0.0.0.0:5002',
      },
    },
  );

  await app.listen();
  logger.log('✅ Auth Service running on grpc://localhost:5002');
}

bootstrap();
