import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "profiles", schema: "profiles" })
export class Profile {
  @PrimaryColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  address: string;

  @Column("uuid")
  userId: string;

  @Column()
  phoneNumber: string;

  // @Column()
  // verified: boolean;

  @Column("timestamp")
  createdAt: string;

  @Column("timestamp")
  updatedAt: string;
}
