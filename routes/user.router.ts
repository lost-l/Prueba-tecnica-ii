import express = require("express");
import { check } from "express-validator";
import { userPost } from "../controller/user.controller";
import { emailExists } from "../helpers/customCheckValidators";
import { fieldValidation } from "../middleware/fieldValidation";
const router = express.Router();

router.use(express.json());


router.post("/", [
    check("name", "The name is necessary").isAlphanumeric(),
    check("email", "Please check out your email").isEmail(),
    check("email").custom(emailExists),
    check("passwd", "The password is necessary").not().isEmpty(),
    check("money", "Amount of money incorrect").isFloat({
        min: 0
    }),
    fieldValidation
], userPost);

export { router };