import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Properties } from "./properties.entity";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Properties, (properties) => properties.category)
  properties: Properties[];
}
