import express = require("express");
import { fieldValidation } from "../middleware/fieldValidation";
import { validateJwt } from "../middleware/validateToken";
import * as purchase from "../controller/purchase.controller";
import { check } from "express-validator";

const router = express.Router();

router.use(express.json());

router.route("/")
    .get([
        validateJwt,
        fieldValidation
    ], purchase.purchaseGet)
    .post([
        validateJwt,
        check("products.*.prod_id").isFloat({ min: 1 }),
        check("products.*.quantity").isFloat({ min: 1 }),
        fieldValidation
    ], purchase.purchasePost)
/* .put([
    validateJwt,
    fieldValidation
], purchase.purchasePut)
.delete([
    validateJwt,
    fieldValidation
], purchase.purchaseDelete); */

export { router }