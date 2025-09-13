import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

@Entity('attendances')
@Unique(['user', 'date'])
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.attendance, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'datetime', nullable: true })
  check_in: Date;

  @Column({ type: 'datetime', nullable: true })
  check_out: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  worked_hours: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
