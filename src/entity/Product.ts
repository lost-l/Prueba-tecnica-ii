import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { ProductPurchase } from "./ProductPurchase";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_prod: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(type => Category, catg => catg.prods)
    catg: Category

    @OneToMany(type => ProductPurchase, prod_purch => prod_purch.user)
    prods: ProductPurchase[]
}
