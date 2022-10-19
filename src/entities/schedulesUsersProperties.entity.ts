import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
export class SchedulesUsersProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: Date;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties)
  property: Properties;

  @ManyToOne(() => User, { eager: true })
  user: User;
}
