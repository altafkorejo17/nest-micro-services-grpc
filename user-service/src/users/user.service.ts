import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'entities/user.entity';
import { CreateUserDto } from 'dtos/create-user.dto';
import { UpdateUserDto } from 'dtos/update-user.dto';
const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    try {
      const existing = await this.repo.findOne({
        where: { email: data.email },
      });
      if (existing)
        throw new RpcException({
          statusCode: 409,
          message: 'Email already exists',
        });

      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(data.password, salt, 32)) as Buffer;
      const hashedPassword = salt + '.' + hash.toString('hex');

      const user = this.repo.create({ ...data, password: hashedPassword });
      await this.repo.save(user);
      return user;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async listUsers() {
    const users = await this.repo.find();
    return {
      users: users.map((u) => ({ id: u.id, name: u.name, email: u.email })),
    };
  }

  async updateUser(id: number, data: Partial<UpdateUserDto>) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        statusCode: 422,
        message: `User with ID ${id}} not found`,
      });
    }
    Object.assign(user, data);
    return await this.repo.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        statusCode: 422,
        message: `User with ${id} not found`,
      });
    }

    await this.repo.remove(user);
    return {};
  }
}
