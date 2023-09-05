import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../../cities/entities/City";
import { Neighborhood } from "../../neighborhoods/entities/Neighborhood";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: number;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  zip_code: string;

  @Column()
  neighborhood_id: number;

  @ManyToOne(() => City, { onDelete: "CASCADE" })
  @JoinColumn({ name: "neighborhood_id" })
  neighborhood: Neighborhood;

  @CreateDateColumn()
  created_at: string;
}