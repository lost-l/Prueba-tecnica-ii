import * as jwt from "jsonwebtoken";

export const generateJwt = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: "7 days"
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(`It could'nt generate the token ${err}`)
            }
            resolve(token);
        });
    })
}