import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../../cities/entities/City";

@Entity("neighborhoods")
export class Neighborhood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: number;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  city_id: number;

  @ManyToOne(() => City, { onDelete: "CASCADE" })
  @JoinColumn({ name: "city_id" })
  city: City;

  @CreateDateColumn()
  created_at: string;
}