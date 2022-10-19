import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class addresses {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;
}
