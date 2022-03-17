import {
    Entity, Column, BaseEntity,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";
import { User } from "./User";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_role: number;

    @Column({
        type: "varchar",
        unique: true
    })
    name: string;

    @OneToMany(type => User, user => user.role)
    users: User[]

}