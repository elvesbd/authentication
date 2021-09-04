import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ name: 'is_completed', type: 'bit', default: false })
  isCompleted: boolean;

  @Column({ name: 'users_id', type: 'int' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'users_id' })
  user: UserEntity;
}
