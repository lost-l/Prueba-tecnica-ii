import {
    Entity, PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    Column
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class ProductPurchase extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_user_prod: number;

    @Column()
    total: number;

    @CreateDateColumn()
    purchase_date: Date;

    @Column()
    quantity_bought: number;


    @ManyToOne(type => User, user => user.users)
    user: User

    @ManyToOne(type => Product, prod => prod.prods)
    prod: Product
}
