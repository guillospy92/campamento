import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Animals } from './Animals';
import { format } from 'date-fns';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  cc: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @ManyToOne(() => Animals, (animal) => animal.teams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'animalId' })
  animal: Animals;

  get formattedStartDate(): string {
    return format(this.start_date, 'yyyy-MM-dd'); // Formato YYYY-MM-DD
  }
}
