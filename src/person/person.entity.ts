import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  tag: string[];

  @Column()
  gender: 'man' | 'woman';

  @Column({ default: false })
  favorite: boolean;
}
