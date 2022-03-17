import { Response } from "express";
import { getRepository } from "typeorm";
import { myRequest } from "../helpers/myTypes";
import { validateRole } from "../helpers/validateRole";
import { Category } from "../src/entity/Category";
import { Product } from "../src/entity/Product";


const productsGet = async (req: myRequest, res: Response) => {
    const prodRepo = getRepository(Product);
    const prods = await prodRepo.find();


    if (!prods?.length) return res.status(200).json({
        error: "At this moment we dont have products"
    })

    res.json(prods);
}


const productGet = async (req: myRequest, res: Response) => {
    const { prodId } = req.params;

    let auxId = parseInt(prodId, 10);
    if (isNaN(auxId)) return res.status(400).json({
        error: "The product id must be a number"
    })

    const prodRepo = getRepository(Product);
    const prod = await prodRepo.findOne(auxId);

    if (!prod) return res.status(400).json({
        msg: "We could not find the product"
    })

    res.json({
        prod
    })
}

const productPost = async (req: myRequest, res: Response) => {
    const uid = req.uid;
    const role = await validateRole(uid);
    if (!Object.is(role, "ADMIN")) return res.status(400).json({
        error: "You don't have permission to do this"
    })

    const { name, price, quantity, category } = req.body
    const prodRepo = getRepository(Product);
    const catgRepo = getRepository(Category);
    const catg = await catgRepo.findOne(null, {
        where: { name: category }
    });

    if (!catg) {
        const availableCatgs = await catgRepo.find({
            select: ["name"]
        });
        return res.status(400).json({
            error: "The category does not exists",
            availableCatgs
        })
    }

    const prod = prodRepo.create({
        name, price, quantity, catg
    })

    const prodCreated = await prodRepo.save(prod);
    res.json(prodCreated);
}


const productPut = async (req: myRequest, res: Response) => {
    const uid = req.uid;
    const role = await validateRole(uid);

    if (!Object.is(role, "ADMIN")) return res.status(400).json({
        error: "You don't have permission to do this"
    })

    const prod_id = req.params.prodId;
    const prodRepo = getRepository(Product);
    const catgRepo = getRepository(Category);
    const prod = await prodRepo.findOne(prod_id);
    if (!prod) return res.status(400).json({
        error: `The product id ${prod_id} was not found`
    })

    const {
        name = prod.name, price = prod.price,
        quantity = prod.quantity, catg
    } = req.body

    const catgRow = await catgRepo.findOne(null, {
        where: { name: catg }
    })

    if (!catgRow) return res.status(400).json({
        error: `The category ${catg} was not found`
    })

    const prodUpdated = await prodRepo.save({
        ...prod,
        name,
        price,
        quantity,
        catg: catgRow
    })

    res.json(prodUpdated);
}

const productDelete = async (req: myRequest, res: Response) => {
    const uid = req.uid;
    const role = await validateRole(uid);
    if (!Object.is(role, "ADMIN")) return res.status(400).json({
        error: "You don't have permission to do this"
    })

    const { prodId } = req.params;
    let auxId = parseInt(prodId, 10);

    const prodRepo = getRepository(Product);
    const prod = await prodRepo.findOne(auxId);

    if (!prod) return res.status(400).json({
        error: "We could not find the product"
    })

    await prodRepo.remove(prod);

    res.json({
        prod
    })
}

export {
    productsGet,
    productGet,
    productPost,
    productPut,
    productDelete,
}