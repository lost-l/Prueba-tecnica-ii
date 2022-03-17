import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { ProductPurchase } from "./ProductPurchase";
import { Role } from "./Role";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    passwd: string;

    @Column()
    money: number;

    @ManyToOne(type => Role, role => role.users)
    @JoinColumn({ name: "role_fk" })
    role: Role

    @OneToMany(type => ProductPurchase, prod_purch => prod_purch.prod)
    users: ProductPurchase[]
}
