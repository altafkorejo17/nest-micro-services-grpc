import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { Attendance } from 'entities/attendance.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'user_db',
  entities: [User, Attendance],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
});
