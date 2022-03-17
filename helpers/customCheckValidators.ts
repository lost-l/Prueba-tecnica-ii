import { getRepository } from "typeorm";
import { User } from "../src/entity/User";


const emailExists = async (email: string) => {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
        select: ["email"],
        where: { email }
    })
    if (user) throw new Error("The email already exists")
}

export {
    emailExists
}