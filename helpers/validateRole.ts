import { getRepository } from "typeorm";
import { User } from "../src/entity/User";

export const validateRole = async (uid: number) => {
    const userRepo = getRepository(User);
    const { role: { name } } = await userRepo.findOne(uid, {
        relations: ["role"]
    })
    return name;
}