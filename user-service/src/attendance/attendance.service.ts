import { Injectable } from '@nestjs/common';
import { Attendance } from 'entities/attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'entities/user.entity';

@Injectable()
export class AttendanceService {}
