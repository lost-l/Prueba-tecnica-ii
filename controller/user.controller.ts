import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../src/entity/User";
import { hashSync, genSaltSync } from "bcryptjs";
import { Role } from "../src/entity/Role";


const userPost = async (req: Request, res: Response) => {
    const { name, email, passwd, money } = req.body;
    const userRepo = getRepository(User);
    const role = await getRepository(Role).findOne(2);

    const newUser = userRepo.create({
        name, email, passwd, money, role
    })
    newUser.passwd = hashSync(passwd, genSaltSync());

    await userRepo.save(newUser);

    return res.json(newUser);
}

export { userPost }