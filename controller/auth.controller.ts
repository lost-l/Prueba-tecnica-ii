import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Role } from "../src/entity/Role";
import { User } from "../src/entity/User";
import { compareSync } from "bcryptjs"
import { generateJwt } from "../helpers/generateJWT";


const authUserPost = async (req: Request, res: Response) => {
    const userRepo = getRepository(User);
    const { email, passwd } = req.body;
    const user = await userRepo.findOne({
        where: { email },
        relations: ["role"]
    })

    if (!user) return res.status(404).json({
        error: "Check out your email or password"
    })

    if (!compareSync(passwd, user.passwd)) return res.status(404).json({
        error: "Check out your email or password"
    })

    const token = await generateJwt(user.id_user);

    res.json({
        msg: "login",
        token
    })
}

export { authUserPost }