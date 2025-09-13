import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new RpcException({
        statusCode: 422,
        message: 'Invalid email or password',
      });
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new RpcException({
        statusCode: 422,
        message: 'Invalid email or password',
      });
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: 'altafkorejo',
    });

    return {
      success: true,
      message: 'Login Successfull',
      user,
      accessToken,
    };
  }
}
