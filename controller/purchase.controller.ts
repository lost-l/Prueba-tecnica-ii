import { Response } from "express";
import { getRepository } from "typeorm";
import { myRequest } from "../helpers/myTypes";
import { Product } from "../src/entity/Product";
import { ProductPurchase } from "../src/entity/ProductPurchase";
import { User } from "../src/entity/User";

type PurchasedItem = {
    id_user_prod: number,
    quantity_bought: number
    total: number,
    purchase_date: Date,
}

const purchaseGet = async (req: myRequest, res: Response) => {
    const userRepo = getRepository(User);
    const purchaseRepo = getRepository(ProductPurchase);

    const user = await userRepo.findOne(req.uid);
    const purchases = await purchaseRepo.find({
        relations: ["prod"],
        where: { user },
    });

    const aux = purchases.map(purchase => {
        const { prod: { id_prod, name }, ...bought } = purchase;
        return { ...bought, id_prod, name }
    })

    if (!purchases?.length) return res.json({
        msg: "You have not made any purchase"
    });

    res.json(aux);
}
const purchasePost = async (req: myRequest, res: Response) => {
    const userRepo = getRepository(User);
    const prodRepo = getRepository(Product);
    const purchaseRepo = getRepository(ProductPurchase);
    const user = await userRepo.findOne(req.uid);
    const { products } = req.body;
    let purchasedItems: PurchasedItem[] = [];
    let notBought: string[] = [];

    for (const { prod_id, quantity: incQun } of products) {
        let bought = 0;
        const prod = await prodRepo.findOne(prod_id);

        if (!prod) return res.status(400).json({ error: `The product id ${prod_id} was not found` });
        if (prod.quantity < incQun) return res.status(400).json({ error: `The product id ${prod_id} does not have enough stock` });

        const totalByProd = prod.price * incQun;
        if (user.money < totalByProd) {
            notBought.push(`User does not have enough money to buy the product with id ${prod.id_prod}`);
            continue;
        }

        const money = user.money - totalByProd;
        const quantity = prod.quantity - incQun;


        const userUpdate = await userRepo.save({
            ...user,
            money
        })

        await prodRepo.save({
            ...prod,
            user: userUpdate,
            quantity
        })
        const { id_user_prod, total, purchase_date, quantity_bought } = await purchaseRepo.save({
            quantity_bought: incQun,
            user: userUpdate,
            prod,
            total: totalByProd
        })
        purchasedItems.push({
            id_user_prod,
            total,
            quantity_bought,
            purchase_date,
        })
    }

    res.json({
        notBought,
        purchasedItems,
    })
}

/*const purchasePut = async (req: Request, res: Response) => {
 
}
const purchaseDelete = async (req: Request, res: Response) => {
 
}*/

export {
    purchaseGet,
    purchasePost,
    /*  purchasePut,
      purchaseDelete,*/
}