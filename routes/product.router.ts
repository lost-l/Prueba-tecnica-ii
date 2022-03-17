import express = require("express");
import { check } from "express-validator";
import * as product from "../controller/product.controller"
import { fieldValidation } from "../middleware/fieldValidation";
import { validateJwt } from "../middleware/validateToken";
const router = express.Router();

router.use(express.json());

router.route("/")
    .get(product.productsGet)
    .post([
        validateJwt,
        check("name", "The name of the product is required").isAlphanumeric("es-ES", {
            ignore: " "
        }),
        check("price", "The price of the product is required").isFloat({
            min: 1
        }),
        check("quantity", "The quantity of the product is required").isFloat({
            min: 1
        }),
        check("category", "the category of the product is required").isAlpha(),
        fieldValidation
    ], product.productPost)

router.route("/:prodId")
    .get([
        validateJwt,
        fieldValidation
    ], product.productGet)
    .put([
        validateJwt,
        check("prodId").not().isEmpty(),
        check("prodId", "This field must be a number").isNumeric(),
        check("name", "The name of the product is required").isAlphanumeric(),
        check("price", "The price of the product is required").isFloat({ min: 1 }),
        check("quantity", "The quantity of the product is required").isFloat({ min: 1 }),
        check("catg", "the category of the product is required").isAlpha(),
        fieldValidation
    ], product.productPut)
    .delete([
        validateJwt,
        fieldValidation
    ], product.productDelete)


export { router }