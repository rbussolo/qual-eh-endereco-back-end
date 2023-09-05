import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("countries")
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  name_in_english: string;

  @Column()
  short_in_english: string;

  @Column()
  name_in_french: string;

  @CreateDateColumn()
  created_at: string;
}