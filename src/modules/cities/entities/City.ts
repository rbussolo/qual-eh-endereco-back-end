import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../../states/entities/State";

@Entity("cities")
export class City {
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
  short_country: string;

  @Column()
  short_state: string;

  @Column()
  state_id: number;

  @Column({ nullable: true})
  code_ibge: number | null;

  @ManyToOne(() => State)
  @JoinColumn({ name: "state_id" })
  state: State;

  @CreateDateColumn()
  created_at: string;
}