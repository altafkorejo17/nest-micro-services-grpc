import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from 'entities/attendance.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from 'entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'user_db',
      entities: [User, Attendance, Role],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    AttendanceModule,
    RolesModule,
  ],
})
export class AppModule {}
