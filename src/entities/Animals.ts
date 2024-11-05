import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Team } from './Team';

@Entity('animals')
export class Animals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  img: string;

  @OneToMany(() => Team, (team) => team.animal)
  teams: Team[];
}
