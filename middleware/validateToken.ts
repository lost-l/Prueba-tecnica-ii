import * as jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { myRequest, Token } from "../helpers/myTypes";



export const validateJwt = async (req: myRequest, res: Response, next: NextFunction) => {
    const token = req.header("x-token");
    if (!token) return res.status(401).json({
        error: "Login is neccesary"
    })

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY) as Token;
        req.uid = uid;

        next();
    } catch (error) {
        // console.log(error);
        return res.status(401).json({
            error: "invalid token"
        })
    }
}