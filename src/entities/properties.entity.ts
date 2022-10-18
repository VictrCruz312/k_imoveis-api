import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";

@Entity("properties")
export class Properties {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column()
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => addresses)
  @JoinColumn()
  adressId: addresses;

  @ManyToOne(() => Categories)
  categoryId: Categories;
}
