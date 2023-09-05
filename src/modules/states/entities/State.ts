import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("states")
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: number;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  short_country: string;

  @CreateDateColumn()
  created_at: string;
}