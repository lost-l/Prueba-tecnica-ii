import express = require("express");
import { check } from "express-validator";
import { authUserPost } from "../controller/auth.controller";
import { fieldValidation } from "../middleware/fieldValidation";
const router = express.Router();

router.use(express.json());


router.post("/", [
    check("email", "Please check out your email").isEmail(),
    check("passwd", "The password is necessary").not().isEmpty(),
    fieldValidation
], authUserPost);

export { router };