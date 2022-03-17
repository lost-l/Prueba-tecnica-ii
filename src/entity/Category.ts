import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_catg: number;

    @Column({
        unique: true
    })
    name: string;

    @OneToMany(type => Product, prod => prod.catg)
    prods: Product[]
}
